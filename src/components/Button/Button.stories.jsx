import Button from './Button';

// Enhanced icons
const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6"/>
    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m22 2-7 20-4-9-9-4z"/>
    <path d="M22 2 11 13"/>
  </svg>
);

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A modern, animated button component with gradient backgrounds, smooth interactions, and premium visual effects. Features ripple effects, enhanced hover states, and comprehensive accessibility.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'success', 'warning', 'soft'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select', 
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
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
    rounded: {
      control: 'boolean',
      description: 'Make button fully rounded'
    },
    elevated: {
      control: 'boolean',
      description: 'Add elevated shadow effect'
    }
  }
};

// Playground
export const Playground = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
    rounded: false,
    elevated: false
  },
  render: (args) => (
    <Button 
      {...args} 
      onClick={() => console.log('Button clicked!')}
    />
  )
};

// Default button
export const Default = {
  args: {
    children: 'Button'
  }
};

// All sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Button size={size}>
          {size.toUpperCase()}
        </Button>
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6b7280', textTransform: 'uppercase' }}>
          {size}
        </div>
      </div>
    ))}
  </div>
);

// All variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Filled Variants</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Light Variants</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="soft">Soft</Button>
      </div>
    </div>
  </div>
);

// With icons
export const WithIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Left Icons</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<DownloadIcon />}>Download</Button>
        <Button leftIcon={<PlusIcon />} variant="success">Add New</Button>
        <Button leftIcon={<StarIcon />} variant="warning">Favorite</Button>
        <Button leftIcon={<TrashIcon />} variant="destructive">Delete</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Right Icons</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button rightIcon={<ChevronRightIcon />}>Continue</Button>
        <Button rightIcon={<SendIcon />} variant="primary">Send Message</Button>
        <Button rightIcon={<ChevronRightIcon />} variant="outline">Learn More</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Both Icons</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button leftIcon={<DownloadIcon />} rightIcon={<ChevronRightIcon />} size="lg">
          Download & Continue
        </Button>
        <Button leftIcon={<HeartIcon />} rightIcon={<StarIcon />} variant="soft" size="lg">
          Love & Favorite
        </Button>
      </div>
    </div>
  </div>
);

// Button states
export const States = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Interactive States</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button>Normal</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Loading States</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button loading variant="primary">Saving...</Button>
        <Button loading variant="success" leftIcon={<DownloadIcon />}>Downloading...</Button>
        <Button loading variant="destructive">Deleting...</Button>
        <Button loading variant="outline">Processing...</Button>
      </div>
    </div>
  </div>
);

// Special effects
export const SpecialEffects = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Rounded Buttons</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button rounded>Rounded</Button>
        <Button rounded variant="success" leftIcon={<PlusIcon />}>Add</Button>
        <Button rounded variant="destructive" leftIcon={<TrashIcon />}>Delete</Button>
        <Button rounded variant="outline" size="lg">Pill Button</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Elevated Buttons</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button elevated>Elevated</Button>
        <Button elevated variant="primary" leftIcon={<StarIcon />}>Premium</Button>
        <Button elevated variant="success" rightIcon={<ChevronRightIcon />}>Get Started</Button>
        <Button elevated rounded variant="warning" size="lg">Super Elevated</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Combined Effects</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button elevated rounded variant="primary" size="lg" leftIcon={<StarIcon />}>
          Premium Button
        </Button>
        <Button elevated rounded variant="success" size="lg" rightIcon={<SendIcon />}>
          Send Now
        </Button>
      </div>
    </div>
  </div>
);

// Full width examples
export const FullWidth = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Full Width Buttons</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button fullWidth>Full Width Button</Button>
        <Button fullWidth variant="outline" leftIcon={<DownloadIcon />}>
          Download Full Width
        </Button>
        <Button fullWidth variant="success" rightIcon={<ChevronRightIcon />}>
          Continue Full Width
        </Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Form Buttons</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Button fullWidth size="lg" variant="primary">
          Create Account
        </Button>
        <Button fullWidth variant="outline">
          Sign in with Google
        </Button>
        <Button fullWidth variant="ghost">
          Forgot Password?
        </Button>
      </div>
    </div>
  </div>
);

