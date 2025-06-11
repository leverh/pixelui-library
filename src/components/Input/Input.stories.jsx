import { useState } from 'react';
import Input from './Input';

// Sample icons
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
  </svg>
);

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: 'A flexible input component with validation states, icons, and accessibility features. Supports various input types and provides comprehensive form functionality.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    state: {
      control: 'select',
      options: ['error', 'success', 'warning']
    }
  }
};

// Default story
export const Default = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email'
  }
};

// All sizes
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input label="Small Input" size="small" placeholder="Small size" />
    <Input label="Medium Input" size="medium" placeholder="Medium size" />
    <Input label="Large Input" size="large" placeholder="Large size" />
  </div>
);

// Input types
export const Types = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input label="Text" type="text" placeholder="Enter text" />
    <Input label="Email" type="email" placeholder="Enter email" />
    <Input label="Password" type="password" placeholder="Enter password" />
    <Input label="Number" type="number" placeholder="Enter number" />
    <Input label="Phone" type="tel" placeholder="Enter phone number" />
    <Input label="URL" type="url" placeholder="Enter URL" />
    <Input label="Search" type="search" placeholder="Search..." />
  </div>
);

// Validation states
export const ValidationStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input 
      label="Default State" 
      placeholder="Normal input"
      helperText="This is a helper text"
    />
    <Input 
      label="Error State" 
      placeholder="Invalid input"
      errorText="This field is required"
    />
    <Input 
      label="Success State" 
      placeholder="Valid input"
      successText="Looks good!"
    />
    <Input 
      label="Warning State" 
      placeholder="Warning input"
      warningText="Please double-check this field"
    />
  </div>
);

// With icons
export const WithIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input 
      label="Username" 
      leftIcon={<UserIcon />}
      placeholder="Enter username"
    />
    <Input 
      label="Email" 
      leftIcon={<MailIcon />}
      type="email"
      placeholder="Enter email"
    />
    <Input 
      label="Search" 
      leftIcon={<SearchIcon />}
      type="search"
      placeholder="Search..."
    />
  </div>
);

// Required and optional
export const RequiredOptional = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input 
      label="Required Field" 
      required
      placeholder="This field is required"
      helperText="Please fill out this field"
    />
    <Input 
      label="Optional Field" 
      placeholder="This field is optional"
      helperText="You can skip this field"
    />
  </div>
);

// Character count
export const CharacterCount = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input 
      label="Tweet" 
      placeholder="What's happening?"
      maxLength={280}
      showCharacterCount
      helperText="Share your thoughts"
    />
    <Input 
      label="Bio" 
      placeholder="Tell us about yourself"
      maxLength={150}
      showCharacterCount
      defaultValue="I'm a software developer who loves building great user experiences..."
    />
  </div>
);

// Disabled and readonly
export const DisabledReadonly = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input 
      label="Disabled Input" 
      disabled
      placeholder="This input is disabled"
      helperText="Cannot be edited"
    />
    <Input 
      label="Readonly Input" 
      readOnly
      defaultValue="This value cannot be changed"
      helperText="Read-only field"
    />
  </div>
);

// Controlled component example
export const ControlledInput = () => {
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Input 
        label="Controlled Text Input" 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        helperText={`You typed: ${value}`}
      />
      <Input 
        label="Email Validation" 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        errorText={email && !validateEmail(email) ? 'Please enter a valid email' : undefined}
        successText={email && validateEmail(email) ? 'Email looks good!' : undefined}
        leftIcon={<MailIcon />}
      />
    </div>
  );
};

// Password input showcase
export const PasswordInput = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <Input 
      label="Password" 
      type="password"
      placeholder="Enter your password"
      helperText="Password must be at least 8 characters"
    />
    <Input 
      label="Confirm Password" 
      type="password"
      placeholder="Confirm your password"
      required
    />
  </div>
);

// Playground
export const Playground = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter text...',
    type: 'text',
    size: 'medium',
    helperText: 'This is helper text',
    required: false,
    disabled: false,
    showCharacterCount: false,
    maxLength: undefined
  }
};