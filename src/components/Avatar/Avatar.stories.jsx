import Avatar from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'A modern, responsive avatar component with perfect status indicators, properly sized badges, and smooth animations. Built from scratch for reliability and consistency.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded']
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'soft', 'elevated']
    },
    color: {
      control: 'select',
      options: [null, 'blue', 'green', 'purple', 'pink', 'orange', 'indigo', 'teal', 'neutral']
    },
    status: {
      control: 'select',
      options: [null, 'online', 'offline', 'away', 'busy']
    },
    interactive: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    }
  }
};

// Playground
export const Playground = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    name: 'John Doe',
    size: 'md',
    shape: 'circle',
    variant: 'default',
    interactive: false,
    loading: false
  },
  render: (args) => (
    <Avatar 
      {...args} 
      onClick={args.interactive ? () => console.log('Avatar clicked!') : undefined}
    />
  )
};

// Default avatar
export const Default = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    name: 'John Doe'
  }
};

// All sizes
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Avatar 
          size={size} 
          name={`Size ${size.toUpperCase()}`}
        />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6b7280', textTransform: 'uppercase' }}>
          {size}
        </div>
      </div>
    ))}
  </div>
);

// All shapes
export const Shapes = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
    {['circle', 'rounded', 'square'].map(shape => (
      <div key={shape} style={{ textAlign: 'center' }}>
        <Avatar 
          shape={shape}
          size="lg"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        />
        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280', textTransform: 'capitalize' }}>
          {shape}
        </div>
      </div>
    ))}
  </div>
);

// All variants
export const Variants = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {['default', 'outlined', 'soft', 'elevated'].map(variant => (
      <div key={variant} style={{ textAlign: 'center' }}>
        <Avatar 
          variant={variant}
          size="lg"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        />
        <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280', textTransform: 'capitalize' }}>
          {variant}
        </div>
      </div>
    ))}
  </div>
);

// Initials with auto colors
export const WithInitials = () => (
  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {[
      'John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Johnson', 
      'Charlie Brown', 'Diana Prince', 'Emily Davis', 'Frank Miller'
    ].map(name => (
      <div key={name} style={{ textAlign: 'center' }}>
        <Avatar name={name} size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6b7280' }}>
          {name}
        </div>
      </div>
    ))}
  </div>
);

// Color variants
export const Colors = () => (
  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {['blue', 'green', 'purple', 'pink', 'orange', 'indigo', 'teal', 'neutral'].map(color => (
      <div key={color} style={{ textAlign: 'center' }}>
        <Avatar 
          name={color.charAt(0).toUpperCase() + color.slice(1)} 
          color={color} 
          size="lg" 
        />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6b7280', textTransform: 'capitalize' }}>
          {color}
        </div>
      </div>
    ))}
  </div>
);

// Status indicators
export const WithStatus = () => (
  <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {[
      { status: 'online', color: '#22c55e', user: 'John Doe', size: 'xs' },
      { status: 'away', color: '#f59e0b', user: 'Jane Smith', size: 'sm' },
      { status: 'busy', color: '#ef4444', user: 'Bob Wilson', size: 'md' },
      { status: 'offline', color: '#6b7280', user: 'Alice Johnson', size: 'lg' },
      { status: 'online', color: '#22c55e', user: 'Charlie Brown', size: 'xl' }
    ].map(({ status, color, user, size }, index) => (
      <div key={index} style={{ textAlign: 'center' }}>
        <Avatar 
          src={`https://images.unsplash.com/photo-${147209964 + index}785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`}
          name={user}
          status={status}
          size={size}
        />
        <div style={{ fontSize: '0.75rem', marginTop: '0.75rem', color: color, fontWeight: '500', textTransform: 'capitalize' }}>
          {status} ({size.toUpperCase()})
        </div>
      </div>
    ))}
  </div>
);

// Badges
export const WithBadge = () => (
  <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {[
      { badge: 3, size: 'xs', name: 'User 1' },
      { badge: 12, size: 'sm', name: 'User 2' },
      { badge: 99, size: 'md', name: 'User 3' },
      { badge: 150, size: 'lg', name: 'User 4' },
      { badge: 5, size: 'xl', name: 'User 5' }
    ].map(({ badge, size, name }, index) => (
      <div key={index} style={{ textAlign: 'center' }}>
        <Avatar 
          src={index % 2 === 0 ? `https://images.unsplash.com/photo-${147209964 + index}785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face` : undefined}
          name={name}
          badge={badge}
          size={size}
        />
        <div style={{ fontSize: '0.75rem', marginTop: '0.75rem', color: '#6b7280' }}>
          {badge > 99 ? '99+' : badge} notifications ({size.toUpperCase()})
        </div>
      </div>
    ))}
  </div>
);

// Combined status and badge
export const StatusAndBadge = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <Avatar 
      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      name="Online with notifications"
      status="online"
      badge={5}
      size="lg"
    />
    <Avatar 
      name="Away with many notifications"
      status="away"
      badge={25}
      size="lg"
    />
    <Avatar 
      name="Busy with lots of notifications"
      status="busy"
      badge={99}
      size="lg"
    />
  </div>
);

