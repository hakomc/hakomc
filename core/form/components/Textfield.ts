import { ModalFormData } from '@minecraft/server-ui';
import { FormComponent } from '../types';

interface TextfieldProps {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  tooltip?: string;
};

/**
 * ModalFormでテキスト入力を行えるコンポーネント
 */
export default function Textfield({
  label,
  placeholder,
  defaultValue,
  tooltip,
}: TextfieldProps): FormComponent<string> {
  return {
    type: 'text_field',
    opts: { label, placeholder, default: defaultValue, tooltip },
    render(form: ModalFormData) {
      form.textField(
        label,
        placeholder ?? '',
        {
          defaultValue: defaultValue ?? '',
          tooltip,
        },
      );
    },
  };
};
