import Grid from './Grid';

export default {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: 'A flexible and colorful grid system with vibrant colors, patterns, and layouts. Perfect for dashboards, galleries, and creative layouts.'
      }
    }
  },
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'auto']
    },
    gap: {
      control: { type: 'text' }
    },
    variant: {
      control: 'select',
      options: ['default', 'padded', 'bordered', 'rounded']
    },
    responsive: {
      control: 'boolean'
    }
  }
};

// Basic colorful grid
export const Default = {
  args: {
    columns: 4,
    gap: '1rem',
    variant: 'default',
    responsive: true
  },
  render: (args) => (
    <Grid {...args}>
      <Grid.Item color="blue">Blue Item</Grid.Item>
      <Grid.Item color="red">Red Item</Grid.Item>
      <Grid.Item color="green">Green Item</Grid.Item>
      <Grid.Item color="purple">Purple Item</Grid.Item>
      <Grid.Item color="orange">Orange Item</Grid.Item>
      <Grid.Item color="teal">Teal Item</Grid.Item>
      <Grid.Item color="pink">Pink Item</Grid.Item>
      <Grid.Item color="indigo">Indigo Item</Grid.Item>
    </Grid>
  )
};

// Rainbow showcase with all colors
export const RainbowShowcase = () => (
  <Grid columns={6} gap="1rem" responsive>
    <Grid.Item color="red" interactive>❤️ Red</Grid.Item>
    <Grid.Item color="orange" interactive>🧡 Orange</Grid.Item>
    <Grid.Item color="amber" interactive>💛 Amber</Grid.Item>
    <Grid.Item color="yellow" interactive>💛 Yellow</Grid.Item>
    <Grid.Item color="lime" interactive>💚 Lime</Grid.Item>
    <Grid.Item color="green" interactive>💚 Green</Grid.Item>
    <Grid.Item color="emerald" interactive>💎 Emerald</Grid.Item>
    <Grid.Item color="teal" interactive>🌊 Teal</Grid.Item>
    <Grid.Item color="cyan" interactive>🩵 Cyan</Grid.Item>
    <Grid.Item color="sky" interactive>☁️ Sky</Grid.Item>
    <Grid.Item color="blue" interactive>💙 Blue</Grid.Item>
    <Grid.Item color="indigo" interactive>💜 Indigo</Grid.Item>
    <Grid.Item color="violet" interactive>💜 Violet</Grid.Item>
    <Grid.Item color="purple" interactive>💜 Purple</Grid.Item>
    <Grid.Item color="fuchsia" interactive>💖 Fuchsia</Grid.Item>
    <Grid.Item color="pink" interactive>🩷 Pink</Grid.Item>
    <Grid.Item color="rose" interactive>🌹 Rose</Grid.Item>
    <Grid.Item color="gray" interactive>🔘 Gray</Grid.Item>
  </Grid>
);

// Grid with spanning items
export const SpanningItems = () => (
  <Grid columns={4} gap="1rem" variant="rounded">
    <Grid.Item color="blue" colSpan={2}>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Wide Item</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Spans 2 columns</p>
      </div>
    </Grid.Item>
    <Grid.Item color="green">Regular</Grid.Item>
    <Grid.Item color="purple" rowSpan={2}>
      <div>
        <h3 style={{ margin: 0 }}>Tall Item</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Spans 2 rows</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange">Item</Grid.Item>
    <Grid.Item color="teal">Item</Grid.Item>
    <Grid.Item color="pink">Item</Grid.Item>
    
    <Grid.Item color="indigo" colSpan={3}>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Extra Wide</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Spans 3 columns</p>
      </div>
    </Grid.Item>
    <Grid.Item color="rose">Item</Grid.Item>
  </Grid>
);

// Gradient and pattern showcase
export const GradientPatterns = () => (
  <Grid columns={3} gap="1.5rem" variant="padded">
    <Grid.Item color="blue" gradient>
      <div>
        <h3 style={{ margin: 0 }}>🌊 Gradient</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Animated gradient</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" pattern="dots">
      <div>
        <h3 style={{ margin: 0 }}>• Dots Pattern</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Polka dot overlay</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" pattern="lines">
      <div>
        <h3 style={{ margin: 0 }}>/ Lines Pattern</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Diagonal lines</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" pattern="grid">
      <div>
        <h3 style={{ margin: 0 }}>⌗ Grid Pattern</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Grid overlay</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" pattern="diagonal">
      <div>
        <h3 style={{ margin: 0 }}>⟋ Diagonal</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Diagonal stripes</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="teal" pattern="waves">
      <div>
        <h3 style={{ margin: 0 }}>〜 Waves</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Wave pattern</p>
      </div>
    </Grid.Item>
  </Grid>
);

