import { useState } from 'react';
import { Button, Input, Card, Modal, Badge, Avatar } from './components';
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
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 style={{ color: 'var(--color-text-primary)', margin: 0 }}>PixelUI Component Library</h1>
            <Badge color="success" variant="soft">v1.0</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Avatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
              name="Developer"
              size="small"
              status="online"
              interactive
              onClick={() => alert('Profile clicked!')}
            />
            <Button onClick={toggleTheme} variant="outline">
              {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
            </Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {/* Team Card */}
          <Card>
            <Card.Header title="Development Team" />
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Avatar.Group max={4} onMoreClick={() => setOpenModal('team')}>
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    name="John Doe"
                    status="online"
                  />
                  <Avatar 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                    name="Jane Smith"
                    status="away"
                  />
                  <Avatar 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    name="Bob Wilson"
                    status="busy"
                  />
                  <Avatar name="Alice Johnson" status="online" />
                  <Avatar name="Charlie Brown" status="offline" />
                  <Avatar name="Diana Prince" status="online" />
                </Avatar.Group>
                
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                    Recent Activity
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Avatar 
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                        name="Jane Smith"
                        size="extraSmall"
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        Jane pushed 3 commits
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Avatar name="Bob Wilson" size="extraSmall" />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        Bob merged PR #42
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Avatar Showcase Card */}
          <Card>
            <Card.Header title="Avatar Components" />
            <Card.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Sizes */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Sizes</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Avatar size="extraSmall" name="XS" />
                    <Avatar size="small" name="SM" />
                    <Avatar size="medium" name="MD" />
                    <Avatar size="large" name="LG" />
                  </div>
                </div>

                {/* With Status */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Status Indicators</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Avatar name="Online" status="online" />
                    <Avatar name="Away" status="away" />
                    <Avatar name="Busy" status="busy" />
                    <Avatar name="Offline" status="offline" />
                  </div>
                </div>

                {/* With Badges */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)' }}>Notifications</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Avatar name="User 1" badge={1} />
                    <Avatar name="User 2" badge={12} />
                    <Avatar name="User 3" badge={99} />
                    <Avatar name="User 4" badge={150} />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

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
                    6
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

      {/* Team Modal */}
      <Modal
        isOpen={openModal === 'team'}
        onClose={() => setOpenModal(null)}
        title="Development Team"
        size="medium"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { name: 'John Doe', role: 'Frontend Developer', status: 'online', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
            { name: 'Jane Smith', role: 'Backend Developer', status: 'away', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
            { name: 'Bob Wilson', role: 'UI/UX Designer', status: 'busy', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
            { name: 'Alice Johnson', role: 'DevOps Engineer', status: 'online' },
            { name: 'Charlie Brown', role: 'QA Engineer', status: 'offline' },
            { name: 'Diana Prince', role: 'Product Manager', status: 'online' }
          ].map((member, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '0.75rem',
              border: '1px solid var(--color-neutral-200)',
              borderRadius: '0.5rem'
            }}>
              <Avatar 
                src={member.image}
                name={member.name}
                status={member.status}
                interactive
                onClick={() => alert(`View ${member.name}'s profile`)}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '0.875rem' }}>{member.name}</h4>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {member.role}
                </p>
              </div>
              <Badge 
                color={member.status === 'online' ? 'success' : member.status === 'away' ? 'warning' : member.status === 'busy' ? 'error' : 'secondary'}
                variant="soft"
                size="small"
              >
                {member.status}
              </Badge>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

export default App;