# kasugai-canvas-web

KASUGAI Canvas のエンジン(`web/` 一式)を静的配信する公開ホスト。

QGIS プラグイン `geo_webview` が出力する `.kasc`+`DATA/` を、
KASUGAI Canvas 未インストール環境でもブラウザ再生できるようにする
ための CDN 的な配信先。

**エンジン本体のみを配信**し、プロジェクトデータ(`projects/`)は同梱しない
（デモ・テストデータは [kasugai_canvas_webGIS](https://yamamoto-ryuzo.github.io/kasugai_canvas_webGIS/)
等の外部データホストが持ち、`?kasc=` で指定して再生する）。

## 使い方・詳細

**ガイド**: <https://yamamoto-ryuzo.github.io/kasugai-canvas-web/guide/>

エンジン説明・使い方・QGIS からの出力手順などの詳細はすべてガイドに集約しています。

- **公開 URL**: `https://yamamoto-ryuzo.github.io/kasugai-canvas-web/`（`stable/` へリダイレクト）
- **起動形式**: `…/kasugai-canvas-web/<stage>/<engine>/?kasc=<url>`
- **ステージ**: `stable/`(安定版・既定) / `unstable/`(開発版)

## 正本と更新ルール

- **正本は `yamamoto-ryuzo/kasugai_canvas` の `web/`**。このリポジトリは
  発行物のみ置き、直接編集しない
- `unstable/`・`stable/` はどちらも kasugai_canvas 側の `web/` を直接同期する
  (`--channel` がコピー先を選ぶだけで、格上げ・再ビルドの概念はない)
- 同期は kasugai_canvas 側の `python tools/publish_cdn.py` で実行

## セキュリティ

配布バイナリ(`*.zip`/`*.exe` 等)はコミット前(pre-commit)と CI(ClamAV)で
ウイルススキャンされる。手順と検知時の対処フローは
[SECURITY.md](SECURITY.md) を参照。

## ライセンス

[MIT License](LICENSE)。コンテンツの正本は `yamamoto-ryuzo/kasugai_canvas` の `web/` であり、ライセンスも正本に準じます。

## 免責事項

本システムは個人のPCで作成・テストされたものです。  
ご利用によるいかなる損害も責任を負いません。

<p align="center">
  <a href="https://giphy.com/explore/free-gif" target="_blank">
    <img src="https://github.com/yamamoto-ryuzo/QGIS_portable_3x/raw/master/imgs/giphy.gif" width="500" title="avvio QGIS">
  </a>
</p>
