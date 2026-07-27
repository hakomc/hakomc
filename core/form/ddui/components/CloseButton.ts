import { CustomFormComponent } from '../types';

/**
 * CustomFormに閉じるボタンを追加するコンポーネント(通常フォームに相当なし)
 */
export default function CloseButton(): CustomFormComponent {
  return {
    type: 'close_button',
    render(form) {
      form.closeButton();
    },
  };
};
