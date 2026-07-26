import type { DividerOptions, ObservableBoolean } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

interface DividerProps {
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormで区切り線を表示するコンポーネント
 */
export default function Divider({ visible }: DividerProps = {}): CustomFormComponent {
  const options: DividerOptions = { visible };

  return {
    type: 'divider',
    opts: options,
    render(form) {
      form.divider(options);
    },
  };
};
