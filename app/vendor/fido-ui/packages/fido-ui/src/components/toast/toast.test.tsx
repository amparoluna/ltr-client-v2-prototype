import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { Button } from '../button';
import { Toast } from './toast';

describe('Toast', () => {
  it('renders the loading state with its default message and spinner', () => {
    render(<Toast />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders detailed status content, an indicator, and an action', () => {
    render(
      <Toast
        type="info"
        title="Payment method added"
        description="You're all set for future charges."
        iconType="success"
        iconSize="md"
        action={<Button>Undo</Button>}
      />,
    );

    expect(screen.getByText('Payment method added')).toBeInTheDocument();
    expect(screen.getByText("You're all set for future charges.")).toBeInTheDocument();
    expect(document.querySelector('svg')).toHaveClass('size-full');
    expect(document.querySelector('svg')?.parentElement).toHaveClass(
      'size-fido-ui-md',
      'text-fido-ui-success-600',
    );
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });

  it.each([
    ['success', 'text-fido-ui-success-600'],
    ['error', 'text-fido-ui-destruct-600'],
    ['warning', 'text-fido-ui-warning-500'],
    ['info', 'text-fido-ui-primary-700'],
  ] as const)('renders the %s icon from FidoUI icons', (iconType, colorClass) => {
    const { container } = render(<Toast type="info" title="Status" iconType={iconType} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('svg')?.parentElement).toHaveClass(colorClass);
  });

  it('renders an icon-colored SVG halo around semantic icons only', () => {
    const { container, rerender } = render(
      <Toast type="info" title="Status" iconType="success" />,
    );
    const halo = container.querySelector('[data-toast-icon-halo]');

    expect(halo).toBeInTheDocument();
    expect(halo?.querySelectorAll('circle')).toHaveLength(3);
    expect(halo?.querySelector('circle')).toHaveAttribute('stroke', 'currentColor');
    expect(halo?.nextElementSibling).toHaveClass('size-[calc(50%+2px)]');

    rerender(<Toast type="loading" />);
    expect(container.querySelector('[data-toast-icon-halo]')).not.toBeInTheDocument();
  });

  it('applies iconSize consistently to semantic icons and loading spinners', () => {
    const { container, rerender } = render(
      <Toast type="info" title="Status" iconType="info" iconSize="sm" />,
    );

    expect(container.querySelector('svg')?.parentElement).toHaveClass('size-4');

    rerender(<Toast type="loading" iconSize="sm" />);
    expect(screen.getByLabelText('Loading')).toHaveClass('size-4');
    expect(screen.getByLabelText('Loading').parentElement).toHaveClass('size-4');
  });

  it('centers the loading spinner within its icon wrapper', () => {
    render(<Toast type="loading" />);

    expect(screen.getByLabelText('Loading').parentElement).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
    );
  });

  it('uses the dark color variant', () => {
    render(<Toast color="black" title="Loading..." />);

    expect(screen.getByRole('status')).toHaveClass('bg-fido-ui-neutral-black');
  });

  it('renders a dismiss control only when a handler is provided', () => {
    const { rerender } = render(<Toast />);
    expect(screen.queryByRole('button', { name: 'Dismiss notification' })).not.toBeInTheDocument();

    rerender(<Toast onClose={() => {}} />);
    expect(screen.getByRole('button', { name: 'Dismiss notification' })).toBeInTheDocument();
  });

  it('calls onClose when the dismiss control is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast onClose={onClose} closeLabel="Close toast" />);

    await user.click(screen.getByRole('button', { name: 'Close toast' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('forwards its ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Toast ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Toast
        type="info"
        title="Payment method added"
        description="You're all set for future charges."
        action={<Button>Undo</Button>}
        onClose={() => {}}
      />,
    );
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
