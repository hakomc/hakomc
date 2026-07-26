import type { ObservableBoolean, ObservableString, ObservableUIRawMessage, TextOptions, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface LabelProps {
  text: Text;
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormで読み取り専用のラベルを表示するコンポーネント
 */
export default function Label({ text, visible }: LabelProps): CustomFormComponent {
  const options: TextOptions = { visible };

  return {
    type: 'label',
    opts: { text, ...options },
    render(form) {
      form.label(text, options);
    },
  };
};
