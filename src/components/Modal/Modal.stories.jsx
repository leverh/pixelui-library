import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button'; // Assuming you have a Button component - I have one in my library you can use
import Input from '../Input/Input'; // Assuming you have an Input component - I have one in my library you can use

export default {
  title: 'Components/Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A modern, accessible modal component with premium animations, glassmorphism effects, and comprehensive features. Supports focus trapping, portal rendering, and customizable behavior with enhanced user experience.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'fullscreen'],
      description: 'Modal size variant',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'floating', 'glass'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading overlay'
    },
    persistent: {
      control: 'boolean',
      description: 'Prevent modal from closing'
    },
    centered: {
      control: 'boolean',
      description: 'Center modal vertically'
    },
    blurBackground: {
      control: 'boolean',
      description: 'Blur background content'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close when clicking overlay'
    },
    closeOnEscapeKey: {
      control: 'boolean',
      description: 'Close on Escape key press'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header'
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Animation duration in milliseconds'
    }
  }
};

// ===== ENHANCED ICONS =====
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22,4 12,14.01 9,11.01"/>
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

// ===== MODAL WRAPPER FOR DEMOS =====
const ModalDemo = ({ buttonText, buttonVariant = 'primary', children, footer, onClose, ...modalProps }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button 
        variant={buttonVariant}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>
      <Modal
        {...modalProps}
        isOpen={isOpen}
        onClose={handleClose}
      >
        {children}
        {footer && (
          <div style={{ marginTop: '1rem' }}>
            {typeof footer === 'function' ? footer(handleClose) : footer}
          </div>
        )}
      </Modal>
    </>
  );
};

// ===== MAIN PLAYGROUND =====
export const Playground = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen || false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {args.children || 'This is the modal content. Customize it using the controls below.'}
        </Modal>
      </>
    );
  },
  args: {
    title: 'Playground Modal',
    size: 'md',
    variant: 'default',
    loading: false,
    persistent: false,
    centered: true,
    blurBackground: false,
    closeOnOverlayClick: true,
    closeOnEscapeKey: true,
    showCloseButton: true,
    animationDuration: 300,
  }
};

// ===== BASIC EXAMPLES =====
export const BasicUsage = {
  render: () => (
    <ModalDemo 
      buttonText="Open Basic Modal"
      title="Welcome!"
      children={
        <div>
          <p>This is a basic modal with default settings. It includes:</p>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>Focus trapping and management</li>
            <li>Body scroll lock</li>
            <li>Escape key and overlay click handling</li>
            <li>Smooth animations</li>
            <li>Accessibility features</li>
          </ul>
        </div>
      }
      footer={(handleClose) => (
        <Button onClick={handleClose}>
          Got it!
        </Button>
      )}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic modal with standard behavior and accessibility features.'
      }
    }
  }
};

// ===== SIZE VARIATIONS =====
export const AllSizes = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'center'
    }}>
      {[
        { size: 'xs', label: 'Extra Small', icon: '📱' },
        { size: 'sm', label: 'Small', icon: '📋' },
        { size: 'md', label: 'Medium', icon: '🖥️' },
        { size: 'lg', label: 'Large', icon: '📺' },
        { size: 'xl', label: 'Extra Large', icon: '🖼️' },
        { size: 'fullscreen', label: 'Fullscreen', icon: '🌍' }
      ].map(({ size, label, icon }) => (
        <ModalDemo
          key={size}
          buttonText={`${icon} ${label}`}
          buttonVariant="outline"
          title={`${label} Modal`}
          size={size}
          children={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
              <p>This is a <strong>{label.toLowerCase()}</strong> modal ({size}).</p>
              <p>Perfect for {
                size === 'xs' ? 'simple confirmations' :
                size === 'sm' ? 'basic forms and alerts' :
                size === 'md' ? 'standard content and forms' :
                size === 'lg' ? 'complex interfaces' :
                size === 'xl' ? 'detailed dashboards' :
                'immersive experiences'
              }.</p>
            </div>
          }
          footer={(handleClose) => (
            <Button onClick={handleClose}>Close</Button>
          )}
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available size variants from extra small to fullscreen.'
      }
    }
  }
};

