import { describe, expect, it, vi } from 'vitest';
import Button from '@/form/ddui/components/Button';

describe('DDUI Button', () => {
  it('joins array children and forwards a click handler bound to player', () => {
    const onClick = vi.fn();
    const player = { name: 'Steve' } as any;
    const component = Button({ children: ['line1', 'line2'], onClick });
    const form = { button: vi.fn() } as any;

    component.render(form, player);

    expect(form.button).toHaveBeenCalledWith(
      'line1\nline2',
      expect.any(Function),
      { tooltip: undefined, disabled: undefined, visible: undefined },
    );

    // registered onClick callback should be invoked with the bound player
    const registeredCallback = form.button.mock.calls[0][1];
    registeredCallback();
    expect(onClick).toHaveBeenCalledWith(player);
  });
});
