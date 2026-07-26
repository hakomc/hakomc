import { ModalFormData } from '@minecraft/server-ui';
import { FormComponent } from '../types';

interface ToggleProps {
  label: string;
  defaultValue?: boolean;
};

/**
 * ModalFormでトグル切り替えを行えるコンポーネント
 */
export default function Toggle({
  label,
  defaultValue = false,
}: ToggleProps): FormComponent<boolean> {
  return {
    type: 'toggle',
    opts: { label, default: defaultValue },
    render(form: ModalFormData) {
      form.toggle(label, { defaultValue });
    },
  };
}
