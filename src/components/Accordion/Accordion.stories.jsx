import Accordion from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: 'A flexible accordion component with multiple variants, sizes, and customization options. Perfect for organizing content in collapsible sections.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'shadow', 'split', 'minimal', 'card']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    allowMultiple: {
      control: 'boolean'
    },
    collapsible: {
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

The accordion smoothly animates between open and closed states, providing a pleasant user experience.`
};

// Default story
export const Default = {
  args: {
    variant: 'default',
    size: 'medium',
    allowMultiple: false,
    collapsible: true,
    defaultOpenItems: [0]
  },
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item id={0} title="Getting Started">
        {sampleContent.medium}
      </Accordion.Item>
      <Accordion.Item id={1} title="Advanced Features">
        {sampleContent.long}
      </Accordion.Item>
      <Accordion.Item id={2} title="FAQ">
        {sampleContent.short}
      </Accordion.Item>
    </Accordion>
  )
};

// Basic accordion with subtitles
export const WithSubtitles = () => (
  <Accordion variant="default" size="medium">
    <Accordion.Item 
      id="account" 
      title="Account Settings"
      subtitle="Manage your profile and account preferences"
    >
      <div>
        <p>Update your personal information, change your password, and manage your account settings.</p>
        <ul>
          <li>Profile information</li>
          <li>Security settings</li>
          <li>Privacy preferences</li>
        </ul>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="billing" 
      title="Billing & Payments"
      subtitle="View invoices and manage payment methods"
    >
      <div>
        <p>Access your billing history and manage your payment methods.</p>
        <button style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc' }}>
          View Billing History
        </button>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="notifications" 
      title="Notifications"
      subtitle="Control how and when you receive notifications"
    >
      <div>
        <p>Configure your notification preferences for email, push notifications, and in-app alerts.</p>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" defaultChecked />
            Email notifications
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input type="checkbox" />
            Push notifications
          </label>
        </div>
      </div>
    </Accordion.Item>
  </Accordion>
);

// Multiple selection accordion
export const MultipleSelection = () => (
  <Accordion variant="bordered" allowMultiple={true} defaultOpenItems={[0, 2]}>
    <Accordion.Item id={0} title="Personal Information">
      <div>
        <p>Your basic profile information and contact details.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>First Name</label>
            <input type="text" placeholder="John" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Last Name</label>
            <input type="text" placeholder="Doe" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }} />
          </div>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item id={1} title="Contact Information">
      <div>
        <p>How we can reach you.</p>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Email</label>
          <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginBottom: '1rem' }} />
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Phone</label>
          <input type="tel" placeholder="+1 (555) 123-4567" style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }} />
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item id={2} title="Preferences">
      <div>
        <p>Customize your experience.</p>
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input type="checkbox" style={{ marginRight: '0.5rem' }} />
            Dark mode
          </label>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
            Email notifications
          </label>
          <label style={{ display: 'block' }}>
            <input type="checkbox" style={{ marginRight: '0.5rem' }} />
            Marketing emails
          </label>
        </div>
      </div>
    </Accordion.Item>
  </Accordion>
);

// Accordion with custom toggles and icons
export const CustomToggles = () => (
  <Accordion variant="shadow" size="large">
    <Accordion.Item 
      id="dashboard" 
      title="Dashboard"
      icon="📊"
      customToggle={<span style={{ fontSize: '1.5rem' }}>⊞</span>}
    >
      <div>
        <p>Your main dashboard with key metrics and recent activity.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0369a1' }}>1,234</div>
            <div style={{ fontSize: '0.875rem', color: '#075985' }}>Total Users</div>
          </div>
          <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#15803d' }}>$12,345</div>
            <div style={{ fontSize: '0.875rem', color: '#166534' }}>Revenue</div>
          </div>
          <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>98.5%</div>
            <div style={{ fontSize: '0.875rem', color: '#92400e' }}>Uptime</div>
          </div>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="analytics" 
      title="Analytics"
      icon="📈"
      customToggle={<span style={{ fontSize: '1.5rem' }}>⊞</span>}
    >
      <div>
        <p>Detailed analytics and reporting for your application.</p>
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Quick Actions</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #3b82f6', color: '#3b82f6', background: 'white', borderRadius: '0.25rem' }}>
              Export Data
            </button>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #10b981', color: '#10b981', background: 'white', borderRadius: '0.25rem' }}>
              Generate Report
            </button>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #f59e0b', color: '#f59e0b', background: 'white', borderRadius: '0.25rem' }}>
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="settings" 
      title="Settings"
      icon="⚙️"
      customToggle={<span style={{ fontSize: '1.5rem' }}>⊞</span>}
    >
      <div>
        <p>System configuration and preferences.</p>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span>Auto-save</span>
            <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
              <input type="checkbox" style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{ 
                position: 'absolute', 
                cursor: 'pointer', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: '#ccc', 
                borderRadius: '1.5rem',
                transition: '0.4s'
              }}></span>
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Theme</span>
            <select style={{ padding: '0.25rem 0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>
        </div>
      </div>
    </Accordion.Item>
  </Accordion>
);

// Variant showcase
export const VariantShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Default</h3>
      <Accordion variant="default">
        <Accordion.Item id="default-1" title="Default Style">
          Clean and simple accordion with subtle borders.
        </Accordion.Item>
        <Accordion.Item id="default-2" title="Another Section">
          Works great for most use cases.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Bordered</h3>
      <Accordion variant="bordered">
        <Accordion.Item id="bordered-1" title="Bordered Style">
          Each item has its own border and spacing.
        </Accordion.Item>
        <Accordion.Item id="bordered-2" title="Separated Items">
          Perfect for distinct sections that need clear separation.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Shadow</h3>
      <Accordion variant="shadow">
        <Accordion.Item id="shadow-1" title="Shadow Style">
          Elevated appearance with subtle shadows.
        </Accordion.Item>
        <Accordion.Item id="shadow-2" title="Modern Look">
          Great for modern interfaces and cards.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Split</h3>
      <Accordion variant="split">
        <Accordion.Item id="split-1" title="Split Style">
          Headers have different background from content.
        </Accordion.Item>
        <Accordion.Item id="split-2" title="Clear Distinction">
          Makes it easy to distinguish headers from content.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Minimal</h3>
      <Accordion variant="minimal">
        <Accordion.Item id="minimal-1" title="Minimal Style">
          Clean and understated design.
        </Accordion.Item>
        <Accordion.Item id="minimal-2" title="Less Is More">
          Perfect for content-focused applications.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Card</h3>
      <Accordion variant="card">
        <Accordion.Item id="card-1" title="Card Style">
          Nested card appearance with rounded corners.
        </Accordion.Item>
        <Accordion.Item id="card-2" title="Layered Design">
          Great for dashboard interfaces.
        </Accordion.Item>
      </Accordion>
    </div>
  </div>
);

// Size variants
export const SizeVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Small</h3>
      <Accordion variant="bordered" size="small">
        <Accordion.Item id="small-1" title="Small Accordion" subtitle="Compact size for tight spaces">
          Perfect for sidebars or mobile interfaces where space is limited.
        </Accordion.Item>
        <Accordion.Item id="small-2" title="Another Small Item">
          Still readable but takes up less space.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Medium (Default)</h3>
      <Accordion variant="bordered" size="medium">
        <Accordion.Item id="medium-1" title="Medium Accordion" subtitle="Standard size for most use cases">
          The default size that works well for most applications and provides good readability.
        </Accordion.Item>
        <Accordion.Item id="medium-2" title="Balanced Design">
          Good balance between content density and readability.
        </Accordion.Item>
      </Accordion>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Large</h3>
      <Accordion variant="bordered" size="large">
        <Accordion.Item id="large-1" title="Large Accordion" subtitle="Generous spacing for important content">
          Larger size with more padding, perfect for main content areas or when you want to emphasize the accordion.
        </Accordion.Item>
        <Accordion.Item id="large-2" title="Prominent Display">
          Great for hero sections or primary navigation.
        </Accordion.Item>
      </Accordion>
    </div>
  </div>
);

// FAQ Example
export const FAQExample = () => (
  <Accordion variant="default" size="medium">
    <Accordion.Item 
      id="faq-1" 
      title="How do I get started?"
      subtitle="New to our platform? Here's how to begin"
    >
      <div>
        <p>Getting started is easy! Follow these simple steps:</p>
        <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
          <li>Create your account by clicking the "Sign Up" button</li>
          <li>Verify your email address</li>
          <li>Complete your profile setup</li>
          <li>Start exploring our features with the guided tour</li>
        </ol>
        <p style={{ marginTop: '1rem' }}>
          <strong>Need help?</strong> Our support team is available 24/7 to assist you.
        </p>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="faq-2" 
      title="What payment methods do you accept?"
      subtitle="Billing and payment information"
    >
      <div>
        <p>We accept all major payment methods:</p>
        <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
          <li>Credit Cards (Visa, MasterCard, American Express)</li>
          <li>PayPal</li>
          <li>Bank transfers (for enterprise customers)</li>
          <li>Cryptocurrency (Bitcoin, Ethereum)</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          All payments are processed securely and encrypted. We don't store your payment information on our servers.
        </p>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="faq-3" 
      title="Can I cancel my subscription anytime?"
      subtitle="Subscription management"
    >
      <div>
        <p>Yes! You can cancel your subscription at any time with no cancellation fees.</p>
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#0c4a6e' }}>
            <strong>💡 Pro tip:</strong> When you cancel, you'll still have access to all features until the end of your current billing period.
          </p>
        </div>
        <p style={{ marginTop: '1rem' }}>
          To cancel, go to Account Settings → Billing → Cancel Subscription.
        </p>
      </div>
    </Accordion.Item>
    
    <Accordion.Item 
      id="faq-4" 
      title="Is my data secure?"
      subtitle="Privacy and security information"
    >
      <div>
        <p>Absolutely! We take data security very seriously and implement industry-standard security measures:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#15803d' }}>🔒 Encryption</h4>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>End-to-end encryption for all data</p>
          </div>
          <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fde68a' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#d97706' }}>🛡️ Compliance</h4>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>GDPR, CCPA, and SOC 2 compliant</p>
          </div>
        </div>
      </div>
    </Accordion.Item>
  </Accordion>
);

// Disabled items example
export const DisabledItems = () => (
  <Accordion variant="bordered">
    <Accordion.Item id="enabled-1" title="Available Feature">
      This feature is fully available and working.
    </Accordion.Item>
    
    <Accordion.Item id="disabled-1" title="Coming Soon Feature" disabled={true}>
      This feature is currently in development.
    </Accordion.Item>
    
    <Accordion.Item id="enabled-2" title="Another Available Feature">
      This one works too!
    </Accordion.Item>
    
    <Accordion.Item id="disabled-2" title="Premium Feature" subtitle="Upgrade required" disabled={true}>
      This feature requires a premium subscription.
    </Accordion.Item>
  </Accordion>
);

// Interactive Playground
export const Playground = {
  args: {
    variant: 'default',
    size: 'medium',
    allowMultiple: false,
    collapsible: true,
    defaultOpenItems: []
  },
  render: (args) => (
    <Accordion {...args} onChange={(openItems) => console.log('Open items:', openItems)}>
      <Accordion.Item 
        id="playground-1" 
        title="First Section"
        subtitle="This is a subtitle"
        icon="📝"
      >
        <div>
          <p>This is the content of the first accordion item.</p>
          <p>You can customize the variant, size, and behavior using the controls.</p>
        </div>
      </Accordion.Item>
      
      <Accordion.Item 
        id="playground-2" 
        title="Second Section"
        subtitle="Another subtitle here"
        icon="🎨"
      >
        <div>
          <p>This is the second accordion item with different content.</p>
          <ul>
            <li>Try different variants</li>
            <li>Change the size</li>
            <li>Toggle multiple selection</li>
          </ul>
        </div>
      </Accordion.Item>
      
      <Accordion.Item 
        id="playground-3" 
        title="Third Section"
        icon="🚀"
      >
        <div>
          <p>The third item shows how the accordion handles various content types.</p>
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '0.5rem' }}>
            <code>console.log('Accordion is awesome!');</code>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  )
};