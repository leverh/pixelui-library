import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import styles from './Card.module.css';

describe('Card', () => {
  it('renders basic card with content', () => {
    render(
      <Card>
        <Card.Body>Test content</Card.Body>
      </Card>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Card variant="elevated" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass(styles.elevated);

    rerender(<Card variant="outlined" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass(styles.outlined);

    rerender(<Card variant="filled" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass(styles.filled);
  });

  it('applies padding classes correctly', () => {
    const { rerender } = render(<Card padding="small" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass(styles.paddingSmall);

    rerender(<Card padding="large" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass(styles.paddingLarge);
  });

  it('handles interactive state', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Card interactive onClick={handleClick} data-testid="card">
        <Card.Body>Clickable card</Card.Body>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(styles.interactive);
    
    await user.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Card interactive onClick={handleClick} disabled data-testid="card">
        <Card.Body>Disabled card</Card.Body>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(styles.disabled);
    expect(card).toBeDisabled();
    
    await user.click(card);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(
      <Card loading data-testid="card">
        <Card.Body>Loading content</Card.Body>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(styles.loading);
    expect(card).toHaveAttribute('aria-busy', 'true');
  });

  it('shows error state', () => {
    render(
      <Card error data-testid="card">
        <Card.Body>Error content</Card.Body>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(styles.error);
    expect(card).toHaveAttribute('data-error', 'true');
  });

  it('renders as different HTML elements', () => {
    const { rerender } = render(
      <Card as="section" data-testid="card">
        <Card.Body>Section card</Card.Body>
      </Card>
    );
    
    expect(screen.getByTestId('card').tagName).toBe('SECTION');
    
    rerender(
      <Card as="article" data-testid="card">
        <Card.Body>Article card</Card.Body>
      </Card>
    );
    
    expect(screen.getByTestId('card').tagName).toBe('ARTICLE');
  });

  it('renders as button when interactive with onClick', () => {
    render(
      <Card interactive onClick={() => {}} data-testid="card">
        <Card.Body>Button card</Card.Body>
      </Card>
    );
    
    expect(screen.getByTestId('card').tagName).toBe('BUTTON');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    
    render(
      <Card ref={ref} data-testid="card">
        <Card.Body>Ref card</Card.Body>
      </Card>
    );
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-class" data-testid="card">
        <Card.Body>Custom class card</Card.Body>
      </Card>
    );
    
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });
});

describe('Card.Header', () => {
  it('renders header with title and subtitle', () => {
    render(
      <Card.Header 
        title="Test Title" 
        subtitle="Test Subtitle"
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Test Title');
  });

  it('renders header with actions', () => {
    render(
      <Card.Header 
        title="Test Title"
        actions={<button>Action</button>}
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('renders custom header content', () => {
    render(
      <Card.Header>
        <div data-testid="custom-header">Custom header content</div>
      </Card.Header>
    );
    
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    expect(screen.getByText('Custom header content')).toBeInTheDocument();
  });
});

describe('Card.Body', () => {
  it('renders body content', () => {
    render(
      <Card.Body>
        <p>Body content</p>
      </Card.Body>
    );
    
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('applies spacing classes', () => {
    const { rerender } = render(
      <Card.Body spacing="compact" data-testid="body">
        Content
      </Card.Body>
    );
    
    expect(screen.getByTestId('body')).toHaveClass(styles.bodyCompact);
    
    rerender(
      <Card.Body spacing="spacious" data-testid="body">
        Content
      </Card.Body>
    );
    
    expect(screen.getByTestId('body')).toHaveClass(styles.bodySpacious);
  });
});

describe('Card.Footer', () => {
  it('renders footer with actions', () => {
    render(
      <Card.Footer 
        actions={<button>Footer Action</button>}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Footer Action' })).toBeInTheDocument();
  });

  it('renders custom footer content', () => {
    render(
      <Card.Footer>
        <span data-testid="custom-footer">Custom footer</span>
      </Card.Footer>
    );
    
    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
  });
});

describe('Card.Media', () => {
  it('renders image with alt text', () => {
    render(
      <Card.Media 
        src="https://example.com/image.jpg"
        alt="Test image"
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('renders with overlay content', () => {
    render(
      <Card.Media 
        src="https://example.com/image.jpg"
        alt="Test image"
        overlay={<div data-testid="overlay">Overlay content</div>}
      />
    );
    
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByTestId('overlay')).toBeInTheDocument();
    expect(screen.getByText('Overlay content')).toBeInTheDocument();
  });

  it('applies position classes', () => {
    const { rerender } = render(
      <Card.Media 
        src="https://example.com/image.jpg"
        alt="Test image"
        position="top"
        data-testid="media-container"
      />
    );
    
    // The position class is applied to the container div
    const container = screen.getByTestId('media-container').parentElement;
    expect(container).toHaveClass(styles.mediaTop);
    
    rerender(
      <Card.Media 
        src="https://example.com/image.jpg"
        alt="Test image"
        position="bottom"
        data-testid="media-container"
      />
    );
    
    const bottomContainer = screen.getByTestId('media-container').parentElement;
    expect(bottomContainer).toHaveClass(styles.mediaBottom);
  });
});

describe('Card compound usage', () => {
  it('renders complete card with all subcomponents', () => {
    render(
      <Card data-testid="complete-card">
        <Card.Header 
          title="Complete Card"
          subtitle="With all sections"
          actions={<button>Header Action</button>}
        />
        <Card.Media 
          src="https://example.com/image.jpg"
          alt="Card image"
        />
        <Card.Body>
          <p>Card body content</p>
        </Card.Body>
        <Card.Footer 
          actions={<button>Footer Action</button>}
        >
          <span>Footer content</span>
        </Card.Footer>
      </Card>
    );
    
    // Check all parts are rendered
    expect(screen.getByText('Complete Card')).toBeInTheDocument();
    expect(screen.getByText('With all sections')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Card body content')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Header Action' })).toBeInTheDocument();
    expect(screen.getByText('Footer Action')).toBeInTheDocument();
  });

  it('handles keyboard navigation for interactive cards', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Card interactive onClick={handleClick} data-testid="interactive-card">
        <Card.Body>Interactive card</Card.Body>
      </Card>
    );
    
    const card = screen.getByTestId('interactive-card');
    
    // Focus the card
    card.focus();
    expect(card).toHaveFocus();
    
    // Press Enter to activate
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Press Space to activate
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});