// Interactive dashboard-style grid
export const InteractiveDashboard = () => (
  <Grid columns={4} gap="1rem" responsive>
    <Grid.Item 
      color="blue" 
      colSpan={2} 
      interactive
      onClick={() => alert('Revenue Dashboard Clicked!')}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>$124,560</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>💰 Total Revenue</p>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="green" 
      interactive
      onClick={() => alert('Users Clicked!')}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>12,847</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>👥 Active Users</p>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="purple" 
      interactive
      onClick={() => alert('Orders Clicked!')}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>1,429</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>📦 Orders</p>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="orange" 
      interactive
      onClick={() => alert('Growth Clicked!')}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>+23.5%</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>📈 Growth</p>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="teal" 
      rowSpan={2} 
      interactive
      onClick={() => alert('Analytics Clicked!')}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>📊 Analytics</h3>
        <div style={{ marginTop: '1rem', opacity: 0.9 }}>
          <div style={{ marginBottom: '0.5rem' }}>Sessions: 45,123</div>
          <div style={{ marginBottom: '0.5rem' }}>Bounce Rate: 34%</div>
          <div>Avg. Duration: 3m 42s</div>
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="pink" 
      interactive
      onClick={() => alert('Notifications Clicked!')}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>47</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>🔔 Notifications</p>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="indigo" 
      interactive
      onClick={() => alert('Tasks Clicked!')}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>23</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>✅ Pending Tasks</p>
      </div>
    </Grid.Item>
  </Grid>
);

// Masonry layout (Pinterest-style)
export const MasonryLayout = () => (
  <Grid.Masonry columns={3} gap="1rem">
    <Grid.Item color="blue" size="small">
      <div>
        <h4 style={{ margin: 0 }}>Short Card</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Brief content</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" size="large">
      <div>
        <h4 style={{ margin: 0 }}>Tall Card</h4>
        <p style={{ margin: '0.5rem 0', opacity: 0.9 }}>
          This card has much more content and will be taller than the others. 
          The masonry layout will automatically arrange the cards to create 
          a Pinterest-like grid layout.
        </p>
        <div style={{ opacity: 0.8 }}>📷 Image placeholder</div>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" size="medium">
      <div>
        <h4 style={{ margin: 0 }}>Medium Card</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
          Medium-sized content that fits nicely in the masonry layout.
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" size="small">
      <div>
        <h4 style={{ margin: 0 }}>Another Short</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Quick info</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" size="large">
      <div>
        <h4 style={{ margin: 0 }}>Feature Card</h4>
        <p style={{ margin: '0.5rem 0', opacity: 0.9 }}>
          This is a featured card with lots of interesting content that makes 
          it stand out in the masonry layout. It includes multiple paragraphs 
          and rich information.
        </p>
        <div style={{ marginTop: '1rem', opacity: 0.8 }}>
          <div style={{ marginBottom: '0.5rem' }}>⭐ Rating: 4.8/5</div>
          <div>💬 Comments: 42</div>
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item color="teal" size="medium">
      <div>
        <h4 style={{ margin: 0 }}>Regular Card</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>
          Standard content card with normal height and information.
        </p>
      </div>
    </Grid.Item>
  </Grid.Masonry>
);

// Special effects showcase
export const SpecialEffects = () => (
  <Grid columns={3} gap="1.5rem" variant="bordered">
    <Grid.Item color="blue" className="grid-item--glow">
      <div>
        <h3 style={{ margin: 0 }}>✨ Glow Effect</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Subtle blue glow</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" className="grid-item--pulse">
      <div>
        <h3 style={{ margin: 0 }}>💓 Pulse Effect</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Gentle pulsing</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" className="grid-item--bounce" interactive>
      <div>
        <h3 style={{ margin: 0 }}>⬆️ Bounce Effect</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Hover to bounce</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" className="grid-item--glass">
      <div>
        <h3 style={{ margin: 0, color: '#1f2937' }}>🔍 Glass Effect</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.7, color: '#1f2937' }}>Frosted glass look</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="blue" className="grid-item--neon">
      <div>
        <h3 style={{ margin: 0 }}>💡 Neon Effect</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Glowing borders</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" gradient pattern="waves">
      <div>
        <h3 style={{ margin: 0 }}>🌊 Combined</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Gradient + Pattern</p>
      </div>
    </Grid.Item>
  </Grid>
);

