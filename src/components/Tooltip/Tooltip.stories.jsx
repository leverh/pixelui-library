import { useState, useEffect } from 'react';
import Tooltip from './Tooltip';

export default {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A premium tooltip component with glassmorphism effects, smart positioning, smooth animations, and rich content support. Features modern design patterns and comprehensive accessibility.'
      }
    }
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'auto'],
      description: 'Position of the tooltip relative to trigger'
    },
    color: {
      control: 'select',
      options: ['dark', 'light', 'primary', 'success', 'warning', 'error'],
      description: 'Color theme with gradient backgrounds'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size affects padding, font size, and max width'
    },
    delay: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Delay before showing tooltip'
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'both'],
      description: 'What triggers the tooltip to show'
    },
    animation: {
      control: 'select',
      options: ['scale', 'fade', 'slide', 'bounce'],
      description: 'Animation style for show/hide'
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show the pointing arrow'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether tooltip content can be hovered/clicked'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tooltip'
    },
    multiline: {
      control: 'boolean',
      description: 'Allow content to span multiple lines'
    }
  }
};

// Mock Button component for stories
const Button = ({ children, variant = 'default', size = 'md', ...props }) => (
  <button
    style={{
      padding: size === 'sm' ? '0.375rem 0.75rem' : '0.5rem 1rem',
      borderRadius: '0.5rem',
      border: variant === 'outline' ? '1px solid #d1d5db' : 'none',
      background: variant === 'primary' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 
                 variant === 'outline' ? 'white' : '#f3f4f6',
      color: variant === 'primary' ? 'white' : '#374151',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: size === 'sm' ? '0.875rem' : '0.875rem'
    }}
    {...props}
  >
    {children}
  </button>
);

// Mock Badge component
const Badge = ({ children, color = 'primary', ...props }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.125rem 0.5rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      borderRadius: '9999px',
      background: color === 'error' ? '#ef4444' : '#3b82f6',
      color: 'white'
    }}
    {...props}
  >
    {children}
  </span>
);

// Mock Avatar component
const Avatar = ({ name, size = 'md', status, src, ...props }) => (
  <div
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size === 'sm' ? '2rem' : size === 'lg' ? '3rem' : '2.5rem',
      height: size === 'sm' ? '2rem' : size === 'lg' ? '3rem' : '2.5rem',
      borderRadius: '50%',
      background: src ? `url(${src})` : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      fontWeight: '500',
      fontSize: size === 'sm' ? '0.75rem' : '0.875rem'
    }}
    {...props}
  >
    {!src && name?.charAt(0)}
    {status && (
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          background: status === 'online' ? '#10b981' : '#6b7280',
          border: '1px solid white'
        }}
      />
    )}
  </div>
);



// Playground - Interactive controls
export const Playground = {
  args: {
    content: 'This is a customizable tooltip! 🎯',
    position: 'top',
    color: 'dark',
    size: 'md',
    delay: 'md',
    trigger: 'hover',
    animation: 'scale',
    showArrow: true,
    interactive: false,
    disabled: false,
    multiline: false,
    children: <Button>Customize me!</Button>
  }
};

// Basic tooltip
export const Default = {
  args: {
    content: 'This is a helpful tooltip! ✨',
    children: <Button>Hover me</Button>
  }
};

// Position variants layout
export const Positions = () => (
  <div style={{ 
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)', 
    gap: '3rem', 
    padding: '4rem',
    justifyItems: 'center',
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    borderRadius: '1rem',
    minHeight: '300px'
  }}>
    <div></div>
    <Tooltip content="🔝 Top position with smooth animation" position="top" animation="slide">
      <Button variant="outline">Top</Button>
    </Tooltip>
    <div></div>
    
    <Tooltip content="👈 Left position" position="left" color="primary">
      <Button variant="outline">Left</Button>
    </Tooltip>
    
    <Tooltip content="🎯 Smart auto-positioning detects best placement" position="auto" color="success">
      <Button variant="primary">Auto ✨</Button>
    </Tooltip>
    
    <Tooltip content="👉 Right position" position="right" color="warning">
      <Button variant="outline">Right</Button>
    </Tooltip>
    
    <div></div>
    <Tooltip content="👇 Bottom position with bounce effect" position="bottom" animation="bounce">
      <Button variant="outline">Bottom</Button>
    </Tooltip>
    <div></div>
  </div>
);

