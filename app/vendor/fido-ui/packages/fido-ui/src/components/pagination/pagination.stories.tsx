import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { Pagination } from './pagination';


const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['ltr'],
  argTypes: {
    page: { control: { type: 'number', min: 1 }, description: 'Current active page' },
    totalPages: { control: { type: 'number', min: 1 }, description: 'Total number of pages' },
    siblingCount: { control: { type: 'number', min: 0, max: 3 }, description: 'Pages shown on each side of current' },
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationDemo = ({ totalPages = 10, initialPage = 1 }: { totalPages?: number; initialPage?: number }) => {
  const [page, setPage] = React.useState(initialPage);
  return <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />;
};

export const Default: Story = {
  render: () => <PaginationDemo />,
};

export const FewPages: Story = {
  render: () => <PaginationDemo totalPages={5} />,
};

export const ManyPages: Story = {
  render: () => <PaginationDemo totalPages={50} />,
};

export const StartInMiddle: Story = {
  render: () => <PaginationDemo totalPages={20} initialPage={10} />,
};

export const SinglePage: Story = {
  render: () => <PaginationDemo totalPages={1} />,
};

export const TwoPages: Story = {
  render: () => <PaginationDemo totalPages={2} />,
};

export const AllPageCounts: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {[1, 3, 5, 10, 20, 50].map((total) => (
        <div key={total}>
          <p className="text-sm text-gray-400 mb-2">{total} pages</p>
          <PaginationDemo totalPages={total} />
        </div>
      ))}
    </div>
  ),
};