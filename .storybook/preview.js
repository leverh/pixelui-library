import '../src/tokens/index.css';
import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1a1a1a' },
    ],
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

const withThemeProvider = (Story, context) => {
  const theme = context.globals.theme;
  
  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      <Story />
    </div>
  );
};

export const decorators = [withThemeProvider];