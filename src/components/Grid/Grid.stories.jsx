import Grid from './Grid';

export default {
  title: 'Components/Display/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: 'A modern, flexible grid system with premium gradients, smooth animations, and interactive micro-effects. Perfect for dashboards, galleries, and dynamic layouts with comprehensive accessibility support.'
      }
    }
  },
  argTypes: {
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 'auto'],
      description: 'Number of columns or auto-fit behavior'
    },
    gap: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing between grid items'
    },
    variant: {
      control: 'select',
      options: ['default', 'padded', 'bordered', 'rounded'],
      description: 'Grid container styling variant'
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive grid behavior'
    }
  }
};

// Basic modern grid with colors
export const Default = {
  args: {
    columns: 4,
    gap: 'md',
    variant: 'default',
    responsive: true
  },
  render: (args) => (
    <Grid {...args}>
      <Grid.Item color="blue" interactive onClick={() => console.log('💙 Blue clicked!')}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>💙 Blue</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Click me!</p>
        </div>
      </Grid.Item>
      <Grid.Item color="red" interactive onClick={() => console.log('❤️ Red clicked!')}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>❤️ Red</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Interactive</p>
        </div>
      </Grid.Item>
      <Grid.Item color="green" interactive onClick={() => console.log('💚 Green clicked!')}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>💚 Green</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Hover effects</p>
        </div>
      </Grid.Item>
      <Grid.Item color="purple" interactive onClick={() => console.log('💜 Purple clicked!')}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>💜 Purple</h3>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Smooth animations</p>
        </div>
      </Grid.Item>
    </Grid>
  )
};

