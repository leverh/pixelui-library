import { useState } from 'react';
import Header from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'floating', 'minimal', 'glass'],
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    showSearch: {
      control: 'boolean',
    },
    showNotifications: {
      control: 'boolean',
    },
    showProfile: {
      control: 'boolean',
    },
    showThemeToggle: {
      control: 'boolean',
    },
  },
};

// Sample data
const sampleNavigation = [
  { label: 'Dashboard', href: '#dashboard', icon: '📊', active: true },
  { label: 'Projects', href: '#projects', icon: '📁', badge: '12' },
  { label: 'Team', href: '#team', icon: '👥' },
  { label: 'Analytics', href: '#analytics', icon: '📈' },
  { label: 'Settings', href: '#settings', icon: '⚙️' }
];

const sampleBreadcrumbs = [
  { label: 'Dashboard', href: '#dashboard', icon: '🏠' },
  { label: 'Projects', href: '#projects', icon: '📁' },
  { label: 'Web App', href: '#project', icon: '🌐' },
  { label: 'Settings' }
];

const sampleNotifications = [
  {
    title: 'New message from Sarah',
    message: 'Hey! Just wanted to check on the progress of the new feature. Let me know when you have a moment to discuss.',
    time: '2 min ago',
    icon: '💬',
    read: false
  },
  {
    title: 'Project deployment successful',
    message: 'Your latest deployment to production has completed successfully. All systems are running normally.',
    time: '1 hour ago',
    icon: '🚀',
    read: false
  },
  {
    title: 'Weekly report ready',
    message: 'Your weekly analytics report is now available for download in the reports section.',
    time: '3 hours ago',
    icon: '📊',
    read: true
  },
  {
    title: 'Team meeting reminder',
    message: 'Don\'t forget about the team standup meeting at 2:00 PM today.',
    time: '5 hours ago',
    icon: '📅',
    read: true
  },
  {
    title: 'System maintenance scheduled',
    message: 'Scheduled maintenance will occur tonight from 11 PM to 1 AM EST.',
    time: '1 day ago',
    icon: '🔧',
    read: true
  }
];

const sampleUser = {
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Senior Developer',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
};

