import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, LayoutGrid } from 'lucide-react';
import { Breadcrumb, BreadcrumbLink, BreadcrumbPage, BreadcrumbEllipsis } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['ltr'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
      <BreadcrumbLink href="/providers">Providers</BreadcrumbLink>
      <BreadcrumbLink href="/providers/profiles">Profiles</BreadcrumbLink>
      <BreadcrumbPage>Dwight Schrute</BreadcrumbPage>
    </Breadcrumb>
  ),
};

export const TwoItems: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
      <BreadcrumbPage>Dashboard</BreadcrumbPage>
    </Breadcrumb>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbLink href="/" aria-label="Home" icon={Home} />
      <BreadcrumbLink href="/products/widgets">Performance</BreadcrumbLink>
      <BreadcrumbPage icon={LayoutGrid}>Dashboard</BreadcrumbPage>
    </Breadcrumb>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbLink href="/" aria-label="Home" icon={Home} />
      <BreadcrumbEllipsis />
      <BreadcrumbPage icon={LayoutGrid}>Settings</BreadcrumbPage>
    </Breadcrumb>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
      <BreadcrumbLink href="/org">Organization</BreadcrumbLink>
      <BreadcrumbLink href="/org/team">Team</BreadcrumbLink>
      <BreadcrumbLink href="/org/team/projects">Projects</BreadcrumbLink>
      <BreadcrumbLink href="/org/team/projects/alpha">Alpha</BreadcrumbLink>
      <BreadcrumbPage>Settings</BreadcrumbPage>
    </Breadcrumb>
  ),
};
