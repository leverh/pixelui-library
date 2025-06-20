import Accordion from './Accordion';

export default {
  title: 'Components/Display/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'A modern accordion component with smooth animations, multiple variants, and beautiful design. Perfect for organizing content in collapsible sections with wow factor.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'floating', 'glass', 'minimal', 'card']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    allowMultiple: {
      control: 'boolean'
    },
    collapsible: {
      control: 'boolean'
    },
    animated: {
      control: 'boolean'
    }
  }
};

// Sample content for stories
const sampleContent = {
  short: "This is a short piece of content that fits in one line.",
  medium: "This is a medium-length piece of content that explains something in a bit more detail. It might span multiple lines and provide useful information to the user.",
  long: `This is a longer piece of content that contains multiple paragraphs and more detailed information.

It includes line breaks and formatting to demonstrate how the accordion handles various types of content.

• Bullet points work great
• Multiple sections
• Rich formatting options

The accordion smoothly animates between open and closed states, providing a premium user experience.`
};

// Playground - Interactive story for testing all props
export const Playground = {
  args: {
    variant: 'default',
    size: 'md',
    allowMultiple: false,
    collapsible: true,
    animated: true,
    defaultOpenItems: [0]
  },
  render: (args) => (
    <Accordion {...args} onChange={(openItems) => console.log('Open items:', openItems)}>
      <Accordion.Item 
        id={0} 
        title="Getting Started"
        subtitle="Learn the basics"
        icon="🚀"
        badge="New"
      >
        {sampleContent.medium}
      </Accordion.Item>
      <Accordion.Item 
        id={1} 
        title="Advanced Features"
        subtitle="Explore powerful capabilities"
        icon="⚡"
        badge="5"
      >
        {sampleContent.long}
      </Accordion.Item>
      <Accordion.Item 
        id={2} 
        title="FAQ"
        icon="❓"
      >
        {sampleContent.short}
      </Accordion.Item>
    </Accordion>
  )
};

// Default story
export const Default = {
  args: {
    variant: 'default',
    size: 'md',
    allowMultiple: false,
    collapsible: true,
    defaultOpenItems: [0]
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item id={0} title="Getting Started" icon="📚">
        {sampleContent.medium}
      </Accordion.Item>
      <Accordion.Item id={1} title="Advanced Features" icon="⚙️">
        {sampleContent.long}
      </Accordion.Item>
      <Accordion.Item id={2} title="FAQ" icon="❓">
        {sampleContent.short}
      </Accordion.Item>
    </Accordion>
  )
};

// Modern Variants Showcase
export const ModernVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Floating</h3>
      <Accordion variant="floating" size="md">
        <Accordion.Item id="floating-1" title="Elevated Design" icon="✨" badge="Pro">
          Floating cards with subtle shadows and smooth hover effects.
        </Accordion.Item>
        <Accordion.Item id="floating-2" title="Modern Aesthetic" icon="🎨">
          Interfaces and modern applications.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Glass</h3>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        padding: '2rem', 
        borderRadius: '1rem',
        marginBottom: '1rem'
      }}>
        <Accordion variant="glass" size="md">
          <Accordion.Item id="glass-1" title="Glassmorphism Effect" icon="💎" badge="New">
            Backdrop blur effect with translucent backgrounds.
          </Accordion.Item>
          <Accordion.Item id="glass-2" title="Premium Feel" icon="⭐">
            Creates a layered interface with depth.
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  </div>
);