// Complete color palette showcase
export const ColorPalette = () => (
  <Grid columns={6} gap="md" responsive>
    <Grid.Item color="red" interactive onClick={() => alert('❤️ Red: Passion & Energy')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>❤️</div>
        <h3 style={{ margin: 0 }}>Red</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Passion</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" interactive onClick={() => alert('🧡 Orange: Creativity & Joy')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧡</div>
        <h3 style={{ margin: 0 }}>Orange</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Creativity</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="amber" interactive onClick={() => alert('💛 Amber: Warmth & Optimism')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💛</div>
        <h3 style={{ margin: 0 }}>Amber</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Warmth</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="yellow" interactive onClick={() => alert('💛 Yellow: Happiness & Energy')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☀️</div>
        <h3 style={{ margin: 0 }}>Yellow</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Happiness</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="lime" interactive onClick={() => alert('💚 Lime: Growth & Vitality')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌱</div>
        <h3 style={{ margin: 0 }}>Lime</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Growth</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" interactive onClick={() => alert('💚 Green: Nature & Balance')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
        <h3 style={{ margin: 0 }}>Green</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Nature</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="emerald" interactive onClick={() => alert('💎 Emerald: Luxury & Prosperity')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💎</div>
        <h3 style={{ margin: 0 }}>Emerald</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Luxury</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="teal" interactive onClick={() => alert('🌊 Teal: Calm & Sophistication')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌊</div>
        <h3 style={{ margin: 0 }}>Teal</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Calm</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="cyan" interactive onClick={() => alert('🩵 Cyan: Innovation & Clarity')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🩵</div>
        <h3 style={{ margin: 0 }}>Cyan</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Innovation</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="sky" interactive onClick={() => alert('☁️ Sky: Freedom & Serenity')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☁️</div>
        <h3 style={{ margin: 0 }}>Sky</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Freedom</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="blue" interactive onClick={() => alert('💙 Blue: Trust & Reliability')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💙</div>
        <h3 style={{ margin: 0 }}>Blue</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Trust</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="indigo" interactive onClick={() => alert('💜 Indigo: Wisdom & Intuition')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔮</div>
        <h3 style={{ margin: 0 }}>Indigo</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Wisdom</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="violet" interactive onClick={() => alert('💜 Violet: Creativity & Magic')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
        <h3 style={{ margin: 0 }}>Violet</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Magic</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" interactive onClick={() => alert('💜 Purple: Royalty & Mystery')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👑</div>
        <h3 style={{ margin: 0 }}>Purple</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Royalty</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="fuchsia" interactive onClick={() => alert('💖 Fuchsia: Bold & Vibrant')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💖</div>
        <h3 style={{ margin: 0 }}>Fuchsia</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Bold</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" interactive onClick={() => alert('🩷 Pink: Love & Compassion')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🩷</div>
        <h3 style={{ margin: 0 }}>Pink</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Love</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="rose" interactive onClick={() => alert('🌹 Rose: Romance & Elegance')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌹</div>
        <h3 style={{ margin: 0 }}>Rose</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Romance</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="gray" interactive onClick={() => alert('🔘 Gray: Balance & Neutrality')}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚖️</div>
        <h3 style={{ margin: 0 }}>Gray</h3>
        <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.75rem' }}>Balance</p>
      </div>
    </Grid.Item>
  </Grid>
);

// Grid with spanning items and layouts
export const SpanningLayouts = () => (
  <Grid columns={4} gap="lg" variant="rounded">
    <Grid.Item color="blue" colSpan={2} size="lg" interactive>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🌊 Hero Section</h2>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          This item spans 2 columns and showcases important content with enhanced visibility.
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" interactive>
      <div>
        <h3 style={{ margin: 0 }}>🌱 Growth</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Regular item</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" rowSpan={2} size="lg" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>🚀 Tall Feature</h3>
        <p style={{ margin: '0.75rem 0', opacity: 0.9 }}>
          This item spans 2 rows vertically for featured content or important metrics.
        </p>
        <div style={{ marginTop: '1rem', opacity: 0.8 }}>
          <div style={{ marginBottom: '0.5rem' }}>📊 Analytics: 94%</div>
          <div>🎯 Conversion: 12.3%</div>
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" interactive>
      <div>
        <h3 style={{ margin: 0 }}>🔥 Action</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Quick access</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="teal" interactive>
      <div>
        <h3 style={{ margin: 0 }}>💎 Premium</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Special offer</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" interactive>
      <div>
        <h3 style={{ margin: 0 }}>💝 Gift</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Surprise bonus</p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="indigo" colSpan={3} interactive>
      <div>
        <h2 style={{ margin: 0, fontSize: '1.6rem' }}>🎨 Creative Suite</h2>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Extra wide item spanning 3 columns - ideal for complex information or tools.
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="rose" interactive>
      <div>
        <h3 style={{ margin: 0 }}>🌺 Beauty</h3>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>Design</p>
      </div>
    </Grid.Item>
  </Grid>
);

// Effects and patterns
export const PremiumEffects = () => (
  <Grid columns={3} gap="xl" variant="padded">
    <Grid.Item color="blue" gradient interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>🌊 Gradient Flow</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Smooth animated gradient that flows
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" pattern="dots" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>• Polka Dots</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Floating dots pattern overlay with subtle animation
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" pattern="lines" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>⟋ Dynamic Lines</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Sliding diagonal lines creating movement
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" pattern="grid" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>⌗ Grid Overlay</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Clean grid pattern for structured content
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" pattern="diagonal" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>⟨ Diagonal Flow</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Moving diagonal stripes with rhythm
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="teal" pattern="waves" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>〜 Ocean Waves</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Gentle wave patterns that ebb and flow
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="indigo" gradient pattern="dots" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>✨ Combined Magic</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Gradient + pattern creating depth
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="emerald" effect="glow" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>💎 Emerald Glow</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Pulsing glow effect for emphasis
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="violet" effect="pulse" interactive>
      <div>
        <h3 style={{ margin: 0, fontSize: '1.3rem' }}>💜 Gentle Pulse</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Rhythmic pulsing
        </p>
      </div>
    </Grid.Item>
  </Grid>
);

// Interactive dashboard with real-world data
export const ModernDashboard = () => (
  <Grid columns={4} gap="md" responsive>
    <Grid.Item 
      color="blue" 
      colSpan={2} 
      size="lg"
      interactive
      onClick={() => alert('💰 Revenue Dashboard\n\nTotal: $458,392\nGrowth: +23.5%\nTarget: 89%')}
    >
      <div>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
        <h2 style={{ margin: 0, fontSize: '2.5rem' }}>$458.3K</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Total Revenue</p>
        <div style={{ marginTop: '1rem', fontSize: '1.2rem', opacity: 0.8 }}>
          📈 +23.5% from last month
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="green" 
      interactive
      onClick={() => alert('👥 Active Users\n\nTotal: 24,847\nOnline: 3,291\nGrowth: +12%')}
    >
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>24.8K</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Active Users</p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          🟢 3,291 online
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="purple" 
      interactive
      onClick={() => alert('📦 Orders Today\n\nCompleted: 1,429\nPending: 87\nValue: $52,340')}
    >
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>1,429</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Orders Today</p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          ⏳ 87 pending
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="orange" 
      interactive
      onClick={() => alert('📈 Growth Rate\n\nMonthly: +28.3%\nQuarterly: +45.2%\nYearly: +156%')}
    >
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📈</div>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>+28.3%</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Growth Rate</p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          🚀 Trending up
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="teal" 
      rowSpan={2} 
      size="lg"
      interactive
      onClick={() => alert('📊 Analytics Overview\n\nSessions: 87,432\nBounce Rate: 24%\nAvg Duration: 4m 23s\nConversion: 3.8%')}
    >
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
        <h3 style={{ margin: 0, fontSize: '1.4rem', marginBottom: '1rem' }}>Analytics</h3>
        <div style={{ textAlign: 'left', opacity: 0.9 }}>
          <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Sessions</span>
            <strong>87,432</strong>
          </div>
          <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Bounce Rate</span>
            <strong>24%</strong>
          </div>
          <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Avg. Duration</span>
            <strong>4m 23s</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Conversion</span>
            <strong>3.8%</strong>
          </div>
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="pink" 
      interactive
      onClick={() => alert('🔔 Notifications\n\nUnread: 47\nUrgent: 3\nMentions: 12')}
    >
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔔</div>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>47</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Notifications</p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          🔴 3 urgent
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item 
      color="indigo" 
      interactive
      onClick={() => alert('✅ Tasks\n\nCompleted: 156\nPending: 23\nOverdue: 2')}
    >
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
        <h2 style={{ margin: 0, fontSize: '2rem' }}>23</h2>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Pending Tasks</p>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
          ⚠️ 2 overdue
        </div>
      </div>
    </Grid.Item>
  </Grid>
);

// Masonry layout showcase
export const MasonryShowcase = () => (
  <Grid.Masonry columns={3} gap="lg">
    <Grid.Item color="blue" size="sm" interactive>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📝</div>
        <h4 style={{ margin: 0 }}>Quick Note</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>
          Brief content that doesn't take much space.
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" size="xl" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌟</div>
        <h4 style={{ margin: 0, marginBottom: '0.75rem' }}>Featured Article</h4>
        <p style={{ margin: 0, opacity: 0.9, lineHeight: 1.6 }}>
          This is a much longer piece of content that will create a taller card 
          in the masonry layout. The masonry system automatically arranges cards 
          to create an optimal Pinterest-like layout so no space is wasted.
        </p>
        <div style={{ marginTop: '1.5rem', opacity: 0.8 }}>
          <div style={{ marginBottom: '0.5rem' }}>📚 Category: Design</div>
          <div style={{ marginBottom: '0.5rem' }}>⭐ Rating: 4.9/5</div>
          <div style={{ marginBottom: '0.5rem' }}>💬 Comments: 124</div>
          <div>👀 Views: 15.2K</div>
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" size="md" interactive>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎨</div>
        <h4 style={{ margin: 0, marginBottom: '0.5rem' }}>Design Tips</h4>
        <p style={{ margin: 0, opacity: 0.9 }}>
          Medium-sized content that provides better and user experience.
        </p>
        <div style={{ marginTop: '1rem', opacity: 0.8 }}>
          <div>📖 Read time: 3 min</div>
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" size="sm" interactive>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
        <h4 style={{ margin: 0 }}>Quick Tip</h4>
        <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>
          Fast insight for busy developers and designers.
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="teal" size="lg" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚀</div>
        <h4 style={{ margin: 0, marginBottom: '0.75rem' }}>Project Showcase</h4>
        <p style={{ margin: 0, opacity: 0.9, marginBottom: '1rem' }}>
          An exciting project that demonstrates modern web development techniques 
          with effective visual effects.
        </p>
        <div style={{ opacity: 0.8 }}>
          <div style={{ marginBottom: '0.5rem' }}>🛠️ Tech: React, TypeScript</div>
          <div style={{ marginBottom: '0.5rem' }}>⏱️ Duration: 3 months</div>
          <div style={{ marginBottom: '0.5rem' }}>👥 Team: 5 people</div>
          <div>🎯 Status: Live</div>
        </div>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" size="md" interactive>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>💡</div>
        <h4 style={{ margin: 0, marginBottom: '0.5rem' }}>Innovation</h4>
        <p style={{ margin: 0, opacity: 0.9 }}>
          New ideas and creative solutions that push the boundaries of 
          what's possible in modern web development. 
        </p>
      </div>
    </Grid.Item>
  </Grid.Masonry>
);

// Special effects playground
export const SpecialEffects = () => (
  <Grid columns={3} gap="xl" variant="bordered">
    <Grid.Item color="blue" effect="glow" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✨</div>
        <h3 style={{ margin: 0 }}>Mystic Glow</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Pulsing glow that draws attention
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="pink" effect="pulse" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💓</div>
        <h3 style={{ margin: 0 }}>Living Pulse</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Gentle rhythmic heartbeat pulsing 
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="green" effect="bounce" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⬆️</div>
        <h3 style={{ margin: 0 }}>Bounce Joy</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Playful bounce animation on hover
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="purple" effect="float" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎈</div>
        <h3 style={{ margin: 0 }}>Floating Dream</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Gentle floating motion like a balloon
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="orange" effect="rotate" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌀</div>
        <h3 style={{ margin: 0 }}>Spin Magic</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
           Rotation effect on interaction
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="teal" effect="glass" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', color: '#0f766e' }}>🔍</div>
        <h3 style={{ margin: 0, color: '#0f766e' }}>Glass Morph</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.8, color: '#0f766e' }}>
          Frosted glass effect with backdrop blur
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="blue" effect="neon" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💡</div>
        <h3 style={{ margin: 0 }}>Neon Dreams</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Electric neon glow with flickering
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="emerald" gradient pattern="waves" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌊</div>
        <h3 style={{ margin: 0 }}>Ocean Fusion</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Combined gradient + wave pattern
        </p>
      </div>
    </Grid.Item>
    
    <Grid.Item color="violet" gradient effect="pulse" interactive>
      <div>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚡</div>
        <h3 style={{ margin: 0 }}>Power Surge</h3>
        <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
          Gradient + pulse for maximum impact
        </p>
      </div>
    </Grid.Item>
  </Grid>
);

// Dashboard layout templates
export const DashboardLayouts = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.5rem' }}>Sidebar Layout</h3>
      <Grid.Dashboard layout="sidebar" gap="md" style={{ height: '350px' }}>
        <Grid.Area area="sidebar">
          <Grid.Item color="slate" size="lg">
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🗂️</div>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Navigation</h4>
              <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>
                Sidebar navigation panel
              </p>
            </div>
          </Grid.Item>
        </Grid.Area>
        <Grid.Area area="header">
          <Grid.Item color="blue" size="lg">
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📊</div>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Header Bar</h4>
              <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>
                Top application header
              </p>
            </div>
          </Grid.Item>
        </Grid.Area>
        <Grid.Area area="main">
          <Grid.Item color="green" size="lg">
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📄</div>
              <h4 style={{ margin: 0, fontSize: '1.4rem' }}>Main Content</h4>
              <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
                Primary content area with rich information display
              </p>
            </div>
          </Grid.Item>
        </Grid.Area>
      </Grid.Dashboard>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.5rem' }}>Complex Layout</h3>
      <Grid.Dashboard layout="complex" gap="md" style={{ height: '450px' }}>
        <Grid.Area area="header">
          <Grid.Item color="indigo" size="lg">
            <div>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🏠</div>
              <h4 style={{ margin: 0 }}>Application Header</h4>
            </div>
          </Grid.Item>
        </Grid.Area>
        <Grid.Area area="nav">
          <Grid.Item color="purple" size="lg">
            <div>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🧭</div>
              <h4 style={{ margin: 0 }}>Navigation</h4>
            </div>
          </Grid.Item>
        </Grid.Area>
        <Grid.Area area="hero">
          <Grid.Item color="orange" size="lg">
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🦸</div>
              <h4 style={{ margin: 0 }}>Hero Section</h4>
            </div>
          </Grid.Item>
        </Grid.Area>
        <Grid.Area area="aside">
          <Grid.Item color="pink" size="lg">
            <div>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📋</div>
              <h4 style={{ margin: 0 }}>Sidebar</h4>
            </div>
          </Grid.Item>
        </Grid.Area>
        <Grid.Area area="main">
          <Grid.Item color="teal" size="lg">
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
              <h4 style={{ margin: 0 }}>Main Content</h4>
            </div>
          </Grid.Item>
        </Grid.Area>
        <Grid.Area area="footer">
          <Grid.Item color="gray" size="lg">
            <div>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🦶</div>
              <h4 style={{ margin: 0 }}>Footer</h4>
            </div>
          </Grid.Item>
        </Grid.Area>
      </Grid.Dashboard>
    </div>
  </div>
);

// Size variations
export const SizeVariations = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>Extra Small (XS)</h3>
      <Grid columns={3} gap="sm">
        <Grid.Item color="blue" size="xs" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Compact</h4>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.9 }}>Minimal padding</p>
          </div>
        </Grid.Item>
        <Grid.Item color="green" size="xs" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Dense</h4>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.9 }}>Space efficient</p>
          </div>
        </Grid.Item>
        <Grid.Item color="purple" size="xs" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Tight</h4>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.9 }}>Condensed layout</p>
          </div>
        </Grid.Item>
      </Grid>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>Small (SM)</h3>
      <Grid columns={3} gap="sm">
        <Grid.Item color="blue" size="sm" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Compact</h4>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.9 }}>Small padding for dense layouts</p>
          </div>
        </Grid.Item>
        <Grid.Item color="green" size="sm" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Dense</h4>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.9 }}>Good for dashboard widgets</p>
          </div>
        </Grid.Item>
        <Grid.Item color="purple" size="sm" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Tight</h4>
            <p style={{ margin: '0.25rem 0 0', opacity: 0.9 }}>Information cards</p>
          </div>
        </Grid.Item>
      </Grid>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>Medium (MD) - Default</h3>
      <Grid columns={3} gap="md">
        <Grid.Item color="blue" size="md" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Balanced</h4>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Balance of content and whitespace</p>
          </div>
        </Grid.Item>
        <Grid.Item color="green" size="md" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Standard</h4>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Most common size for general use</p>
          </div>
        </Grid.Item>
        <Grid.Item color="purple" size="md" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Optimal</h4>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.9 }}>Good readability and spacing</p>
          </div>
        </Grid.Item>
      </Grid>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>Large (LG)</h3>
      <Grid columns={3} gap="md">
        <Grid.Item color="blue" size="lg" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Spacious</h4>
            <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>Generous padding for featured content and important information</p>
          </div>
        </Grid.Item>
        <Grid.Item color="green" size="lg" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Featured</h4>
            <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>Good for highlighting key content areas</p>
          </div>
        </Grid.Item>
        <Grid.Item color="purple" size="lg" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Premium</h4>
            <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>Plenty of spacing for high-value content</p>
          </div>
        </Grid.Item>
      </Grid>
    </div>

    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151', fontSize: '1.2rem' }}>Extra Large (XL)</h3>
      <Grid columns={2} gap="lg">
        <Grid.Item color="blue" size="xl" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Hero Content</h4>
            <p style={{ margin: '1rem 0 0', opacity: 0.9 }}>
              Maximum padding and typography scaling for hero sections, 
              landing page features, and other prominent content areas that 
              need maximum visual impact.
            </p>
          </div>
        </Grid.Item>
        <Grid.Item color="green" size="xl" interactive>
          <div>
            <h4 style={{ margin: 0 }}>Showcase</h4>
            <p style={{ margin: '1rem 0 0', opacity: 0.9 }}>
              Good for product showcases, testimonials, or any content 
              that deserves extra attention and breathing room.
            </p>
          </div>
        </Grid.Item>
      </Grid>
    </div>
  </div>
);

