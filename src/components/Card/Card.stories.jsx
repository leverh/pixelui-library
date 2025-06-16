import Card from './Card';
import Button from '../Button/Button';

// Sample icons
const MoreIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const HeartIcon = ({ size = 16, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ShareIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const StarIcon = ({ size = 16, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
);

const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const Badge = ({ children, variant = 'primary', size = 'sm' }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: size === 'xs' ? '0.125rem 0.375rem' : '0.25rem 0.5rem',
    fontSize: size === 'xs' ? 'var(--text-xs)' : 'var(--text-sm)',
    fontWeight: 'var(--font-medium)',
    borderRadius: 'var(--radius-md)',
    background: variant === 'primary' ? 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600))' :
                variant === 'success' ? 'linear-gradient(135deg, var(--color-success), #059669)' :
                variant === 'warning' ? 'linear-gradient(135deg, var(--color-warning), #d97706)' :
                'linear-gradient(135deg, var(--color-neutral-500), var(--color-neutral-600))',
    color: 'white',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  }}>
    {children}
  </span>
);

const Avatar = ({ src, name, size = 32 }) => (
  <div style={{
    width: size,
    height: size,
    borderRadius: '50%',
    background: src ? `url(${src})` : 'linear-gradient(135deg, var(--color-primary-400), var(--color-primary-600))',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: size < 32 ? 'var(--text-xs)' : 'var(--text-sm)',
    fontWeight: 'var(--font-semibold)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }}>
    {!src && name && name.charAt(0).toUpperCase()}
  </div>
);

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'A modern, flexible card component with gradient backgrounds, smooth animations, and premium micro-interactions. Supports various layouts, states, and accessibility features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding size'
    },
    interactive: {
      control: 'boolean',
      description: 'Makes the card clickable with hover effects'
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state with shimmer animation'
    },
    error: {
      control: 'boolean',
      description: 'Shows error state with red styling'
    },
    success: {
      control: 'boolean',
      description: 'Shows success state with green styling'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and reduces opacity'
    },
    floating: {
      control: 'boolean',
      description: 'Adds floating animation effect'
    }
  }
};

// Basic card showcase
export const Default = {
  args: {
    children: (
      <Card.Body>
        <p>This is a modern card with enhanced gradient backgrounds and smooth animations, and hover effects.</p>
      </Card.Body>
    )
  }
};

// Comprehensive variant showcase
export const Variants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
    <Card variant="elevated">
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>Elevated Card</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Features gradient background, shadows, and lift animation on hover.
        </p>
      </Card.Body>
    </Card>
    
    <Card variant="outlined">
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>Outlined Card</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Clean border design with gradient border effects on hover.
        </p>
      </Card.Body>
    </Card>
    
    <Card variant="filled">
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--color-text-primary)' }}>Filled Card</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Filled background with gradient overlay effects.
        </p>
      </Card.Body>
    </Card>
  </div>
);

// Size variations
export const Sizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
      <Card key={size} size={size}>
        <Card.Body>
          <h4 style={{ margin: '0 0 0.5rem' }}>Size: {size.toUpperCase()}</h4>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            This card uses {size} padding size.
          </p>
        </Card.Body>
      </Card>
    ))}
  </div>
);

// Interactive states showcase
export const InteractiveStates = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
    <Card 
      interactive 
      onClick={() => console.log('🎉 Card clicked!')}
      aria-label="Click to see interaction demo"
    >
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckIcon size={20} />
          Interactive Card
        </h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Click me! Features hover lift, scale effects, and keyboard navigation.
        </p>
      </Card.Body>
    </Card>
    
    <Card loading>
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem' }}>Loading State</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Shimmer animation with pulsing effects.
        </p>
      </Card.Body>
    </Card>
    
    <Card error>
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem' }}>Error State</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Error styling with pulsing red accent.
        </p>
      </Card.Body>
    </Card>
    
    <Card success>
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem' }}>Success State</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Success styling with green accent glow.
        </p>
      </Card.Body>
    </Card>
    
    <Card disabled>
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem' }}>Disabled State</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Reduced opacity with glass blur effect.
        </p>
      </Card.Body>
    </Card>
    
    <Card floating>
      <Card.Body>
        <h4 style={{ margin: '0 0 0.5rem' }}>Floating Animation</h4>
        <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
          Floating animation for special content.
        </p>
      </Card.Body>
    </Card>
  </div>
);

