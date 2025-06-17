import { useState } from 'react';
import Input from './Input';
import styles from './Input.module.css';

export default {
  title: 'Components/Form/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A modern, accessible input component with premium animations, glassmorphism effects, and comprehensive form functionality. Features smooth micro-interactions, validation states, and enhanced user experience.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type with specialized behavior'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Component size',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'floating', 'glass'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    state: {
      control: 'select',
      options: ['error', 'success', 'warning'],
      description: 'Validation state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input'
    },
    readOnly: {
      control: 'boolean',
      description: 'Make input read-only'
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required'
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when input has value'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Display character count'
    },
    maxLength: {
      control: { type: 'number', min: 1, max: 1000 },
      description: 'Maximum character length'
    },
    label: {
      control: 'text',
      description: 'Input label'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below input'
    }
  },
};

// ===== ENHANCED ICONS =====
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <circle cx="12" cy="16" r="1"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const CreditCardIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const DollarSignIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

// ===== STORY WRAPPER =====
const InputWrapper = ({ onValueChange, ...args }) => {
  const [value, setValue] = useState(args.value || args.defaultValue || '');
  
  const handleChange = (e) => {
    setValue(e.target.value);
    onValueChange?.(e.target.value);
    console.log('Input value:', e.target.value);
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Input
        {...args}
        value={value}
        onChange={handleChange}
      />
      {value && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
          borderRadius: '0.5rem',
          fontSize: '0.8rem',
          color: '#64748b',
          border: '1px solid #e2e8f0'
        }}>
          <strong>Current value:</strong> "{value}"
        </div>
      )}
    </div>
  );
};

// ===== MAIN PLAYGROUND =====
export const Playground = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    label: 'Input Label',
    placeholder: 'Enter text...',
    type: 'text',
    size: 'md',
    variant: 'default',
    helperText: 'This is helper text to guide the user',
    required: false,
    disabled: false,
    clearable: true,
    showCharacterCount: false,
    maxLength: undefined
  },
};

// ===== BASIC EXAMPLES =====
export const BasicUsage = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name...',
    type: 'text',
    size: 'md',
    variant: 'default',
    helperText: 'Please enter your first and last name',
    clearable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic input with label, placeholder, and helper text. Features smooth hover and focus animations.'
      }
    }
  }
};

export const WithIcons = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
    leftIcon: <MailIcon />,
    size: 'md',
    variant: 'floating',
    helperText: 'We\'ll never share your email address',
    clearable: true,
    required: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with left icon for enhanced visual hierarchy and user guidance.'
      }
    }
  }
};

// ===== SIZE VARIATIONS =====
export const AllSizes = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem', 
      maxWidth: '500px', 
      margin: '0 auto' 
    }}>
      {[
        { size: 'xs', label: 'Extra Small', placeholder: 'Compact input...' },
        { size: 'sm', label: 'Small', placeholder: 'Small input...' },
        { size: 'md', label: 'Medium', placeholder: 'Standard input...' },
        { size: 'lg', label: 'Large', placeholder: 'Large input...' },
        { size: 'xl', label: 'Extra Large', placeholder: 'Premium input...' }
      ].map(({ size, label, placeholder }) => (
        <div key={size}>
          <div style={{ 
            marginBottom: '0.5rem', 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: '#374151',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {label} ({size})
          </div>
          <InputWrapper 
            size={size} 
            label={`${label} Input`}
            placeholder={placeholder}
            leftIcon={<UserIcon />}
            clearable
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available size variations with consistent scaling and proportions.'
      }
    }
  }
};

// ===== VARIANT SHOWCASE =====
export const AllVariants = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem', 
      maxWidth: '1000px', 
      margin: '0 auto' 
    }}>
      {[
        { 
          variant: 'default', 
          title: 'Default', 
          desc: 'Standard border with gradient background',
          bgStyle: { background: '#f8fafc' }
        },
        { 
          variant: 'minimal', 
          title: 'Minimal', 
          desc: 'Clean, understated design',
          bgStyle: { background: '#f1f5f9' }
        },
        { 
          variant: 'floating', 
          title: 'Floating', 
          desc: 'Elevated with premium shadows',
          bgStyle: { background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' }
        },
        { 
          variant: 'glass', 
          title: 'Glass', 
          desc: 'Glassmorphism with blur effects',
          bgStyle: { 
            background: 'linear-gradient(135deg, rgba(147, 197, 253, 0.3) 0%, rgba(59, 130, 246, 0.1) 100%)',
            backdropFilter: 'blur(10px)'
          }
        }
      ].map(({ variant, title, desc, bgStyle }) => (
        <div key={variant} style={{
          padding: '1.5rem',
          borderRadius: '1rem',
          border: '1px solid #e2e8f0',
          ...bgStyle
        }}>
          <div style={{ 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              margin: '0 0 0.25rem 0', 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {title}
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: '#6b7280',
              lineHeight: '1.4'
            }}>
              {desc}
            </p>
          </div>
          <InputWrapper 
            variant={variant}
            label={`${title} Input`}
            placeholder={`${title} variant...`}
            leftIcon={<SearchIcon />}
            clearable
            helperText={`Experience the ${title.toLowerCase()} design`}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All visual variants showcasing different styling approaches and premium effects.'
      }
    }
  }
};