// ===== VARIANT SHOWCASE =====
export const AllVariants = {
  render: () => (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    }}>
      {[
        { 
          variant: 'default', 
          title: 'Default', 
          desc: 'Standard modal with gradients',
          color: '#3b82f6'
        },
        { 
          variant: 'minimal', 
          title: 'Minimal', 
          desc: 'Clean, understated design',
          color: '#6b7280'
        },
        { 
          variant: 'floating', 
          title: 'Floating', 
          desc: 'Elevated with premium shadows',
          color: '#8b5cf6'
        },
        { 
          variant: 'glass', 
          title: 'Glass', 
          desc: 'Glassmorphism with blur effects',
          color: '#06b6d4'
        }
      ].map(({ variant, title, desc, color }) => (
        <div key={variant} style={{
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          textAlign: 'center',
          background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`
        }}>
          <h3 style={{ 
            margin: '0 0 0.5rem 0',
            color: color,
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            {title}
          </h3>
          <p style={{ 
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            color: '#6b7280',
            lineHeight: '1.4'
          }}>
            {desc}
          </p>
          <ModalDemo
            buttonText={`Try ${title}`}
            buttonVariant="outline"
            title={`${title} Modal`}
            variant={variant}
            blurBackground={variant === 'glass'}
            children={
              <div>
                <p>This is the <strong>{title.toLowerCase()}</strong> variant with enhanced visual effects.</p>
                <p>{desc}</p>
                {variant === 'glass' && (
                  <p style={{ 
                    padding: '1rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    🌟 Notice the glassmorphism effect and background blur!
                  </p>
                )}
              </div>
            }
            footer={(handleClose) => (
              <Button onClick={handleClose}>
                Looks great!
              </Button>
            )}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All visual variants showcasing different styling approaches and premium effects.'
      }
    }
  }
};

// ===== INTERACTIVE FEATURES =====
export const InteractiveFeatures = {
  render: () => (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    }}>
      {[
        {
          title: '⏳ Loading State',
          desc: 'Modal with loading indicator',
          demo: (
            <ModalDemo
              buttonText="Show Loading"
              buttonVariant="primary"
              title="Processing..."
              closeOnEscapeKey={true}
              children={
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  {/* Custom loading indicator using global animation class */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <svg 
                      width="32" 
                      height="32" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="animate-spin"
                      style={{
                        color: 'var(--color-primary-600)'
                      }}
                    >
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: 'var(--color-text-secondary)' 
                    }}>
                      Processing your request...
                    </span>
                  </div>
                  
                  <p>This modal shows a loading state while still allowing interaction.</p>
                  <p>You can press Escape to close if needed.</p>
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: '#059669',
                    background: '#f0fdf4',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #bbf7d0',
                    marginTop: '1rem',
                  }}>
                    💡 Good UX: Always provide an escape route!
                  </p>
                </div>
              }
            />
          )
        },
        {
          title: '🔒 Persistent Modal',
          desc: 'Requires explicit user action',
          demo: (
            <ModalDemo
              buttonText="Open Persistent"
              buttonVariant="outline"
              title="Important Notice"
              closeOnOverlayClick={false}
              closeOnEscapeKey={false}
              showCloseButton={false}
              children={
                <div>
                  <p>This modal requires explicit user action to close.</p>
                  <p>Overlay click and escape key are disabled, but the action button works.</p>
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: '#7c2d12',
                    background: '#fef7ed',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #fed7aa',
                    marginTop: '1rem'
                  }}>
                    ⚠️ Use this pattern sparingly - only for critical confirmations!
                  </p>
                </div>
              }
              footer={(handleClose) => (
                <Button onClick={handleClose}>
                  I Understand
                </Button>
              )}
            />
          )
        },
        {
          title: '🌊 Blur Background',
          desc: 'Blurs content behind modal',
          demo: (
            <ModalDemo
              buttonText="Blur Background"
              buttonVariant="secondary"
              title="Immersive Experience"
              variant="glass"
              blurBackground={true}
              children={
                <div>
                  <p>This modal blurs the background content for a more immersive experience.</p>
                  <p>Combined with the glass variant, it creates a beautiful layered effect.</p>
                </div>
              }
              footer={(handleClose) => (
                <Button onClick={handleClose}>
                  Beautiful!
                </Button>
              )}
            />
          )
        },
        {
          title: '⚡ Fast Animation',
          desc: 'Quick open/close animations',
          demo: (
            <ModalDemo
              buttonText="Fast Animation"
              buttonVariant="success"
              title="Quick Modal"
              animationDuration={150}
              children={
                <div>
                  <p>This modal opens and closes quickly with a 150ms animation duration.</p>
                  <p>Perfect for snappy user interfaces!</p>
                </div>
              }
              footer={(handleClose) => (
                <Button onClick={handleClose}>
                  Snappy!
                </Button>
              )}
            />
          )
        },
        {
          title: '🎭 No Close Button',
          desc: 'Header without close button',
          demo: (
            <ModalDemo
              buttonText="No Close Button"
              buttonVariant="warning"
              title="Custom Actions Only"
              showCloseButton={false}
              children={
                <div>
                  <p>This modal doesn't have a close button in the header.</p>
                  <p>Users must use the footer actions to proceed.</p>
                </div>
              }
              footer={(handleClose) => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button onClick={handleClose}>
                    Continue
                  </Button>
                </div>
              )}
            />
          )
        },
        {
          title: '📜 Scrollable Content',
          desc: 'Long content with custom scrollbar',
          demo: (
            <ModalDemo
              buttonText="Scrollable Content"
              buttonVariant="info"
              title="Long Document"
              size="lg"
              children={
                <div>
                  <p><strong>This modal contains scrollable content:</strong></p>
                  {Array.from({ length: 20 }, (_, i) => (
                    <p key={i} style={{ lineHeight: '1.6' }}>
                      Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                      ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                  ))}
                </div>
              }
              footer={(handleClose) => (
                <Button onClick={handleClose}>
                  I've read it
                </Button>
              )}
            />
          )
        }
      ].map(({ title, desc, demo }) => (
        <div key={title} style={{
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            margin: '0 0 0.5rem 0',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            {title}
          </h3>
          <p style={{ 
            margin: '0 0 1rem 0',
            fontSize: '0.875rem',
            color: '#6b7280',
            lineHeight: '1.4'
          }}>
            {desc}
          </p>
          {demo}
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive features including loading states, persistent modals, background blur, and animation controls.'
      }
    }
  }
};

// ===== REAL WORLD EXAMPLES =====
export const ConfirmationDialog = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [action, setAction] = useState('');

    const handleConfirm = () => {
      setAction('confirmed');
      setIsOpen(false);
      setTimeout(() => setAction(''), 2000);
    };

    const handleCancel = () => {
      setAction('cancelled');
      setIsOpen(false);
      setTimeout(() => setAction(''), 2000);
    };

    return (
      <div style={{ textAlign: 'center' }}>
        <Button 
          variant="destructive"
          onClick={() => setIsOpen(true)}
        >
          🗑️ Delete Important Data
        </Button>
        
        {action && (
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            background: action === 'confirmed' ? '#fee2e2' : '#f0f9ff',
            color: action === 'confirmed' ? '#dc2626' : '#0369a1',
            border: `1px solid ${action === 'confirmed' ? '#fecaca' : '#bae6fd'}`
          }}>
            Action {action}! ✨
          </div>
        )}
        
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}
          title="Confirm Deletion"
          size="sm"
          variant="floating"
          icon={<AlertIcon />}
          footer={
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                style={{ flex: 1 }}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirm}
                style={{ flex: 1 }}
              >
                Delete
              </Button>
            </div>
          }
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <p style={{ marginBottom: '1rem', fontWeight: '500' }}>
              Are you sure you want to delete this important data?
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280',
              background: '#fef2f2',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #fecaca'
            }}>
              This action cannot be undone. All associated records will be permanently removed.
            </p>
          </div>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world confirmation dialog with destructive actions and clear visual hierarchy.'
      }
    }
  }
};

export const UserProfileModal = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Software developer passionate about creating great user experiences.',
      notifications: true
    });

    const handleInputChange = (field) => (e) => {
      setFormData(prev => ({ 
        ...prev, 
        [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value 
      }));
    };

    const handleSave = () => {
      console.log('Saving profile:', formData);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          👤 Edit Profile
        </Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          variant="glass"
          blurBackground={true}
        >
          <Modal.Header 
            title="Edit Profile" 
            subtitle="Update your personal information"
            icon={<UserIcon />}
            onClose={() => setIsOpen(false)}
          />
          
          <Modal.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                borderRadius: '0.75rem',
                border: '1px solid #bae6fd'
              }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: 'white'
                }}>
                  JD
                </div>
                <div>
                  <h3 style={{ margin: 0, color: '#1e40af' }}>Profile Photo</h3>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#64748b' }}>
                    Click to upload a new photo
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  variant="glass"
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  variant="glass"
                  required
                />
              </div>

              <Input
                label="Bio"
                value={formData.bio}
                onChange={handleInputChange('bio')}
                variant="glass"
                maxLength={150}
                showCharacterCount
                helperText="Tell us a bit about yourself"
              />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }}>
                <input
                  type="checkbox"
                  id="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange('notifications')}
                  style={{ width: '1rem', height: '1rem' }}
                />
                <label htmlFor="notifications" style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Receive email notifications for account updates
                </label>
              </div>
            </div>
          </Modal.Body>
          
          <Modal.Footer spaceBetween>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Last updated: 2 days ago
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex user profile form with glassmorphism design and compound components.'
      }
    }
  }
};

export const NotificationCenter = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications] = useState([
      {
        id: 1,
        type: 'success',
        title: 'Payment Successful',
        message: 'Your subscription has been renewed for another month.',
        time: '2 minutes ago',
        icon: <CheckIcon />
      },
      {
        id: 2,
        type: 'warning',
        title: 'Storage Almost Full',
        message: 'You\'ve used 95% of your storage space. Consider upgrading.',
        time: '1 hour ago',
        icon: <AlertIcon />
      },
      {
        id: 3,
        type: 'info',
        title: 'New Feature Available',
        message: 'Check out our new collaboration tools in the dashboard.',
        time: '3 hours ago',
        icon: <StarIcon />
      },
      {
        id: 4,
        type: 'info',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 2-4 AM EST.',
        time: '1 day ago',
        icon: <SettingsIcon />
      }
    ]);

    const getNotificationStyle = (type) => {
      const styles = {
        success: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' },
        warning: { bg: '#fffbeb', border: '#fed7aa', text: '#d97706' },
        info: { bg: '#f0f9ff', border: '#bae6fd', text: '#0284c7' }
      };
      return styles[type] || styles.info;
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          🔔 Notifications (4)
        </Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="md"
          variant="floating"
          title="Notifications"
          icon={<span style={{ fontSize: '1.25rem' }}>🔔</span>}
        >
          <Modal.Body noPadding>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {notifications.length} unread notifications
                </span>
                <Button variant="outline" size="sm">
                  Mark all as read
                </Button>
              </div>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notifications.map((notification, index) => {
                const style = getNotificationStyle(notification.type);
                return (
                  <div
                    key={notification.id}
                    style={{
                      padding: '1rem 1.5rem',
                      borderBottom: index < notifications.length - 1 ? '1px solid #f3f4f6' : 'none',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <div style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        background: style.bg,
                        border: `1px solid ${style.border}`,
                        color: style.text,
                        flexShrink: 0
                      }}>
                        {notification.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ 
                            margin: 0, 
                            fontSize: '0.875rem', 
                            fontWeight: '600',
                            color: '#111827'
                          }}>
                            {notification.title}
                          </h4>
                          <span style={{ 
                            fontSize: '0.75rem', 
                            color: '#9ca3af',
                            flexShrink: 0,
                            marginLeft: '0.5rem'
                          }}>
                            {notification.time}
                          </span>
                        </div>
                        <p style={{ 
                          margin: '0.25rem 0 0 0', 
                          fontSize: '0.8rem', 
                          color: '#6b7280',
                          lineHeight: '1.4'
                        }}>
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => console.log('Opening settings')}>
              Notification Settings
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Notification center with complex layout, scrollable content, and interactive elements.'
      }
    }
  }
};

// ===== COMPOUND COMPONENTS DEMO =====
export const CompoundComponentsShowcase = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          🧩 Compound Components
        </Button>
        
        <Modal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          size="lg"
          variant="glass"
        >
          <Modal.Header 
            title="Compound Component Pattern" 
            subtitle="Flexible modal composition"
            icon={<span style={{ fontSize: '1.25rem' }}>🧩</span>}
            actions={
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" size="sm">
                  Help
                </Button>
              </div>
            }
            onClose={() => setIsOpen(false)}
          />
          
          <Modal.Body>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>Flexible Composition</h3>
                <p>
                  This modal demonstrates the compound component pattern with Modal.Header, 
                  Modal.Body, and Modal.Footer components that can be composed flexibly.
                </p>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem'
              }}>
                {[
                  { title: 'Header', desc: 'Customizable title, subtitle, icon, and actions', icon: '🎯' },
                  { title: 'Body', desc: 'Flexible content area with scrolling support', icon: '📄' },
                  { title: 'Footer', desc: 'Action buttons with flexible alignment', icon: '🔧' }
                ].map(({ title, desc, icon }) => (
                  <div 
                    key={title}
                    style={{ 
                      padding: '1rem', 
                      background: 'rgba(255, 255, 255, 0.8)', 
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>{title}</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.4' }}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '1rem',
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                borderRadius: '0.75rem',
                border: '1px solid #f59e0b'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>💡 Pro Tip</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#78350f', lineHeight: '1.4' }}>
                  Each component can be styled independently and supports custom className props 
                  for maximum flexibility in your design system.
                </p>
              </div>
            </div>
          </Modal.Body>
          
          <Modal.Footer align="center">
            <div style={{ 
              display: 'flex', 
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button onClick={() => console.log('Action performed!')}>
                Try It Out
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the compound component pattern with flexible modal composition and custom styling.'
      }
    }
  }
};

// ===== ACCESSIBILITY SHOWCASE =====
export const AccessibilityShowcase = {
  render: () => (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      padding: '2rem',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      borderRadius: '1rem',
      border: '1px solid #a7f3d0'
    }}>
      <div style={{ 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.5rem', 
          fontWeight: '700',
          color: '#0f172a'
        }}>
          ♿ Accessibility Features
        </h2>
        <p style={{ 
          margin: 0, 
          color: '#064e3b',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          Full keyboard navigation, focus management, and ARIA compliance
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ModalDemo
          buttonText="🎯 Focus Management Demo"
          buttonVariant="success"
          title="Focus Trapping Example"
          children={
            <div>
              <p>This modal demonstrates proper focus management:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <Input label="First Input" placeholder="Tab order: 1" />
                <Input label="Second Input" placeholder="Tab order: 2" />
                <Button variant="outline">Tab order: 3</Button>
              </div>
              <p style={{ 
                marginTop: '1rem',
                fontSize: '0.875rem',
                color: '#059669',
                background: '#f0fdf4',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #bbf7d0'
              }}>
                Try tabbing through the elements. Focus is trapped within the modal!
              </p>
            </div>
          }
          footer={(handleClose) => (
            <Button onClick={handleClose}>
              Perfect!
            </Button>
          )}
        />

        <ModalDemo
          buttonText="⌨️ Keyboard Navigation Demo"
          buttonVariant="info"
          title="Keyboard Controls"
          children={
            <div>
              <h3>Available Keyboard Controls:</h3>
              <ul style={{ lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                <li><kbd style={{ padding: '0.125rem 0.25rem', background: '#f3f4f6', borderRadius: '0.25rem' }}>Tab</kbd> - Navigate between focusable elements</li>
                <li><kbd style={{ padding: '0.125rem 0.25rem', background: '#f3f4f6', borderRadius: '0.25rem' }}>Shift + Tab</kbd> - Navigate backwards</li>
                <li><kbd style={{ padding: '0.125rem 0.25rem', background: '#f3f4f6', borderRadius: '0.25rem' }}>Escape</kbd> - Close modal</li>
                <li><kbd style={{ padding: '0.125rem 0.25rem', background: '#f3f4f6', borderRadius: '0.25rem' }}>Enter</kbd> - Activate buttons</li>
              </ul>
              <p style={{ 
                fontSize: '0.875rem',
                color: '#0369a1',
                background: '#f0f9ff',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #bae6fd'
              }}>
                Try pressing Escape to close this modal!
              </p>
            </div>
          }
          footer={(handleClose) => (
            <Button onClick={handleClose}>
              Got it!
            </Button>
          )}
        />
      </div>
      
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '0.75rem',
        border: '1px solid #a7f3d0'
      }}>
        <div style={{ 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem', 
          color: '#065f46'
        }}>
          ✅ Accessibility Features:
        </div>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '1.25rem',
          fontSize: '0.8rem',
          color: '#047857',
          lineHeight: '1.6'
        }}>
          <li>Focus trapping and management</li>
          <li>ARIA labels and live regions</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader announcements</li>
          <li>High contrast mode support</li>
          <li>Reduced motion preferences</li>
          <li>Semantic HTML structure</li>
          <li>Proper dialog role and properties</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features including focus management, keyboard navigation, and ARIA compliance.'
      }
    }
  }
};