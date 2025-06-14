import Tooltip from './Tooltip';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import Avatar from '../Avatar/Avatar';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: 'A flexible tooltip component with smart positioning, multiple triggers, and rich content support. Perfect for providing contextual information and help text.'
      }
    }
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'auto']
    },
    color: {
      control: 'select',
      options: ['dark', 'light', 'primary', 'success', 'warning', 'error']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    delay: {
      control: 'select',
      options: ['none', 'short', 'medium', 'long']
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'both']
    },
    showArrow: {
      control: 'boolean'
    },
    interactive: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    multiline: {
      control: 'boolean'
    }
  }
};

// Basic tooltip
export const Default = {
  args: {
    content: 'This is a helpful tooltip!',
    children: <Button>Hover me</Button>
  }
};

// Position variants
export const Positions = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '2rem', 
    padding: '4rem',
    justifyItems: 'center' 
  }}>
    <div></div>
    <Tooltip content="Top tooltip" position="top">
      <Button>Top</Button>
    </Tooltip>
    <div></div>
    
    <Tooltip content="Left tooltip" position="left">
      <Button>Left</Button>
    </Tooltip>
    
    <Tooltip content="Auto positioning" position="auto">
      <Button>Auto</Button>
    </Tooltip>
    
    <Tooltip content="Right tooltip" position="right">
      <Button>Right</Button>
    </Tooltip>
    
    <div></div>
    <Tooltip content="Bottom tooltip" position="bottom">
      <Button>Bottom</Button>
    </Tooltip>
    <div></div>
  </div>
);

// Color variants
export const Colors = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Tooltip content="Dark tooltip (default)" color="dark">
      <Button variant="outline">Dark</Button>
    </Tooltip>
    
    <Tooltip content="Light tooltip" color="light">
      <Button variant="outline">Light</Button>
    </Tooltip>
    
    <Tooltip content="Primary tooltip" color="primary">
      <Button variant="outline">Primary</Button>
    </Tooltip>
    
    <Tooltip content="Success tooltip" color="success">
      <Button variant="outline">Success</Button>
    </Tooltip>
    
    <Tooltip content="Warning tooltip" color="warning">
      <Button variant="outline">Warning</Button>
    </Tooltip>
    
    <Tooltip content="Error tooltip" color="error">
      <Button variant="outline">Error</Button>
    </Tooltip>
  </div>
);

// Size variants
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Tooltip content="Small tooltip" size="small">
      <Button variant="outline">Small</Button>
    </Tooltip>
    
    <Tooltip content="Medium tooltip with more content to show the difference" size="medium">
      <Button variant="outline">Medium</Button>
    </Tooltip>
    
    <Tooltip content="Large tooltip with even more content to demonstrate the larger maximum width and better readability for longer text" size="large">
      <Button variant="outline">Large</Button>
    </Tooltip>
  </div>
);

// Trigger variants
export const Triggers = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Tooltip content="Hover to see this tooltip" trigger="hover">
      <Button variant="outline">Hover</Button>
    </Tooltip>
    
    <Tooltip content="Focus this button to see tooltip" trigger="focus">
      <Button variant="outline">Focus</Button>
    </Tooltip>
    
    <Tooltip content="Click to toggle this tooltip" trigger="click">
      <Button variant="outline">Click</Button>
    </Tooltip>
    
    <Tooltip content="Hover or focus to see this" trigger="both">
      <Button variant="outline">Both</Button>
    </Tooltip>
  </div>
);

// Delay variants
export const Delays = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Tooltip content="No delay" delay="none">
      <Button variant="outline">No Delay</Button>
    </Tooltip>
    
    <Tooltip content="Short delay (100ms)" delay="short">
      <Button variant="outline">Short</Button>
    </Tooltip>
    
    <Tooltip content="Medium delay (300ms)" delay="medium">
      <Button variant="outline">Medium</Button>
    </Tooltip>
    
    <Tooltip content="Long delay (500ms)" delay="long">
      <Button variant="outline">Long</Button>
    </Tooltip>
  </div>
);

// Interactive tooltip
export const Interactive = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Tooltip 
      content={
        <div>
          <strong>Interactive Tooltip</strong>
          <p style={{ margin: '0.5rem 0 0' }}>
            You can hover over this tooltip content!
          </p>
        </div>
      }
      interactive
      multiline
      size="large"
    >
      <Button>Interactive</Button>
    </Tooltip>
    
    <Tooltip 
      content={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Avatar name="John Doe" size="small" />
          <div>
            <div style={{ fontWeight: 'bold' }}>John Doe</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Senior Developer</div>
          </div>
        </div>
      }
      interactive
      multiline
      color="light"
      position="bottom"
    >
      <Avatar name="John Doe" size="medium" />
    </Tooltip>
  </div>
);

// Multiline content
export const Multiline = () => (
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Tooltip 
      content="This is a single line tooltip that will wrap if it gets too long for the maximum width"
      multiline
    >
      <Button variant="outline">Single Line</Button>
    </Tooltip>
    
    <Tooltip 
      content={
        <div>
          <strong>Rich Content Tooltip</strong>
          <p style={{ margin: '0.5rem 0 0' }}>
            This tooltip contains multiple paragraphs and rich formatting.
          </p>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1rem' }}>
            <li>Feature one</li>
            <li>Feature two</li>
            <li>Feature three</li>
          </ul>
        </div>
      }
      multiline
      size="large"
      color="light"
    >
      <Button>Rich Content</Button>
    </Tooltip>
  </div>
);

