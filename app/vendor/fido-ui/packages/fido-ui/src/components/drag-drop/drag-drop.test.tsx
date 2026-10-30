import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { axe } from 'vitest-axe';
import { DragDrop } from './drag-drop';

function dropzoneClasses(container: HTMLElement) {
  return container.querySelector('label')!.className.split(/\s+/);
}

function createFileList(file: File): FileList {
  return {
    0: file,
    length: 1,
    item: (index: number) => (index === 0 ? file : null),
    [Symbol.iterator]: function* () {
      yield file;
    },
  } as FileList;
}

describe('DragDrop', () => {
  describe('default content', () => {
    it('renders default title and supporting copy', () => {
      render(<DragDrop description="Helper Text" />);
      expect(screen.getByText('Drag & drop or choose file')).toBeInTheDocument();
      expect(screen.getByText('PNG, JPG, PDF, ZIP.')).toBeInTheDocument();
      expect(screen.getByText('Maximum file size: 2 MB')).toBeInTheDocument();
      expect(screen.getByText('Helper Text')).toBeInTheDocument();
    });

    it('applies default state colors and hover-active dropzone styles', () => {
      const { container } = render(<DragDrop description="Helper Text" />);
      const classes = dropzoneClasses(container);

      expect(classes).toContain('border-fido-ui-primary-700');
      expect(classes).toContain('bg-fido-ui-neutral-white');
      expect(classes).toContain('hover:bg-fido-ui-primary-50');
      expect(screen.getByText('Drag & drop or choose file').className).toContain(
        'text-fido-ui-primary-700',
      );
      expect(screen.getByText('PNG, JPG, PDF, ZIP.').className).toContain(
        'text-fido-ui-neutral-700',
      );
      expect(screen.getByText('Maximum file size: 2 MB').className).toContain(
        'text-fido-ui-neutral-700',
      );
      expect(screen.getByText('Helper Text').className).toContain('text-fido-ui-neutral-700');
    });

    it('exposes an accessible file input', () => {
      render(<DragDrop />);
      expect(
        screen.getByLabelText('Drag & drop or choose file'),
      ).toBeInTheDocument();
    });

    it('uses aria-label when title is not a string', () => {
      render(
        <DragDrop title={<span>Upload</span>} aria-label="Choose a document" />,
      );
      expect(screen.getByLabelText('Choose a document')).toBeInTheDocument();
    });

    it('omits secondary and tertiary lines when falsy', () => {
      render(<DragDrop secondaryText={null} tertiaryText={false} />);
      expect(screen.queryByText('PNG, JPG, PDF, ZIP.')).not.toBeInTheDocument();
      expect(screen.queryByText('Maximum file size: 2 MB')).not.toBeInTheDocument();
    });
  });

  describe('active state', () => {
    it('applies active styles when state is active', () => {
      const { container } = render(<DragDrop state="active" />);
      const classes = dropzoneClasses(container);
      expect(classes).toContain('bg-fido-ui-primary-50');
      expect(classes).toContain('border-fido-ui-primary-700');
    });

    it('enters active state while dragging files over the dropzone', () => {
      const { container } = render(<DragDrop />);
      const dropzone = container.querySelector('label')!;

      fireEvent.dragEnter(dropzone, {
        dataTransfer: { types: ['Files'], files: [] },
      });
      expect(dropzoneClasses(container)).toContain('bg-fido-ui-primary-50');

      fireEvent.dragLeave(dropzone, {
        dataTransfer: { types: ['Files'], files: [] },
      });
      expect(dropzoneClasses(container)).not.toContain('bg-fido-ui-primary-50');
      expect(dropzoneClasses(container)).toContain('bg-fido-ui-neutral-white');
    });

    it('does not enter active drag styles when disabled', () => {
      const { container } = render(<DragDrop disabled />);
      const dropzone = container.querySelector('label')!;

      fireEvent.dragEnter(dropzone, {
        dataTransfer: { types: ['Files'], files: [] },
      });
      expect(dropzoneClasses(container)).not.toContain('bg-fido-ui-primary-50');
      expect(dropzoneClasses(container)).toContain('bg-fido-ui-neutral-100');
    });

    it('does not enter active drag styles when error is set', () => {
      const { container } = render(<DragDrop error="Required" />);
      const dropzone = container.querySelector('label')!;

      fireEvent.dragEnter(dropzone, {
        dataTransfer: { types: ['Files'], files: [] },
      });
      expect(dropzoneClasses(container)).not.toContain('bg-fido-ui-primary-50');
      expect(dropzoneClasses(container)).toContain('border-fido-ui-destruct-700');
    });

    it('does not enter active drag styles when state is controlled', () => {
      const { container } = render(<DragDrop state="default" />);
      const dropzone = container.querySelector('label')!;

      fireEvent.dragEnter(dropzone, {
        dataTransfer: { types: ['Files'], files: [] },
      });
      expect(dropzoneClasses(container)).not.toContain('bg-fido-ui-primary-50');
      expect(dropzoneClasses(container)).toContain('bg-fido-ui-neutral-white');
    });
  });

  describe('disabled state', () => {
    it('greys out dropzone, icon, title, copy, and description', () => {
      const { container } = render(
        <DragDrop disabled description="Helper Text" />,
      );
      const classes = dropzoneClasses(container);
      const icon = container.querySelector('label span');

      expect(classes).toContain('bg-fido-ui-neutral-100');
      expect(classes).toContain('border-fido-ui-neutral-300');
      expect(classes).toContain('pointer-events-none');
      expect(icon?.className).toContain('text-fido-ui-neutral-400');
      expect(screen.getByText('Drag & drop or choose file').className).toContain(
        'text-fido-ui-neutral-500',
      );
      expect(screen.getByText('PNG, JPG, PDF, ZIP.').className).toContain(
        'text-fido-ui-neutral-500',
      );
      expect(screen.getByText('Maximum file size: 2 MB').className).toContain(
        'text-fido-ui-neutral-500',
      );
      expect(screen.getByText('Helper Text').className).toContain('text-fido-ui-neutral-500');
    });

    it('disables the file input and blocks click selection', async () => {
      const user = userEvent.setup();
      const onFilesChange = vi.fn();
      const { container } = render(
        <DragDrop disabled onFilesChange={onFilesChange} />,
      );

      expect(screen.getByLabelText('Drag & drop or choose file')).toBeDisabled();
      await user.click(container.querySelector('label')!);
      expect(onFilesChange).not.toHaveBeenCalled();
    });

    it('blocks drop when disabled', () => {
      const onFilesChange = vi.fn();
      const { container } = render(
        <DragDrop disabled onFilesChange={onFilesChange} />,
      );
      const file = new File(['x'], 'x.png', { type: 'image/png' });

      fireEvent.drop(container.querySelector('label')!, {
        dataTransfer: { files: createFileList(file) },
      });
      expect(onFilesChange).not.toHaveBeenCalled();
    });

    it('applies disabled visuals when state is disabled', () => {
      const { container } = render(<DragDrop state="disabled" />);
      expect(dropzoneClasses(container)).toContain('bg-fido-ui-neutral-100');
      expect(screen.getByLabelText('Drag & drop or choose file')).toBeDisabled();
    });
  });

  describe('error and supporting text', () => {
    it('renders error message with alert role and error dropzone', () => {
      const { container } = render(<DragDrop error="This is an error message" />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('This is an error message');
      expect(alert.className).toContain('text-fido-ui-destruct-600');
      expect(dropzoneClasses(container)).toContain('border-fido-ui-destruct-700');
      expect(screen.getByLabelText('Drag & drop or choose file')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    it('stacks description above error when both are set', () => {
      const { container } = render(
        <DragDrop description="Helper Text" error="This is an error message" />,
      );
      const root = container.firstElementChild!;
      const description = screen.getByText('Helper Text');
      const alert = screen.getByRole('alert');

      expect(description).toBeInTheDocument();
      expect(alert).toHaveTextContent('This is an error message');
      expect(
        description.compareDocumentPosition(alert) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
      expect(within(root as HTMLElement).getByText('Helper Text')).toBeInTheDocument();
    });

    it('hides description when supportingText is false but still shows error', () => {
      render(
        <DragDrop
          supportingText={false}
          description="Helper Text"
          error="Nope"
        />,
      );
      expect(screen.queryByText('Helper Text')).not.toBeInTheDocument();
      expect(screen.getByText('Nope')).toBeInTheDocument();
    });

    it('hides only the description when supportingText is false without error', () => {
      render(<DragDrop supportingText={false} description="Helper Text" />);
      expect(screen.queryByText('Helper Text')).not.toBeInTheDocument();
      expect(screen.getByText('Drag & drop or choose file')).toBeInTheDocument();
    });
  });

  describe('file selection', () => {
    it('calls onFilesChange when a file is selected', async () => {
      const user = userEvent.setup();
      const onFilesChange = vi.fn();
      const { container } = render(<DragDrop onFilesChange={onFilesChange} />);

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });
      await user.upload(input, file);

      expect(onFilesChange).toHaveBeenCalled();
      const files = onFilesChange.mock.calls[0]?.[0] as FileList;
      expect(files?.[0]?.name).toBe('hello.png');
    });

    it('forwards inputProps and merges onChange', async () => {
      const user = userEvent.setup();
      const onFilesChange = vi.fn();
      const inputOnChange = vi.fn();
      const { container } = render(
        <DragDrop
          onFilesChange={onFilesChange}
          inputProps={{ accept: '.png', multiple: true, onChange: inputOnChange }}
        />,
      );

      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('accept', '.png');
      expect(input).toHaveAttribute('multiple');

      const file = new File(['hello'], 'hello.png', { type: 'image/png' });
      await user.upload(input, file);
      expect(onFilesChange).toHaveBeenCalled();
      expect(inputOnChange).toHaveBeenCalled();
    });

    it('emits dropped files via onFilesChange and clears active state', () => {
      const onFilesChange = vi.fn();
      const { container } = render(<DragDrop onFilesChange={onFilesChange} />);
      const dropzone = container.querySelector('label')!;
      const file = new File(['drop'], 'drop.pdf', { type: 'application/pdf' });

      fireEvent.dragEnter(dropzone, {
        dataTransfer: { types: ['Files'], files: [] },
      });
      expect(dropzoneClasses(container)).toContain('bg-fido-ui-primary-50');

      fireEvent.drop(dropzone, {
        dataTransfer: { files: createFileList(file) },
      });

      expect(onFilesChange).toHaveBeenCalled();
      expect(dropzoneClasses(container)).not.toContain('bg-fido-ui-primary-50');
    });
  });

  describe('root API', () => {
    it('takes the full width of its parent', () => {
      const { container } = render(<DragDrop />);
      const root = container.firstElementChild!;
      const dropzone = container.querySelector('label')!;

      expect(root.className.split(/\s+/)).toContain('w-full');
      expect(dropzone.className.split(/\s+/)).toContain('w-full');
    });

    it('forwards ref to the root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<DragDrop ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('merges custom className on the root', () => {
      const { container } = render(<DragDrop className="mt-4" />);
      expect(container.firstElementChild).toHaveClass('mt-4');
    });
  });

  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<DragDrop description="Helper Text" />);
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no accessibility violations with stacked description and error', async () => {
      const { container } = render(
        <DragDrop description="Helper Text" error="This is an error message" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled', async () => {
      const { container } = render(
        <DragDrop disabled description="Helper Text" />,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
