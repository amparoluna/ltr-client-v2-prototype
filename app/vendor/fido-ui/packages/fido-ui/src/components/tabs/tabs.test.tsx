import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Tabs, TabsList, Tab, TabPanel } from './tabs';
import { Plus, ChevronDown } from 'lucide-react';

const renderTabs = (style?: 'tabs' | 'elevated' | 'selector') => (
  <Tabs defaultValue="tab1" style={style}>
    <TabsList style={style}>
      <Tab value="tab1" style={style}>Tab 1</Tab>
      <Tab value="tab2" style={style}>Tab 2</Tab>
      <Tab value="tab3" style={style}>Tab 3</Tab>
    </TabsList>
    <TabPanel value="tab1">Content 1</TabPanel>
    <TabPanel value="tab2">Content 2</TabPanel>
    <TabPanel value="tab3">Content 3</TabPanel>
  </Tabs>
);

describe('Tabs', () => {
  it('renders tabs and panels', () => {
    render(renderTabs());
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('shows correct panel for default value', () => {
    render(renderTabs());
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('switches tab on click', async () => {
    const user = userEvent.setup();
    render(renderTabs());
    await user.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('provides the Figma focus treatment for each visual style', () => {
    render(renderTabs('elevated'));
    const elevatedTab = screen.getByText('Tab 2');
    expect(elevatedTab.className).toContain('focus-visible:border-fido-ui-primary-700');
    expect(elevatedTab.className).toContain('focus-visible:shadow-');
  });

  it('renders the underline treatment for the active Tabs style', () => {
    const { container } = render(renderTabs('tabs'));
    expect(container.querySelector('[role="tablist"]')).toBeInTheDocument();
    expect(screen.getByText('Tab 1')).toHaveAttribute('data-active');
    expect(screen.getByText('Tab 1').className).toContain('border-b-2 border-transparent');
  });

  it('renders tabs variant', () => {
    const { container } = render(renderTabs('tabs'));
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist?.className).toContain('border-fido-ui-neutral-200');
    expect(tablist?.className).toContain('w-fit');
  });

  it('renders elevated variant', () => {
    const { container } = render(renderTabs('elevated'));
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist?.className).toContain('bg-fido-ui-neutral-100');
  });

  it('renders selector variant', () => {
    render(renderTabs('selector'));
    const tab = screen.getByText('Tab 1');
    expect(tab.className).not.toContain('border-b-2');
    expect(tab.className).toContain('data-[active]:bg-fido-ui-primary-100');
  });

  it('supports disabled tab', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2" disabled>Tab 2</Tab>
        </TabsList>
        <TabPanel value="tab1">Content 1</TabPanel>
        <TabPanel value="tab2">Content 2</TabPanel>
      </Tabs>,
    );
    expect(screen.getByText('Tab 2')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders optional icon and number slots', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList><Tab value="tab1" leftIcon={Plus} rightIcon={ChevronDown} number={3}>Tab 1</Tab></TabsList>
        <TabPanel value="tab1">Content</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole('tab')).toHaveTextContent('Tab 13');
    expect(screen.getByRole('tab').querySelectorAll('svg')).toHaveLength(2);
  });

  it('merges custom className', () => {
    const { container } = render(
      <Tabs defaultValue="tab1" className="mt-4">
        <TabsList><Tab value="tab1">T</Tab></TabsList>
        <TabPanel value="tab1">C</TabPanel>
      </Tabs>,
    );
    expect(container.firstChild).toHaveClass('mt-4');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(renderTabs());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
