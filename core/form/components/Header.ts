import { ModalFormData } from '@minecraft/server-ui';
import { StatelessFormComponent } from '../types';

interface HeaderProps {
  text: string;
}

/**
 * ModalFormでヘッダーを表示するコンポーネント
 */
const Header = ({ text }: HeaderProps): StatelessFormComponent => {
  return {
    type: 'header',
    opts: { text },
    render(form: ModalFormData) {
      form.header(text);
    },
  };
};

export default Header;
