import { Player } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';
import { ActionButton } from '../types';

interface ActionButtonProps {
  iconPath?: string,
  children?: string | string[],
  onClick?: (player: Player) => any,
};

export default function Button({
  iconPath = '',
  children = [],
  onClick = () => {},
}: ActionButtonProps): ActionButton {
  const text = typeof children === 'object' ? children.join('\n') : children;

  return {
    render(form: ActionFormData) {
      if (iconPath) {
        form.button(text, iconPath);
      } else {
        form.button(text);
      }
    },
    handle(player: Player) {
      onClick(player);
    },
  };
};
