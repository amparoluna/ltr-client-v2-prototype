import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion';

const renderAccordion = (props: Partial<React.ComponentProps<typeof Accordion>> = {}) =>
  render(
    <Accordion type="single" {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content 3</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );

describe('Accordion', () => {
  it('renders all items', () => {
    renderAccordion();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('toggles content on trigger click', async () => {
    const user = userEvent.setup();
    renderAccordion();

    // Click to open
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();

    // Click again to close
    await user.click(screen.getByText('Section 1'));
    // Content should be hidden (panel closed)
    const content1 = screen.queryByText('Content 1');
    // In Base UI, closed panels are removed or hidden
    if (content1) {
      expect(content1).not.toBeVisible();
    }
  });

  it('single mode allows only one item open at a time', async () => {
    const user = userEvent.setup();
    renderAccordion({ type: 'single' });

    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeVisible();

    // Open another item; first should close
    await user.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content 2')).toBeVisible();

    const content1 = screen.queryByText('Content 1');
    if (content1) {
      expect(content1).not.toBeVisible();
    }
  });

  it('multiple mode allows multiple items open', async () => {
    const user = userEvent.setup();
    renderAccordion({ type: 'multiple' });

    await user.click(screen.getByText('Section 1'));
    await user.click(screen.getByText('Section 2'));

    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('does not toggle a disabled item', async () => {
    const user = userEvent.setup();
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Disabled</AccordionTrigger>
          <AccordionContent>Hidden content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    await user.click(screen.getByText('Disabled'));
    const content = screen.queryByText('Hidden content');
    if (content) {
      expect(content).not.toBeVisible();
    }
  });

  it('forwards className to root', () => {
    const { container } = renderAccordion({ className: 'custom-class' });
    // The root div should have both the variant class and the custom class
    expect(container.firstElementChild).toHaveClass('custom-class');
  });

  it('rotates chevron when an item is open', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole('button', { name: /section 1/i });
    expect(trigger).toHaveAttribute('data-panel-open');
    const icon = trigger.querySelector('[aria-hidden="true"]');
    expect(icon?.className).toContain('group-data-[panel-open]:rotate-180');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
