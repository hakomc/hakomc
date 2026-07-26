import { Player } from '@minecraft/server';
import { MessageFormData } from '@minecraft/server-ui';
import { SendableForm } from '../types';

interface MessageFormProps {
  title: string;
  children?: string[];
  previousForm?: SendableForm;
  yesLabel: string;
  noLabel: string;
  onClickYes?: (player: Player) => void;
  onClickNo?: (player: Player) => void;
};

/**
 * Yes/No二択のメッセージフォーム
 */
const MessageForm = ({
  title,
  children = [],
  previousForm,
  yesLabel,
  noLabel,
  onClickYes = () => {},
  onClickNo = () => {},
}: MessageFormProps): SendableForm => {
  const body = typeof children === 'object' ? children.join('\n') : children;

  return {
    async send(player: Player): Promise<void> {
      // UI描画
      const form = new MessageFormData()
        .title(title)
        .body(body)
        .button1(yesLabel)
        .button2(noLabel);

      const res = await form.show(player);

      // ESC / ×
      if (res.canceled) {
        await previousForm?.send(player);
        return;
      }

      // 値のハンドリング
      if (res.selection === 0) {
        onClickYes(player);
      } else if (res.selection === 1) {
        onClickNo(player);
      }
    },
  };
};

export default MessageForm;