// Color variants with gradients
export const Colors = () => (
  <div style={{ 
    display: 'flex', 
    gap: '1.5rem', 
    flexWrap: 'wrap',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
    borderRadius: '1rem'
  }}>
    <Tooltip content="🌙 Dark tooltip with glassmorphism" color="dark">
      <Button variant="outline">Dark</Button>
    </Tooltip>
    
    <Tooltip content="☀️ Light tooltip with backdrop blur" color="light">
      <Button variant="outline">Light</Button>
    </Tooltip>
    
    <Tooltip content="🎯 Primary with gradient background" color="primary">
      <Button variant="outline">Primary</Button>
    </Tooltip>
    
    <Tooltip content="✅ Success with glowing effect" color="success">
      <Button variant="outline">Success</Button>
    </Tooltip>
    
    <Tooltip content="⚠️ Warning with smooth transitions" color="warning">
      <Button variant="outline">Warning</Button>
    </Tooltip>
    
    <Tooltip content="❌ Error with premium shadows" color="error">
      <Button variant="outline">Error</Button>
    </Tooltip>
  </div>
);

// Size variants
export const Sizes = () => (
  <div style={{ 
    display: 'flex', 
    gap: '1.5rem', 
    flexWrap: 'wrap', 
    alignItems: 'center',
    padding: '2rem'
  }}>
    <Tooltip content="Extra small" size="xs">
      <Button size="sm">XS</Button>
    </Tooltip>
    
    <Tooltip content="Small tooltip size" size="sm">
      <Button size="sm">Small</Button>
    </Tooltip>
    
    <Tooltip content="Medium tooltip with balanced sizing for most use cases" size="md">
      <Button>Medium</Button>
    </Tooltip>
    
    <Tooltip content="Large tooltip with more space for detailed information and better readability" size="lg">
      <Button>Large</Button>
    </Tooltip>
    
    <Tooltip content="Extra large tooltip provides maximum space for rich content, detailed explanations, and complex information that needs more room to breathe" size="xl">
      <Button>Extra Large</Button>
    </Tooltip>
  </div>
);

// Animation variants
export const Animations = () => (
  <div style={{ 
    display: 'flex', 
    gap: '1.5rem', 
    flexWrap: 'wrap',
    padding: '2rem'
  }}>
    <Tooltip content="🎯 Scale animation (default)" animation="scale" color="primary">
      <Button variant="outline">Scale</Button>
    </Tooltip>
    
    <Tooltip content="🌊 Smooth fade transition" animation="fade" color="success">
      <Button variant="outline">Fade</Button>
    </Tooltip>
    
    <Tooltip content="🚀 Slide animation with direction" animation="slide" color="warning">
      <Button variant="outline">Slide</Button>
    </Tooltip>
    
    <Tooltip content="🎈 Bouncy entrance effect" animation="bounce" color="error">
      <Button variant="outline">Bounce</Button>
    </Tooltip>
  </div>
);

// Trigger variants
export const Triggers = () => (
  <div style={{ 
    display: 'flex', 
    gap: '1.5rem', 
    flexWrap: 'wrap',
    padding: '2rem'
  }}>
    <Tooltip content="🖱️ Hover to see this premium tooltip" trigger="hover">
      <Button variant="outline">Hover</Button>
    </Tooltip>
    
    <Tooltip content="⌨️ Focus this button to see tooltip (Tab key)" trigger="focus">
      <Button variant="outline">Focus</Button>
    </Tooltip>
    
    <Tooltip content="👆 Click to toggle this interactive tooltip" trigger="click" interactive>
      <Button variant="outline">Click</Button>
    </Tooltip>
    
    <Tooltip content="🎯 Hover or focus to see this versatile tooltip" trigger="both">
      <Button variant="outline">Both</Button>
    </Tooltip>
  </div>
);

