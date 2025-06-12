import Avatar from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'A versatile avatar component for displaying user profile images, initials, and status indicators. Supports various sizes, shapes, and interactive states.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge']
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded']
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info']
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy']
    },
    interactive: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    }
  }
};

// Basic avatar with image
export const Default = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'John Doe',
    name: 'John Doe'
  }
};

// Avatar sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar size="extraSmall" name="XS" />
    <Avatar size="small" name="SM" />
    <Avatar size="medium" name="MD" />
    <Avatar size="large" name="LG" />
    <Avatar size="extraLarge" name="XL" />
  </div>
);

// Avatar shapes
export const Shapes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar 
      shape="circle" 
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      alt="Circle avatar"
    />
    <Avatar 
      shape="rounded" 
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      alt="Rounded avatar"
    />
    <Avatar 
      shape="square" 
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      alt="Square avatar"
    />
  </div>
);

// Initials avatars
export const WithInitials = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <Avatar name="John Doe" />
    <Avatar name="Jane Smith" />
    <Avatar name="Bob Wilson" />
    <Avatar name="Alice Johnson" />
    <Avatar name="Charlie Brown" />
    <Avatar name="Diana Prince" />
  </div>
);

// Color variants for initials
export const Colors = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <Avatar name="Primary" color="primary" />
    <Avatar name="Secondary" color="secondary" />
    <Avatar name="Success" color="success" />
    <Avatar name="Warning" color="warning" />
    <Avatar name="Error" color="error" />
    <Avatar name="Info" color="info" />
  </div>
);

// Status indicators
export const WithStatus = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar 
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      name="Online User"
      status="online"
    />
    <Avatar 
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      name="Away User"
      status="away"
    />
    <Avatar 
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      name="Busy User"
      status="busy"
    />
    <Avatar 
      name="Offline User"
      status="offline"
    />
  </div>
);

// Badge indicators
export const WithBadge = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar 
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      name="User with notifications"
      badge={3}
    />
    <Avatar 
      name="Many notifications"
      badge={12}
    />
    <Avatar 
      name="Lots of notifications"
      badge={99}
    />
    <Avatar 
      name="Too many notifications"
      badge={150}
    />
  </div>
);

// Interactive avatars
export const Interactive = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar 
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      name="Clickable User"
      interactive
      onClick={() => alert('Avatar clicked!')}
    />
    <Avatar 
      name="Interactive Initials"
      interactive
      onClick={() => alert('Initials avatar clicked!')}
    />
  </div>
);

// Loading states
export const Loading = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar loading size="small" />
    <Avatar loading size="medium" />
    <Avatar loading size="large" />
  </div>
);

// Fallback behavior
export const Fallback = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Avatar 
      src="https://invalid-url.com/image.jpg"
      name="Fallback User"
      alt="This will fallback to initials"
    />
    <Avatar 
      src="https://another-invalid-url.com/image.jpg"
      name="Another User"
    />
    <Avatar 
      src="https://yet-another-invalid-url.com/image.jpg"
      // No name provided - will show default background
    />
  </div>
);

// Avatar groups
export const Groups = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h4>Basic Group</h4>
      <Avatar.Group>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" name="John" />
        <Avatar src="https://randomuser.me/api/portraits/women/50.jpg" name="Jane" />
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" name="Bob" />
        <Avatar name="Alice" />
      </Avatar.Group>
    </div>
    
    <div>
      <h4>Group with Overflow</h4>
      <Avatar.Group max={3} onMoreClick={() => alert('Show more users!')}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" name="John" />
        <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" name="Jane" />
        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" name="Bob" />
        <Avatar name="Alice" />
        <Avatar name="Charlie" />
        <Avatar name="Diana" />
      </Avatar.Group>
    </div>
    
    <div>
      <h4>Team with Status</h4>
      <Avatar.Group>
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
          name="John" 
          status="online"
        />
        <Avatar 
          src="https://randomuser.me/api/portraits/women/44.jpg" 
          name="Jane" 
          status="away"
        />
        <Avatar 
          name="Bob" 
          status="busy"
        />
        <Avatar 
          name="Alice" 
          status="offline"
        />
      </Avatar.Group>
    </div>
  </div>
);

// Real-world example
export const UserProfile = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1rem',
    padding: '1rem',
    border: '1px solid var(--color-neutral-200)',
    borderRadius: '0.5rem',
    maxWidth: '300px'
  }}>
    <Avatar 
      src="https://randomuser.me/api/portraits/women/44.jpg"
      name="Jane Doe"
      size="large"
      status="online"
      badge={5}
      interactive
      onClick={() => alert('View profile')}
    />
    <div>
      <h4 style={{ margin: 0, fontSize: '1rem' }}>John Doe</h4>
      <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Senior Developer
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
        <div style={{ 
          width: '0.5rem', 
          height: '0.5rem', 
          borderRadius: '50%', 
          backgroundColor: 'var(--color-success)' 
        }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>Online</span>
      </div>
    </div>
  </div>
);

// Playground
export const Playground = {
  args: {
    src: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'John Doe',
    size: 'medium',
    shape: 'circle',
    color: 'secondary',
    interactive: false,
    loading: false
  }
};