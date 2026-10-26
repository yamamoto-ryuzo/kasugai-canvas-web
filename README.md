# kasugai-canvas-web

KASUGAI Canvas のエンジン(`web/` 一式)を静的配信する公開ホスト。

QGIS プラグイン `geo_webview` が出力する `.kasc`+`DATA/` を、
KASUGAI Canvas 未インストール環境でもブラウザ再生できるようにする
ための CDN 的な配信先。

## 使い方・詳細

**ガイド**: <https://yamamoto-ryuzo.github.io/kasugai-canvas-web/guide/>

エンジン説明・使い方・QGIS からの出力手順などの詳細はすべてガイドに集約しています。

- **公開 URL**: `https://yamamoto-ryuzo.github.io/kasugai-canvas-web/`（`stable/` へリダイレクト）
- **起動形式**: `…/kasugai-canvas-web/<stage>/<engine>/?kasc=<url>`
- **ステージ**: `stable/`(安定版・既定) / `unstable/`(開発版) / `latest/`(stable リダイレクト)

## 正本と更新ルール

- **正本は `yamamoto-ryuzo/kasugai_canvas` の `web/`**。このリポジトリは
  発行物のみ置き、直接編集しない
- `unstable/` は develop の `web/` を同期、`stable/` はリリース時に
  検証済み unstable の中身をそのままコピーして格上げ(再ビルドしない)
- 同期は kasugai_canvas 側の `python tools/publish_cdn.py` で実行

## ライセンス

[MIT License](LICENSE)。コンテンツの正本は `yamamoto-ryuzo/kasugai_canvas` の `web/` であり、ライセンスも正本に準じます。
