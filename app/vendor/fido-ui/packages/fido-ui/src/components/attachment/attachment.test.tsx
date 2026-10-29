import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import * as React from 'react';
import { Attachment } from './attachment';

describe('Attachment', () => {
  it('renders title and description', () => {
    render(
      <Attachment title="sales-dashboard.pdf" description="PDF · 2.4 MB" onRemove={() => {}} />,
    );
    expect(screen.getByText('sales-dashboard.pdf')).toBeInTheDocument();
    expect(screen.getByText('PDF · 2.4 MB')).toBeInTheDocument();
  });

  it('exposes a group role labeled by the title', () => {
    render(<Attachment title="report.pdf" description="PDF · 1 MB" onRemove={() => {}} />);
    expect(screen.getByRole('group', { name: 'report.pdf' })).toBeInTheDocument();
  });

  it('renders remove action when showAction is true', () => {
    render(<Attachment title="file.pdf" onRemove={() => {}} />);
    expect(screen.getByRole('button', { name: 'Remove file.pdf' })).toBeInTheDocument();
  });

  it('hides remove action when showAction is false', () => {
    render(<Attachment title="file.pdf" showAction={false} onRemove={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Remove file.pdf' })).not.toBeInTheDocument();
  });

  it('calls onRemove when remove action is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Attachment title="file.pdf" onRemove={onRemove} />);
    await user.click(screen.getByRole('button', { name: 'Remove file.pdf' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('uses progress to build uploading description when description is omitted', () => {
    render(
      <Attachment
        title="file.pdf"
        state="uploading"
        type="loader"
        progress={64}
        onRemove={() => {}}
      />,
    );
    expect(screen.getByText('Uploading · 64%')).toBeInTheDocument();
  });

  it('uses default success and error descriptions', () => {
    const { rerender } = render(
      <Attachment title="file.pdf" state="success" onRemove={() => {}} />,
    );
    expect(screen.getByText('Upload Successful')).toBeInTheDocument();

    rerender(<Attachment title="file.pdf" state="error" onRemove={() => {}} />);
    expect(screen.getByText('Upload failed. Try again.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Upload failed. Try again.');
  });

  it('hides feedback when showFeedback is false', () => {
    render(
      <Attachment
        title="file.pdf"
        description="PDF · 2.4 MB"
        showFeedback={false}
        onRemove={() => {}}
      />,
    );
    expect(screen.queryByText('PDF · 2.4 MB')).not.toBeInTheDocument();
  });

  it('sets aria-busy while uploading', () => {
    render(
      <Attachment
        title="file.pdf"
        state="uploading"
        type="loader"
        progress={10}
        onRemove={() => {}}
      />,
    );
    expect(screen.getByRole('group', { name: 'file.pdf' })).toHaveAttribute('aria-busy', 'true');
  });

  it('applies size and state classes', () => {
    const { rerender } = render(
      <Attachment title="file.pdf" size="lg" state="error" onRemove={() => {}} />,
    );
    const root = screen.getByRole('group', { name: 'file.pdf' });
    expect(root.className).toMatch(/h-\[175px\]/);
    expect(root.className).toMatch(/border-fido-ui-xs/);
    expect(root.className).toMatch(/border-fido-ui-destruct-400/);
    expect(root.className).toMatch(/p-fido-ui-md/);
    expect(root).toHaveAttribute('data-state', 'error');

    rerender(<Attachment title="file.pdf" size="md" state="uploading" onRemove={() => {}} />);
    const uploading = screen.getByRole('group', { name: 'file.pdf' });
    expect(uploading.className).toMatch(/grid-cols-\[auto_1fr\]/);
    expect(uploading.className).toMatch(/border-fido-ui-xs/);
    expect(uploading.className).toMatch(/border-fido-ui-neutral-300/);
  });

  it('keeps typography size classes alongside color classes', () => {
    render(
      <Attachment title="file.pdf" description="PDF · 1 MB" state="default" onRemove={() => {}} />,
    );
    const title = screen.getByText('file.pdf');
    const description = screen.getByText('PDF · 1 MB');
    expect(title.className).toMatch(/text-fido-ui-p2/);
    expect(title.className).toMatch(/text-fido-ui-neutral-700/);
    expect(description.className).toMatch(/text-fido-ui-p3/);
    expect(description.className).toMatch(/text-fido-ui-neutral-500/);
  });

  it('renders default media icons for each type', () => {
    const { rerender, container } = render(
      <Attachment title="file.pdf" type="document" onRemove={() => {}} />,
    );
    expect(container.querySelector('[data-slot="media"] svg')).toBeInTheDocument();

    rerender(<Attachment title="file.png" type="image" onRemove={() => {}} />);
    expect(container.querySelector('[data-slot="media"] svg')).toBeInTheDocument();

    rerender(
      <Attachment title="file.pdf" type="loader" state="uploading" progress={1} onRemove={() => {}} />,
    );
    expect(container.querySelector('[data-slot="media"] svg')).toBeInTheDocument();
  });

  it('renders custom media when provided', () => {
    render(
      <Attachment
        title="preview.png"
        media={<img src="https://example.com/preview.png" alt="" data-testid="custom-media" />}
        onRemove={() => {}}
      />,
    );
    expect(screen.getByTestId('custom-media')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<Attachment title="file.pdf" className="mt-4" onRemove={() => {}} />);
    expect(screen.getByRole('group', { name: 'file.pdf' })).toHaveClass('mt-4');
  });

  it('forwards ref to the root element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Attachment ref={ref} title="file.pdf" onRemove={() => {}} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toHaveAttribute('role', 'group');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Attachment
        title="sales-dashboard.pdf"
        description="PDF · 2.4 MB"
        onRemove={() => {}}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in error state', async () => {
    const { container } = render(
      <Attachment title="sales-dashboard.pdf" state="error" onRemove={() => {}} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