// Controlled wrapper component
const HeaderWrapper = (args) => {
  const [theme, setTheme] = useState(args.theme || 'light');
  
  const handleThemeToggle = (newTheme) => {
    setTheme(newTheme);
    console.log('Theme changed to:', newTheme);
  };
  
  const handleSearch = (searchTerm) => {
    console.log('Search:', searchTerm);
  };
  
  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };
  
  const handleProfileClick = (action) => {
    console.log('Profile action:', action);
  };
  
  const handleMenuToggle = (isOpen) => {
    console.log('Mobile menu toggled:', isOpen);
  };

  return (
    <div style={{ minHeight: '100vh', background: theme === 'dark' ? '#1f2937' : '#f8fafc' }}>
      <Header
        {...args}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onMenuToggle={handleMenuToggle}
        onCommandPalette={() => console.log('Command palette opened')}
      />
      
      {/* Demo Content */}
      <div style={{ 
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: args.position === 'static' ? '2rem' : '6rem'
      }}>
        <div style={{
          background: theme === 'dark' ? '#374151' : 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          color: theme === 'dark' ? 'white' : '#1f2937'
        }}>
          <h1 style={{ margin: '0 0 1rem 0', fontSize: '2rem', fontWeight: 'bold' }}>
            Header Component Demo
          </h1>
          <p style={{ 
            color: theme === 'dark' ? '#d1d5db' : '#6b7280', 
            lineHeight: '1.6', 
            marginBottom: '2rem' 
          }}>
            This header component showcases modern navigation patterns with smooth animations,
            responsive design, and interactive elements.
          </p>
          
          <div style={{ 
            background: theme === 'dark' ? '#4b5563' : '#f3f4f6', 
            padding: '1.5rem', 
            borderRadius: '0.75rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: theme === 'dark' ? 'white' : '#1f2937'
            }}>
              ✨ Interactive Features
            </h2>
            <ul style={{ 
              color: theme === 'dark' ? '#d1d5db' : '#6b7280', 
              lineHeight: '1.8',
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li>🔍 <strong>Morphing search bar</strong> - Click to expand and try searching</li>
              <li>⌘ <strong>Command palette</strong> - Press Cmd/Ctrl + K to open</li>
              <li>🔔 <strong>Notification center</strong> - Click the bell icon to see notifications</li>
              <li>👤 <strong>Profile dropdown</strong> - Click your avatar to see profile options</li>
              <li>🌙 <strong>Theme switcher</strong> - Toggle between light and dark themes</li>
              <li>📱 <strong>Mobile responsive</strong> - Resize your browser to see mobile layout</li>
              <li>🍞 <strong>Breadcrumb navigation</strong> - Animated path indicators</li>
            </ul>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: theme === 'dark' ? '#4b5563' : '#f8fafc',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: `1px solid ${theme === 'dark' ? '#6b7280' : '#e5e7eb'}`
            }}>
              <h3 style={{ 
                margin: '0 0 0.5rem 0', 
                color: theme === 'dark' ? 'white' : '#1f2937',
                fontSize: '1.1rem'
              }}>
                🎨 Visual Design
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: '0.875rem', 
                color: theme === 'dark' ? '#d1d5db' : '#6b7280' 
              }}>
                Modern gradients, smooth animations, and polished micro-interactions
              </p>
            </div>
            
            <div style={{
              background: theme === 'dark' ? '#4b5563' : '#f8fafc',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: `1px solid ${theme === 'dark' ? '#6b7280' : '#e5e7eb'}`
            }}>
              <h3 style={{ 
                margin: '0 0 0.5rem 0', 
                color: theme === 'dark' ? 'white' : '#1f2937',
                fontSize: '1.1rem'
              }}>
                📱 Responsive
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: '0.875rem', 
                color: theme === 'dark' ? '#d1d5db' : '#6b7280' 
              }}>
                Adapts seamlessly from desktop to mobile with hamburger menu
              </p>
            </div>
            
            <div style={{
              background: theme === 'dark' ? '#4b5563' : '#f8fafc',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: `1px solid ${theme === 'dark' ? '#6b7280' : '#e5e7eb'}`
            }}>
              <h3 style={{ 
                margin: '0 0 0.5rem 0', 
                color: theme === 'dark' ? 'white' : '#1f2937',
                fontSize: '1.1rem'
              }}>
                ⚡ Performance
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: '0.875rem', 
                color: theme === 'dark' ? '#d1d5db' : '#6b7280' 
              }}>
                Optimized animations and efficient state management
              </p>
            </div>
          </div>
          
          <p style={{ 
            fontSize: '0.875rem', 
            color: theme === 'dark' ? '#9ca3af' : '#9ca3af',
            fontStyle: 'italic'
          }}>
            Scroll down to see the sticky header behavior with backdrop blur effects...
          </p>
        </div>
        
        {/* Extra content to demonstrate scrolling */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              background: theme === 'dark' ? '#374151' : 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginTop: '2rem',
              color: theme === 'dark' ? 'white' : '#1f2937'
            }}
          >
            <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>
              Content Section {i + 1}
            </h2>
            <p style={{ 
              color: theme === 'dark' ? '#d1d5db' : '#6b7280', 
              lineHeight: '1.6', 
              margin: 0 
            }}>
              This is sample content to demonstrate the header's sticky behavior. 
              As you scroll, notice how the header adapts with subtle backdrop blur 
              effects and maintains its functionality.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Playground
export const Playground = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        fontWeight: 'bold',
        fontSize: '1.25rem'
      }}>
        <div style={{ 
          width: '2rem', 
          height: '2rem', 
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          A
        </div>
        Acme Corp
      </div>
    ),
    navigation: sampleNavigation,
    breadcrumbs: sampleBreadcrumbs,
    notifications: sampleNotifications,
    user: sampleUser,
    variant: 'default',
    position: 'sticky',
    showSearch: true,
    showNotifications: true,
    showProfile: true,
    showThemeToggle: true,
    theme: 'light',
  },
};

// Default Header
export const Default = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#1f2937' }}>
        🚀 Dashboard
      </div>
    ),
    navigation: sampleNavigation.slice(0, 3),
    notifications: sampleNotifications.slice(0, 3),
    user: sampleUser,
    variant: 'default',
    position: 'sticky',
  },
};

// Floating Variant
export const Floating = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        fontWeight: 'bold',
        color: '#1f2937'
      }}>
        ✨ Floating
      </div>
    ),
    navigation: sampleNavigation,
    breadcrumbs: sampleBreadcrumbs.slice(0, 2),
    notifications: sampleNotifications,
    user: sampleUser,
    variant: 'floating',
    position: 'sticky',
  },
};

