import type { Preview } from '@storybook/react-vite'

import '../src/styles/index.scss';
import '@fontsource/atkinson-hyperlegible';
import '@fontsource/atkinson-hyperlegible/700.css';
import '@fontsource/space-grotesk/600.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;