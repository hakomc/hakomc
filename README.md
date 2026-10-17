# hakomc

[![Test & Lint](https://github.com/hakomc/hakomc/actions/workflows/ci.yml/badge.svg)](https://github.com/hakomc/hakomc/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/hakomc.svg)](https://www.npmjs.com/package/hakomc)

[English](#english) | [日本語](#日本語)

## English

### Overview
An ecosystem that supports library and plugin development using the ScriptAPI.
The project consists of two main concepts:

- Runtime & development environment: hakomc-server
- Framework: hakomc

This repository is the core source of the framework side.

### API Documentation
- [Core (`hakomc`): Timer / Net / Debug](docs/api/core.md)
- [Form (`hakomc/form/component`)](docs/api/form.md)
- [DDUI (`hakomc/form/ddui/component`)](docs/api/ddui.md)
- [Entity (`hakomc/entity`)](docs/api/entity.md)
- [Testing (`hakomc/testing`)](docs/api/testing.md)
- [Vite Plugin (`hakomc/vite-plugin`): behaviorPacker](docs/api/vite-plugin.md)

### Development workflow
1. Create a new working branch such as feature/*
1. Update the library under core/
1. Push once you reach a good checkpoint
1. To verify your changes:
    1. In [hakomc-server](https://github.com/hakomc/hakomc-server), rewrite the dependencies in package.json
    1. `"hakomc": "github:hakomc/hakomc#<branch-name>"`
    1. Running `npm install hakomc` installs the latest state of that branch

### Generated files
Some files are generated from the installed type / schema packages and committed. After upgrading the package, regenerate and commit them (a test fails while they are stale):

| Package | Command | Output |
| --- | --- | --- |
| `@minecraft/server` (and `-ui` / `-net`) | `npm run gen:testing` | `core/testing/generated/` |
| `@minecraft/bedrock-schemas` | `npm run gen:entity` | `core/entity/generated/components.ts` |

## 日本語

### 概要
ScriptAPIを使用したライブラリやプラグイン作成をサポートするエコシステムです。
プロジェクトとしては大きく二つの概念があります。

- 動作環境&開発環境: hakomc-server
- フレームワーク: hakomc

このリポジトリはフレームワーク側のコアソースになっています。

### APIドキュメント
- [Core (`hakomc`): Timer / Net / Debug](docs/api/core.md)
- [Form (`hakomc/form/component`)](docs/api/form.md)
- [DDUI (`hakomc/form/ddui/component`)](docs/api/ddui.md)
- [Entity (`hakomc/entity`)](docs/api/entity.md)
- [Testing (`hakomc/testing`)](docs/api/testing.md)
- [Vite Plugin (`hakomc/vite-plugin`): behaviorPacker](docs/api/vite-plugin.md)

### 開発手順
1. feature/* 等で新しく作業ブランチを切る
1. core/ 配下でライブラリを更新
1. キリが良いところで push する
1. 動作確認は以下
    1. [hakomc-server](https://github.com/hakomc/hakomc-server)側で package.json の dependencies を書き換え
    1. `"hakomc": "github:hakomc/hakomc#<ブランチ名>"`
    1. `npm install hakomc` を実行するとブランチの最新の状態でインストールされる

### 生成するファイル
一部のファイルは、インストール済みの型定義・スキーマのパッケージから生成して commit しています。パッケージを上げたら、生成し直して commit してください（古いままだとテストが失敗します）。

| パッケージ | コマンド | 生成先 |
| --- | --- | --- |
| `@minecraft/server`（と `-ui` / `-net`） | `npm run gen:testing` | `core/testing/generated/` |
| `@minecraft/bedrock-schemas` | `npm run gen:entity` | `core/entity/generated/components.ts` |
