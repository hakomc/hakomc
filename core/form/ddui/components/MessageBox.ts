import { Player } from '@minecraft/server';
import { MessageBox as MCMessageBox, DataDrivenScreenClosedReason } from '@minecraft/server-ui';
import type { ObservableString, ObservableUIRawMessage, UIRawMessage } from '@minecraft/server-ui';
import { SendableForm } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface MessageBoxProps {
  title: Text;
  children?: Text | string[];
  previousForm?: SendableForm;
  button1Label: Text;
  button1Tooltip?: Text;
  button2Label?: Text;
  button2Tooltip?: Text;
  onSelect?: (player: Player, selection: number) => void;
};

/**
 * データドリブンUI(DDUI)の2択メッセージボックス
 */
export default function MessageBox({
  title,
  children,
  previousForm,
  button1Label,
  button1Tooltip,
  button2Label,
  button2Tooltip,
  onSelect = () => {},
}: MessageBoxProps): SendableForm {
  return {
    async send(player: Player): Promise<void> {
      const form = new MCMessageBox(player, title);

      if (children !== undefined) {
        const body = Array.isArray(children) ? children.join('\n') : children;
        form.body(body);
      }

      form.button1(button1Label, button1Tooltip);
      if (button2Label !== undefined) {
        form.button2(button2Label, button2Tooltip);
      }

      const res = await form.show();

      if (res.closeReason === DataDrivenScreenClosedReason.ClientClosed) {
        await previousForm?.send(player);
        return;
      }

      if (res.selection !== undefined) {
        onSelect(player, res.selection);
      }
    },
  };
};