// Dashboard layout templates
export const DashboardLayouts = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Sidebar Layout</h3>
      <Grid.Dashboard layout="sidebar" gap="1rem" style={{ height: '300px' }}>
        <Grid.Item color="slate" className="grid-area-sidebar">
          <div>
            <h4 style={{ margin: 0 }}>🗂️ Sidebar</h4>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Navigation</p>
          </div>
        </Grid.Item>
        <Grid.Item color="blue" className="grid-area-header">
          <div>
            <h4 style={{ margin: 0 }}>📊 Header</h4>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Top bar</p>
          </div>
        </Grid.Item>
        <Grid.Item color="green" className="grid-area-main">
          <div>
            <h4 style={{ margin: 0 }}>📄 Main Content</h4>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Primary area</p>
          </div>
        </Grid.Item>
      </Grid.Dashboard>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem' }}>Complex Layout</h3>
      <Grid.Dashboard layout="complex" gap="1rem" style={{ height: '400px' }}>
        <Grid.Item color="indigo" className="grid-area-header">
          <div>
            <h4 style={{ margin: 0 }}>🏠 Header</h4>
          </div>
        </Grid.Item>
        <Grid.Item color="purple" className="grid-area-nav">
          <div>
            <h4 style={{ margin: 0 }}>🧭 Nav</h4>
          </div>
        </Grid.Item>
        <Grid.Item color="orange" className="grid-area-hero">
          <div>
            <h4 style={{ margin: 0 }}>🦸 Hero</h4>
          </div>
        </Grid.Item>
        <Grid.Item color="pink" className="grid-area-aside">
          <div>
            <h4 style={{ margin: 0 }}>📋 Aside</h4>
          </div>
        </Grid.Item>
        <Grid.Item color="teal" className="grid-area-main">
          <div>
            <h4 style={{ margin: 0 }}>📄 Main</h4>
          </div>
        </Grid.Item>
        <Grid.Item color="gray" className="grid-area-footer">
          <div>
            <h4 style={{ margin: 0 }}>🦶 Footer</h4>
          </div>
        </Grid.Item>
      </Grid.Dashboard>
    </div>
  </div>
);

// Size variations
export const SizeVariations = () => (
  <Grid columns={3} gap="1rem">
    <Grid.Item color="blue" size="small">
      <div>
        <h4 style={{ margin: 0 }}>Small Size</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Compact padding</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" size="medium">
      <div>
        <h4 style={{ margin: 0 }}>Medium Size</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Default padding</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" size="large">
      <div>
        <h4 style={{ margin: 0 }}>Large Size</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Generous padding</p>
      </div>
    </Grid.Item>
  </Grid>
);

// Photo gallery style
export const PhotoGallery = () => (
  <Grid columns="auto" minItemWidth="250px" gap="1rem" responsive>
    {[
      { color: 'blue', emoji: '🏔️', title: 'Mountains', desc: 'Scenic peaks' },
      { color: 'green', emoji: '🌲', title: 'Forest', desc: 'Deep woods' },
      { color: 'orange', emoji: '🏜️', title: 'Desert', desc: 'Sandy dunes' },
      { color: 'teal', emoji: '🏖️', title: 'Beach', desc: 'Ocean waves' },
      { color: 'purple', emoji: '🌸', title: 'Garden', desc: 'Blooming flowers' },
      { color: 'pink', emoji: '🌅', title: 'Sunrise', desc: 'Dawn light' },
      { color: 'indigo', emoji: '🌌', title: 'Space', desc: 'Starry night' },
      { color: 'rose', emoji: '🌹', title: 'Roses', desc: 'Red flowers' }
    ].map((item, index) => (
      <Grid.Item key={index} color={item.color} interactive>
        <div>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{item.emoji}</div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{item.title}</h3>
          <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>{item.desc}</p>
        </div>
      </Grid.Item>
    ))}
  </Grid>
);

// Interactive Playground
export const Playground = {
  args: {
    columns: 3,
    gap: '1rem',
    variant: 'default',
    responsive: true
  },
  render: (args) => (
    <Grid {...args}>
      <Grid.Item color="blue" interactive>
        <div>
          <h3 style={{ margin: 0 }}>Interactive</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Click me!</p>
        </div>
      </Grid.Item>
      <Grid.Item color="green" gradient>
        <div>
          <h3 style={{ margin: 0 }}>Gradient</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Animated</p>
        </div>
      </Grid.Item>
      <Grid.Item color="purple" pattern="dots">
        <div>
          <h3 style={{ margin: 0 }}>Pattern</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Dots overlay</p>
        </div>
      </Grid.Item>
      <Grid.Item color="orange" colSpan={2}>
        <div>
          <h3 style={{ margin: 0 }}>Wide Item</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Spans 2 columns</p>
        </div>
      </Grid.Item>
      <Grid.Item color="pink">
        <div>
          <h3 style={{ margin: 0 }}>Regular</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Standard item</p>
        </div>
      </Grid.Item>
    </Grid>
  )
};