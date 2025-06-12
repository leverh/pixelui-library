import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog component with focus trapping, portal rendering, and accessibility features. Supports different sizes, loading states, and customizable behavior.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen']
    },
    isOpen: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    closeOnOverlayClick: {
      control: 'boolean'
    },
    closeOnEscapeKey: {
      control: 'boolean'
    },
    showCloseButton: {
      control: 'boolean'
    }
  }
};

// Basic modal
export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Default Modal"
      >
        <p>This is a basic modal with default settings. It includes focus trapping, body scroll lock, and can be closed by clicking the overlay or pressing Escape.</p>
      </Modal>
    </>
  );
};

// Modal sizes
export const Sizes = () => {
  const [openModal, setOpenModal] = useState(null);

  const openSize = (size) => setOpenModal(size);
  const closeModal = () => setOpenModal(null);

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button onClick={() => openSize('small')}>Small Modal</Button>
        <Button onClick={() => openSize('medium')}>Medium Modal</Button>
        <Button onClick={() => openSize('large')}>Large Modal</Button>
        <Button onClick={() => openSize('fullscreen')}>Fullscreen Modal</Button>
      </div>

      <Modal
        isOpen={openModal === 'small'}
        onClose={closeModal}
        title="Small Modal"
        size="small"
      >
        <p>This is a small modal, perfect for confirmations or simple forms.</p>
      </Modal>

      <Modal
        isOpen={openModal === 'medium'}
        onClose={closeModal}
        title="Medium Modal"
        size="medium"
      >
        <p>This is a medium modal, good for most content and forms. This is the default size.</p>
      </Modal>

      <Modal
        isOpen={openModal === 'large'}
        onClose={closeModal}
        title="Large Modal"
        size="large"
      >
        <p>This is a large modal, suitable for complex content or detailed forms with lots of information.</p>
      </Modal>

      <Modal
        isOpen={openModal === 'fullscreen'}
        onClose={closeModal}
        title="Fullscreen Modal"
        size="fullscreen"
      >
        <p>This is a fullscreen modal that takes up the entire viewport. Great for immersive experiences or complex interfaces.</p>
      </Modal>
    </>
  );
};

// Loading modal
export const LoadingState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Loading Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Processing..."
        loading={loading}
        footer={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleAction} loading={loading}>
              {loading ? 'Processing...' : 'Start Process'}
            </Button>
          </div>
        }
      >
        <p>Click "Start Process" to see the loading state. The modal cannot be closed while loading.</p>
      </Modal>
    </>
  );
};

// Confirmation modal
export const ConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    alert('Action confirmed!');
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Deletion"
        size="small"
        footer={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Delete
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>
    </>
  );
};

// Modal without close button
export const NoCloseButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal (No Close Button)</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Important Notice"
        showCloseButton={false}
        closeOnOverlayClick={false}
        closeOnEscapeKey={false}
        footer={
          <Button onClick={() => setIsOpen(false)}>
            I Understand
          </Button>
        }
      >
        <p>This modal requires explicit user action to close. The overlay click and escape key are disabled.</p>
      </Modal>
    </>
  );
};

// Compound component usage
export const CompoundComponents = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Compound Modal</Button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="large">
        <Modal.Header title="Custom Header" onClose={() => setIsOpen(false)} />
        
        <Modal.Body>
          <h3>Custom Body Content</h3>
          <p>This modal uses the compound component pattern with Modal.Header, Modal.Body, and Modal.Footer.</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            margin: '1rem 0' 
          }}>
            <div style={{ padding: '1rem', background: 'var(--color-neutral-100)', borderRadius: '0.5rem' }}>
              <h4>Feature 1</h4>
              <p>Description of feature 1</p>
            </div>
            <div style={{ padding: '1rem', background: 'var(--color-neutral-100)', borderRadius: '0.5rem' }}>
              <h4>Feature 2</h4>
              <p>Description of feature 2</p>
            </div>
            <div style={{ padding: '1rem', background: 'var(--color-neutral-100)', borderRadius: '0.5rem' }}>
              <h4>Feature 3</h4>
              <p>Description of feature 3</p>
            </div>
          </div>
        </Modal.Body>
        
        <Modal.Footer spaceBetween>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Last updated: Today
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => alert('Action performed!')}>
              Take Action
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// Scrollable content modal
export const ScrollableContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const longContent = Array.from({ length: 50 }, (_, i) => (
    <p key={i}>
      This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  ));

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Scrollable Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Long Content Modal"
        footer={
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        }
      >
        <div>
          <p><strong>This modal demonstrates scrollable content:</strong></p>
          {longContent}
        </div>
      </Modal>
    </>
  );
};

// Playground
export const Playground = {
  args: {
    isOpen: true,
    title: 'Playground Modal',
    size: 'medium',
    loading: false,
    closeOnOverlayClick: true,
    closeOnEscapeKey: true,
    showCloseButton: true,
    children: 'This is the modal content. The modal can be customized using the controls below.',
    onClose: () => console.log('Modal closed')
  }
};