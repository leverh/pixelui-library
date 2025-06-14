import Tabs from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    defaultTab: {
      control: 'number',
    },
  },
};

// Sample content for demos
const sampleContent = {
  dashboard: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#171717', margin: 0 }}>
        Dashboard Overview
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', 
          padding: '1.5rem', 
          borderRadius: '0.75rem' 
        }}>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#2563eb' }}>1,234</div>
          <div style={{ fontSize: '0.875rem', color: '#1d4ed8' }}>Total Users</div>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', 
          padding: '1.5rem', 
          borderRadius: '0.75rem' 
        }}>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#16a34a' }}>$45,678</div>
          <div style={{ fontSize: '0.875rem', color: '#15803d' }}>Revenue</div>
        </div>
        <div style={{ 
          background: 'linear-gradient(135deg, #f3e8ff, #e9d5ff)', 
          padding: '1.5rem', 
          borderRadius: '0.75rem' 
        }}>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#9333ea' }}>89%</div>
          <div style={{ fontSize: '0.875rem', color: '#7c3aed' }}>Satisfaction</div>
        </div>
      </div>
      <p style={{ color: '#525252', lineHeight: '1.625', margin: 0 }}>
        Your dashboard shows strong performance across all key metrics. Revenue is up 12% from last month.
      </p>
    </div>
  ),
  analytics: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#171717', margin: 0 }}>
        Analytics Deep Dive
      </h3>
      <div style={{ 
        background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', 
        padding: '1.5rem', 
        borderRadius: '0.75rem',
        border: '1px solid #c7d2fe'
      }}>
        <h4 style={{ fontWeight: '600', color: '#312e81', marginBottom: '0.75rem', marginTop: 0 }}>
          Traffic Sources
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#404040' }}>Organic Search</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '6rem', 
                height: '0.5rem', 
                backgroundColor: '#c7d2fe', 
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '75%', 
                  height: '100%', 
                  backgroundColor: '#6366f1', 
                  borderRadius: '9999px' 
                }}></div>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>75%</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#404040' }}>Social Media</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '6rem', 
                height: '0.5rem', 
                backgroundColor: '#c7d2fe', 
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: '50%', 
                  height: '100%', 
                  backgroundColor: '#6366f1', 
                  borderRadius: '9999px' 
                }}></div>
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>50%</span>
            </div>
          </div>
        </div>
      </div>
      <p style={{ color: '#525252', lineHeight: '1.625', margin: 0 }}>
        Detailed analytics show strong organic growth with opportunities in social media channels.
      </p>
    </div>
  ),
  settings: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#171717', margin: 0 }}>
        Settings & Preferences
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '1rem', 
          backgroundColor: '#fafafa', 
          borderRadius: '0.75rem' 
        }}>
          <div>
            <h4 style={{ fontWeight: '500', color: '#171717', margin: 0, marginBottom: '0.25rem' }}>
              Email Notifications
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#525252', margin: 0 }}>
              Receive updates about your account
            </p>
          </div>
          <div style={{ 
            width: '3rem', 
            height: '1.5rem', 
            backgroundColor: '#3b82f6', 
            borderRadius: '9999px',
            position: 'relative',
            cursor: 'pointer'
          }}>
            <div style={{ 
              width: '1.25rem', 
              height: '1.25rem', 
              backgroundColor: 'white', 
              borderRadius: '50%',
              position: 'absolute',
              top: '0.125rem',
              right: '0.125rem'
            }}></div>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '1rem', 
          backgroundColor: '#fafafa', 
          borderRadius: '0.75rem' 
        }}>
          <div>
            <h4 style={{ fontWeight: '500', color: '#171717', margin: 0, marginBottom: '0.25rem' }}>
              Dark Mode
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#525252', margin: 0 }}>
              Switch to dark theme
            </p>
          </div>
          <div style={{ 
            width: '3rem', 
            height: '1.5rem', 
            backgroundColor: '#d4d4d4', 
            borderRadius: '9999px',
            position: 'relative',
            cursor: 'pointer'
          }}>
            <div style={{ 
              width: '1.25rem', 
              height: '1.25rem', 
              backgroundColor: 'white', 
              borderRadius: '50%',
              position: 'absolute',
              top: '0.125rem',
              left: '0.125rem'
            }}></div>
          </div>
        </div>
      </div>
      <p style={{ color: '#525252', lineHeight: '1.625', margin: 0 }}>
        Customize your experience with these preference settings.
      </p>
    </div>
  ),
  help: (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#171717', margin: 0 }}>
        Help & Support
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, #fefce8, #fef3c7)', 
          borderRadius: '0.75rem',
          border: '1px solid #fde047'
        }}>
          <h4 style={{ fontWeight: '600', color: '#92400e', marginBottom: '0.5rem', marginTop: 0 }}>
            📚 Documentation
          </h4>
          <p style={{ fontSize: '0.875rem', color: '#a16207', margin: 0 }}>
            Comprehensive guides and tutorials
          </p>
        </div>
        <div style={{ 
          padding: '1.5rem', 
          background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', 
          borderRadius: '0.75rem',
          border: '1px solid #34d399'
        }}>
          <h4 style={{ fontWeight: '600', color: '#065f46', marginBottom: '0.5rem', marginTop: 0 }}>
            💬 Live Chat
          </h4>
          <p style={{ fontSize: '0.875rem', color: '#047857', margin: 0 }}>
            Get instant help from our support team
          </p>
        </div>
      </div>
      <p style={{ color: '#525252', lineHeight: '1.625', margin: 0 }}>
        Need assistance? Choose from our support options above or browse our FAQ section.
      </p>
    </div>
  )
};

