import { ModalFormData } from '@minecraft/server-ui';
import { StatelessFormComponent } from '../types';

const Divider = (): StatelessFormComponent => ({
  type: 'divider',
  render(form: ModalFormData) {
    form.divider();
  },
});

export default Divider;
