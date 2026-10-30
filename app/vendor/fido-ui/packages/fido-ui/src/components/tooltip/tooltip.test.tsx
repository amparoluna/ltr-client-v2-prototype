import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
  it('renders the trigger element', () => {
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    // Tooltip content should appear
    expect(await screen.findByText('Help text')).toBeInTheDocument();
  });

  it('renders with custom side', () => {
    render(
      <Tooltip content="Bottom tip" side="bottom">
        <button>Button</button>
      </Tooltip>,
    );
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('applies Figma-aligned popup token classes when open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    const popup = await screen.findByText('Help text');
    expect(popup.className).toContain('bg-fido-ui-neutral-black');
    expect(popup.className).toContain('rounded-fido-ui-sm');
    expect(popup.className).toContain('text-fido-ui-p4');
    expect(popup.className).toContain('px-fido-ui-lg');
    expect(popup.className).toContain('py-fido-ui-sm');
  });

  it('renders a visible arrow caret when open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    const popup = await screen.findByText('Help text');
    const arrow = popup.querySelector('[class*="before:bg-fido-ui-neutral-black"]');
    expect(arrow).toBeTruthy();
    expect(arrow?.getAttribute('aria-hidden')).toBe('true');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