// Basic tabs data
const basicTabs = [
  {
    label: 'Dashboard',
    icon: '📊',
    content: sampleContent.dashboard
  },
  {
    label: 'Analytics',
    icon: '📈',
    badge: '2',
    content: sampleContent.analytics
  },
  {
    label: 'Settings',
    icon: '⚙️',
    content: sampleContent.settings
  },
  {
    label: 'Help',
    icon: '❓',
    content: sampleContent.help
  }
];

// Without icons or badges
const simpleTabs = [
  { label: 'Overview', content: sampleContent.dashboard },
  { label: 'Details', content: sampleContent.analytics },
  { label: 'Configuration', content: sampleContent.settings }
];

// Default story
export const Default = {
  args: {
    tabs: basicTabs,
    variant: 'default',
    size: 'md',
    defaultTab: 0
  }
};

// Pills variant
export const Pills = {
  args: {
    tabs: basicTabs,
    variant: 'pills',
    size: 'md',
    defaultTab: 0
  }
};

// Underline variant
export const Underline = {
  args: {
    tabs: basicTabs,
    variant: 'underline',
    size: 'md',
    defaultTab: 0
  }
};

// Small size
export const Small = {
  args: {
    tabs: simpleTabs,
    variant: 'default',
    size: 'sm',
    defaultTab: 0
  }
};

// Large size
export const Large = {
  args: {
    tabs: simpleTabs,
    variant: 'pills',
    size: 'lg',
    defaultTab: 0
  }
};

// Without icons
export const SimpleText = {
  args: {
    tabs: simpleTabs,
    variant: 'underline',
    size: 'md',
    defaultTab: 0
  }
};

// With badges and notifications
export const WithBadges = {
  args: {
    tabs: [
      { label: 'Inbox', badge: '12', content: sampleContent.dashboard },
      { label: 'Sent', content: sampleContent.analytics },
      { label: 'Drafts', badge: '3', content: sampleContent.settings },
      { label: 'Spam', badge: '99+', content: sampleContent.help }
    ],
    variant: 'pills',
    size: 'md',
    defaultTab: 0
  }
};

// Playground
export const Playground = {
  args: {
    tabs: basicTabs,
    variant: 'default',
    size: 'md',
    defaultTab: 0
  }
};