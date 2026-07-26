import { Player } from '@minecraft/server';
import {
  CustomForm as MCCustomForm,
  DataDrivenScreenClosedReason,
} from '@minecraft/server-ui';
import type { ObservableString, ObservableUIRawMessage, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent, SendableForm } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface CustomFormProps {
  title: Text;
  previousForm?: SendableForm;
  children?: CustomFormComponent[];
  onClose?: (player: Player, reason: DataDrivenScreenClosedReason) => void;
};

/**
 * データドリブンUI(DDUI)のカスタムフォーム
 *
 * **使用例**
 * ```tsx
 * <CustomForm title="タイトル">
 *   <Toggle label="有効化" toggled={toggled} />
 * </CustomForm>
 * ```
 */
export default function CustomForm({
  title,
  previousForm,
  children = [],
  onClose = () => {},
}: CustomFormProps): SendableForm {
  return {
    async send(player: Player): Promise<void> {
      const form = new MCCustomForm(player, title);

      for (const component of children) {
        try {
          component.render(form, player);
        } catch (e) {
          console.warn(`[CustomForm] render error (${component.type}): ${e}`);
        }
      }

      const reason = await form.show();

      // ClientClosed: ESC / X / closeButton() など、プレイヤー起因のclose。
      // ServerClosed/UserBusy は previousForm へ戻さず onClose のみ呼ぶ
      // (意図的なclose、あるいは表示すらされていないケースのため)。
      if (reason === DataDrivenScreenClosedReason.ClientClosed) {
        await previousForm?.send(player);
        return;
      }

      onClose(player, reason);
    },
  };
};
