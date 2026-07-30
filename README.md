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

### Development workflow
1. Create a new working branch such as feature/*
1. Update the library under core/
1. Push once you reach a good checkpoint
1. To verify your changes:
    1. In [hakomc-server](https://github.com/hakomc/hakomc-server), rewrite the dependencies in package.json
    1. `"hakomc": "github:hakomc/hakomc#<branch-name>"`
    1. Running `npm install hakomc` installs the latest state of that branch

## 日本語

### 概要
ScriptAPIを使用したライブラリやプラグイン作成をサポートするエコシステムです。
プロジェクトとしては大きく二つの概念があります。

- 動作環境&開発環境: hakomc-server
- フレームワーク: hakomc

このリポジトリはフレームワーク側のコアソースになっています。

### 開発手順
1. feature/* 等で新しく作業ブランチを切る
1. core/ 配下でライブラリを更新
1. キリが良いところで push する
1. 動作確認は以下
    1. [hakomc-server](https://github.com/hakomc/hakomc-server)側で package.json の dependencies を書き換え
    1. `"hakomc": "github:hakomc/hakomc#<ブランチ名>"`
    1. `npm install hakomc` を実行するとブランチの最新の状態でインストールされる
