import { describe, expect, it } from 'vitest';
import { sim } from '../../../core/testing';
import { entity, health } from '../../../core/entity';

// timeline・部位・プロパティ・追加のコマンドを持たないクラスだけを登録する（登録の一覧はテストのファイルごとに分かれる）
class Plain extends entity('min:plain', { components: [health({ value: 5 })] }) {}
Plain.register();

describe('デバッグ用のコマンド: 使えるものだけ登録する', () => {
  it('timeline も部位もプロパティも無ければ、/hakomc:info だけ', () => {
    const reg = sim.startup();
    expect([...reg.commands.keys()]).toEqual(['hakomc:info']);
    expect([...reg.enums.keys()]).toEqual([]);
  });
});