// Delay variants
export const Delays = () => (
  <div style={{ 
    display: 'flex', 
    gap: '1.5rem', 
    flexWrap: 'wrap',
    padding: '2rem'
  }}>
    <Tooltip content="⚡ Instant appearance" delay="none">
      <Button variant="outline">No Delay</Button>
    </Tooltip>
    
    <Tooltip content="🏃 Quick show (50ms)" delay="xs">
      <Button variant="outline">Extra Fast</Button>
    </Tooltip>
    
    <Tooltip content="🚶 Short delay (150ms)" delay="sm">
      <Button variant="outline">Fast</Button>
    </Tooltip>
    
    <Tooltip content="🕐 Medium delay (300ms)" delay="md">
      <Button variant="outline">Medium</Button>
    </Tooltip>
    
    <Tooltip content="🐌 Long delay (500ms)" delay="lg">
      <Button variant="outline">Slow</Button>
    </Tooltip>
    
    <Tooltip content="🦥 Extra long delay (750ms)" delay="xl">
      <Button variant="outline">Very Slow</Button>
    </Tooltip>
  </div>
);

// Interactive tooltip with rich content
export const Interactive = () => (
  <div style={{ 
    display: 'flex', 
    gap: '2rem', 
    flexWrap: 'wrap',
    padding: '2rem'
  }}>
    <Tooltip 
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>🎯 Interactive Tooltip</div>
          <p style={{ margin: 0, lineHeight: '1.5' }}>
            You can hover over this content and interact with it! This showcases the premium 
            interactive capabilities.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            paddingTop: '0.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <button style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: '0.25rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer'
            }}>
              Action 1
            </button>
            <button style={{
              padding: '0.25rem 0.5rem',
              fontSize: '0.75rem',
              borderRadius: '0.25rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer'
            }}>
              Action 2
            </button>
          </div>
        </div>
      }
      interactive
      multiline
      size="lg"
      color="primary"
    >
      <Button variant="primary">Interactive Content</Button>
    </Tooltip>
    
    <Tooltip 
      content={
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Avatar name="Sarah Chen" size="sm" status="online" />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Sarah Chen</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Senior Product Designer</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>🟢 Available for collaboration</div>
          </div>
        </div>
      }
      interactive
      multiline
      color="light"
      position="bottom"
      size="lg"
    >
      <Avatar name="Sarah Chen" status="online" />
    </Tooltip>
  </div>
);

// Rich content examples
export const RichContent = () => (
  <div style={{ 
    display: 'flex', 
    gap: '2rem', 
    flexWrap: 'wrap',
    padding: '2rem'
  }}>
    <Tooltip 
      content={
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
            📊 Performance Metrics
          </div>
          <div style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>CPU Usage:</span>
              <span style={{ color: '#10b981' }}>45%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>Memory:</span>
              <span style={{ color: '#f59e0b' }}>2.1GB / 8GB</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Uptime:</span>
              <span style={{ color: '#3b82f6' }}>7d 3h</span>
            </div>
          </div>
        </div>
      }
      multiline
      size="lg"
      color="dark"
      interactive
    >
      <Button variant="outline">Server Status 📊</Button>
    </Tooltip>
    
    <Tooltip 
      content={
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '0.75rem',
            paddingBottom: '0.5rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🚀</span>
            <strong>Quick Actions</strong>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              background: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              📋 Create new project
            </button>
            <button style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              background: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              👥 Invite team member
            </button>
            <button style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              background: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              📈 View analytics
            </button>
          </div>
        </div>
      }
      interactive
      multiline
      size="xl"
      color="light"
      trigger="click"
    >
      <Button variant="primary">Quick Actions</Button>
    </Tooltip>
  </div>
);

// Component integration examples
export const WithComponents = () => (
  <div style={{ 
    display: 'flex', 
    gap: '2rem', 
    flexWrap: 'wrap', 
    alignItems: 'center',
    padding: '2rem'
  }}>
    <Tooltip content="🎯 Primary action that triggers the main workflow" position="top">
      <Button variant="primary">Primary Action</Button>
    </Tooltip>
    
    <Tooltip content="🔔 You have 5 new notifications waiting for review" position="bottom" color="error">
      <Badge color="error">5 notifications</Badge>
    </Tooltip>
    
    <Tooltip 
      content="🟢 User is currently online and available for chat and collaboration"
      position="right"
      color="success"
      size="md"
    >
      <Avatar 
        name="Alex Kim"
        status="online"
      />
    </Tooltip>
    
    <Tooltip content="⚠️ This field is required for form submission" color="warning" trigger="focus">
      <input 
        placeholder="Focus to see tooltip"
        style={{ 
          padding: '0.75rem', 
          border: '2px solid #e5e7eb', 
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          transition: 'border-color 0.2s ease'
        }}
        onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
        onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
      />
    </Tooltip>
  </div>
);