// With different components
export const WithComponents = () => (
  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
    <Tooltip content="This button performs an important action">
      <Button variant="primary">Primary Action</Button>
    </Tooltip>
    
    <Tooltip content="5 new notifications" position="bottom">
      <Badge color="error" badge={5}>
        Notifications
      </Badge>
    </Tooltip>
    
    <Tooltip 
      content="User is currently online and available for chat"
      position="right"
      color="success"
    >
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        name="John Doe"
        status="online"
      />
    </Tooltip>
    
    <Tooltip content="This field is required" color="error" trigger="focus">
      <input 
        placeholder="Focus me"
        style={{ 
          padding: '0.5rem', 
          border: '1px solid var(--color-neutral-300)', 
          borderRadius: '0.375rem' 
        }}
      />
    </Tooltip>
  </div>
);

// Help tooltips
export const HelpTooltips = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <label style={{ fontWeight: 500 }}>Password</label>
      <Tooltip 
        content="Password must be at least 8 characters long and contain uppercase, lowercase, and numbers"
        size="medium"
        multiline
        trigger="both"
      >
        <button style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--color-primary-600)', 
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}>
          ℹ️
        </button>
      </Tooltip>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <label style={{ fontWeight: 500 }}>API Key</label>
      <Tooltip 
        content={
          <div>
            <strong>Where to find your API key:</strong>
            <ol style={{ margin: '0.5rem 0 0', paddingLeft: '1rem' }}>
              <li>Go to Settings</li>
              <li>Navigate to API section</li>
              <li>Click "Generate New Key"</li>
            </ol>
          </div>
        }
        size="large"
        multiline
        interactive
        color="light"
        trigger="click"
      >
        <button style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--color-primary-600)', 
          cursor: 'pointer',
          fontSize: '0.875rem'
        }}>
          ❓
        </button>
      </Tooltip>
    </div>
  </div>
);

// Disabled state
export const Disabled = () => (
  <div style={{ display: 'flex', gap: '1rem' }}>
    <Tooltip content="This tooltip is disabled" disabled>
      <Button variant="outline">Disabled Tooltip</Button>
    </Tooltip>
    
    <Tooltip content="This tooltip works normally">
      <Button>Normal Tooltip</Button>
    </Tooltip>
  </div>
);

// Edge cases and positioning
export const EdgeCases = () => (
  <div style={{ height: '300px', position: 'relative', padding: '1rem' }}>
    <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
      <Tooltip content="Near top-left edge" position="auto">
        <Button size="small">Top Left</Button>
      </Tooltip>
    </div>
    
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <Tooltip content="Near top-right edge" position="auto">
        <Button size="small">Top Right</Button>
      </Tooltip>
    </div>
    
    <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
      <Tooltip content="Near bottom-left edge" position="auto">
        <Button size="small">Bottom Left</Button>
      </Tooltip>
    </div>
    
    <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
      <Tooltip content="Near bottom-right edge" position="auto">
        <Button size="small">Bottom Right</Button>
      </Tooltip>
    </div>
    
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Tooltip content="Center with auto positioning" position="auto">
        <Button>Center</Button>
      </Tooltip>
    </div>
  </div>
);

// Complex content examples
export const ComplexContent = () => (
  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
    <Tooltip 
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: 'green', borderRadius: '50%' }}></div>
            <span style={{ fontWeight: 'bold' }}>Server Status</span>
          </div>
          <div style={{ fontSize: '0.75rem' }}>
            <div>CPU: 45% usage</div>
            <div>Memory: 2.1GB / 8GB</div>
            <div>Uptime: 7 days, 3 hours</div>
          </div>
        </div>
      }
      interactive
      multiline
      size="large"
      color="light"
    >
      <Button variant="outline">Server Status</Button>
    </Tooltip>
    
    <Tooltip 
      content={
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>📊</span>
            <strong>Sales Report</strong>
          </div>
          <div style={{ fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>This Month:</span>
              <span style={{ fontWeight: 'bold', color: 'green' }}>$45,230</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>Last Month:</span>
              <span>$38,920</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'green' }}>
              <span>Growth:</span>
              <span>+16.2%</span>
            </div>
          </div>
        </div>
      }
      interactive
      multiline
      size="large"
      trigger="click"
      color="primary"
    >
      <Button variant="primary">View Sales</Button>
    </Tooltip>
  </div>
);

// Accessibility example
export const Accessibility = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <p>Tooltips with proper ARIA attributes and keyboard navigation:</p>
    
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Tooltip content="This tooltip can be triggered with Tab and Enter" trigger="both">
        <Button>Keyboard Accessible</Button>
      </Tooltip>
      
      <Tooltip content="Press Escape to close this tooltip" trigger="click">
        <Button>Click & Escape</Button>
      </Tooltip>
      
      <Tooltip content="Focus this input to see the tooltip" trigger="focus">
        <input 
          placeholder="Focus me with Tab"
          style={{ 
            padding: '0.5rem', 
            border: '1px solid var(--color-neutral-300)', 
            borderRadius: '0.375rem' 
          }}
        />
      </Tooltip>
    </div>
  </div>
);