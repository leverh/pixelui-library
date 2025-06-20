import { useState } from 'react';
import Sidebar from './Sidebar';

export default {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'floating', 'minimal'],
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    collapsed: {
      control: 'boolean',
    },
    showSearch: {
      control: 'boolean',
    },
    showToggle: {
      control: 'boolean',
    },
    overlay: {
      control: 'boolean',
    },
    width: {
      control: 'number',
    },
    collapsedWidth: {
      control: 'number',
    },
  },
};

// Sample navigation data
const sampleNavigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    description: 'Overview and analytics'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '📁',
    badge: '12',
    children: [
      {
        id: 'active-projects',
        label: 'Active Projects',
        icon: '🟢',
        badge: '8'
      },
      {
        id: 'completed-projects',
        label: 'Completed',
        icon: '✅',
        badge: '24'
      },
      {
        id: 'archived-projects',
        label: 'Archived',
        icon: '📦'
      }
    ]
  },
  {
    id: 'team',
    label: 'Team',
    icon: '👥',
    children: [
      {
        id: 'team-members',
        label: 'Members',
        icon: '👤',
        badge: '15'
      },
      {
        id: 'team-roles',
        label: 'Roles & Permissions',
        icon: '🔐'
      },
      {
        id: 'team-departments',
        label: 'Departments',
        icon: '🏢',
        children: [
          {
            id: 'engineering',
            label: 'Engineering',
            icon: '⚙️',
            badge: '8'
          },
          {
            id: 'design',
            label: 'Design',
            icon: '🎨',
            badge: '4'
          },
          {
            id: 'marketing',
            label: 'Marketing',
            icon: '📢',
            badge: '3'
          }
        ]
      }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    description: 'Performance metrics',
    children: [
      {
        id: 'reports',
        label: 'Reports',
        icon: '📋'
      },
      {
        id: 'insights',
        label: 'Insights',
        icon: '💡',
        badge: 'New'
      }
    ]
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: '💬',
    badge: '5',
    description: 'Team communication'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: '📅',
    description: 'Schedule and events'
  },
  {
    id: 'files',
    label: 'Files',
    icon: '📄',
    description: 'Document management',
    children: [
      {
        id: 'recent-files',
        label: 'Recent',
        icon: '🕒'
      },
      {
        id: 'shared-files',
        label: 'Shared with me',
        icon: '🤝'
      },
      {
        id: 'starred-files',
        label: 'Starred',
        icon: '⭐'
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    children: [
      {
        id: 'account-settings',
        label: 'Account',
        icon: '👤'
      },
      {
        id: 'billing-settings',
        label: 'Billing',
        icon: '💳'
      },
      {
        id: 'security-settings',
        label: 'Security',
        icon: '🔒'
      },
      {
        id: 'integrations',
        label: 'Integrations',
        icon: '🔌',
        badge: '12'
      }
    ]
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: '❓',
    children: [
      {
        id: 'documentation',
        label: 'Documentation',
        icon: '📚'
      },
      {
        id: 'contact-support',
        label: 'Contact Support',
        icon: '💬'
      },
      {
        id: 'feature-requests',
        label: 'Feature Requests',
        icon: '💡'
      }
    ]
  }
];

// Simple navigation for basic examples
const simpleNavigation = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: 'ℹ️' },
  { id: 'services', label: 'Services', icon: '🛠️' },
  { id: 'contact', label: 'Contact', icon: '📞' }
];

