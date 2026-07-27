import type { DropdownItemData, DropdownOptions, ObservableBoolean, ObservableNumber, ObservableString, ObservableUIRawMessage, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface DropdownProps {
  label: Text;
  value: ObservableNumber;
  items: DropdownItemData[];
  description?: Text;
  disabled?: boolean | ObservableBoolean;
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormでドロップダウン選択を行えるコンポーネント
 *
 * 値の保持は呼び出し側が渡す ObservableNumber が担うため、
 * このコンポーネント自体は状態を持たない
 */
export default function Dropdown({
  label,
  value,
  items,
  description,
  disabled,
  visible,
}: DropdownProps): CustomFormComponent {
  const options: DropdownOptions = { description, disabled, visible };

  return {
    type: 'dropdown',
    opts: { label, items, ...options },
    render(form) {
      form.dropdown(label, value, items, options);
    },
  };
};
