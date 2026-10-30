import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './dialog';

describe('Dialog', () => {
  it('renders trigger', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>My Dialog</DialogTitle>
          <DialogDescription>Description text</DialogDescription>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByText('Open'));
    expect(screen.getByText('My Dialog')).toBeVisible();
    expect(screen.getByText('Description text')).toBeVisible();
  });

  it('composes a custom trigger without nesting buttons', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dialog>
        <DialogTrigger render={<button data-testid="custom-trigger" />}>Open custom</DialogTrigger>
        <DialogContent>
          <DialogTitle>Composed Dialog</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(container.querySelectorAll('button')).toHaveLength(1);
    await user.click(screen.getByTestId('custom-trigger'));
    expect(screen.getByText('Composed Dialog')).toBeVisible();
  });

  it('renders in controlled open state', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Controlled</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText('Controlled')).toBeVisible();
  });

  it('calls onOpenChange when closed', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent showClose>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onOpenChange).toHaveBeenCalled();
  });

  it('renders without close button when showClose is false', () => {
    render(
      <Dialog open>
        <DialogContent showClose={false}>
          <DialogTitle>No Close</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('renders the Figma header, title icon, and action layout', () => {
    const LeadingIcon = ({ className }: { className?: string }) => (
      <svg className={className} data-testid="leading-icon" />
    );

    render(
      <Dialog open>
        <DialogContent closeLabel="Dismiss confirmation">
          <DialogHeader data-testid="header">
            <DialogTitle leftIcon={LeadingIcon}>Container Title</DialogTitle>
            <DialogDescription>Description</DialogDescription>
          </DialogHeader>
          <div>Content</div>
          <DialogFooter data-testid="footer">
            <button type="button">Cancel</button>
            <button type="button">Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByTestId('header')).toHaveClass('gap-fido-ui-xs');
    expect(screen.getByRole('heading', { name: 'Container Title' })).toHaveClass('text-fido-ui-h4');
    expect(screen.getByTestId('leading-icon')).toHaveClass('size-6');
    expect(screen.getByText('Description')).toHaveClass('text-fido-ui-p2');
    expect(screen.getByTestId('footer')).toHaveClass('gap-fido-ui-lg');
    expect(screen.getByRole('button', { name: 'Dismiss confirmation' })).toBeVisible();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