// Help tooltips with advanced features
export const HelpTooltips = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2rem', 
    maxWidth: '500px',
    padding: '2rem',
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>Password</label>
      <Tooltip 
        content={
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>🔒 Password Requirements:</div>
            <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.875rem', lineHeight: '1.5' }}>
              <li>At least 8 characters long</li>
              <li>Include uppercase letters</li>
              <li>Include lowercase letters</li>
              <li>Include numbers</li>
              <li>Include special characters</li>
            </ul>
          </div>
        }
        size="lg"
        multiline
        trigger="both"
        color="primary"
        interactive
      >
        <button style={{ 
          background: 'none', 
          border: 'none', 
          color: '#3b82f6', 
          cursor: 'pointer',
          fontSize: '1rem',
          padding: '0.25rem',
          borderRadius: '0.25rem'
        }}>
          ℹ️
        </button>
      </Tooltip>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#374151' }}>API Configuration</label>
      <Tooltip 
        content={
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔧</span>
              <span>API Setup Guide</span>
            </div>
            <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>Step 1:</strong> Navigate to Settings → API
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>Step 2:</strong> Click "Generate New Key"
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                <strong>Step 3:</strong> Copy and securely store your key
              </div>
              <div style={{ 
                padding: '0.5rem', 
                background: 'rgba(0, 0, 0, 0.1)', 
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                marginTop: '0.75rem'
              }}>
                💡 Keys expire after 90 days for security
              </div>
            </div>
          </div>
        }
        size="xl"
        multiline
        interactive
        color="light"
        trigger="click"
        position="right"
      >
        <button style={{ 
          background: 'none', 
          border: 'none', 
          color: '#059669', 
          cursor: 'pointer',
          fontSize: '1rem',
          padding: '0.25rem',
          borderRadius: '0.25rem'
        }}>
          ❓
        </button>
      </Tooltip>
    </div>
  </div>
);

// Edge cases and smart positioning
export const SmartPositioning = () => (
  <div style={{ 
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '4rem',
    padding: '4rem',
    height: '500px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '1rem',
    alignItems: 'center',
    justifyItems: 'center'
  }}>
    {/* Top row */}
    <Tooltip content="🔍 Smart positioning detects edges automatically" position="auto" color="light">
      <Button size="sm">Top Left</Button>
    </Tooltip>
    <div></div>
    <Tooltip content="📍 Auto-adjusts when near viewport edges" position="auto" color="success">
      <Button size="sm">Top Right</Button>
    </Tooltip>

    {/* Middle row */}
    <div></div>
    <Tooltip content="🌟 Center with premium effects" position="auto" color="primary" size="lg" animation="bounce">
      <Button variant="primary">Center Magic ✨</Button>
    </Tooltip>
    <div></div>

    {/* Bottom row */}
    <Tooltip content="🎯 Collision detection prevents clipping" position="auto" color="warning">
      <Button size="sm">Bottom Left</Button>
    </Tooltip>
    <div></div>
    <Tooltip content="✨ Always finds the best position" position="auto" color="error">
      <Button size="sm">Bottom Right</Button>
    </Tooltip>
  </div>
);

// Accessibility demonstration
export const Accessibility = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2rem',
    padding: '2rem'
  }}>
    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        🔧 Accessibility Features
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Tooltips with comprehensive keyboard navigation, ARIA attributes, and assistive technology support.
      </p>
    </div>
    
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <Tooltip content="⌨️ Navigate with Tab, activate with Enter or Space" trigger="both" color="primary">
        <Button>Keyboard Navigation</Button>
      </Tooltip>
      
      <Tooltip content="🛡️ Press Escape to close tooltip instantly" trigger="click" color="success">
        <Button variant="outline">Escape Key Support</Button>
      </Tooltip>
      
      <Tooltip content="🎯 Proper ARIA attributes for screen readers" trigger="focus" color="warning">
        <input 
          placeholder="Tab to focus, screen reader friendly"
          style={{ 
            padding: '0.75rem', 
            border: '2px solid #e5e7eb', 
            borderRadius: '0.5rem',
            fontSize: '0.875rem'
          }}
        />
      </Tooltip>
      
      <Tooltip content="🔍 High contrast mode supported automatically" color="error">
        <Button variant="outline">High Contrast Ready</Button>
      </Tooltip>
    </div>
  </div>
);

