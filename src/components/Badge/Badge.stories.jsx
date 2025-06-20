import { useState } from 'react';
import Badge from './Badge';

// Enhanced icons
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21.02 12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const FireIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
  </svg>
);

const BoltIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

export default {
  title: 'Components/Display/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'A modern, animated badge component with gradient backgrounds, smooth interactions, and premium visual effects. Perfect for status indicators, labels, and notifications.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    interactive: {
      control: 'boolean'
    },
    removable: {
      control: 'boolean'
    },
    dot: {
      control: 'boolean'
    },
    pulse: {
      control: 'boolean'
    }
  }
};

// Playground - Interactive story
export const Playground = {
  args: {
    children: 'Custom Badge',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    interactive: false,
    removable: false,
    dot: false,
    pulse: false
  },
  render: (args) => (
    <Badge 
      {...args} 
      onClick={args.interactive ? () => console.log('Badge clicked!') : undefined}
      onRemove={args.removable ? () => console.log('Badge removed!') : undefined}
    />
  )
};

// Default badge
export const Default = {
  args: {
    children: 'Badge'
  }
};

// All sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Badge size={size}>
          {size.toUpperCase()}
        </Badge>
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6b7280', textTransform: 'uppercase' }}>
          {size}
        </div>
      </div>
    ))}
  </div>
);

// Color variants
export const Colors = () => (
  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
    {['primary', 'secondary', 'success', 'warning', 'error', 'info'].map(color => (
      <Badge key={color} color={color} size="md">
        {color.charAt(0).toUpperCase() + color.slice(1)}
      </Badge>
    ))}
  </div>
);

// Style variants showcase
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Solid</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge variant="solid" color="primary">Primary</Badge>
        <Badge variant="solid" color="success">Success</Badge>
        <Badge variant="solid" color="warning">Warning</Badge>
        <Badge variant="solid" color="error">Error</Badge>
        <Badge variant="solid" color="info">Info</Badge>
        <Badge variant="solid" color="secondary">Secondary</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Outline</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge variant="outline" color="primary">Primary</Badge>
        <Badge variant="outline" color="success">Success</Badge>
        <Badge variant="outline" color="warning">Warning</Badge>
        <Badge variant="outline" color="error">Error</Badge>
        <Badge variant="outline" color="info">Info</Badge>
        <Badge variant="outline" color="secondary">Secondary</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Soft</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge variant="soft" color="primary">Primary</Badge>
        <Badge variant="soft" color="success">Success</Badge>
        <Badge variant="soft" color="warning">Warning</Badge>
        <Badge variant="soft" color="error">Error</Badge>
        <Badge variant="soft" color="info">Info</Badge>
        <Badge variant="soft" color="secondary">Secondary</Badge>
      </div>
    </div>
  </div>
);

// With icons
export const WithIcons = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Left Icons</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge leftIcon={<StarIcon />} color="warning">Featured</Badge>
        <Badge leftIcon={<UserIcon />} color="info">Admin</Badge>
        <Badge leftIcon={<FireIcon />} color="error">Hot</Badge>
        <Badge leftIcon={<BoltIcon />} color="primary">Fast</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Right Icons</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge rightIcon={<CheckIcon />} color="success" variant="soft">Verified</Badge>
        <Badge rightIcon={<StarIcon />} color="warning" variant="outline">Premium</Badge>
        <Badge rightIcon={<HeartIcon />} color="error" variant="soft">Favorite</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Both Icons</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge leftIcon={<UserIcon />} rightIcon={<CheckIcon />} color="primary" size="lg">
          Super Admin
        </Badge>
        <Badge leftIcon={<FireIcon />} rightIcon={<BoltIcon />} color="error" size="lg">
          Power User
        </Badge>
      </div>
    </div>
  </div>
);

// Interactive badges
export const Interactive = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Clickable Badges</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge 
          interactive 
          onClick={() => alert('Filter applied!')}
          color="primary"
          leftIcon={<CheckIcon />}
        >
          Active Filter
        </Badge>
        <Badge 
          interactive 
          onClick={() => alert('Tag selected!')}
          variant="outline"
          color="info"
        >
          React
        </Badge>
        <Badge 
          interactive 
          onClick={() => alert('Category clicked!')}
          variant="soft"
          color="success"
          leftIcon={<StarIcon />}
        >
          Popular
        </Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Hover Effects</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge interactive color="primary" size="lg">Hover me - Solid</Badge>
        <Badge interactive variant="outline" color="success" size="lg">Hover me - Outline</Badge>
        <Badge interactive variant="soft" color="warning" size="lg">Hover me - Soft</Badge>
      </div>
    </div>
  </div>
);

