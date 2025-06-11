import Button from './Button';

// Sample icons (you can replace with actual icon library)
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

const Download = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Supports icons, loading states, and full accessibility features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'Visual style of the button'
    },
    size: {
      control: 'select', 
      options: ['small', 'medium', 'large'],
      description: 'Size of the button'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width'
    },
    children: {
      control: 'text',
      description: 'Button content'
    }
  }
};

// Default story
export const Default = {
  args: {
    children: 'Button'
  }
};

// All variants
export const Variants = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="destructive">Destructive</Button>
  </div>
);

// All sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);

// With icons
export const WithIcons = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button leftIcon={<Download />}>Download</Button>
    <Button rightIcon={<ChevronRight />}>Continue</Button>
    <Button leftIcon={<Download />} rightIcon={<ChevronRight />}>Download & Continue</Button>
  </div>
);

// States
export const States = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button>Normal</Button>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
  </div>
);

// Full width
export const FullWidth = () => (
  <div style={{ width: '300px' }}>
    <Button fullWidth>Full Width Button</Button>
  </div>
);

// Interactive playground
export const Playground = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'medium',
    loading: false,
    disabled: false,
    fullWidth: false
  }
};

// Accessibility demo
export const AccessibilityDemo = () => (
  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '300px' }}>
    <p>Try navigating with Tab key and activating with Enter/Space:</p>
    <Button>First Button</Button>
    <Button variant="secondary">Second Button</Button>
    <Button variant="outline">Third Button</Button>
    <Button disabled>Disabled Button (not focusable)</Button>
  </div>
);