// With Subtitles and Badges
export const WithSubtitlesAndBadges = () => (
  <Accordion variant="bordered" size="md">
    <Accordion.Item 
      id="account" 
      title="Account Settings"
      subtitle="Manage your profile and account preferences"
      icon="👤"
      badge="3"
    >
      <div>
        <p>Update your personal information, change your password, and manage your account settings.</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          <div style={{ 
            padding: '1rem', 
            background: '#f0f9ff', 
            borderRadius: '0.5rem',
            border: '1px solid #bae6fd'
          }}>
            <strong>Profile</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#0c4a6e' }}>
              Update your personal information
            </p>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: '#f0fdf4', 
            borderRadius: '0.5rem',
            border: '1px solid #bbf7d0'
          }}>
            <strong>Security</strong>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#14532d' }}>
              Manage passwords and 2FA
            </p>
          </div>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="billing" 
      title="Billing & Payments"
      subtitle="View invoices and manage payment methods"
      icon="💳"
      badge="New"
    >
      <div>
        <p>Access your billing history and manage your payment methods.</p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button style={{ 
            padding: '0.5rem 1rem', 
            background: '#3b82f6', 
            color: 'white', 
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
            View Billing History
          </button>
          <button style={{ 
            padding: '0.5rem 1rem', 
            background: 'transparent', 
            color: '#3b82f6',
            border: '1px solid #3b82f6',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            Add Payment Method
          </button>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="notifications" 
      title="Notifications"
      subtitle="Control how and when you receive notifications"
      icon="🔔"
      badge="12"
    >
      <div>
        <p>Configure your notification preferences for email, push notifications, and in-app alerts.</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            <input type="checkbox" defaultChecked />
            <div>
              <div style={{ fontWeight: '500' }}>Email notifications</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Receive updates via email</div>
            </div>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            <input type="checkbox" />
            <div>
              <div style={{ fontWeight: '500' }}>Push notifications</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Get notified on your device</div>
            </div>
          </label>
        </div>
      </div>
    </Accordion.Item>
  </Accordion>
);

// Multiple Selection
export const MultipleSelection = () => (
  <Accordion variant="card" allowMultiple={true} defaultOpenItems={[0, 2]} size="md">
    <Accordion.Item id={0} title="Personal Information" icon="👤">
      <div>
        <p>Your basic profile information and contact details.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>First Name</label>
            <input 
              type="text" 
              placeholder="John" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Last Name</label>
            <input 
              type="text" 
              placeholder="Doe" 
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }} 
            />
          </div>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item id={1} title="Contact Information" icon="📧">
      <div>
        <p>How we can reach you.</p>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
          <input 
            type="email" 
            placeholder="john@example.com" 
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }} 
          />
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone</label>
          <input 
            type="tel" 
            placeholder="+1 (555) 123-4567" 
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }} 
          />
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item id={2} title="Preferences" icon="⚙️" badge="3">
      <div>
        <p>Customize your experience.</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            <input type="checkbox" />
            <span>Dark mode</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            <input type="checkbox" defaultChecked />
            <span>Email notifications</span>
          </label>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}>
            <input type="checkbox" />
            <span>Marketing emails</span>
          </label>
        </div>
      </div>
    </Accordion.Item>
  </Accordion>
);

// Size Variants
export const SizeVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Small</h3>
      <Accordion variant="bordered" size="sm">
        <Accordion.Item id="small-1" title="Small Accordion" subtitle="Compact size" icon="📱">
          For sidebars or mobile interfaces where space is limited.
        </Accordion.Item>
        <Accordion.Item id="small-2" title="Another Small Item" icon="🔧">
          Still readable but takes up less space.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Medium (Default)</h3>
      <Accordion variant="bordered" size="md">
        <Accordion.Item id="medium-1" title="Medium Accordion" subtitle="Standard size" icon="💻">
          The default size that works well for most applications and provides good readability.
        </Accordion.Item>
        <Accordion.Item id="medium-2" title="Balanced Design" icon="⚖️">
          Good balance between content density and readability.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Large</h3>
      <Accordion variant="bordered" size="lg">
        <Accordion.Item id="large-1" title="Large Accordion" subtitle="Generous spacing" icon="🖥️">
          Larger size with more padding - for main content areas or when you want to emphasize the accordion.
        </Accordion.Item>
        <Accordion.Item id="large-2" title="Prominent Display" icon="⭐">
          For hero sections or primary navigation.
        </Accordion.Item>
      </Accordion>
    </div>
  </div>
);

