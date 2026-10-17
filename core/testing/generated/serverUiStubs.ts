// このファイルは scripts/gen-testing-stubs.mjs が生成する。手で編集しないこと。
// 生成元: @minecraft/server-ui 2.1.0
import { notImplemented } from '../runtime';

export const STUB_SOURCE_VERSION = '2.1.0';

export const DataDrivenScreenClosedReason = Object.freeze({
  ClientClosed: 'ClientClosed',
  ServerClosed: 'ServerClosed',
  UserBusy: 'UserBusy',
} as const);
export const FormCancelationReason = Object.freeze({
  UserBusy: 'UserBusy',
  UserClosed: 'UserClosed',
} as const);
export const FormRejectReason = Object.freeze({
  MalformedResponse: 'MalformedResponse',
  PlayerQuit: 'PlayerQuit',
  ServerShutdown: 'ServerShutdown',
} as const);
export const FormVisibilityErrorReason = Object.freeze({
  AlreadyShowing: 'AlreadyShowing',
  NotShowing: 'NotShowing',
} as const);
export const TextFilteringError = Object.freeze({
  DisabledByPlayer: 'DisabledByPlayer',
  TextProcessorServiceUnreachable: 'TextProcessorServiceUnreachable',
  Unknown: 'Unknown',
} as const);

/** 模擬環境で未実装のクラス。参照（instanceof や static 参照）はできるが、生成すると分かりやすいエラーを投げる。 */
const stubClass = (name: string) => class {
  constructor() {
    notImplemented(`@minecraft/server-ui の ${name}`);
  }
};
export const ActionFormData = stubClass('ActionFormData');
export const ActionFormResponse = stubClass('ActionFormResponse');
export const CustomForm = stubClass('CustomForm');
export const FormResponse = stubClass('FormResponse');
export const MessageBox = stubClass('MessageBox');
export const MessageFormData = stubClass('MessageFormData');
export const MessageFormResponse = stubClass('MessageFormResponse');
export const ModalFormData = stubClass('ModalFormData');
export const ModalFormResponse = stubClass('ModalFormResponse');
export const ObservableBoolean = stubClass('ObservableBoolean');
export const ObservableNumber = stubClass('ObservableNumber');
export const ObservableString = stubClass('ObservableString');
export const ObservableUIRawMessage = stubClass('ObservableUIRawMessage');
export const UIManager = stubClass('UIManager');
export const FormRejectError = stubClass('FormRejectError');
export const FormVisibilityError = stubClass('FormVisibilityError');
export const InvalidFormError = stubClass('InvalidFormError');
export const InvalidFormModificationError = stubClass('InvalidFormModificationError');
export const InvalidObservableError = stubClass('InvalidObservableError');
export const PlayerLeftError = stubClass('PlayerLeftError');

/** 模擬環境で未実装のオブジェクト。メンバーに触れると分かりやすいエラーを投げる。 */
const stubObject = (name: string): any => new Proxy({}, {
  get: (_t, key) => (typeof key === 'symbol' || key === 'then' ? undefined : notImplemented(`@minecraft/server-ui の ${name}.${String(key)}`)),
});
export const uiManager = stubObject('uiManager');
