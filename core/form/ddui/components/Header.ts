import type { ObservableBoolean, ObservableString, ObservableUIRawMessage, TextOptions, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface HeaderProps {
  text: Text;
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormでヘッダーを表示するコンポーネント
 */
export default function Header({ text, visible }: HeaderProps): CustomFormComponent {
  const options: TextOptions = { visible };

  return {
    type: 'header',
    opts: { text, ...options },
    render(form) {
      form.header(text, options);
    },
  };
};