// ===== INPUT TYPES SHOWCASE =====
export const InputTypes = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem', 
      maxWidth: '800px', 
      margin: '0 auto' 
    }}>
      {[
        { type: 'text', label: 'Full Name', icon: <UserIcon />, placeholder: 'John Doe' },
        { type: 'email', label: 'Email', icon: <MailIcon />, placeholder: 'john@example.com' },
        { type: 'password', label: 'Password', icon: <LockIcon />, placeholder: 'Enter password' },
        { type: 'tel', label: 'Phone', icon: <PhoneIcon />, placeholder: '+1 (555) 123-4567' },
        { type: 'number', label: 'Amount', icon: <DollarSignIcon />, placeholder: '1000' },
        { type: 'search', label: 'Search', icon: <SearchIcon />, placeholder: 'Search products...' }
      ].map(({ type, label, icon, placeholder }) => (
        <InputWrapper 
          key={type}
          type={type}
          label={label}
          placeholder={placeholder}
          leftIcon={icon}
          variant="floating"
          clearable
          helperText={`Enter your ${label.toLowerCase()}`}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different input types with specialized behavior and appropriate icons.'
      }
    }
  }
};

// ===== VALIDATION STATES =====
export const ValidationStates = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem', 
      maxWidth: '500px', 
      margin: '0 auto' 
    }}>
      {[
        {
          title: '✨ Default State',
          props: {
            label: 'Username',
            placeholder: 'Enter username...',
            helperText: 'Choose a unique username',
            leftIcon: <UserIcon />
          }
        },
        {
          title: '🔴 Error State',
          props: {
            label: 'Email Address',
            placeholder: 'invalid-email',
            defaultValue: 'invalid-email',
            errorText: 'Please enter a valid email address',
            leftIcon: <MailIcon />,
            state: 'error'
          }
        },
        {
          title: '🟢 Success State',
          props: {
            label: 'Phone Number',
            placeholder: '+1 (555) 123-4567',
            defaultValue: '+1 (555) 123-4567',
            successText: 'Phone number verified successfully!',
            leftIcon: <PhoneIcon />,
            state: 'success'
          }
        },
        {
          title: '🟡 Warning State',
          props: {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password...',
            defaultValue: 'weak',
            warningText: 'Password strength: Weak. Consider adding numbers and symbols.',
            leftIcon: <LockIcon />,
            state: 'warning'
          }
        }
      ].map(({ title, props }) => (
        <div key={title}>
          <div style={{ 
            marginBottom: '0.75rem', 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: '#374151'
          }}>
            {title}
          </div>
          <InputWrapper {...props} clearable />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation states with animated feedback and appropriate styling.'
      }
    }
  }
};

// ===== INTERACTIVE FEATURES =====
export const InteractiveFeatures = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem', 
      maxWidth: '900px', 
      margin: '0 auto' 
    }}>
      {[
        {
          title: '🧹 Clearable Input',
          props: {
            label: 'Search Query',
            placeholder: 'Type to search...',
            defaultValue: 'Clear me!',
            leftIcon: <SearchIcon />,
            clearable: true,
            helperText: 'Click the × button to clear'
          }
        },
        {
          title: '📝 Character Count',
          props: {
            label: 'Tweet Message',
            placeholder: 'What\'s happening?',
            maxLength: 280,
            showCharacterCount: true,
            defaultValue: 'This is a sample tweet with character counting enabled!',
            helperText: 'Share your thoughts with the world'
          }
        },
        {
          title: '⏳ Loading State',
          props: {
            label: 'Verification Code',
            placeholder: 'Checking...',
            loading: true,
            disabled: true,
            helperText: 'Verifying your code...'
          }
        },
        {
          title: '👁️ Password Toggle',
          props: {
            label: 'Secret Password',
            type: 'password',
            placeholder: 'Enter your password...',
            defaultValue: 'super-secret-password',
            leftIcon: <LockIcon />,
            helperText: 'Click the eye icon to toggle visibility'
          }
        },
        {
          title: '🚫 Disabled Input',
          props: {
            label: 'Account ID',
            placeholder: 'Auto-generated',
            defaultValue: 'ACC-2023-001',
            disabled: true,
            helperText: 'This field is automatically set'
          }
        },
        {
          title: '📖 Read-only Input',
          props: {
            label: 'Email Address',
            placeholder: 'your@email.com',
            defaultValue: 'user@company.com',
            readOnly: true,
            leftIcon: <MailIcon />,
            helperText: 'Contact support to change this'
          }
        }
      ].map(({ title, props }) => (
        <div key={title}>
          <div style={{ 
            marginBottom: '0.75rem', 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: '#374151'
          }}>
            {title}
          </div>
          <InputWrapper {...props} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive features including clearable inputs, character counting, loading states, and password visibility toggle.'
      }
    }
  }
};

