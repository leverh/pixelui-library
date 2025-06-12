import { useState } from 'react';
import Badge from './Badge';

// Sample icons
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
);

const UserIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'A versatile badge component for status indicators, labels, and tags. Supports multiple variants, colors, and interactive states.'
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
      options: ['small', 'medium', 'large']
    },
    interactive: {
      control: 'boolean'
    },
    removable: {
      control: 'boolean'
    },
    dot: {
      control: 'boolean'
    }
  }
};

// Basic badge
export const Default = {
  args: {
    children: 'Badge'
  }
};

// Color variants
export const Colors = () => (
  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
    <Badge color="primary">Primary</Badge>
    <Badge color="secondary">Secondary</Badge>
    <Badge color="success">Success</Badge>
    <Badge color="warning">Warning</Badge>
    <Badge color="error">Error</Badge>
    <Badge color="info">Info</Badge>
  </div>
);

// Style variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="solid" color="primary">Solid</Badge>
      <Badge variant="solid" color="success">Solid</Badge>
      <Badge variant="solid" color="error">Solid</Badge>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="outline" color="primary">Outline</Badge>
      <Badge variant="outline" color="success">Outline</Badge>
      <Badge variant="outline" color="error">Outline</Badge>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Badge variant="soft" color="primary">Soft</Badge>
      <Badge variant="soft" color="success">Soft</Badge>
      <Badge variant="soft" color="error">Soft</Badge>
    </div>
  </div>
);

// Size variants
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <Badge size="small">Small</Badge>
    <Badge size="medium">Medium</Badge>
    <Badge size="large">Large</Badge>
  </div>
);

// With icons
export const WithIcons = () => (
  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
    <Badge leftIcon={<StarIcon />}>Featured</Badge>
    <Badge rightIcon={<CheckIcon />} color="success">Verified</Badge>
    <Badge leftIcon={<UserIcon />} rightIcon={<CheckIcon />} color="info">Admin</Badge>
  </div>
);

// Interactive badges
export const Interactive = () => (
  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
    <Badge 
      interactive 
      onClick={() => alert('Badge clicked!')}
    >
      Clickable
    </Badge>
    <Badge 
      interactive 
      onClick={() => alert('Filter applied!')}
      color="info"
    >
      Filter: Active
    </Badge>
    <Badge 
      interactive 
      onClick={() => alert('Tag selected!')}
      variant="outline"
      color="primary"
    >
      React
    </Badge>
  </div>
);

// Removable badges
export const Removable = () => {
  const [badges, setBadges] = useState([
    { id: 1, label: 'React', color: 'primary' },
    { id: 2, label: 'JavaScript', color: 'warning' },
    { id: 3, label: 'CSS', color: 'info' },
    { id: 4, label: 'HTML', color: 'success' }
  ]);

  const removeBadge = (id) => {
    setBadges(badges.filter(badge => badge.id !== id));
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {badges.map(badge => (
        <Badge
          key={badge.id}
          removable
          onRemove={() => removeBadge(badge.id)}
          color={badge.color}
          variant="soft"
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
};

// With dot indicator
export const WithDot = () => (
  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
    <Badge dot>Notifications</Badge>
    <Badge dot color="success">Messages</Badge>
    <Badge dot color="warning" variant="outline">Alerts</Badge>
  </div>
);

// Status indicators
export const StatusIndicators = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>Order Status</h4>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="warning" variant="soft">Pending</Badge>
        <Badge color="info" variant="soft">Processing</Badge>
        <Badge color="primary" variant="soft">Shipped</Badge>
        <Badge color="success" variant="soft">Delivered</Badge>
        <Badge color="error" variant="soft">Cancelled</Badge>
      </div>
    </div>
    
    <div>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>User Roles</h4>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Badge color="error" leftIcon={<StarIcon />}>Admin</Badge>
        <Badge color="primary" leftIcon={<UserIcon />}>Moderator</Badge>
        <Badge color="secondary" leftIcon={<UserIcon />}>User</Badge>
      </div>
    </div>
  </div>
);

// Notification badges
export const NotificationBadges = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
    <div style={{ position: 'relative' }}>
      <button style={{ 
        padding: '0.5rem 1rem', 
        background: 'var(--color-neutral-200)', 
        border: 'none', 
        borderRadius: '0.375rem',
        cursor: 'pointer'
      }}>
        Messages
      </button>
      <Badge 
        size="small" 
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
        padding: '0.5rem 1rem', 
        background: 'var(--color-neutral-200)', 
        border: 'none', 
        borderRadius: '0.375rem',
        cursor: 'pointer'
      }}>
        Notifications
      </button>
      <Badge 
        size="small" 
        color="error" 
        style={{ 
          position: 'absolute', 
          top: '-8px', 
          right: '-8px' 
        }}
      >
        12
      </Badge>
    </div>
  </div>
);

// Playground
export const Playground = {
  args: {
    children: 'Custom Badge',
    variant: 'solid',
    color: 'primary',
    size: 'medium',
    interactive: false,
    removable: false,
    dot: false
  }
};