import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('renders page buttons', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('3')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onPageChange on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onPageChange={onChange} />);
    await user.click(screen.getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('navigates to next page', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onChange} />);
    await user.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('navigates to previous page', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onPageChange={onChange} />);
    await user.click(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('shows ellipsis for many pages', () => {
    render(<Pagination page={5} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getAllByText('…').length).toBeGreaterThanOrEqual(1);
  });

  it('has aria-label on nav', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