// Disabled state
export const DisabledState = () => (
  <div style={{ 
    display: 'flex', 
    gap: '1.5rem',
    padding: '2rem'
  }}>
    <Tooltip content="This tooltip is disabled and won't show" disabled>
      <Button variant="outline" style={{ opacity: 0.6 }}>Disabled Tooltip</Button>
    </Tooltip>
    
    <Tooltip content="✅ This tooltip works normally with all features">
      <Button variant="primary">Active Tooltip</Button>
    </Tooltip>
  </div>
);

// Real-world usage examples
export const RealWorldExamples = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '3rem',
    padding: '2rem',
    maxWidth: '800px'
  }}>
    {/* Dashboard Widget */}
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
          Sales Dashboard
        </h3>
        <Tooltip 
          content={
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📊 Dashboard Information</div>
              <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                Data is updated in real-time and shows metrics from the last 30 days. 
                Click on any chart element to drill down into detailed analytics.
              </div>
            </div>
          }
          color="primary"
          size="lg"
          multiline
          interactive
        >
          <button style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '1.125rem',
            padding: '0.25rem'
          }}>
            ℹ️
          </button>
        </Tooltip>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Tooltip content="💰 Total revenue for this month" color="success" position="bottom">
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
            borderRadius: '0.75rem',
            textAlign: 'center',
            cursor: 'help'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#065f46' }}>$45,230</div>
            <div style={{ fontSize: '0.875rem', color: '#047857' }}>Revenue</div>
          </div>
        </Tooltip>
        
        <Tooltip content="👥 Number of active customers this month" color="primary" position="bottom">
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
            borderRadius: '0.75rem',
            textAlign: 'center',
            cursor: 'help'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e40af' }}>1,247</div>
            <div style={{ fontSize: '0.875rem', color: '#2563eb' }}>Customers</div>
          </div>
        </Tooltip>
        
        <Tooltip content="📈 Growth percentage compared to last month" color="warning" position="bottom">
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
            borderRadius: '0.75rem',
            textAlign: 'center',
            cursor: 'help'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#92400e' }}>+16.2%</div>
            <div style={{ fontSize: '0.875rem', color: '#d97706' }}>Growth</div>
          </div>
        </Tooltip>
      </div>
    </div>

    {/* Navigation Menu */}
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
        Navigation with Contextual Help
      </h3>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tooltip content="🏠 Return to main dashboard overview" delay="sm">
          <Button variant="outline">Home</Button>
        </Tooltip>
        
        <Tooltip 
          content={
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>📊 Analytics Suite</div>
              <div style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
                • Revenue tracking<br/>
                • Customer insights<br/>
                • Performance metrics<br/>
                • Custom reports
              </div>
            </div>
          }
          multiline
          size="md"
          delay="sm"
        >
          <Button variant="outline">Analytics</Button>
        </Tooltip>
        
        <Tooltip content="👥 Manage team members, roles, and permissions" delay="sm">
          <Button variant="outline">Team</Button>
        </Tooltip>
        
        <Tooltip 
          content="⚙️ Application settings and preferences" 
          delay="sm"
          color="primary"
        >
          <Button variant="outline">Settings</Button>
        </Tooltip>
      </div>
    </div>

    {/* Form with Help Tooltips */}
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
        Smart Form with Contextual Help
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: '#374151' }}>Project Name</label>
            <Tooltip 
              content="💡 Choose a descriptive name that team members will easily recognize"
              trigger="both"
              size="md"
            >
              <span style={{ color: '#6b7280', cursor: 'help' }}>?</span>
            </Tooltip>
          </div>
          <input 
            placeholder="Enter project name"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem'
            }}
          />
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: '500', color: '#374151' }}>Budget Range</label>
            <Tooltip 
              content={
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>💰 Budget Guidelines</div>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
                    • Small: $1K - $10K<br/>
                    • Medium: $10K - $50K<br/>
                    • Large: $50K - $200K<br/>
                    • Enterprise: $200K+
                  </div>
                </div>
              }
              multiline
              interactive
              trigger="click"
              color="success"
              size="lg"
            >
              <span style={{ color: '#059669', cursor: 'help', fontWeight: 'bold' }}>💡</span>
            </Tooltip>
          </div>
          <select style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            background: 'white'
          }}>
            <option>Select budget range</option>
            <option>Small ($1K - $10K)</option>
            <option>Medium ($10K - $50K)</option>
            <option>Large ($50K - $200K)</option>
            <option>Enterprise ($200K+)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