// Premium product card example
export const ProductCard = () => (
  <div style={{ maxWidth: '400px' }}>
    <Card variant="elevated" interactive onClick={() => console.log('Product viewed!')}>
      <Card.Media
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=250&fit=crop"
        alt="Nike Air Max sneakers"
        aspectRatio="16/10"
        overlay={
          <div>
            <Badge variant="warning" size="xs">Limited Edition</Badge>
          </div>
        }
      />
      <Card.Header
        title="Nike Air Max 270"
        subtitle="Men's Running Shoes"
        badge={<Badge variant="success" size="xs">New</Badge>}
        actions={
          <Button variant="ghost" size="sm">
            <HeartIcon size={18} />
          </Button>
        }
      />
      <Card.Body spacing="sm">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {[1,2,3,4,5].map(star => (
            <StarIcon key={star} size={14} filled={star <= 4} />
          ))}
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            4.8 (124 reviews)
          </span>
        </div>
        <p style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Experience ultimate comfort with Nike's signature Air Max cushioning technology.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary-600)' }}>
              $129.99
            </span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
              $160.00
            </span>
          </div>
          <Badge variant="success">19% off</Badge>
        </div>
      </Card.Body>
      <Card.Footer
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
            <Button variant="outline" size="sm" style={{ flex: 1 }}>
              Add to Cart
            </Button>
            <Button size="sm" style={{ flex: 1 }}>
              Buy Now
            </Button>
          </div>
        }
      />
    </Card>
  </div>
);

// Social media post card
export const SocialCard = () => (
  <div style={{ maxWidth: '500px' }}>
    <Card variant="outlined">
      <Card.Header
        avatar={<Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" name="John Doe" size={40} />}
        title="John Doe"
        subtitle="@johndoe • 2 hours ago"
        actions={
          <Button variant="ghost" size="sm">
            <MoreIcon size={18} />
          </Button>
        }
      />
      <Card.Body spacing="sm">
        <p style={{ margin: '0 0 1rem', lineHeight: 'var(--leading-relaxed)' }}>
          Just shipped a major update to our design system! 🎉 The new card component features gradient backgrounds, 
          smooth animations, and improved accessibility. What are you going to build with it?
        </p>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--color-neutral-100), var(--color-primary-50))',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          border: '1px solid var(--color-neutral-200)'
        }}>
          <h4 style={{ margin: '0 0 0.5rem', fontSize: 'var(--text-base)' }}>Design System v2.0</h4>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            Modern components with premium animations and accessibility-first design.
          </p>
        </div>
      </Card.Body>
      <Card.Divider />
      <Card.Footer
        actions={
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-neutral-100)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
            onClick={() => console.log('❤️ Liked!')}>
              <HeartIcon size={16} />
              <span style={{ fontSize: 'var(--text-sm)' }}>24</span>
            </button>
            <button style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: 'none', 
              border: 'none', 
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-neutral-100)'}
            onMouseLeave={(e) => e.target.style.background = 'none'}
            onClick={() => console.log('🔄 Shared!')}>
              <ShareIcon size={16} />
              <span style={{ fontSize: 'var(--text-sm)' }}>8</span>
            </button>
          </div>
        }
      />
    </Card>
  </div>
);

