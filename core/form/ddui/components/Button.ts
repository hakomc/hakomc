import { Player } from '@minecraft/server';
import type { ButtonOptions, ObservableBoolean, ObservableString, ObservableUIRawMessage, UIRawMessage } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

type Text = string | UIRawMessage | ObservableString | ObservableUIRawMessage;

interface ButtonProps {
  children?: string | string[];
  tooltip?: Text;
  disabled?: boolean | ObservableBoolean;
  visible?: boolean | ObservableBoolean;
  onClick?: (player: Player) => void;
};

/**
 * CustomFormにクリック可能なボタンを追加するコンポーネント
 */
export default function Button({
  children = [],
  tooltip,
  disabled,
  visible,
  onClick = () => {},
}: ButtonProps): CustomFormComponent {
  const label = typeof children === 'object' ? children.join('\n') : children;
  const options: ButtonOptions = { tooltip, disabled, visible };

  return {
    type: 'button',
    opts: { label, ...options },
    render(form, player) {
      form.button(label, () => onClick(player), options);
    },
  };
};
