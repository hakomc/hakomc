import { Player } from '@minecraft/server';
import type { CustomForm } from '@minecraft/server-ui';
import { SendableForm } from '../types';

export { SendableForm };

/**
 * DDUI (CustomForm) の子要素が実装するコンポーネント契約。
 *
 * 通常フォームの FormComponent<T> と異なり「render → 一括handle」の
 * 2段階が不要な1段階設計になっている。値の保持・購読は
 * ObservableBoolean/ObservableNumber/ObservableString 自体が担うため。
 *
 * render の第2引数に player を渡すのは、CustomForm.button() の
 * onClick が引数を取らない (() => void) ため、player を束縛した
 * クロージャをコンポーネント側で組み立てる必要があるからである。
 * player を使わないコンポーネントは第2引数を宣言しなくてもよい。
 */
export interface CustomFormComponent {
  type: string;
  opts?: object;
  render(form: CustomForm, player: Player): void;
}
