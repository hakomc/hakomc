# Form API (`hakomc/form/component`)

[English](#english) | [日本語](#日本語)

`import { ... } from 'hakomc/form/component';`

## English

### `ActionForm`

```tsx
import { ActionForm, Button } from 'hakomc/form/component';
import { debug } from 'hakomc';

player.sendForm(
  <ActionForm title="Menu" body="Pick one">
    <Button iconPath="textures/ui/icon1" onClick={(p) => debug('option 1')}>Option 1</Button>
    <Button onClick={(p) => debug('option 2')}>Option 2</Button>
  </ActionForm>
);
```

Clicking an entry fires that `Button`'s own `onClick`. `previousForm?: SendableForm` is sent on cancel (ESC/×).

### `ModalForm`

```tsx
import { ModalForm, Header, Textfield, Divider, Slider, Dropdown, Toggle } from 'hakomc/form/component';
import { debug } from 'hakomc';

player.sendForm(
  <ModalForm title="Settings" submitButtonText="Save" onSubmit={(player, values) => debug(values)}>
    <Header text="Profile" />
    <Textfield label="Name" defaultValue="Steve" />
    <Divider />
    <Slider label="Volume" min={0} max={100} defaultValue={50} />
    <Dropdown label="Mode" options={['A', 'B']} />
    <Toggle label="Notifications" defaultValue={true} />
  </ModalForm>
);
```

Values only arrive via `onSubmit`'s `values` array, indexed by `children` order — the fields have no individual callback of their own. Same `previousForm`-on-cancel behavior as `ActionForm`.

### `MessageForm`

```tsx
import { MessageForm } from 'hakomc/form/component';
import { debug } from 'hakomc';

player.sendForm(
  <MessageForm
    title="Confirm"
    yesLabel="Yes"
    noLabel="No"
    onClickYes={(player) => debug('yes')}
    onClickNo={(player) => debug('no')}
  >
    Are you sure?
  </MessageForm>
);
```

Same `previousForm`-on-cancel behavior as `ActionForm`.

---

## 日本語

### `ActionForm`

```tsx
import { ActionForm, Button } from 'hakomc/form/component';
import { debug } from 'hakomc';

player.sendForm(
  <ActionForm title="メニュー" body="選んでください">
    <Button iconPath="textures/ui/icon1" onClick={(p) => debug('選択肢1')}>選択肢1</Button>
    <Button onClick={(p) => debug('選択肢2')}>選択肢2</Button>
  </ActionForm>
);
```

選択された`Button`自身の`onClick`が呼ばれる。`previousForm?: SendableForm`はキャンセル(ESC/×)時に送信される。

### `ModalForm`

```tsx
import { ModalForm, Header, Textfield, Divider, Slider, Dropdown, Toggle } from 'hakomc/form/component';
import { debug } from 'hakomc';

player.sendForm(
  <ModalForm title="設定" submitButtonText="保存" onSubmit={(player, values) => debug(values)}>
    <Header text="プロフィール" />
    <Textfield label="名前" defaultValue="Steve" />
    <Divider />
    <Slider label="音量" min={0} max={100} defaultValue={50} />
    <Dropdown label="モード" options={['A', 'B']} />
    <Toggle label="通知" defaultValue={true} />
  </ModalForm>
);
```

値は`onSubmit`の`values`配列からのみ取得でき、`children`の並び順でインデックス対応する(各フィールド自体には個別のコールバックはない)。`previousForm`の挙動は`ActionForm`と同じ。

### `MessageForm`

```tsx
import { MessageForm } from 'hakomc/form/component';
import { debug } from 'hakomc';

player.sendForm(
  <MessageForm
    title="確認"
    yesLabel="はい"
    noLabel="いいえ"
    onClickYes={(player) => debug('yes')}
    onClickNo={(player) => debug('no')}
  >
    本当によろしいですか?
  </MessageForm>
);
```

`previousForm`の挙動は`ActionForm`と同じ。