// Performance showcase
export const PerformanceShowcase = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2rem',
    padding: '2rem'
  }}>
    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        🚀 Performance & Optimization Features
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Demonstrating smooth 60fps animations, efficient positioning, and optimized rendering.
      </p>
    </div>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '1rem' 
    }}>
      {Array.from({ length: 12 }, (_, i) => (
        <Tooltip 
          key={i}
          content={`🎯 Tooltip #${i + 1} with smooth animations and efficient rendering`}
          color={['primary', 'success', 'warning', 'error'][i % 4]}
          animation={['scale', 'fade', 'slide', 'bounce'][i % 4]}
          delay={['xs', 'sm', 'md'][i % 3]}
          position="auto"
        >
          <div style={{
            padding: '1rem',
            background: `linear-gradient(135deg, ${
              ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][i % 4]
            }, ${
              ['#2563eb', '#059669', '#d97706', '#dc2626'][i % 4]
            })`,
            color: 'white',
            borderRadius: '0.75rem',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.875rem',
            transition: 'transform 0.2s ease'
          }}>
            Item {i + 1}
          </div>
        </Tooltip>
      ))}
    </div>
    
    <div style={{
      padding: '1rem',
      background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
      borderRadius: '0.75rem',
      border: '1px solid #0ea5e9',
      color: '#0c4a6e'
    }}>
      <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
        💡 Performance Features:
      </div>
      <div style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
        • Hardware-accelerated transforms • Efficient collision detection • Smart positioning cache 
        • Optimized event handling • Reduced motion support • Memory leak prevention
      </div>
    </div>
  </div>
);

// Dynamic content component that updates on each render
const DynamicTooltipContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>⏰ Real-time Data</div>
      <div style={{ fontSize: '0.875rem' }}>
        Current time: {currentTime}
      </div>
      <div style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>
        Updates each time tooltip opens
      </div>
    </div>
  );
};

