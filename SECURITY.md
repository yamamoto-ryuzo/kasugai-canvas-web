# セキュリティ / 配布物ウイルスチェック手順

## 対象

リポジトリに追跡される配布バイナリ。拡張子:
`zip, exe, dll, msi, 7z, rar, com, scr, jar, cab, iso`

現在の対象（`git ls-files` で確認可能）:

- `V6.zip`
- `stable/download/bridge-hub.{exe,zip}`
- `unstable/download/bridge-hub.{exe,zip}`
- `V6/download/bridge-hub.{exe,zip}`

## スキャンの実施タイミング・場所

1. **コミット前（ローカル）**: pre-commit フック `virus-scan-binaries`
   （`tools/scan_binaries.py`）が、ステージされたバイナリをスキャンする。
   ClamAV（`clamdscan`/`clamscan`）が PATH にあればそれを使い、なければ
   Windows Defender（`MpCmdRun.exe`）を使う。**スキャナが見つからない場合は
   コミットをブロックする**（未スキャンのまま通さない）。
   - 手動で全件スキャン: `python tools/scan_binaries.py --all`
2. **push / PR 時（CI）**: `.github/workflows/virus-scan.yml` が ClamAV で
   追跡中バイナリを全件スキャンする。`cdn-sync.yml` など GitHub 上で直接
   作られるコミット（ローカルの pre-commit を通らない経路）もここで検知する。
   `workflow_dispatch` で手動再スキャンも可能。
3. **正本側（発行元）**: 発行元 `yamamoto-ryuzo/kasugai_canvas` の
   `tools/publish_cdn.py` で publish 時にスキャンを挟むのが一次防御点。
   本リポジトリ側の仕組みは受け口側の多層防御であり、正本側への導入は
   kasugai_canvas リポジトリ側で別途対応する。

## 検知時の対処フロー

1. **コミット前に検知された場合**
   - そのファイルはコミットしない。
   - 取得元（ダウンロード元 URL / 生成したビルド）を確認し、正本側で
     再生成したバイナリを再スキャンしてから差し替える。
2. **コミット済みのバイナリで検知された場合（CI 失敗など）**
   - 当該ファイルを除去するコミット（または当該コミットの revert）を作成し、
     スキャンが通ることを確認してから公開を継続する。
   - 配信停止が必要な場合は該当チャンネルのバイナリを HEAD から除去し、
     発行元へ報告する。
3. **誤検知が疑われる場合**
   - 別エンジン（例: VirusTotal）で再検査し、検知名・エンジン名を記録する。
   - バイナリの SHA-256 を正本側と照合し、取得以降の改変有無を確認する。
   - 誤検知と確定した場合のみベンダーへ誤検知報告を行い、ファイル名・
     ハッシュ・根拠・日付をこの文書の「除外の記録」に明記したうえで
     最小単位（当該ファイルのみ）でスキャン対象から除外する。
   - 確定できない場合は除外せず、検知扱いのまま配布を保留する。

## 除外の記録

（現在の除外: なし）
