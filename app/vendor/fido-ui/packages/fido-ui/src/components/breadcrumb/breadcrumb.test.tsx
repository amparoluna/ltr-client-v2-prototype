import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { LayoutGrid } from 'lucide-react';
import { axe } from 'vitest-axe';
import { Breadcrumb, BreadcrumbLink, BreadcrumbPage, BreadcrumbEllipsis } from './breadcrumb';

describe('Breadcrumb', () => {
  it('renders breadcrumb items with separators', () => {
    render(
      <Breadcrumb>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
        <BreadcrumbPage>Current</BreadcrumbPage>
      </Breadcrumb>,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    // Default separator is a chevron SVG (2 separators for 3 items)
    const nav = screen.getByRole('navigation');
    expect(nav.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
  });

  it('renders with custom separator', () => {
    render(
      <Breadcrumb separator=">">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbPage>Current</BreadcrumbPage>
      </Breadcrumb>,
    );
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('has aria-label on nav', () => {
    render(
      <Breadcrumb>
        <BreadcrumbPage>Home</BreadcrumbPage>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('marks current page with aria-current', () => {
    render(
      <Breadcrumb>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbPage>Current</BreadcrumbPage>
      </Breadcrumb>,
    );
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('renders ellipsis for collapsed items', () => {
    const onClick = vi.fn();
    render(
      <Breadcrumb>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbEllipsis onClick={onClick} />
        <BreadcrumbPage>Current</BreadcrumbPage>
      </Breadcrumb>,
    );
    expect(screen.getByRole('button', { name: 'Show collapsed breadcrumb items' })).toBeInTheDocument();
    expect(screen.getByText('…')).toBeInTheDocument();
  });

  it('renders optional icon on current page', () => {
    render(
      <Breadcrumb>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbPage icon={LayoutGrid}>Current</BreadcrumbPage>
      </Breadcrumb>,
    );
    expect(screen.getByText('Current').querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
  });

  it('renders optional icon on link', () => {
    render(
      <Breadcrumb>
        <BreadcrumbLink href="/" aria-label="Home" icon={LayoutGrid} />
      </Breadcrumb>,
    );
    expect(screen.getByRole('link', { name: 'Home' }).querySelector('svg')).toBeInTheDocument();
  });

  it('renders links as anchors', () => {
    render(
      <Breadcrumb>
        <BreadcrumbLink href="/test">Link</BreadcrumbLink>
      </Breadcrumb>,
    );
    const link = screen.getByText('Link');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbPage>Current</BreadcrumbPage>
      </Breadcrumb>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
