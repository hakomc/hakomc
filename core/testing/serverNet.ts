/**
 * テスト時に `@minecraft/server-net` の代わりに読み込まれるモジュール（名前だけそろえたスタブ）。
 * hakomc 本体（hakomc/net）が読み込むので、HTTP を使わないテストでも必要になる。
 */
export * from './generated/serverNetStubs';