// Dashboard analytics card
export const AnalyticsCard = () => (
  <div style={{ maxWidth: '450px' }}>
    <Card variant="filled">
      <Card.Header
        title="Revenue Analytics"
        subtitle="Last 30 days"
        actions={
          <Badge variant="success" size="xs">
            +12.5%
          </Badge>
        }
      />
      <Card.Body spacing="lg">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'var(--font-bold)', 
              background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              $24.8K
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Total Revenue</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'var(--font-bold)', 
              background: 'linear-gradient(135deg, var(--color-success), #059669)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem'
            }}>
              1,429
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Orders</div>
          </div>
        </div>
        
        {/* Simple progress bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Online Sales</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>68%</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: 'var(--color-neutral-200)', 
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: '68%', 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--color-primary-500), var(--color-primary-400))',
                borderRadius: 'var(--radius-md)',
                transition: 'width 1s ease-out'
              }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)' }}>Mobile App</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>45%</span>
            </div>
            <div style={{ 
              width: '100%', 
              height: '8px', 
              background: 'var(--color-neutral-200)', 
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: '45%', 
                height: '100%', 
                background: 'linear-gradient(90deg, var(--color-success), #059669)',
                borderRadius: 'var(--radius-md)',
                transition: 'width 1s ease-out'
              }}></div>
            </div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer
        timestamp="Updated 5 minutes ago"
        actions={
          <Button variant="outline" size="sm">
            View Details
          </Button>
        }
      />
    </Card>
  </div>
);

// Team member card
export const TeamCard = () => (
  <div style={{ maxWidth: '320px' }}>
    <Card variant="elevated" interactive onClick={() => console.log('👋 Team member clicked!')}>
      <Card.Media
        src="https://randomuser.me/api/portraits/women/35.jpg" 
        alt="Sarah Johnson"
        aspectRatio="16/10"
        overlay={
          <div style={{ textAlign: 'center' }}>
            <Badge variant="primary" size="sm">Online</Badge>
          </div>
        }
      />
      <Card.Body spacing="sm">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 0.25rem', fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)' }}>
            Sarah Johnson
          </h3>
          <p style={{ margin: '0 0 0.5rem', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Senior Product Designer
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
            {[1,2,3,4,5].map(star => (
              <StarIcon key={star} size={12} filled={star <= 5} />
            ))}
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary-600)' }}>47</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Projects</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--color-success)' }}>98%</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Rating</div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'var(--color-warning)' }}>3.2K</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Hours</div>
          </div>
        </div>
      </Card.Body>
      <Card.Footer
        actions={
          <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
            <Button variant="outline" size="sm" style={{ flex: 1 }}>
              <UserIcon size={14} />
              Profile
            </Button>
            <Button size="sm" style={{ flex: 1 }}>
              Message
            </Button>
          </div>
        }
      />
    </Card>
  </div>
);

// Layout examples
export const Layouts = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Grid Layout</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <Card>
          <Card.Header title="Configuration" subtitle="System settings" />
          <Card.Body spacing="sm">
            <p>Manage your application configuration and preferences.</p>
          </Card.Body>
          <Card.Footer
            actions={
              <Button size="sm">Configure</Button>
            }
          />
        </Card>
        
        <Card>
          <Card.Header title="Performance" subtitle="System metrics" />
          <Card.Body spacing="sm">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-success)' }}>99.9%</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Uptime</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-primary-600)' }}>2.1s</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Load Time</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  </div>
);

// Playground
export const Playground = {
  args: {
    variant: 'elevated',
    size: 'md',
    interactive: true,
    loading: false,
    error: false,
    success: false,
    disabled: false,
    floating: false,
    onClick: () => console.log('🎮 Playground card clicked!'),
    children: (
      <>
        <Card.Header 
          title="Playground Card" 
          subtitle="Experiment with all features"
          avatar={<Avatar name="PG" size={32} />}
          badge={<Badge variant="primary" size="xs">Interactive</Badge>}
          actions={
            <Button variant="ghost" size="sm">
              <MoreIcon size={16} />
            </Button>
          }
        />
        <Card.Media
          src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=200&fit=crop"
          alt="Abstract design"
          aspectRatio="16/9"
          overlay={
            <div>
              <h4 style={{ margin: 0, color: 'white', fontSize: 'var(--text-lg)' }}>Design System</h4>
              <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-sm)' }}>
                Modern components
              </p>
            </div>
          }
        />
        <Card.Body spacing="md">
          <p style={{ margin: '0 0 1rem', color: 'var(--color-text-secondary)' }}>
            Use the controls below to experiment with different card variants, sizes, and states. 
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge variant="primary" size="xs">Modern</Badge>
            <Badge variant="success" size="xs">Accessible</Badge>
            <Badge variant="warning" size="xs">Animated</Badge>
          </div>
        </Card.Body>
        <Card.Divider />
        <Card.Footer
          timestamp="Interactive demo"
          actions={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="sm">
                <HeartIcon size={14} />
              </Button>
              <Button size="sm">
                Explore
              </Button>
            </div>
          }
        />
      </>
    )
  }
};