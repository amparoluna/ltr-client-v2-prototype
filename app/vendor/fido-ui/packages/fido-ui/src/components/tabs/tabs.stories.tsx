import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, ChevronDown } from 'lucide-react';
import { Tabs, TabsList, Tab, TabPanel } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    style: {
      control: 'select',
      options: ['tabs', 'elevated', 'selector'],
      description: 'Figma visual style: Tabs, Elevated, or Selector.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const TabsDemo = ({ style }: { style?: 'tabs' | 'elevated' | 'selector' }) => (
  <Tabs defaultValue="tab1" style={style}>
    <TabsList style={style}>
      <Tab value="tab1" style={style}>Account</Tab>
      <Tab value="tab2" style={style}>Settings</Tab>
      <Tab value="tab3" style={style}>Billing</Tab>
    </TabsList>
    <TabPanel value="tab1"><p className="p-4">Account settings content</p></TabPanel>
    <TabPanel value="tab2"><p className="p-4">Settings content</p></TabPanel>
    <TabPanel value="tab3"><p className="p-4">Billing content</p></TabPanel>
  </Tabs>
);

export const TabsStyle: Story = { render: () => <TabsDemo style="tabs" /> };
export const Examples: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <Tab value="overview" leftIcon={Bell} number={3}>Overview</Tab>
        <Tab value="details" rightIcon={ChevronDown}>Details</Tab>
      </TabsList>
      <TabPanel value="overview">Notifications</TabPanel>
      <TabPanel value="details">More details</TabPanel>
    </Tabs>
  ),
};
export const Elevated: Story = { render: () => <TabsDemo style="elevated" /> };
export const Selector: Story = { render: () => <TabsDemo style="selector" /> };

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <Tab value="tab1">Active</Tab>
        <Tab value="tab2" disabled>Disabled</Tab>
        <Tab value="tab3">Another</Tab>
      </TabsList>
      <TabPanel value="tab1"><p className="p-4">This tab works</p></TabPanel>
      <TabPanel value="tab2"><p className="p-4">You can't get here</p></TabPanel>
      <TabPanel value="tab3"><p className="p-4">This tab also works</p></TabPanel>
    </Tabs>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div><p className="mb-2 font-fido-ui-paragraph text-fido-ui-p4 font-bold text-fido-ui-neutral-400">Tabs</p><TabsDemo style="tabs" /></div>
      <div><p className="mb-2 font-fido-ui-paragraph text-fido-ui-p4 font-bold text-fido-ui-neutral-400">Elevated</p><TabsDemo style="elevated" /></div>
      <div><p className="mb-2 font-fido-ui-paragraph text-fido-ui-p4 font-bold text-fido-ui-neutral-400">Selector</p><TabsDemo style="selector" /></div>
    </div>
  ),
};

export const Playground: Story = {
  args: { style: 'tabs' },
  render: (args) => <TabsDemo style={args.style} />,
};
