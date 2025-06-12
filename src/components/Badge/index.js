import { useState } from 'react';
import { Button, Input, Card, Modal, Badge } from './components';
import './tokens/index.css';
import './styles/globals.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light');
  const [openModal, setOpenModal] = useState(null);
  const [tags, setTags] = useState([
    { id: 1, label: 'React', color: 'primary' },
    { id: 2, label: 'TypeScript', color: 'info' },
    { id: 3, label: 'CSS', color: 'success' },
    { id: 4, label: 'JavaScript', color: 'warning' }
  ]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const removeTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div data-theme={theme} style={{ minHeight: '100vh', padding: '2rem', backgroundColor: 'var(--color-background)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ color: 'var(--color-text-primary)', margin: 0 }}>PixelUI Component Library</h1>
            <Badge color="success" variant="soft">v1.0</Badge>
          </div>
          <Button onClick={toggleTheme} variant="outline">
            {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {/* Login Card */}
          <Card>
            <Card.Header 
              title="Sign In" 
              subtitle="Welcome back to PixelUI"
            />
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  errorText={email && !validateEmail(email) ? 'Please enter a valid email address' : undefined}
                  successText={email && validateEmail(email) ? 'Email looks good!' : undefined}
                />

                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  helperText="Password must be at least 8 characters"
                />
              </div>
            </Card.Body>
            <Card.Footer
              actions={
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline" size="small">Cancel</Button>
                  <Button 
                    size="small" 
                    disabled={!email || !password || !validateEmail(email)}
                  >
                    Sign In
                  </Button>
                </div>
              }
            />
          </Card>

          {/* Badge Showcase Card */}
          <Card>
            <Card.Header title="Badge Components" />
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Status badges */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Status Indicators</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Badge color="success" variant="soft">Active</Badge>
                    <Badge color="warning" variant="soft">Pending</Badge>
                    <Badge color="error" variant="soft">Offline</Badge>
                    <Badge color="info" variant="soft">Processing</Badge>
                  </div>
                </div>

                {/* Removable tags */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Technologies</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {tags.map(tag => (
                      <Badge
                        key={tag.id}
                        color={tag.color}
                        variant="outline"
                        removable
                        onRemove={() => removeTag(tag.id)}
                      >
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Interactive badges */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Interactive</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <Badge 
                      interactive 
                      onClick={() => alert('Filter clicked!')}
                      color="primary"
                    >
                      Filter: All
                    </Badge>
                    <Badge 
                      interactive 
                      onClick={() => setOpenModal('badges')}
                      variant="outline"
                      color="secondary"
                    >
                      View More
                    </Badge>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Modal Demos Card */}
          <Card>
            <Card.Header 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Modal Demonstrations
                  <Badge size="small" color="info" dot>New</Badge>
                </div>
              }
            />
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Button onClick={() => setOpenModal('basic')} variant="primary">
                  Basic Modal
                </Button>
                <Button onClick={() => setOpenModal('confirmation')} variant="destructive">
                  Delete Confirmation
                </Button>
                <Button onClick={() => setOpenModal('fullscreen')} variant="outline">
                  Fullscreen Modal
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Stats Card */}
          <Card variant="filled">
            <Card.Header title="Component Library Stats" />
            <Card.Body spacing="spacious">
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '1.5rem', 
                textAlign: 'center' 
              }}>
                <div>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold', 
                    color: 'var(--color-primary-600)' 
                  }}>
                    5
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--color-text-secondary)' 
                  }}>
                    Components Built
                  </div>
                  <Badge size="small" color="success" variant="soft" style={{ marginTop: '0.5rem' }}>
                    Complete
                  </Badge>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold', 
                    color: 'var(--color-success)' 
                  }}>
                    100%
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--color-text-secondary)' 
                  }}>
                    Test Coverage
                  </div>
                  <Badge size="small" color="primary" variant="soft" style={{ marginTop: '0.5rem' }}>
                    Tested
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={openModal === 'basic'}
        onClose={() => setOpenModal(null)}
        title="Welcome to PixelUI!"
      >
        <p>This component library now includes:</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1rem 0' }}>
          <Badge color="primary">Button</Badge>
          <Badge color="info">Input</Badge>
          <Badge color="success">Card</Badge>
          <Badge color="warning">Modal</Badge>
          <Badge color="error">Badge</Badge>
        </div>
        <p>All components are production-ready with comprehensive testing and accessibility features!</p>
      </Modal>

      <Modal
        isOpen={openModal === 'confirmation'}
        onClose={() => setOpenModal(null)}
        title="Confirm Deletion"
        size="small"
        footer={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setOpenModal(null)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => { alert('Item deleted!'); setOpenModal(null); }}
            >
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>

      <Modal
        isOpen={openModal === 'fullscreen'}
        onClose={() => setOpenModal(null)}
        title="Fullscreen Experience"
        size="fullscreen"
      >
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '2rem',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h2>🎉 Component Library Complete!</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Badge size="large" color="primary" variant="soft">Professional</Badge>
            <Badge size="large" color="success" variant="soft">Accessible</Badge>
            <Badge size="large" color="info" variant="soft">Well-tested</Badge>
            <Badge size="large" color="warning" variant="soft">Portfolio-ready</Badge>
          </div>
          <Button onClick={() => setOpenModal(null)}>Close</Button>
        </div>
      </Modal>

      <Modal
        isOpen={openModal === 'badges'}
        onClose={() => setOpenModal(null)}
        title="Badge Showcase"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h4>Solid Variants</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="solid" color="primary">Primary</Badge>
              <Badge variant="solid" color="success">Success</Badge>
              <Badge variant="solid" color="warning">Warning</Badge>
              <Badge variant="solid" color="error">Error</Badge>
              <Badge variant="solid" color="info">Info</Badge>
            </div>
          </div>
          
          <div>
            <h4>Outline Variants</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="outline" color="primary">Primary</Badge>
              <Badge variant="outline" color="success">Success</Badge>
              <Badge variant="outline" color="warning">Warning</Badge>
              <Badge variant="outline" color="error">Error</Badge>
              <Badge variant="outline" color="info">Info</Badge>
            </div>
          </div>
          
          <div>
            <h4>Soft Variants</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="soft" color="primary">Primary</Badge>
              <Badge variant="soft" color="success">Success</Badge>
              <Badge variant="soft" color="warning">Warning</Badge>
              <Badge variant="soft" color="error">Error</Badge>
              <Badge variant="soft" color="info">Info</Badge>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;