export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}