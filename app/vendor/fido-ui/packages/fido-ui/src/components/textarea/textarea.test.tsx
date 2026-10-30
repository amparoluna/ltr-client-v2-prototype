import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
// Test files are excluded from tsconfig, so the global matcher augmentations
// from test/setup.ts aren't always picked up by the editor's TS program —
// import them here so jest-dom / axe matchers type-check in this file.
import '@testing-library/jest-dom/vitest';
import 'vitest-axe/extend-expect';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea label="Notes" placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('keeps the placeholder color unchanged when focused', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Notes" placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');

    await user.click(textarea);

    expect(textarea).toHaveFocus();
    expect(textarea.className).toContain('placeholder:text-fido-ui-neutral-500');
    expect(textarea.className).not.toContain('focus:placeholder:');
  });

  it('renders with a label', () => {
    render(<Textarea label="Description" />);
    const label = screen.getByText('Description');
    expect(label).toBeInTheDocument();
    expect(label.className).toContain('text-fido-ui-p3');
  });

  it('renders the label inside the control for internal placement', () => {
    render(<Textarea label="Description" labelPlacement="internal" />);
    const label = screen.getByText('Description');
    const textarea = screen.getByRole('textbox');
    expect(label.parentElement).toBe(textarea.parentElement);
    expect(label.className).toContain('text-fido-ui-p4');
  });

  it('keeps a hidden label accessible', () => {
    const { container } = render(<Textarea label="Description" hideLabel />);
    expect(container.querySelector('label')?.className).toContain('sr-only');
    expect(screen.getByRole('textbox', { name: 'Description' })).toBeInTheDocument();
  });

  it('associates the label with the textarea control', () => {
    render(<Textarea label="Description" />);
    // getByLabelText resolves the control via its associated <label>, proving
    // the Base UI Field.Label is wired to the textarea (not just visible text).
    expect(screen.getByLabelText('Description').tagName).toBe('TEXTAREA');
  });

  it('renders optional indicator', () => {
    render(<Textarea label="Bio" optional />);
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('uses the filled visual state for a non-empty value', () => {
    const { container } = render(<Textarea label="Bio" defaultValue="About me" />);
    const wrapper = container.querySelector('textarea')?.parentElement;
    expect(wrapper?.className).toContain('border-fido-ui-primary-500');
  });

  it('uses the same neutral focus ring as Input', () => {
    const { container } = render(<Textarea label="Bio" />);
    const wrapper = container.querySelector('textarea')?.parentElement;
    expect(wrapper?.className).toContain('focus-within:border-fido-ui-primary-600');
    expect(wrapper?.className).toContain(
      'focus-within:shadow-[0_0_0_3px_rgba(212,212,212,0.8)]',
    );
  });

  it('shows character count with maxLength', () => {
    render(<Textarea label="Bio" maxLength={300} />);
    expect(screen.getByText('0/300')).toBeInTheDocument();
  });

  it('updates character count on typing', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Bio" maxLength={300} placeholder="Type" />);
    await user.type(screen.getByPlaceholderText('Type'), 'hello');
    expect(screen.getByText('5/300')).toBeInTheDocument();
  });

  it('grows to twice its initial height and then scrolls', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Bio" placeholder="Type" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const wrapper = textarea.parentElement as HTMLElement;

    Object.defineProperty(textarea, 'clientHeight', { configurable: true, value: 48 });
    Object.defineProperty(wrapper, 'clientHeight', {
      configurable: true,
      value: 70,
    });
    Object.defineProperty(textarea, 'scrollHeight', { configurable: true, value: 120 });

    await user.type(textarea, 'Long content');

    expect(textarea.style.height).toBe('118px');
    expect(textarea.style.overflowY).toBe('auto');
  });

  it('renders error message', () => {
    render(<Textarea label="Bio" error="Too short" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Too short');
    // ErrorIcon is an outlined circle+X path asset (not a filled <circle>).
    expect(alert.querySelector('svg path')).toBeInTheDocument();
    expect(alert.querySelector('span')?.className).toContain('justify-center');
  });

  it('hides description when error is shown', () => {
    render(<Textarea label="Bio" description="Help text" error="Error text" />);
    expect(screen.getByText('Error text')).toBeInTheDocument();
    expect(screen.queryByText('Help text')).not.toBeInTheDocument();
  });

  it('applies error state classes', () => {
    const { container } = render(<Textarea label="Bio" error="Required" />);
    const wrapper = container.querySelector('textarea')?.parentElement;
    expect(wrapper?.className).toContain('border-fido-ui-destruct-600');
  });

  it('applies disabled state', () => {
    const { container } = render(<Textarea label="Bio" disabled />);
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea?.parentElement?.className).toContain('bg-fido-ui-neutral-50');
  });

  it('focuses the textarea when the bordered wrapper is clicked', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Bio" maxLength={10} />);
    // The char counter is a non-interactive part of the wrapper; clicking it
    // should redirect focus to the textarea.
    await user.click(screen.getByText('0/10'));
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('forwards ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea label="Bio" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('passes name to the textarea element', () => {
    render(<Textarea label="Bio" name="bio" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'bio');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Textarea label="Description" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
