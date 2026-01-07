# electron_ts
Electron+TypeScriptを使ったWindows向けのUSB挿抜検知デモアプリの講習用サンプルプログラム
(https://github.com/potaajyu1729/electron_ts)

---

## 概要

このプロジェクトは、USBメモリに入れたHTMLを
**USBを挿すだけで自動で開く Windows アプリ**です。

Electron を使って、

- USBの挿入を検知
- USB内のページを自動表示
- TypeScript で簡単にカスタマイズ

ができます。

---

## 機能

- アプリを起動 → 空ページで待機
- USBを挿す → USB内 `openapp/index.html` が自動で表示
- USBを差し替えると別のページも表示可能
- 本体にはHTMLファイル不要

---

## 動作環境

- Windows 10 / 11
- USBメモリ
- Node.js（LTS版推奨）

---

## USBの中身について

GitHubにある `openapp` フォルダを USB の直下にコピーしてください：

```text
USB:\openapp\index.html