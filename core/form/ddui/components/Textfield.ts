import type { ObservableBoolean, ObservableString, ObservableUIRawMessage, TextFieldOptions, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface TextfieldProps {
  label: Text;
  text: ObservableString;
  description?: Text;
  disabled?: boolean | ObservableBoolean;
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormでテキスト入力を行えるコンポーネント
 *
 * 値の保持は呼び出し側が渡す ObservableString が担うため、
 * このコンポーネント自体は状態を持たない
 */
export default function Textfield({
  label,
  text,
  description,
  disabled,
  visible,
}: TextfieldProps): CustomFormComponent {
  const options: TextFieldOptions = { description, disabled, visible };

  return {
    type: 'text_field',
    opts: { label, ...options },
    render(form) {
      form.textField(label, text, options);
    },
  };
};
