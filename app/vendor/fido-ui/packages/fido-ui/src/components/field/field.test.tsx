import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { Field } from './field';
import { Input } from '../input/input';

describe('Field', () => {
  it('renders a label and the input child', () => {
    render(
      <Field label="Email">
        <Input placeholder="Enter text" />
      </Field>,
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders optional indicator', () => {
    render(
      <Field label="Name" optional>
        <Input />
      </Field>,
    );
    expect(screen.getByText('(Optional)')).toBeInTheDocument();
  });

  it('renders both description and error when both are set', () => {
    render(
      <Field label="Email" description="Helper text" error="This field is required">
        <Input />
      </Field>,
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('applies error state classes to the control box', () => {
    const { container } = render(
      <Field label="Email" error="Required">
        <Input />
      </Field>,
    );
    const box = container.querySelector('input')?.closest('[class*="border-fido-ui-destruct"]');
    expect(box?.className).toContain('border-fido-ui-destruct-600');
  });

  it('centers the error icon with its message', () => {
    render(
      <Field label="Email" error="Required">
        <Input />
      </Field>,
    );
    const alert = screen.getByRole('alert');
    const iconWrapper = alert.querySelector('span');
    expect(alert.className).toContain('items-center');
    expect(iconWrapper?.className).toContain('justify-center');
    expect(iconWrapper?.className).not.toContain('pt-fido-ui-2xs');
  });

  it('applies success state classes to the control box', () => {
    const { container } = render(
      <Field label="Email" state="success">
        <Input />
      </Field>,
    );
    const box = container.querySelector('input')?.closest('[class*="border-fido-ui-success"]');
    expect(box?.className).toContain('border-fido-ui-success-600');
  });

  it('renders ordered adornment slots independently', () => {
    const Leading = (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="leading" {...props} />
    );
    const Trailing = (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="trailing" {...props} />
    );
    const Control = (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="control" {...props} />
    );
    const { container } = render(
      <Field
        label="Email"
        leftIcon={Leading}
        fileAction={<button type="button">Choose file</button>}
        prefix="https://"
        trailingIcon={Trailing}
        suffix="USD"
        controlIcon={Control}
        action={<button type="button">Go</button>}
      >
        <Input />
      </Field>,
    );
    expect(screen.getByTestId('leading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Choose file' })).toBeInTheDocument();
    expect(screen.getByText('https://')).toBeInTheDocument();
    expect(screen.getByTestId('trailing')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByTestId('control')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();

    const controlBox = container.querySelector('input')?.closest('[class*="border-fido-ui-neutral"]');
    const action = screen.getByRole('button', { name: 'Go' });
    expect(controlBox?.contains(action)).toBe(false);
  });

  it('renders a list of validation errors', () => {
    render(
      <Field
        label="Password"
        validations={['Must be at least eight characters.', 'Must match.']}
      >
        <Input />
      </Field>,
    );
    expect(screen.getByText('Must be at least eight characters.')).toBeInTheDocument();
    expect(screen.getByText('Must match.')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('keeps the label accessible but visually hidden when hideLabel is set', () => {
    const { container } = render(
      <Field label="Search" hideLabel>
        <Input />
      </Field>,
    );
    const labelEl = container.querySelector('label');
    expect(labelEl).toHaveTextContent('Search');
    expect(labelEl?.className).toContain('sr-only');
    expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('propagates disabled to the input child', () => {
    render(
      <Field label="Disabled" disabled>
        <Input />
      </Field>,
    );
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('accepts user input through the child', async () => {
    const user = userEvent.setup();
    render(
      <Field label="Field">
        <Input placeholder="Type here" />
      </Field>,
    );
    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('forwards the child input ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <Field label="Field">
        <Input ref={ref} />
      </Field>,
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('merges custom className on the field root', () => {
    const { container } = render(
      <Field label="Field" className="mt-4">
        <Input />
      </Field>,
    );
    expect(container.firstChild).toHaveClass('mt-4');
  });

  it('renders a stacked label above the field by default', () => {
    const { container } = render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    const label = container.querySelector('label');
    expect(label?.className).not.toContain('absolute');
    expect(label?.className).toContain('font-bold');
  });

  it('renders an internal label inside the field when labelPlacement is internal', () => {
    const { container } = render(
      <Field label="Email" labelPlacement="internal">
        <Input />
      </Field>,
    );
    const label = container.querySelector('label');
    expect(label?.className).toContain('text-fido-ui-p4');
    expect(container.querySelector('input')?.previousElementSibling).toBe(label);
  });

  it('matches the internal Field spacing and keeps the placeholder neutral', () => {
    render(
      <Field label="Email" labelPlacement="internal">
        <Input placeholder="Placeholder" />
      </Field>,
    );
    const input = screen.getByPlaceholderText('Placeholder');
    const content = input.parentElement;
    const box = content?.parentElement;

    expect(box).toHaveClass('gap-fido-ui-sm', 'px-fido-ui-md');
    expect(content).toHaveClass('gap-fido-ui-2xs');
    expect(input).toHaveClass(
      'placeholder:text-fido-ui-neutral-500',
      'not-placeholder-shown:text-fido-ui-primary-700',
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Field label="Email">
        <Input />
      </Field>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with an internal label', async () => {
    const { container } = render(
      <Field label="Email" labelPlacement="internal" description="Helper Text">
        <Input />
      </Field>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