// Photo gallery style with auto-fit
export const PhotoGallery = () => (
  <Grid columns="auto" minItemWidth="280px" gap="lg" responsive>
    {[
      { color: 'blue', emoji: '🏔️', title: 'Majestic Peaks', desc: 'Snow-capped mountains reaching for the sky', category: 'Nature' },
      { color: 'green', emoji: '🌲', title: 'Ancient Forest', desc: 'Thousand-year-old trees in misty morning light', category: 'Wilderness' },
      { color: 'orange', emoji: '🏜️', title: 'Endless Dunes', desc: 'Golden sand seas stretching beyond horizon', category: 'Desert' },
      { color: 'teal', emoji: '🏖️', title: 'Paradise Beach', desc: 'Crystal waters meeting pristine white sand', category: 'Tropical' },
      { color: 'purple', emoji: '🌸', title: 'Cherry Blossoms', desc: 'Delicate pink petals flowing in spring breeze', category: 'Seasonal' },
      { color: 'pink', emoji: '🌅', title: 'Golden Sunrise', desc: 'First light painting the world in warm hues', category: 'Landscape' },
      { color: 'indigo', emoji: '🌌', title: 'Cosmic Wonder', desc: 'Stars and galaxies in infinite darkness', category: 'Astronomy' },
      { color: 'rose', emoji: '🌹', title: 'Royal Garden', desc: 'Elegant roses in a Victorian garden setting', category: 'Botanical' }
    ].map((item, index) => (
      <Grid.Item 
        key={index} 
        color={item.color} 
        interactive
        onClick={() => alert(`📸 ${item.title}\n\n${item.desc}\n\nCategory: ${item.category}`)}
      >
        <div>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{item.emoji}</div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.title}</h3>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem', lineHeight: 1.4 }}>{item.desc}</p>
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.25rem 0.75rem', 
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: '12px', 
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            {item.category}
          </div>
        </div>
      </Grid.Item>
    ))}
  </Grid>
);

