import type { Preview } from '@storybook/react-vite';
import React from 'react';
import type { FidoUIThemeId } from '../src/tokens/themes';
import './storybook.css';

const preview: Preview = {
  globalTypes: {
    fidoUITheme: {
      description: 'Product theme (Primary default; FidoAlert = brand overrides)',
      toolbar: {
        title: 'Theme',
        icon: 'category',
        items: [
          { value: 'primary', title: 'Primary' },
          { value: 'fidoAlert', title: 'FidoAlert' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#0a0a0a' },
        gray: { name: 'gray', value: '#f5f5f5' },
      },
    },
    a11y: {
      test: 'error',
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Getting Started',
          [
            'Introduction',
            'Framework Setup',
            'Theming',
            'Design Tokens',
            'Theme Generator',
            'Form Integration',
            'Form Examples',
          ],
          'Foundation',
          'Components',
        ],
      },
    },
  },
  initialGlobals: {
    fidoUITheme: 'primary',
    backgrounds: {
      value: 'light',
    },
  },
  decorators: [
    (Story, context) => {
      const fidoUITheme = (context.globals.fidoUITheme ?? 'primary') as FidoUIThemeId;

      // Set on <html> so portaled surfaces (Tooltip, Dialog, Select, …) inherit
      // FidoAlert CSS variable overrides. App usage is the same pattern.
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-fido-ui-theme', fidoUITheme);
      }

      return React.createElement(
        'div',
        { 'data-fido-ui-theme': fidoUITheme },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
