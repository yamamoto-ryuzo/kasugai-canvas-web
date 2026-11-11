#!/usr/bin/env python3
"""配布バイナリ (*.zip, *.exe 等) のウイルススキャン。

pre-commit フックからはステージ済みファイル名が argv で渡る。
手動で全追跡バイナリをスキャンする場合:

    python tools/scan_binaries.py --all

スキャナ解決順:
  1. clamdscan / clamscan (ClamAV。PATH 上)
  2. Windows Defender MpCmdRun.exe

検出時は終了コード 1、スキャナ不在は終了コード 2 で失敗を表面化する
(スキャン未実施で成功扱いにはしない)。手順の詳細は SECURITY.md 参照。
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

BINARY_EXTENSIONS = {
    ".zip", ".exe", ".dll", ".msi", ".7z", ".rar",
    ".com", ".scr", ".jar", ".cab", ".iso",
}


def tracked_binaries() -> list[Path]:
    out = subprocess.run(
        ["git", "ls-files"], cwd=REPO_ROOT, check=True,
        capture_output=True, text=True,
    )
    return [
        REPO_ROOT / line for line in out.stdout.splitlines()
        if Path(line).suffix.lower() in BINARY_EXTENSIONS
    ]


def find_scanner() -> tuple[str, str] | None:
    for name in ("clamdscan", "clamscan"):
        path = shutil.which(name)
        if path:
            return ("clamav", path)
    candidates = []
    for env in ("ProgramFiles", "ProgramFiles(x86)"):
        base = os.environ.get(env)
        if base:
            candidates.append(Path(base) / "Windows Defender" / "MpCmdRun.exe")
    candidates.append(Path(r"C:\Program Files\Windows Defender\MpCmdRun.exe"))
    for cand in candidates:
        if cand.is_file():
            return ("defender", str(cand))
    return None


def scan_clamav(exe: str, files: list[Path]) -> int:
    # 終了コード: 0=クリーン, 1=検出, 2=エラー
    cmd = [exe]
    if Path(exe).name == "clamscan":
        cmd += ["--infected", "--no-summary"]
    cmd += [str(f) for f in files]
    return subprocess.run(cmd).returncode


def display_name(f: Path) -> str:
    try:
        return str(f.relative_to(REPO_ROOT))
    except ValueError:
        return str(f)


def scan_defender(exe: str, files: list[Path]) -> int:
    # MpCmdRun.exe: -Scan -ScanType 3 はカスタムスキャン。
    # 戻り値 0=クリーン, 0 以外=脅威検出/エラー。1ファイルずつ実行する。
    infected = []
    for f in files:
        result = subprocess.run(
            [exe, "-Scan", "-ScanType", "3", "-File", str(f)],
            capture_output=True, text=True,
        )
        if result.returncode != 0:
            infected.append(f)
            print(f"INFECTED({result.returncode}): {display_name(f)}")
            sys.stdout.write(result.stdout)
            sys.stderr.write(result.stderr)
        elif not f.is_file():
            # リアルタイム保護がスキャン中に隔離した場合を見逃さない
            infected.append(f)
            print(f"threat: {display_name(f)} (removed during scan)")
        else:
            print(f"clean: {display_name(f)}")
    return 1 if infected else 0


def main(argv: list[str]) -> int:
    if "--all" in argv:
        files = tracked_binaries()
        targets = argv[1:]
    else:
        targets = argv[1:]
        files = []
        for t in targets:
            p = Path(t)
            if not p.is_absolute():
                p = REPO_ROOT / p
            if p.suffix.lower() in BINARY_EXTENSIONS:
                files.append(p)
    files = [f for f in files if f.is_file()]
    if not files:
        print("no binary artifacts to scan")
        return 0

    scanner = find_scanner()
    if scanner is None:
        print(
            "error: no virus scanner found. Install ClamAV (clamscan/clamdscan) "
            "or run on Windows with Defender (MpCmdRun.exe). "
            "Refusing to let binaries through unscanned.",
            file=sys.stderr,
        )
        return 2

    kind, exe = scanner
    print(f"scanner: {exe}")
    print(f"scanning {len(files)} file(s)")
    if kind == "clamav":
        rc = scan_clamav(exe, files)
        if rc == 2:
            print("error: scanner reported an error", file=sys.stderr)
        return rc
    return scan_defender(exe, files)


if __name__ == "__main__":
    sys.exit(main(sys.argv))
