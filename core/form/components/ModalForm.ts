import { Player } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';
import { FormComponent, SendableForm } from '../types';

interface ModalFormProps<T = any> {
  title: string;
  submitButtonText?: string;
  previousForm?: SendableForm;
  children?: FormComponent[];
  onSubmit?: (player: Player, values?: T[] | undefined) => any;
};

/**
 * ユーザーからのテキストやその他の入力を受け取れるフォーム
 *
 * **使用例**
 * ```tsx
 * <ModalForm
 *   title="タイトル"
 *   onSubmit={handleSubmit}
 * >
 *   <Textfield
 *     label="テキスト入力"
 *   />
 * </ModalForm>
 * ```
 */
export default function ModalForm({
  title,
  submitButtonText,
  previousForm,
  children = [],
  onSubmit = () => {},
}: ModalFormProps): SendableForm {
  return {
    async send(player: Player): Promise<void> {
      // UI描画
      const form = new ModalFormData()
        .title(title);

      if (submitButtonText) {
        form.submitButton(submitButtonText);
      }

      for (const component of children) {
        component.render(form);
      }

      const res = await form.show(player);

      // ESC / ×
      if (res.canceled) {
        await previousForm?.send(player);
        return;
      }

      // 値のハンドリング
      res.formValues?.forEach((value, index) => {
        const component = children[index];
        try {
          component.handle?.(player, value);
        } catch (e) {
          console.warn(`[ModalForm] handler error at index ${index}: ${e}`);
        }
      });

      onSubmit(player, res.formValues);
    },
  };
};
