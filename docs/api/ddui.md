# DDUI API (`hakomc/form/ddui/component`)

[English](#english) | [日本語](#日本語)

`import { ... } from 'hakomc/form/ddui/component';`

## English

### `CustomForm`

```tsx
import {
  CustomForm, Header, Label, Divider, Spacer, CloseButton,
  Toggle, Dropdown, Slider, Textfield, Button,
} from 'hakomc/form/ddui/component';
import { ObservableBoolean, ObservableNumber, ObservableString } from '@minecraft/server-ui';
import { debug } from 'hakomc';

const writable = { clientWritable: true };
const notify = new ObservableBoolean(true, writable);
const volume = new ObservableNumber(50, writable);
const name = new ObservableString('Steve', writable);
const mode = new ObservableNumber(0, writable);

player.sendForm(
  <CustomForm title="Settings" onClose={(p, reason) => debug(reason)}>
    <Header text="Profile" />
    <Textfield label="Name" text={name} />
    <Divider />
    <Toggle label="Notifications" toggled={notify} />
    <Slider label="Volume" value={volume} min={0} max={100} />
    <Dropdown label="Mode" value={mode} items={[{ label: 'A', value: 0 }, { label: 'B', value: 1 }]} />
    <Spacer />
    <Label text="Changes apply immediately." />
    <Button onClick={() => debug(notify.getData())}>Apply</Button>
    <CloseButton />
  </CustomForm>
);
```

`previousForm?: SendableForm` is sent only on `ClientClosed`. Pass `{ clientWritable: true }` when constructing an `Observable*` if the player should be able to edit it (`Toggle`/`Slider`/`Textfield`/`Dropdown`) — without it the field renders but player input isn't written back.

### `MessageBox`

```tsx
import { MessageBox } from 'hakomc/form/ddui/component';
import { debug } from 'hakomc';

player.sendForm(
  <MessageBox
    title="Confirm"
    button1Label="Yes"
    button2Label="No"
    onSelect={(player, selection) => debug(selection)}
  >
    Are you sure?
  </MessageBox>
);
```

Omit `button2Label` for a single-button dialog. Same `previousForm`-on-`ClientClosed` behavior as `CustomForm`.

---

## 日本語

### `CustomForm`

```tsx
import {
  CustomForm, Header, Label, Divider, Spacer, CloseButton,
  Toggle, Dropdown, Slider, Textfield, Button,
} from 'hakomc/form/ddui/component';
import { ObservableBoolean, ObservableNumber, ObservableString } from '@minecraft/server-ui';
import { debug } from 'hakomc';

const writable = { clientWritable: true };
const notify = new ObservableBoolean(true, writable);
const volume = new ObservableNumber(50, writable);
const name = new ObservableString('Steve', writable);
const mode = new ObservableNumber(0, writable);

player.sendForm(
  <CustomForm title="設定" onClose={(p, reason) => debug(reason)}>
    <Header text="プロフィール" />
    <Textfield label="名前" text={name} />
    <Divider />
    <Toggle label="通知" toggled={notify} />
    <Slider label="音量" value={volume} min={0} max={100} />
    <Dropdown label="モード" value={mode} items={[{ label: 'A', value: 0 }, { label: 'B', value: 1 }]} />
    <Spacer />
    <Label text="変更は即座に反映されます。" />
    <Button onClick={() => debug(notify.getData())}>適用</Button>
    <CloseButton />
  </CustomForm>
);
```

`previousForm?: SendableForm`は`ClientClosed`時のみ送信される。　

### `MessageBox`

```tsx
import { MessageBox } from 'hakomc/form/ddui/component';
import { debug } from 'hakomc';

player.sendForm(
  <MessageBox
    title="確認"
    button1Label="はい"
    button2Label="いいえ"
    onSelect={(player, selection) => debug(selection)}
  >
    本当によろしいですか?
  </MessageBox>
);
```

`button2Label`省略で1ボタンのダイアログになる。`previousForm`の挙動は`CustomForm`と同じく`ClientClosed`時のみ。
