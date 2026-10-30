import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Bell } from 'lucide-react';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Alert } from './alert';

describe('Alert', () => {
  it('renders title and description', () => {
    render(<Alert title="Heads up" description="This is an alert message." />);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('This is an alert message.')).toBeInTheDocument();
  });

  it('renders ReactNode description content', () => {
    render(
      <Alert
        title="Heads up"
        description={<a href="/details">View details</a>}
      />,
    );
    expect(screen.getByRole('link', { name: 'View details' })).toBeInTheDocument();
  });

  it('has alert role', () => {
    render(<Alert title="Test" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('defaults to primary purpose styles', () => {
    render(<Alert title="Test" />);
    expect(screen.getByRole('alert').className).toContain('bg-fido-ui-primary-50');
  });

  it('renders all 6 purpose variants', () => {
    const purposes = ['primary', 'secondary', 'inform', 'warning', 'destruct', 'success'] as const;
    for (const purpose of purposes) {
      const { unmount } = render(<Alert purpose={purpose} title={purpose} />);
      expect(screen.getByText(purpose)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders default icon when none provided', () => {
    const { container } = render(<Alert title="Test" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<Alert icon={Bell} title="Test" />);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();
  });

  it('hides icon strip when showIcon is false', () => {
    const { container } = render(<Alert showIcon={false} title="Test" />);
    expect(container.querySelectorAll('svg')).toHaveLength(0);
  });

  it('renders spinner when showRemainingTimeSpinner is true', () => {
    const { container } = render(<Alert showRemainingTimeSpinner title="Test" />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<Alert className="mt-4" title="Test" />);
    expect(screen.getByRole('alert')).toHaveClass('mt-4');
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} title="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders close control when onClose is provided', () => {
    render(<Alert title="Test" onClose={() => {}} />);
    expect(screen.getByRole('button', { name: 'Close alert' })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert title="Test" onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Close alert' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not render close control when onClose is omitted', () => {
    render(<Alert title="Test" />);
    expect(screen.queryByRole('button', { name: 'Close alert' })).not.toBeInTheDocument();
  });

  it('renders custom actions via Alert.Actions', () => {
    render(
      <Alert title="Test" description="Description">
        <Alert.Actions>
          <button type="button">Take action</button>
        </Alert.Actions>
      </Alert>,
    );
    expect(screen.getByText('Take action')).toBeInTheDocument();
  });

  it('groups title and description into a text column', () => {
    const { container } = render(
      <Alert title="Heads up" description="Details">
        <Alert.Actions>
          <button type="button">Go</button>
        </Alert.Actions>
      </Alert>,
    );
    const title = screen.getByText('Heads up');
    const description = screen.getByText('Details');
    expect(title.parentElement).toBe(description.parentElement);
    expect(title.parentElement?.className).toContain('flex-col');
    expect(container.querySelector('[role="alert"]')).toBeTruthy();
  });

  it('throws when Alert.Actions is used outside Alert', () => {
    expect(() =>
      render(
        <Alert.Actions>
          <button type="button">Orphan</button>
        </Alert.Actions>,
      ),
    ).toThrow('Alert.Actions must be used within an Alert');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Alert description="Test alert message" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with composed configuration', async () => {
    const { container } = render(
      <Alert
        title="Alert heading message"
        description="Description"
        onClose={() => {}}
      >
        <Alert.Actions>
          <button type="button">Confirm</button>
          <button type="button">Dismiss</button>
        </Alert.Actions>
      </Alert>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
