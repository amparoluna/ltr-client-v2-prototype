import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
import { version } from '../package.json';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: `FidoUI Icons v${version}`,
  }),
});