// Real-world examples
export const RealWorldExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>E-commerce Actions</h4>
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>Premium Wireless Headphones</h5>
          <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
            $299.99 - Free shipping on orders over $50
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="primary" size="lg" leftIcon={<PlusIcon />} style={{ flex: 1 }}>
              Add to Cart
            </Button>
            <Button variant="outline" leftIcon={<HeartIcon />}>
              Save
            </Button>
            <Button variant="ghost" leftIcon={<StarIcon />}>
              Review
            </Button>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Dashboard Actions</h4>
      <div style={{
        background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
        border: '1px solid #e2e8f0',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <div>
            <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>
              Project Management
            </h5>
            <p style={{ color: '#6b7280', margin: 0 }}>Manage your team and projects efficiently</p>
          </div>
          <Button variant="primary" leftIcon={<PlusIcon />}>
            New Project
          </Button>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button variant="outline" leftIcon={<DownloadIcon />}>Export</Button>
          <Button variant="ghost">View Reports</Button>
          <Button variant="soft">Settings</Button>
          <Button variant="destructive" leftIcon={<TrashIcon />}>Delete</Button>
        </div>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Form Actions</h4>
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px'
      }}>
        <h5 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', textAlign: 'center' }}>
          Create Your Account
        </h5>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{ 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Password</label>
            <input 
              type="password" 
              placeholder="Create a password"
              style={{ 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            <Button fullWidth size="lg" variant="primary" rightIcon={<ChevronRightIcon />}>
              Create Account
            </Button>
            <Button fullWidth variant="outline">
              Sign in with Google
            </Button>
            <Button fullWidth variant="ghost">
              Already have an account? Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Notification Actions</h4>
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px'
      }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.25rem'
          }}>
            🎉
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: '600' }}>
              Congratulations!
            </h5>
            <p style={{ margin: '0 0 1rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
              Your project has been successfully deployed. It's now live and accessible to users.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button variant="primary" size="sm" rightIcon={<ChevronRightIcon />}>
                View Project
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
              <Button variant="ghost" size="sm">
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Accessibility demo
export const AccessibilityDemo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        Keyboard Navigation
      </h4>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
        Try navigating with Tab key and activating with Enter/Space:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Button>First Button (Tab to focus)</Button>
        <Button variant="secondary">Second Button</Button>
        <Button variant="outline">Third Button</Button>
        <Button variant="ghost">Fourth Button</Button>
        <Button disabled>Disabled Button (not focusable)</Button>
        <Button loading>Loading Button (not focusable)</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        Focus Indicators
      </h4>
      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
        Notice the focus outline when navigating with keyboard:
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary">Primary Focus</Button>
        <Button variant="destructive">Destructive Focus</Button>
        <Button variant="outline">Outline Focus</Button>
        <Button variant="ghost">Ghost Focus</Button>
      </div>
    </div>
  </div>
);

// Interactive showcase
export const InteractiveShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        🎨 Modern Design with Gradients
      </h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button variant="primary" size="lg" elevated>Gradient Primary</Button>
        <Button variant="success" size="lg" elevated>Gradient Success</Button>
        <Button variant="warning" size="lg" elevated>Gradient Warning</Button>
        <Button variant="destructive" size="lg" elevated>Gradient Destructive</Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        ⚡ Smooth Animations & Effects
      </h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button 
          variant="primary" 
          size="lg" 
          leftIcon={<StarIcon />}
          onClick={() => alert('Ripple effect!')}
        >
          Click for Ripple
        </Button>
        <Button 
          variant="success" 
          elevated 
          rounded 
          leftIcon={<HeartIcon />}
          onClick={() => alert('Elevated hover!')}
        >
          Hover & Click
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          rightIcon={<ChevronRightIcon />}
          onClick={() => alert('Icon animation!')}
        >
          Icon Scaling
        </Button>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        🎯 All Features Combined
      </h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button 
          variant="primary" 
          size="xl" 
          elevated 
          rounded 
          leftIcon={<StarIcon />}
          rightIcon={<ChevronRightIcon />}
          onClick={() => alert('Ultimate button clicked!')}
        >
          Ultimate Button
        </Button>
        <Button 
          variant="success" 
          size="lg" 
          elevated 
          leftIcon={<PlusIcon />}
          onClick={() => alert('Premium action!')}
        >
          Premium Action
        </Button>
        <Button 
          loading 
          variant="primary" 
          size="lg"
        >
          Loading State
        </Button>
      </div>
    </div>
  </div>
);