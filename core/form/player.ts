import { Player } from '@minecraft/server';
import type { SendableForm } from './types';

declare module '@minecraft/server' {
  interface Player {
    sendForm(form: SendableForm): Promise<void>;
  }
}

// hakomcを読み込んだ時点でPlayer.prototypeをグローバルに拡張する副作用モジュール
Player.prototype.sendForm = function (this: Player, form: SendableForm): Promise<void> {
  return form.send(this);
};