// Advanced features demonstration
export const AdvancedFeatures = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2rem',
    padding: '2rem'
  }}>
    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        🔥 Advanced Tooltip Features
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Showcasing cutting-edge tooltip capabilities with rich interactions and smart behaviors.
      </p>
    </div>
    
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* Nested Tooltips */}
      <Tooltip 
        content={
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '0.75rem' }}>🎯 Multi-level Help System</div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.4', margin: '0 0 0.75rem 0' }}>
              This tooltip contains another interactive element:
            </p>
            <Tooltip content="🌟 Nested tooltip works perfectly!" color="success" size="sm">
              <button style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}>
                Hover for nested tip
              </button>
            </Tooltip>
          </div>
        }
        interactive
        multiline
        size="lg"
        color="primary"
        trigger="click"
      >
        <Button variant="primary">Nested Tooltips</Button>
      </Tooltip>

      {/* Dynamic Content with real updates */}
      <Tooltip 
        content={
          <DynamicTooltipContent />
        }
        multiline
        color="warning"
        trigger="click"
      >
        <Button variant="outline">Dynamic Content</Button>
      </Tooltip>

      {/* Complex Layout with proper sizing */}
      <Tooltip 
        content={
          <div style={{ width: '280px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.75rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Avatar name="Product Team" size="sm" />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Product Team</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Design System Updates</div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>24</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Components</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>96%</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Coverage</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}>
                Details
              </button>
              <button style={{
                flex: 1,
                background: 'white',
                border: 'none',
                color: '#3b82f6',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                Open
              </button>
            </div>
          </div>
        }
        interactive
        multiline
        size="xl"
        color="primary"
        position="bottom"
      >
        <Button variant="primary">Complex Layout</Button>
      </Tooltip>
    </div>
  </div>
);

// Testing edge cases
export const EdgeCases = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2rem',
    padding: '2rem'
  }}>
    <div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        🧪 Edge Cases & Stress Testing
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Testing tooltip behavior in challenging scenarios and edge cases.
      </p>
    </div>
    
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      {/* Very Long Content */}
      <Tooltip 
        content="🚀 This is an extremely long tooltip content that tests how the component handles extensive text. It should wrap properly, maintain readability, and still look great even with this much information. The tooltip should handle this gracefully with proper line breaks, spacing, and overall typography that remains consistent with the design system. Performance should remain smooth even with longer content like this extensive example."
        multiline
        size="xl"
        color="primary"
      >
        <Button variant="outline">Very Long Content</Button>
      </Tooltip>

      {/* Empty Content Handling */}
      <Tooltip content="" showArrow={false}>
        <Button variant="outline">Empty Content</Button>
      </Tooltip>

      {/* Special Characters */}
      <Tooltip 
        content="🎨 Special chars: áéíóú ñüç 中文 العربية русский 🎯🚀✨💎🔥⚡"
        color="success"
        size="lg"
        multiline
      >
        <Button variant="outline">Special Characters</Button>
      </Tooltip>

      {/* Rapid Toggling */}
      <Tooltip 
        content="⚡ Rapid interaction test - hover quickly multiple times"
        delay="none"
        color="warning"
      >
        <Button variant="outline">Rapid Toggle Test</Button>
      </Tooltip>

      {/* No Arrow */}
      <Tooltip 
        content="🎯 This tooltip has no arrow for a cleaner look"
        showArrow={false}
        color="error"
        size="md"
      >
        <Button variant="outline">No Arrow</Button>
      </Tooltip>

      {/* All Triggers Combined */}
      <Tooltip 
        content="🎪 This tooltip responds to hover, focus, AND click events"
        trigger="both"
        color="primary"
        interactive
      >
        <Button variant="primary">Multi-trigger</Button>
      </Tooltip>
    </div>
  </div>
);

    
// Final showcase - The Ultimate Tooltip
export const UltimateTooltip = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '2rem',
    padding: '2rem', 
    textAlign: 'center',
    minHeight: '400px'
  }}>
    <div>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
        🏆 The Ultimate Tooltip Experience
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2rem' }}>
        A masterpiece that combines every premium feature: glassmorphism, interactive content, 
        smart positioning, smooth animations, and rich multimedia content.
      </p>
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Tooltip 
        content={
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto auto auto',
            gap: '0.75rem',
            width: '100%',
            maxWidth: '250px',
            minWidth: '150px',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }}>
            {/* Header spans both columns */}
            <div style={{ 
              gridColumn: '1 / -1',
              textAlign: 'center',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Premium Tooltip Suite</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Next-generation experience</div>
            </div>
            
            {/* Feature boxes - each takes one column */}
            <div style={{ 
              textAlign: 'center', 
              padding: '0.5rem', 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '0.375rem',
              fontSize: '0.7rem'
            }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>⚡</div>
              <div>Lightning Fast</div>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              padding: '0.5rem', 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '0.375rem',
              fontSize: '0.7rem'
            }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>🎨</div>
              <div>Beautiful Design</div>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              padding: '0.5rem', 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '0.375rem',
              fontSize: '0.7rem'
            }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>♿</div>
              <div>Accessible</div>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              padding: '0.5rem', 
              background: 'rgba(255, 255, 255, 0.1)', 
              borderRadius: '0.375rem',
              fontSize: '0.7rem'
            }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>📱</div>
              <div>Responsive</div>
            </div>

            {/* Buttons span both columns */}
            <div style={{ 
              gridColumn: '1 / -1',
              display: 'flex', 
              gap: '0.5rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <button style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>
                🚀 Launch
              </button>
              <button style={{
                flex: 1,
                background: 'white',
                border: 'none',
                color: '#3b82f6',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>
                📊 Analyze
              </button>
            </div>
          </div>
        }
        interactive
        multiline
        color="primary"
        trigger="click"
        position="auto"
        size="md"
      >
        <button style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.75rem',
          cursor: 'pointer',
          fontSize: '1.125rem',
          fontWeight: 'bold',
          boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease'
        }}>
          🏆 Experience the Ultimate Tooltip
        </button>
      </Tooltip>
    </div>
    
    <div style={{
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
      borderRadius: '1rem',
      border: '1px solid #0ea5e9',
      color: '#0c4a6e'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '0.75rem', textAlign: 'center' }}>
        🎉 Congratulations! You've experienced the most advanced tooltip component ever created!
      </div>
      <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
        This tooltip showcases every premium feature: glassmorphism effects, smart positioning, 
        interactive content, smooth animations, accessibility support, responsive design, and 
        performance optimizations. It's ready for production use in the most demanding applications.
      </div>
    </div>
  </div>
);