// Removable badges
export const Removable = () => {
  const [badges, setBadges] = useState([
    { id: 1, label: 'React', color: 'primary', variant: 'soft' },
    { id: 2, label: 'TypeScript', color: 'info', variant: 'soft' },
    { id: 3, label: 'JavaScript', color: 'warning', variant: 'soft' },
    { id: 4, label: 'CSS', color: 'success', variant: 'soft' },
    { id: 5, label: 'HTML', color: 'secondary', variant: 'soft' }
  ]);

  const removeBadge = (id) => {
    setBadges(badges.filter(badge => badge.id !== id));
  };

  const resetBadges = () => {
    setBadges([
      { id: 1, label: 'React', color: 'primary', variant: 'soft' },
      { id: 2, label: 'TypeScript', color: 'info', variant: 'soft' },
      { id: 3, label: 'JavaScript', color: 'warning', variant: 'soft' },
      { id: 4, label: 'CSS', color: 'success', variant: 'soft' },
      { id: 5, label: 'HTML', color: 'secondary', variant: 'soft' }
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {badges.map(badge => (
            <Badge
              key={badge.id}
              removable
              onRemove={() => removeBadge(badge.id)}
              color={badge.color}
              variant={badge.variant}
              size="md"
            >
              {badge.label}
            </Badge>
          ))}
        </div>
        {badges.length === 0 && (
          <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
            All badges removed! Click the button below to reset.
          </p>
        )}
        <button
          onClick={resetBadges}
          style={{
            padding: '0.5rem 1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          Reset Badges
        </button>
      </div>
    </div>
  );
};

// With dot indicator
export const WithDot = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Dot Indicators</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Badge dot variant="soft" color="primary">Notifications</Badge>
        <Badge dot variant="outline" color="success">Messages</Badge>
        <Badge dot color="warning">Alerts</Badge>
        <Badge dot variant="soft" color="info">Updates</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>With Icons and Dots</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Badge dot leftIcon={<UserIcon />} variant="soft" color="primary">Admin Panel</Badge>
        <Badge dot leftIcon={<StarIcon />} variant="outline" color="warning">Favorites</Badge>
        <Badge dot rightIcon={<CheckIcon />} color="success">Completed</Badge>
      </div>
    </div>
  </div>
);

// Pulse animation
export const WithPulse = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Pulsing Badges</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Badge pulse color="error">Live</Badge>
        <Badge pulse color="success" variant="soft">Online</Badge>
        <Badge pulse color="warning" leftIcon={<FireIcon />}>Hot</Badge>
        <Badge pulse dot color="primary">New</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Pulse + Interactive</h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Badge 
          pulse 
          interactive 
          color="error" 
          leftIcon={<BoltIcon />}
          onClick={() => alert('Emergency clicked!')}
        >
          Emergency
        </Badge>
        <Badge 
          pulse 
          interactive 
          color="success" 
          variant="soft"
          onClick={() => alert('Available clicked!')}
        >
          Available
        </Badge>
      </div>
    </div>
  </div>
);

// Status indicators
export const StatusIndicators = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Order Status</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge color="warning" variant="soft" leftIcon={<UserIcon />}>Pending</Badge>
        <Badge color="info" variant="soft" leftIcon={<BoltIcon />}>Processing</Badge>
        <Badge color="primary" leftIcon={<CheckIcon />}>Shipped</Badge>
        <Badge color="success" leftIcon={<CheckIcon />}>Delivered</Badge>
        <Badge color="error" variant="outline">Cancelled</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>User Roles</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge color="error" leftIcon={<StarIcon />} size="lg">Super Admin</Badge>
        <Badge color="primary" leftIcon={<UserIcon />} size="md">Admin</Badge>
        <Badge color="info" leftIcon={<UserIcon />} variant="soft" size="md">Moderator</Badge>
        <Badge color="secondary" leftIcon={<UserIcon />} variant="outline" size="md">User</Badge>
        <Badge color="warning" leftIcon={<StarIcon />} variant="soft" size="sm">VIP</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Priority Levels</h4>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Badge color="error" pulse leftIcon={<FireIcon />}>Critical</Badge>
        <Badge color="warning" leftIcon={<BoltIcon />}>High</Badge>
        <Badge color="info" variant="soft">Medium</Badge>
        <Badge color="secondary" variant="outline">Low</Badge>
      </div>
    </div>
  </div>
);

// Notification badges
export const NotificationBadges = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Button Notifications</h4>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative' }}>
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#f3f4f6', 
            border: '1px solid #d1d5db', 
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Messages
          </button>
          <Badge 
            size="xs" 
            color="error" 
            style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px' 
            }}
          >
            3
          </Badge>
        </div>
        
        <div style={{ position: 'relative' }}>
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#f3f4f6', 
            border: '1px solid #d1d5db', 
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Notifications
          </button>
          <Badge 
            size="xs" 
            color="error"
            pulse
            style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px' 
            }}
          >
            12
          </Badge>
        </div>
        
        <div style={{ position: 'relative' }}>
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#f3f4f6', 
            border: '1px solid #d1d5db', 
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            Cart
          </button>
          <Badge 
            size="xs" 
            color="success"
            style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px' 
            }}
          >
            99+
          </Badge>
        </div>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Tab Notifications</h4>
      <div style={{ 
        display: 'flex', 
        background: '#f9fafb', 
        borderRadius: '0.75rem', 
        padding: '0.25rem',
        gap: '0.25rem',
        maxWidth: 'fit-content'
      }}>
        {[
          { label: 'Dashboard', count: null },
          { label: 'Messages', count: 5 },
          { label: 'Tasks', count: 12 },
          { label: 'Settings', count: null }
        ].map((tab, index) => (
          <div
            key={tab.label}
            style={{
              position: 'relative',
              padding: '0.75rem 1rem',
              background: index === 1 ? 'white' : 'transparent',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: index === 1 ? '#1f2937' : '#6b7280'
            }}
          >
            {tab.label}
            {tab.count && (
              <Badge 
                size="xs" 
                color="error"
                style={{ 
                  position: 'absolute', 
                  top: '0.25rem', 
                  right: '0.25rem' 
                }}
              >
                {tab.count}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Real-world examples
export const RealWorldExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>E-commerce Product Tags</h4>
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h5 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '600' }}>
          Premium Wireless Headphones
        </h5>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Badge color="error" pulse leftIcon={<FireIcon />}>Hot Deal</Badge>
          <Badge color="success" leftIcon={<CheckIcon />}>Free Shipping</Badge>
          <Badge color="warning" variant="soft">Limited Stock</Badge>
          <Badge color="info" variant="outline">4.8★ Rated</Badge>
          <Badge color="primary" variant="soft">Best Seller</Badge>
        </div>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
          Premium quality headphones with active noise cancellation and 30-hour battery life.
        </p>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>Project Management</h4>
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Website Redesign</h5>
            <Badge color="info" variant="soft">In Progress</Badge>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge size="sm" color="primary" variant="soft" leftIcon={<UserIcon />}>Frontend</Badge>
            <Badge size="sm" color="success" variant="soft" leftIcon={<CheckIcon />}>Design</Badge>
            <Badge size="sm" color="warning" variant="outline">High Priority</Badge>
            <Badge size="sm" color="secondary" removable>React</Badge>
            <Badge size="sm" color="secondary" removable>TypeScript</Badge>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>User Dashboard</h4>
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
              Welcome back, Sarah!
            </h5>
            <p style={{ color: '#6b7280', margin: 0 }}>Here's what's happening with your account</p>
          </div>
          <Badge color="success" pulse dot leftIcon={<CheckIcon />}>
            Premium Member
          </Badge>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <h6 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Messages
            </h6>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>24</p>
            <Badge 
              size="xs" 
              color="error"
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            >
              5 new
            </Badge>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <h6 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
              Tasks
            </h6>
            <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>8</p>
            <Badge 
              size="xs" 
              color="warning"
              pulse
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            >
              Due soon
            </Badge>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// All features showcase
export const ShowcaseAll = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        🎨 Modern Design with Gradients
      </h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Badge color="primary" size="lg" leftIcon={<StarIcon />}>Gradient Solid</Badge>
        <Badge variant="soft" color="success" size="lg" leftIcon={<CheckIcon />}>Soft Gradient</Badge>
        <Badge variant="outline" color="warning" size="lg">Clean Outline</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        ⚡ Interactive & Animated
      </h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Badge interactive pulse color="error" leftIcon={<FireIcon />} onClick={() => alert('Clicked!')}>
          Click + Pulse
        </Badge>
        <Badge interactive dot color="primary" onClick={() => alert('Interactive dot!')}>
          Hover + Dot
        </Badge>
        <Badge removable color="success" variant="soft" onRemove={() => alert('Removed!')}>
          Removable
        </Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        📱 All Sizes & Features
      </h4>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Badge size="xs" color="primary" dot>XS + Dot</Badge>
        <Badge size="sm" color="success" leftIcon={<CheckIcon />}>SM + Icon</Badge>
        <Badge size="md" color="warning" pulse>MD + Pulse</Badge>
        <Badge size="lg" color="info" removable>LG + Remove</Badge>
        <Badge size="xl" color="error" leftIcon={<FireIcon />} interactive>XL + Interactive</Badge>
      </div>
    </div>
  </div>
);