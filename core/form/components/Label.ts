import { ModalFormData } from '@minecraft/server-ui';
import { StatelessFormComponent } from '../types';

interface LabelProps {
  text: string;
}

const Label = ({ text }: LabelProps): StatelessFormComponent => {
  return {
    type: 'label',
    opts: { text },
    render(form: ModalFormData) {
      form.label(text);
    },
  };
};

export default Label;
