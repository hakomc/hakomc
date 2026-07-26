import { beforeEach, describe, expect, it, vi } from 'vitest';

const { instance, DataDrivenScreenClosedReason } = vi.hoisted(() => {
  const instance = {
    button: vi.fn().mockReturnThis(),
    toggle: vi.fn().mockReturnThis(),
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
  CustomForm: vi.fn(() => instance),
  DataDrivenScreenClosedReason,
}));

import CustomForm from '@/form/ddui/components/CustomForm';

describe('DDUI CustomForm', () => {
  beforeEach(() => {
    instance.show.mockReset();
  });

  it('renders children with (form, player) and shows the form', async () => {
    instance.show.mockResolvedValue(DataDrivenScreenClosedReason.ServerClosed);
    const player = {} as any;
    const childRender = vi.fn();
    const sendable = CustomForm({
      title: 'test',
      children: [{ type: 'x', render: childRender }],
    });

    await sendable.send(player);

    expect(childRender).toHaveBeenCalledWith(instance, player);
  });

  it('navigates to previousForm when closed by the client (ClientClosed)', async () => {
    instance.show.mockResolvedValue(DataDrivenScreenClosedReason.ClientClosed);
    const previousForm = { send: vi.fn() };
    const player = {} as any;
    const sendable = CustomForm({ title: 'test', previousForm });

    await sendable.send(player);

    expect(previousForm.send).toHaveBeenCalledWith(player);
  });

  it.each([
    DataDrivenScreenClosedReason.ServerClosed,
    DataDrivenScreenClosedReason.UserBusy,
  ])('does not navigate to previousForm for %s, and calls onClose instead', async (reason) => {
    instance.show.mockResolvedValue(reason);
    const previousForm = { send: vi.fn() };
    const onClose = vi.fn();
    const player = {} as any;
    const sendable = CustomForm({ title: 'test', previousForm, onClose });

    await sendable.send(player);

    expect(previousForm.send).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledWith(player, reason);
  });
});
