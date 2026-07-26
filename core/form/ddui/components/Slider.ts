import type { ObservableBoolean, ObservableNumber, ObservableString, ObservableUIRawMessage, SliderOptions, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface SliderProps {
  label: Text;
  value: ObservableNumber;
  min: number | ObservableNumber;
  max: number | ObservableNumber;
  step?: number | ObservableNumber;
  description?: Text;
  disabled?: boolean | ObservableBoolean;
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormでスライダー表示するコンポーネント
 *
 * 値の保持は呼び出し側が渡す ObservableNumber が担うため、
 * このコンポーネント自体は状態を持たない
 */
export default function Slider({
  label,
  value,
  min,
  max,
  step,
  description,
  disabled,
  visible,
}: SliderProps): CustomFormComponent {
  const options: SliderOptions = { step, description, disabled, visible };

  return {
    type: 'slider',
    opts: { label, min, max, ...options },
    render(form) {
      form.slider(label, value, min, max, options);
    },
  };
};
