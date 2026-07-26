import { beforeEach, describe, expect, it, vi } from 'vitest';

const { instance, DataDrivenScreenClosedReason } = vi.hoisted(() => {
  const instance = {
    body: vi.fn().mockReturnThis(),
    button1: vi.fn().mockReturnThis(),
    button2: vi.fn().mockReturnThis(),
    show: vi.fn(),
  };
  return {
    instance,
    DataDrivenScreenClosedReason: {
      ClientClosed: 'ClientClosed',
      ServerClosed: 'ServerClosed',
      UserBusy: 'UserBusy',
    },
  };
});

vi.mock('@minecraft/server-ui', () => ({
  MessageBox: vi.fn(() => instance),
  DataDrivenScreenClosedReason,
}));

import MessageBox from '@/form/ddui/components/MessageBox';

describe('DDUI MessageBox', () => {
  beforeEach(() => {
    instance.show.mockReset();
    instance.button2.mockClear();
  });

  it('sets body/button1/button2 and calls onSelect with the chosen selection', async () => {
    instance.show.mockResolvedValue({ closeReason: DataDrivenScreenClosedReason.ServerClosed, selection: 1 });
    const onSelect = vi.fn();
    const player = {} as any;
    const sendable = MessageBox({
      title: 'confirm',
      children: 'are you sure?',
      button1Label: 'yes',
      button2Label: 'no',
      onSelect,
    });

    await sendable.send(player);

    expect(instance.body).toHaveBeenCalledWith('are you sure?');
    expect(instance.button1).toHaveBeenCalledWith('yes', undefined);
    expect(instance.button2).toHaveBeenCalledWith('no', undefined);
    expect(onSelect).toHaveBeenCalledWith(player, 1);
  });

  it('does not call button2 when button2Label is omitted', async () => {
    instance.show.mockResolvedValue({ closeReason: DataDrivenScreenClosedReason.ServerClosed, selection: 0 });
    const sendable = MessageBox({ title: 'confirm', button1Label: 'ok' });

    await sendable.send({} as any);

    expect(instance.button2).not.toHaveBeenCalled();
  });

  it('navigates to previousForm when closed by the client (ClientClosed)', async () => {
    instance.show.mockResolvedValue({ closeReason: DataDrivenScreenClosedReason.ClientClosed });
    const previousForm = { send: vi.fn() };
    const player = {} as any;
    const sendable = MessageBox({ title: 'confirm', button1Label: 'ok', previousForm });

    await sendable.send(player);

    expect(previousForm.send).toHaveBeenCalledWith(player);
  });
});