// Glass Variant
export const Glass = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ 
        fontWeight: 'bold',
        color: '#1f2937',
        fontSize: '1.25rem'
      }}>
        🌟 Glass
      </div>
    ),
    navigation: sampleNavigation,
    notifications: sampleNotifications,
    user: sampleUser,
    variant: 'glass',
    position: 'sticky',
  },
};

// Minimal Variant
export const Minimal = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#6b7280' }}>
        Minimal
      </div>
    ),
    navigation: sampleNavigation.slice(0, 4),
    user: sampleUser,
    variant: 'minimal',
    position: 'sticky',
    showSearch: false,
    showThemeToggle: false,
  },
};

// With Breadcrumbs
export const WithBreadcrumbs = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        📍 Navigation
      </div>
    ),
    breadcrumbs: [
      { label: 'Home', href: '#', icon: '🏠' },
      { label: 'Projects', href: '#', icon: '📁' },
      { label: 'E-commerce Site', href: '#', icon: '🛒' },
      { label: 'Product Pages', href: '#', icon: '📄' },
      { label: 'Settings' }
    ],
    notifications: sampleNotifications,
    user: sampleUser,
    variant: 'default',
    position: 'sticky',
    showSearch: true,
  },
};

// Search Focus
export const SearchFocused = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        🔍 Search Demo
      </div>
    ),
    navigation: sampleNavigation.slice(0, 3),
    user: sampleUser,
    variant: 'default',
    position: 'sticky',
    showSearch: true,
    searchPlaceholder: 'Search projects, files, or press ⌘K...',
  },
};

// Notification Heavy
export const WithManyNotifications = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        🔔 Notifications
      </div>
    ),
    navigation: sampleNavigation.slice(0, 2),
    notifications: [
      ...sampleNotifications,
      {
        title: 'Code review requested',
        message: 'Please review the pull request for the authentication system updates.',
        time: '30 min ago',
        icon: '👀',
        read: false
      },
      {
        title: 'Database backup completed',
        message: 'Your scheduled database backup has completed successfully.',
        time: '2 hours ago',
        icon: '💾',
        read: false
      },
      {
        title: 'New team member joined',
        message: 'Alice Johnson has joined your development team.',
        time: '4 hours ago',
        icon: '👋',
        read: false
      }
    ],
    user: sampleUser,
    variant: 'default',
    position: 'sticky',
  },
};

// Dark Theme
export const DarkTheme = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        fontWeight: 'bold',
        color: '#f9fafb',
        fontSize: '1.25rem'
      }}>
        <div style={{ 
          width: '2rem', 
          height: '2rem', 
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          🌙
        </div>
        Dark Mode
      </div>
    ),
    navigation: sampleNavigation,
    breadcrumbs: sampleBreadcrumbs,
    notifications: sampleNotifications,
    user: sampleUser,
    variant: 'default',
    position: 'sticky',
    theme: 'dark',
  },
};

// Mobile Responsive
export const Mobile = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        📱 Mobile
      </div>
    ),
    navigation: sampleNavigation,
    notifications: sampleNotifications,
    user: sampleUser,
    variant: 'default',
    position: 'sticky',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Fixed Position
export const Fixed = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        📌 Fixed Header
      </div>
    ),
    navigation: sampleNavigation,
    notifications: sampleNotifications,
    user: sampleUser,
    variant: 'default',
    position: 'fixed',
  },
};

// No User Profile
export const NoProfile = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        Anonymous
      </div>
    ),
    navigation: sampleNavigation,
    notifications: sampleNotifications,
    user: null,
    variant: 'default',
    position: 'sticky',
    showProfile: false,
  },
};

// Simple Navigation Only
export const SimpleNav = {
  render: (args) => <HeaderWrapper {...args} />,
  args: {
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        Simple
      </div>
    ),
    navigation: [
      { label: 'Home', href: '#', active: true },
      { label: 'About', href: '#' },
      { label: 'Services', href: '#' },
      { label: 'Contact', href: '#' }
    ],
    variant: 'minimal',
    position: 'sticky',
    showSearch: false,
    showNotifications: false,
    showProfile: false,
    showThemeToggle: false,
  },
};