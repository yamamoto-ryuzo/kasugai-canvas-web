#!/usr/bin/env python3
"""git log からチャンネル別デプロイ履歴 history.json を生成する。

kasugai-canvas-web は発行物リポジトリ。kasugai_canvas 側の
tools/publish_cdn.py (または .github/workflows/cdn-sync.yml) が
"Sync web/ to <channel> (v<version>)" 形式のコミットとしてデプロイを
記録する。この規約に従うコミットを走査して機械可読な履歴を出力する。

使い方:
    python tools/generate_history.py            # history.json を書き出す
    python tools/generate_history.py --stdout   # 標準出力に出すだけ
"""
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO = "yamamoto-ryuzo/kasugai-canvas-web"
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "history.json"


def classify(subject):
    """デプロイ系コミットメッセージを (channel, version) に解釈する。"""
    m = re.match(r"^Sync web/ to (\S+) \(v([\d.]+)\)", subject)
    if m:
        return m.group(1), m.group(2)
    m = re.match(r"^Update V6 stage to current stable \(v([\d.]+)\)", subject)
    if m:
        return "V6", m.group(1)
    m = re.match(r"^Pin V6 engine snapshot \(v([\d.]+)\)", subject)
    if m:
        return "V6", m.group(1)
    return None


def collect():
    log = subprocess.run(
        ["git", "log", "--format=%H%x1f%cI%x1f%s"],
        cwd=ROOT, check=True, capture_output=True, text=True, encoding="utf-8",
    ).stdout
    channels = {}
    for line in log.splitlines():
        parts = line.split("\x1f")
        if len(parts) < 3:
            continue
        sha, date, subject = parts[0], parts[1], parts[2]
        hit = classify(subject)
        if not hit:
            continue
        channel, version = hit
        # フル/長い SHA は detect-secrets の高エントロピー hex 誤検知を招くため
        # 7桁短縮 SHA のみ保持する(GitHub の commit URL は短縮でも解決される)
        short = sha[:7]
        channels.setdefault(channel, []).append({
            "version": version,
            "deployed_at": date,
            "commit": short,
            "commit_url": f"https://github.com/{REPO}/commit/{short}",
            "message": subject,
        })
    return channels


def main():
    channels = collect()
    out = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "repo": REPO,
        "channels": channels,
    }
    text = json.dumps(out, ensure_ascii=False, indent=2) + "\n"
    if "--stdout" in sys.argv:
        sys.stdout.write(text)
        return
    OUT.write_text(text, encoding="utf-8")
    counts = {c: len(v) for c, v in sorted(channels.items())}
    print(f"wrote {OUT.name}: {counts}")


if __name__ == "__main__":
    main()