// ===== REAL WORLD EXAMPLES =====
export const ContactForm = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });

    const handleInputChange = (field) => (e) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert('Form submitted! Check console for data.');
    };

    return (
      <form onSubmit={handleSubmit} style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, #fefbff 0%, #f3e8ff 100%)',
        borderRadius: '1rem',
        border: '1px solid #e9d5ff'
      }}>
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            color: '#0f172a'
          }}>
            📞 Contact Us
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Get in touch with our team
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1rem',
            alignItems: 'start'
          }}>
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange('name')}
              leftIcon={<UserIcon />}
              variant="glass"
              required
              clearable
            />
            <Input
              label="Company"
              placeholder="Acme Corp"
              value={formData.company}
              onChange={handleInputChange('company')}
              variant="glass"
              clearable
            />
          </div>
          
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleInputChange('email')}
            leftIcon={<MailIcon />}
            variant="glass"
            required
            clearable
            errorText={formData.email && !validateEmail(formData.email) ? 'Please enter a valid email' : undefined}
            successText={formData.email && validateEmail(formData.email) ? 'Email looks good!' : undefined}
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            leftIcon={<PhoneIcon />}
            variant="glass"
            clearable
            helperText="We'll only call if absolutely necessary"
          />
          
          <Input
            label="Message"
            placeholder="Tell us how we can help..."
            value={formData.message}
            onChange={handleInputChange('message')}
            variant="glass"
            maxLength={500}
            showCharacterCount
            clearable
            helperText="Describe your inquiry in detail"
          />
        </div>
        
        <div style={{ 
          marginTop: '2rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            type="button"
            onClick={() => setFormData({ name: '', email: '', phone: '', company: '', message: '' })}
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              color: '#374151',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!formData.name || !formData.email || !validateEmail(formData.email)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '0.75rem',
              background: formData.name && formData.email && validateEmail(formData.email) ? 
                'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : 
                'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
              color: 'white',
              fontWeight: '600',
              cursor: formData.name && formData.email && validateEmail(formData.email) ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              opacity: formData.name && formData.email && validateEmail(formData.email) ? 1 : 0.6
            }}
          >
            Send Message
          </button>
        </div>
        
        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            📋 Form Data:
          </div>
          <pre style={{ 
            margin: 0, 
            fontSize: '0.75rem',
            color: '#6b7280',
            lineHeight: '1.4',
            maxHeight: '120px',
            overflow: 'auto'
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete contact form with real-time validation, glassmorphism design, and responsive layout.'
      }
    }
  }
};

export const PaymentForm = {
  render: () => {
    const [paymentData, setPaymentData] = useState({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });

    const handleInputChange = (field) => (e) => {
      let value = e.target.value;
      
      // Format card number
      if (field === 'cardNumber') {
        value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      }
      
      // Format expiry date
      if (field === 'expiryDate') {
        value = value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
      }
      
      setPaymentData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div 
        className={styles.darkFormContainer}
        style={{ 
          maxWidth: '400px', 
          margin: '0 auto',
          padding: '2rem',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '1rem',
          border: '1px solid #334155',
          color: 'white'
        }}
      >
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            color: 'white'
          }}>
            💳 Payment Details
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#94a3b8',
            fontSize: '0.875rem'
          }}>
            Secure payment processing
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChange={handleInputChange('cardNumber')}
            leftIcon={<CreditCardIcon />}
            variant="glass"
            maxLength={19}
            required
          />
          
          <Input
            label="Cardholder Name"
            placeholder="John Doe"
            value={paymentData.cardholderName}
            onChange={handleInputChange('cardholderName')}
            leftIcon={<UserIcon />}
            variant="glass"
            required
          />
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChange={handleInputChange('expiryDate')}
              leftIcon={<CalendarIcon />}
              variant="glass"
              maxLength={5}
              required
            />
            <Input
              label="CVV"
              type="password"
              placeholder="123"
              value={paymentData.cvv}
              onChange={handleInputChange('cvv')}
              leftIcon={<LockIcon />}
              variant="glass"
              maxLength={4}
              required
            />
          </div>
        </div>
        
        <div style={{ 
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'white' }}>
            🔒 Payment Summary:
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: '1.4' }}>
            <div>Card: {paymentData.cardNumber || '****'}</div>
            <div>Name: {paymentData.cardholderName || 'Not entered'}</div>
            <div>Expires: {paymentData.expiryDate || 'MM/YY'}</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Secure payment form with input formatting, dark theme, and glassmorphism effects.'
      }
    }
  }
};

