import { ModalFormData } from '@minecraft/server-ui';
import { FormComponent } from '../types';

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue?: number;
};

/**
 * ModalFormでスライダー表示するコンポーネント
 */
export default function Slider({
  label,
  min,
  max,
  step,
  defaultValue = min,
}: SliderProps): FormComponent<number> {
  return {
    type: 'slider',
    opts: { label, min, max, step, default: defaultValue },
    render(form: ModalFormData) {
      form.slider(
        label,
        min,
        max,
        { valueStep: step ?? 1, defaultValue },
      );
    },
  };
};
