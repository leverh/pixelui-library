import Card from './Card';
import Button from '../Button/Button';

// Sample icons
const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'A flexible card component with header, body, footer sections. Supports media, various layouts, and interactive states.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled']
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large']
    },
    interactive: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    error: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
};

// Basic card
export const Default = {
  args: {
    children: (
      <Card.Body>
        <p>This is a basic card with some content inside. Cards are great for organizing related information.</p>
      </Card.Body>
    )
  }
};

// Card variants
export const Variants = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
    <Card variant="elevated">
      <Card.Body>
        <h4>Elevated Card</h4>
        <p>This card has a shadow and hover effects.</p>
      </Card.Body>
    </Card>
    
    <Card variant="outlined">
      <Card.Body>
        <h4>Outlined Card</h4>
        <p>This card has a border instead of shadow.</p>
      </Card.Body>
    </Card>
    
    <Card variant="filled">
      <Card.Body>
        <h4>Filled Card</h4>
        <p>This card has a filled background.</p>
      </Card.Body>
    </Card>
  </div>
);

// Complete card with all sections
export const CompleteCard = () => (
  <div style={{ maxWidth: '400px' }}>
    <Card>
      <Card.Header
        title="Product Launch"
        subtitle="Marketing Campaign"
        actions={
          <Button variant="ghost" size="small">
            <MoreIcon />
          </Button>
        }
      />
      <Card.Media
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop"
        alt="Analytics dashboard"
      />
      <Card.Body>
        <p>Our new product launch campaign has exceeded expectations with a 150% increase in engagement rates.</p>
      </Card.Body>
      <Card.Footer
        actions={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="ghost" size="small">
              <HeartIcon />
            </Button>
            <Button variant="ghost" size="small">
              <ShareIcon />
            </Button>
          </div>
        }
      >
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          2 hours ago
        </span>
      </Card.Footer>
    </Card>
  </div>
);

// Interactive cards
export const InteractiveCards = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
    <Card interactive onClick={() => alert('Card 1 clicked!')}>
      <Card.Body>
        <h4>Clickable Card</h4>
        <p>This entire card is clickable.</p>
      </Card.Body>
    </Card>
    
    <Card interactive loading>
      <Card.Body>
        <h4>Loading Card</h4>
        <p>This card is in a loading state.</p>
      </Card.Body>
    </Card>
    
    <Card interactive disabled>
      <Card.Body>
        <h4>Disabled Card</h4>
        <p>This card is disabled.</p>
      </Card.Body>
    </Card>
  </div>
);

// Media cards
export const MediaCards = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
    <Card>
      <Card.Media
        src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=200&fit=crop"
        alt="Beautiful landscape"
      />
      <Card.Body>
        <h4>Image Card</h4>
        <p>A card with an image at the top.</p>
      </Card.Body>
    </Card>
    
    <Card>
      <Card.Media
        src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&h=200&fit=crop"
        alt="City at night"
        overlay={
          <div>
            <h4 style={{ margin: 0, color: 'white' }}>Overlay Content</h4>
            <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.9)' }}>Text over image</p>
          </div>
        }
      />
      <Card.Body>
        <h4>Image with Overlay</h4>
        <p>A card with overlay content on the image.</p>
      </Card.Body>
    </Card>
  </div>
);

// Different padding options
export const Padding = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    <Card padding="small">
      <Card.Body>
        <h4>Small Padding</h4>
        <p>Compact card with small padding.</p>
      </Card.Body>
    </Card>
    
    <Card padding="medium">
      <Card.Body>
        <h4>Medium Padding</h4>
        <p>Default card with medium padding.</p>
      </Card.Body>
    </Card>
    
    <Card padding="large">
      <Card.Body>
        <h4>Large Padding</h4>
        <p>Spacious card with large padding.</p>
      </Card.Body>
    </Card>
  </div>
);

// Card layouts
export const Layouts = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {/* Horizontal layout */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      <Card>
        <Card.Header title="Settings" subtitle="Manage your preferences" />
        <Card.Body spacing="compact">
          <p>Configure your application settings here.</p>
        </Card.Body>
        <Card.Footer
          actions={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button size="small" variant="outline">Cancel</Button>
              <Button size="small">Save</Button>
            </div>
          }
        />
      </Card>
      
      <Card>
        <Card.Header title="Statistics" />
        <Card.Body spacing="spacious">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary-600)' }}>1,234</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Users</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-success)' }}>98.5%</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Uptime</div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
);

// Error and loading states
export const States = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
    <Card loading>
      <Card.Body>
        <h4>Loading State</h4>
        <p>This card is loading content...</p>
      </Card.Body>
    </Card>
    
    <Card error>
      <Card.Body>
        <h4>Error State</h4>
        <p>Something went wrong loading this card.</p>
      </Card.Body>
    </Card>
  </div>
);

// Playground
export const Playground = {
  args: {
    variant: 'elevated',
    padding: 'medium',
    interactive: false,
    loading: false,
    error: false,
    disabled: false,
    children: (
      <>
        <Card.Header title="Card Title" subtitle="Card subtitle" />
        <Card.Body>
          <p>This is the card content. The card can be customized using the controls below.</p>
        </Card.Body>
        <Card.Footer
          actions={
            <Button size="small">Action</Button>
          }
        />
      </>
    )
  }
};