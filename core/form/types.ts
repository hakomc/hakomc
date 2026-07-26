import { Player } from '@minecraft/server';
import { ActionFormData, ModalFormData } from '@minecraft/server-ui';

export interface SendableForm {
  send(player: Player): Promise<void>;
}

export interface FormComponent<T = any> {
  type: string;
  opts: object;
  render(form: ModalFormData): void;
  handle?(player: Player, value: T): void;
}

export interface StatelessFormComponent {
  type: string;
  opts?: object;
  render(form: ModalFormData): void;
}

export interface ActionButton {
  render(form: ActionFormData): void;
  handle(player: Player): void;
}

export interface MessageButton {
  text: string;
  handler(player: Player): void;
}