// Interactive avatars
export const Interactive = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        name="Clickable User"
        interactive
        size="lg"
        onClick={() => alert('Profile clicked!')}
      />
      <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280' }}>Hover & Click</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        name="Interactive with status"
        interactive
        status="online"
        size="lg"
        variant="elevated"
        onClick={() => alert('Status avatar clicked!')}
      />
      <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280' }}>Elevated variant</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        name="Interactive with badge"
        interactive
        badge={12}
        size="lg"
        onClick={() => alert('Badge avatar clicked!')}
      />
      <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280' }}>With notifications</div>
    </div>
  </div>
);

// Loading states
export const Loading = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Avatar loading size={size} />
        <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6b7280', textTransform: 'uppercase' }}>
          {size}
        </div>
      </div>
    ))}
  </div>
);

// Fallback behavior
export const Fallback = () => (
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        src="https://invalid-url.com/image.jpg"
        name="Fallback User"
        size="lg"
      />
      <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280' }}>
        Invalid image → Initials
      </div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        src="https://another-invalid-url.com/image.jpg"
        name="Another User"
        size="lg"
        variant="outlined"
      />
      <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280' }}>
        Outlined fallback
      </div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Avatar 
        src="https://yet-another-invalid-url.com/image.jpg"
        size="lg"
      />
      <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#6b7280' }}>
        No name provided
      </div>
    </div>
  </div>
);

// Avatar groups
export const Groups = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Basic Group</h4>
      <Avatar.Group>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" name="John" />
        <Avatar src="https://randomuser.me/api/portraits/women/50.jpg" name="Jane" />
        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" name="Bob" />
        <Avatar name="Alice" />
      </Avatar.Group>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Group with Overflow</h4>
      <Avatar.Group max={3} onMoreClick={() => alert('Show more users!')}>
        <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" name="John" />
        <Avatar src="https://randomuser.me/api/portraits/women/50.jpg" name="Jane" />
        <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" name="Bob" />
        <Avatar name="Alice" />
        <Avatar name="Charlie" />
        <Avatar name="Diana" />
      </Avatar.Group>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Large Group with Status</h4>
      <Avatar.Group size="lg">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
          name="John" 
          status="online"
        />
        <Avatar 
          src="https://randomuser.me/api/portraits/women/50.jpg" 
          name="Jane" 
          status="away"
        />
        <Avatar name="Bob" status="busy" />
        <Avatar name="Alice" status="offline" />
      </Avatar.Group>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Different Spacing</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {['tight', 'default', 'loose', 'none'].map(spacing => (
          <div key={spacing}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
              {spacing} spacing
            </div>
            <Avatar.Group spacing={spacing}>
              <Avatar name="User 1" />
              <Avatar name="User 2" />
              <Avatar name="User 3" />
              <Avatar name="User 4" />
            </Avatar.Group>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Real-world example
export const UserProfile = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1.5rem',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    border: '1px solid #e2e8f0',
    borderRadius: '1rem',
    maxWidth: '400px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}>
    <Avatar 
      src="https://randomuser.me/api/portraits/women/40.jpg"
      name="Sarah Wilson"
      size="xl"
      status="online"
      badge={8}
      interactive
      variant="elevated"
      onClick={() => alert('View profile')}
    />
    <div>
      <h4 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
        Sarah Wilson
      </h4>
      <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#6b7280' }}>
        Senior Product Designer
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
        <div style={{ 
          width: '0.5rem', 
          height: '0.5rem', 
          borderRadius: '50%', 
          backgroundColor: '#22c55e',
        }} />
        <span style={{ fontSize: '0.875rem', color: '#22c55e', fontWeight: '500' }}>
          Online now
        </span>
      </div>
      <div style={{ 
        marginTop: '1rem',
        padding: '0.5rem 0.75rem',
        background: 'rgba(239, 68, 68, 0.1)',
        color: '#dc2626',
        borderRadius: '0.5rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        display: 'inline-block'
      }}>
        8 unread messages
      </div>
    </div>
  </div>
);

// All features combined
export const ShowcaseAll = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        🎯 Perfect Status & Badge Positioning
      </h4>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar name="XS" status="online" badge={3} size="xs" />
        <Avatar name="SM" status="away" badge={12} size="sm" />
        <Avatar name="MD" status="busy" badge={99} size="md" />
        <Avatar name="LG" status="online" badge={150} size="lg" />
        <Avatar name="XL" status="offline" badge={5} size="xl" />
      </div>
    </div>
    
    <div>
      <h4 style={{ marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
        ✨ Interactive & Variants
      </h4>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          name="Default"
          variant="default"
          interactive
          status="online"
          size="lg"
          onClick={() => alert('Default clicked!')}
        />
        <Avatar 
          name="Outlined"
          variant="outlined"
          interactive
          badge={7}
          size="lg"
          onClick={() => alert('Outlined clicked!')}
        />
        <Avatar 
          name="Soft"
          variant="soft"
          interactive
          status="away"
          size="lg"
          onClick={() => alert('Soft clicked!')}
        />
        <Avatar 
          name="Elevated"
          variant="elevated"
          interactive
          badge={25}
          status="busy"
          size="lg"
          onClick={() => alert('Elevated clicked!')}
        />
      </div>
    </div>
  </div>
);