// ===== ACCESSIBILITY SHOWCASE =====
export const AccessibilityShowcase = {
  render: () => (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      padding: '2rem',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      borderRadius: '1rem',
      border: '1px solid #a7f3d0'
    }}>
      <div style={{ 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.5rem', 
          fontWeight: '700',
          color: '#0f172a'
        }}>
          ♿ Accessibility Features
        </h2>
        <p style={{ 
          margin: 0, 
          color: '#064e3b',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          Full keyboard navigation, screen reader support, and ARIA compliance
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <Input
          label="Keyboard Navigation"
          placeholder="Tab to focus, use arrow keys if applicable..."
          leftIcon={<SearchIcon />}
          variant="floating"
          clearable
          helperText="Try tabbing through the form and using keyboard shortcuts"
          aria-describedby="keyboard-help"
        />
        
        <Input
          label="Screen Reader Optimized"
          placeholder="Optimized for assistive technologies..."
          leftIcon={<UserIcon />}
          variant="floating"
          required
          helperText="Proper ARIA labels and live regions for screen readers"
          aria-describedby="reader-help"
        />
        
        <Input
          label="High Contrast Support"
          placeholder="Works with high contrast mode..."
          leftIcon={<MailIcon />}
          variant="floating"
          state="success"
          successText="Meets WCAG accessibility guidelines"
        />
      </div>
      
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '0.75rem',
        border: '1px solid #a7f3d0'
      }}>
        <div style={{ 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem', 
          color: '#065f46'
        }}>
          ✅ Accessibility Features:
        </div>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '1.25rem',
          fontSize: '0.8rem',
          color: '#047857',
          lineHeight: '1.6'
        }}>
          <li>Keyboard navigation with Tab, Enter, and Escape</li>
          <li>ARIA labels, descriptions, and live regions</li>
          <li>Focus management and visual indicators</li>
          <li>Screen reader announcements for state changes</li>
          <li>High contrast mode support</li>
          <li>Reduced motion preferences respected</li>
          <li>Semantic HTML with proper form associations</li>
          <li>Error messages linked to inputs</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features including keyboard navigation, ARIA support, and screen reader optimization.'
      }
    }
  }
};

// ===== PERFORMANCE DEMO =====
export const PerformanceShowcase = {
  render: () => {
    const [inputs, setInputs] = useState(
      Array.from({ length: 20 }, (_, i) => ({ id: i, value: '' }))
    );

    const handleInputChange = (id) => (e) => {
      setInputs(prev => prev.map(input => 
        input.id === id ? { ...input, value: e.target.value } : input
      ));
    };

    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)',
        borderRadius: '1rem',
        border: '1px solid #fdba74'
      }}>
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            color: '#0f172a'
          }}>
            ⚡ Performance Test
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#9a3412',
            fontSize: '0.875rem'
          }}>
            20 inputs with smooth animations and optimized rendering
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          maxHeight: '400px',
          overflow: 'auto',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '0.75rem'
        }}>
          {inputs.map((input) => (
            <Input
              key={input.id}
              label={`Input ${input.id + 1}`}
              placeholder={`Enter value ${input.id + 1}...`}
              value={input.value}
              onChange={handleInputChange(input.id)}
              leftIcon={<SearchIcon />}
              variant="glass"
              size="sm"
              clearable
            />
          ))}
        </div>
        
        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '0.75rem',
          border: '1px solid #fdba74'
        }}>
          <div style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            marginBottom: '0.5rem', 
            color: '#9a3412'
          }}>
            📊 Performance Stats:
          </div>
          <div style={{ fontSize: '0.8rem', color: '#c2410c', lineHeight: '1.4' }}>
            <div>Total Inputs: {inputs.length}</div>
            <div>Filled Inputs: {inputs.filter(input => input.value).length}</div>
            <div>Characters Typed: {inputs.reduce((total, input) => total + input.value.length, 0)}</div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with multiple inputs demonstrating smooth animations and optimized rendering.'
      }
    }
  }
};