// All Variants Showcase
export const AllVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Default</h3>
      <Accordion variant="default">
        <Accordion.Item id="default-1" title="Default Style" icon="📋">
          Clean and simple accordion with subtle borders.
        </Accordion.Item>
        <Accordion.Item id="default-2" title="Another Section" icon="📝">
          Works for most use cases.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Bordered</h3>
      <Accordion variant="bordered">
        <Accordion.Item id="bordered-1" title="Bordered Style" icon="🎯">
          Each item has its own border and spacing.
        </Accordion.Item>
        <Accordion.Item id="bordered-2" title="Separated Items" icon="📦">
          For distinct sections that need clear separation.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Minimal</h3>
      <Accordion variant="minimal">
        <Accordion.Item id="minimal-1" title="Minimal Style" icon="✨">
          Clean and understated design.
        </Accordion.Item>
        <Accordion.Item id="minimal-2" title="Less Is More" icon="🎨">
          For content-focused applications.
        </Accordion.Item>
      </Accordion>
    </div>
  </div>
);

// FAQ Example
export const FAQExample = () => (
  <Accordion variant="default" size="md">
    <Accordion.Item 
      id="faq-1" 
      title="How do I get started?"
      subtitle="New to our platform? Here's how to begin"
      icon="🚀"
    >
      <div>
        <p>Getting started is easy! Follow these simple steps:</p>
        <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Create your account by clicking the "Sign Up" button</li>
          <li>Verify your email address</li>
          <li>Complete your profile setup</li>
          <li>Start exploring our features with the guided tour</li>
        </ol>
        <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: '#f0f9ff', 
          borderRadius: '0.75rem',
          border: '1px solid #bae6fd'
        }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#0c4a6e' }}>
            <strong>💡 Need help?</strong> Our support team is available 24/7 to assist you.
          </p>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="faq-2" 
      title="What payment methods do you accept?"
      subtitle="Billing and payment information"
      icon="💳"
    >
      <div>
        <p>We accept all major payment methods:</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem', 
          marginTop: '1rem' 
        }}>
          <div style={{ 
            padding: '1rem', 
            background: '#f9fafb', 
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💳</div>
            <strong>Credit Cards</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Visa, MasterCard, Amex
            </p>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: '#f9fafb', 
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🅿️</div>
            <strong>PayPal</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Secure online payments
            </p>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: '#f9fafb', 
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏦</div>
            <strong>Bank Transfer</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
              For enterprise customers
            </p>
          </div>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="faq-3" 
      title="Can I cancel my subscription anytime?"
      subtitle="Subscription management"
      icon="🔄"
    >
      <div>
        <p>Yes! You can cancel your subscription at any time with no cancellation fees.</p>
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#f0fdf4', 
          borderRadius: '0.75rem',
          border: '1px solid #bbf7d0'
        }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#14532d' }}>
            <strong>💡 Tip:</strong> When you cancel, you'll still have access to all features until the end of your current billing period.
          </p>
        </div>
        <p style={{ marginTop: '1rem' }}>
          To cancel, go to <strong>Account Settings → Billing → Cancel Subscription</strong>.
        </p>
      </div>
    </Accordion.Item>
  </Accordion>
);

// Disabled Items
export const DisabledItems = () => (
  <Accordion variant="bordered">
    <Accordion.Item id="enabled-1" title="Available Feature" icon="✅">
      This feature is fully available and working.
    </Accordion.Item>
    
    <Accordion.Item id="disabled-1" title="Coming Soon Feature" icon="🚧" disabled={true}>
      This feature is currently in development.
    </Accordion.Item>
    
    <Accordion.Item id="enabled-2" title="Another Available Feature" icon="⚡">
      This one works too!
    </Accordion.Item>
    
    <Accordion.Item 
      id="disabled-2" 
      title="Premium Feature" 
      subtitle="Upgrade required" 
      icon="💎" 
      badge="Pro"
      disabled={true}
    >
      This feature requires a premium subscription.
    </Accordion.Item>
  </Accordion>
);