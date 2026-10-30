import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from './dropdown-menu';


const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['ltr'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-fido-ui-md border border-fido-ui-neutral-300 px-4 py-2 text-fido-ui-p3">
          Options
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuItem onSelect={() => console.log('Edit')}>Edit</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Duplicate')}>Duplicate</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Archive')}>Archive</DropdownMenuItem>
    </DropdownMenu>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-fido-ui-md border border-fido-ui-neutral-300 px-4 py-2 text-fido-ui-p3">
          Actions
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuGroup label="Edit">
        <DropdownMenuItem onSelect={() => console.log('Cut')}>Cut</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Copy')}>Copy</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Paste')}>Paste</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup label="View">
        <DropdownMenuItem onSelect={() => console.log('Zoom In')}>Zoom In</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('Zoom Out')}>Zoom Out</DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenu>
  ),
};

export const WithDestructiveItem: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-fido-ui-md border border-fido-ui-neutral-300 px-4 py-2 text-fido-ui-p3">
          More
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuItem onSelect={() => console.log('Edit')}>Edit</DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Share')}>Share</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive onSelect={() => console.log('Delete')}>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L5.333 13.333 2 14l.667-3.333L11.333 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5.333" y="5.333" width="8" height="8" rx="1.333" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10.667 5.333V3.333A1.333 1.333 0 0 0 9.333 2H3.333A1.333 1.333 0 0 0 2 3.333v6a1.333 1.333 0 0 0 1.333 1.334h2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4h12M5.333 4V2.667h5.334V4M6.667 7.333v4M9.333 7.333v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.333 4h9.334l-.667 9.333a1.333 1.333 0 0 1-1.333 1.334H5.333A1.333 1.333 0 0 1 4 13.333L3.333 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-fido-ui-md border border-fido-ui-neutral-300 px-4 py-2 text-fido-ui-p3">
          With Icons
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuItem onSelect={() => console.log('Edit')}>
        <EditIcon /> Edit
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => console.log('Copy')}>
        <CopyIcon /> Duplicate
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive onSelect={() => console.log('Delete')}>
        <TrashIcon /> Delete
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-fido-ui-md border border-fido-ui-neutral-300 px-4 py-2 text-fido-ui-p3">
          Options
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuItem onSelect={() => console.log('Edit')}>Edit</DropdownMenuItem>
      <DropdownMenuItem disabled>Copy (disabled)</DropdownMenuItem>
      <DropdownMenuItem disabled>Paste (disabled)</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={() => console.log('Settings')}>Settings</DropdownMenuItem>
    </DropdownMenu>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex items-center gap-4">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button className="rounded-fido-ui-md border border-fido-ui-neutral-300 px-4 py-2 text-fido-ui-p3">
              {open ? 'Close' : 'Open'} Menu
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuItem onSelect={() => console.log('Item 1')}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log('Item 2')}>Item 2</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => console.log('Item 3')}>Item 3</DropdownMenuItem>
        </DropdownMenu>
        <span className="text-fido-ui-p4 text-fido-ui-neutral-500">
          Menu is {open ? 'open' : 'closed'}
        </span>
      </div>
    );
  },
};