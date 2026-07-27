import type { ObservableBoolean, SpacingOptions } from '@minecraft/server-ui';
import { CustomFormComponent } from '../types';

interface SpacerProps {
  visible?: boolean | ObservableBoolean;
};

/**
 * CustomFormで余白を挿入するコンポーネント(通常フォームに相当なし)
 */
export default function Spacer({ visible }: SpacerProps = {}): CustomFormComponent {
  const options: SpacingOptions = { visible };

  return {
    type: 'spacer',
    opts: options,
    render(form) {
      form.spacer(options);
    },
  };
};