// Playground
export const Playground = {
  args: {
    columns: 3,
    gap: 'md',
    variant: 'default',
    responsive: true
  },
  render: (args) => (
    <Grid {...args}>
      <Grid.Item color="blue" interactive gradient onClick={() => console.log('🎮 Interactive Blue!')}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎮</div>
          <h3 style={{ margin: 0 }}>Interactive</h3>
          <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
            Click me! Features hover lift, gradient animation, and console logging.
          </p>
        </div>
      </Grid.Item>
      
      <Grid.Item color="green" pattern="dots" effect="pulse">
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✨</div>
          <h3 style={{ margin: 0 }}>Enhanced</h3>
          <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
            Combines dots pattern with pulse effect for maximum visual impact.
          </p>
        </div>
      </Grid.Item>
      
      <Grid.Item color="purple" colSpan={1} rowSpan={1} interactive>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎨</div>
          <h3 style={{ margin: 0 }}>Customizable</h3>
          <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
            Use the controls below to experiment with different configurations.
          </p>
        </div>
      </Grid.Item>
      
      <Grid.Item color="orange" effect="glow" interactive onClick={() => console.log('🔥 Orange power!')}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔥</div>
          <h3 style={{ margin: 0 }}>Glowing</h3>
          <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
            Premium glow effect that pulses with energy and excitement.
          </p>
        </div>
      </Grid.Item>
      
      <Grid.Item color="pink" pattern="waves" gradient interactive>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌊</div>
          <h3 style={{ margin: 0 }}>Combined</h3>
          <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
            Multiple effects working together in perfect harmony.
          </p>
        </div>
      </Grid.Item>
      
      <Grid.Item color="teal" effect="float" interactive>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎈</div>
          <h3 style={{ margin: 0 }}>Floating</h3>
          <p style={{ margin: '0.75rem 0 0', opacity: 0.9 }}>
            Gentle floating animation creates a dreamy, weightless feeling.
          </p>
        </div>
      </Grid.Item>
    </Grid>
  )
};