import type { ObservableBoolean, ObservableString, ObservableUIRawMessage, ToggleOptions, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface ToggleProps {
  label: Text;
  toggled: ObservableBoolean;
  description?: Text;
  disabled?: boolean | ObservableBoolean;
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormでトグル切り替えを行えるコンポーネント
 *
 * 値の保持は呼び出し側が渡す ObservableBoolean が担うため、
 * このコンポーネント自体は状態を持たない
 */
export default function Toggle({
  label,
  toggled,
  description,
  disabled,
  visible,
}: ToggleProps): CustomFormComponent {
  const options: ToggleOptions = { description, disabled, visible };

  return {
    type: 'toggle',
    opts: { label, ...options },
    render(form) {
      form.toggle(label, toggled, options);
    },
  };
};
