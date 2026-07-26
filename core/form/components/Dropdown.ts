import { ModalFormData } from '@minecraft/server-ui';
import { FormComponent } from '../types';

interface DropdownProps {
  label: string;
  options: string[];
  defaultValueIndex?: number;
};

/**
 * ModalFormでドロップダウン選択を行えるコンポーネント
 */
export default function Dropdown({
  label,
  options,
  defaultValueIndex,
}: DropdownProps): FormComponent<number> {
  return {
    type: 'dropdown',
    opts: { label, options, defaultIndex: defaultValueIndex },
    render(form: ModalFormData) {
      form.dropdown(
        label,
        options,
        { defaultValueIndex: defaultValueIndex ?? 0 },
      );
    },
  };
};
