# セキュリティ / 配布物ウイルスチェック手順

## 対象

リポジトリに追跡される配布バイナリ。拡張子:
`zip, exe, dll, msi, 7z, rar, com, scr, jar, cab, iso`

現在の対象（`git ls-files` で確認可能）:

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

## 検知・対処の記録

### 2026-11-11: `V6.zip` の廃止

リポジトリ全体のウイルスチェックで `V6.zip` が検知された。内容物を調査した
結果、最有力な検知原因は内包する無署名実行ファイル
`V6/download/bridge-hub.exe` / `bridge-hub.zip`（ローカル Windows Defender
では未検知。検知したエンジン・検知名は未確定）。

- `V6.zip` は展開済み `V6/` と内容が完全に重複し、リポジトリ内の
  html/md/json/js から参照されていなかったため、再生成ではなく廃止した。
- 削除した `V6.zip` の SHA-256（再配布・同定用）:
  `621cf944713a8eb14a40dfa0532702fb4391cf65cc47057bc62aff4f6d7d7265`
- 各チャンネルの配布導線（`shared/ai-chat.js` → `../download/bridge-hub.*`）
  で使用中のため、以下のバイナリは残置する。いずれも同一ハッシュであり、
  今後の誤検知判定・VirusTotal 照合・正本との改変確認に用いること。

| ファイル | SHA-256 |
|---|---|
| `{stable,unstable,V6}/download/bridge-hub.exe` | `b2fc07a3fa277b66d402c73728e6a26fffaa12c1a8663ed07ea7d9e8a776c4ca` |
| `{stable,unstable,V6}/download/bridge-hub.zip` | `f32e227dc5a9a42e9ba85ad456df38e74d40b2871c76fdfd32f61df5262c729f` |

残置バイナリが今後エンジンに検知された場合は、別エンジン（VirusTotal 等）で
の再検査に加え、正本 `yamamoto-ryuzo/kasugai_canvas` の `web/` 側での再生成・
コード署名を検討する（本リポジトリは発行物のみでバイナリ自体は修正しない）。