// Controlled wrapper component
const SidebarWrapper = (args) => {
  const [collapsed, setCollapsed] = useState(args.collapsed || false);
  const [activeItem, setActiveItem] = useState(args.activeItem || 'dashboard');

  return (
    <div style={{ height: '100vh', position: 'relative', background: '#f8fafc' }}>
      <Sidebar
        {...args}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        activeItem={activeItem}
        onItemClick={(item) => {
          setActiveItem(item.id);
          console.log('Item clicked:', item);
        }}
        onSearch={(term) => console.log('Search:', term)}
      />
      
      {/* Main Content Area */}
      <div 
        style={{
          marginLeft: args.position === 'right' ? 0 : (collapsed ? `${args.collapsedWidth || 80}px` : `${args.width || 280}px`),
          marginRight: args.position === 'right' ? (collapsed ? `${args.collapsedWidth || 80}px` : `${args.width || 280}px`) : 0,
          padding: '2rem',
          transition: 'margin 0.3s ease',
          minHeight: '100vh'
        }}
      >
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          maxWidth: '800px'
        }}>
          <h1 style={{ margin: '0 0 1rem 0', fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' }}>
            Main Content Area
          </h1>
          <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            This is the main content area of the application. The sidebar will automatically adjust its behavior 
            based on screen size and user preferences.
          </p>
          
          <div style={{ 
            background: '#f3f4f6', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#374151'
          }}>
            <strong>Active Item:</strong> {activeItem}<br/>
            <strong>Sidebar State:</strong> {collapsed ? 'Collapsed' : 'Expanded'}
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
              Features Demonstrated:
            </h2>
            <ul style={{ color: '#6b7280', lineHeight: '1.8' }}>
              <li>🔍 <strong>Search functionality</strong> - Try searching for menu items</li>
              <li>🎯 <strong>Multi-level navigation</strong> - Expand Projects or Team sections</li>
              <li>📱 <strong>Responsive design</strong> - Resize your browser window</li>
              <li>⚡ <strong>Smooth animations</strong> - Notice the expand/collapse transitions</li>
              <li>🎨 <strong>Hover tooltips</strong> - Collapse the sidebar and hover over items</li>
              <li>🏷️ <strong>Badges and notifications</strong> - See the red notification badges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Playground
export const Playground = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    variant: 'default',
    position: 'left',
    collapsed: false,
    showSearch: true,
    showToggle: true,
    width: 280,
    collapsedWidth: 80,
    activeItem: 'dashboard',
    logo: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
        <span>Acme Corp</span>
      </div>
    ),
    footer: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem',
        padding: '0.75rem',
        background: '#f9fafb',
        borderRadius: '0.5rem'
      }}>
        <div style={{
          width: '2rem',
          height: '2rem',
          background: '#e5e7eb',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          👤
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>John Doe</div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>john@acme.com</div>
        </div>
      </div>
    )
  },
};

// Default Sidebar
export const Default = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    variant: 'default',
    activeItem: 'dashboard',
    logo: (
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#1f2937' }}>
        🚀 Dashboard
      </div>
    )
  },
};

// Floating Variant
export const Floating = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    variant: 'floating',
    activeItem: 'projects',
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
    )
  },
};

// Minimal Variant
export const Minimal = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    variant: 'minimal',
    activeItem: 'analytics',
    showSearch: false,
    logo: (
      <div style={{ fontWeight: 'bold', color: '#6b7280' }}>
        Minimal
      </div>
    )
  },
};

// Collapsed State
export const Collapsed = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    collapsed: true,
    activeItem: 'messages',
    logo: <div style={{ fontSize: '1.5rem' }}>🎯</div>
  },
};

// Right Position
export const RightPosition = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    position: 'right',
    activeItem: 'team',
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        📍 Right Side
      </div>
    )
  },
};

// Simple Navigation
export const Simple = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: simpleNavigation,
    variant: 'default',
    activeItem: 'home',
    showSearch: false,
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        Simple Nav
      </div>
    )
  },
};

// Mobile Overlay
export const MobileOverlay = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    overlay: true,
    activeItem: 'calendar',
    onOverlayClick: () => console.log('Overlay clicked'),
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        📱 Mobile
      </div>
    )
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// Without Search
export const NoSearch = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    showSearch: false,
    activeItem: 'files',
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        No Search
      </div>
    )
  },
};

// Custom Width
export const CustomWidth = {
  render: (args) => <SidebarWrapper {...args} />,
  args: {
    items: sampleNavigation,
    width: 350,
    collapsedWidth: 60,
    activeItem: 'settings',
    logo: (
      <div style={{ fontWeight: 'bold', color: '#1f2937' }}>
        Wide Sidebar
      </div>
    )
  },
};