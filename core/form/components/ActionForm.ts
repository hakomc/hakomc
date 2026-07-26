import { Player } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';
import { ActionButton, SendableForm } from '../types';

interface ActionFormProps {
  title: string;
  body?: string;
  previousForm?: SendableForm;
  children?: ActionButton[];
};

/**
 * アイコン付きボタンを配置できるアクションフォーム
 */
export default function ActionForm({
  title,
  body,
  previousForm,
  children = [],
}: ActionFormProps): SendableForm {
  return {
    async send(player: Player): Promise<void> {
      // UI描画
      const form = new ActionFormData()
        .title(title);

      if (body) {
        form.body(body);
      }

      for (const btn of children) {
        btn.render(form);
      }

      const res = await form.show(player);

      // ESC / ×
      if (res.canceled) {
        await previousForm?.send(player);
        return;
      }

      // 値のハンドリング
      const index = res.selection;
      if (index === undefined) return;

      const button = children[index];
      button?.handle(player);
    },
  };
};
