import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Badge from './Badge';
import styles from './Badge.module.css';

describe('Badge', () => {
  it('renders badge with text', () => {
    render(<Badge>Test Badge</Badge>);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Badge variant="solid" data-testid="badge">Solid</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.solid);

    rerender(<Badge variant="outline" data-testid="badge">Outline</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.outline);

    rerender(<Badge variant="soft" data-testid="badge">Soft</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.soft);
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<Badge color="primary" data-testid="badge">Primary</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.primary);

    rerender(<Badge color="success" data-testid="badge">Success</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.success);

    rerender(<Badge color="error" data-testid="badge">Error</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.error);
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Badge size="small" data-testid="badge">Small</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.small);

    rerender(<Badge size="large" data-testid="badge">Large</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass(styles.large);
  });

  it('handles interactive state', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Badge interactive onClick={handleClick} data-testid="badge">
        Interactive Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass(styles.interactive);
    expect(badge).toHaveAttribute('role', 'button');
    expect(badge).toHaveAttribute('tabIndex', '0');
    
    await user.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation for interactive badges', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Badge interactive onClick={handleClick} data-testid="badge">
        Interactive Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    badge.focus();
    
    // Test Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Test Space key
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('renders with left icon', () => {
    const TestIcon = () => <span data-testid="test-icon">★</span>;
    
    render(<Badge leftIcon={<TestIcon />}>With Icon</Badge>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const TestIcon = () => <span data-testid="test-icon">✓</span>;
    
    render(<Badge rightIcon={<TestIcon />}>With Icon</Badge>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('handles removable state', async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();
    
    render(
      <Badge removable onRemove={handleRemove} data-testid="badge">
        Removable Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass(styles.removable);
    
    const removeButton = screen.getByRole('button', { name: /remove badge/i });
    expect(removeButton).toBeInTheDocument();
    
    await user.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('prevents event bubbling when remove button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const handleRemove = vi.fn();
    
    render(
      <Badge 
        interactive 
        removable 
        onClick={handleClick} 
        onRemove={handleRemove}
        data-testid="badge"
      >
        Interactive Removable
      </Badge>
    );
    
    const removeButton = screen.getByRole('button', { name: /remove badge/i });
    await user.click(removeButton);
    
    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows dot indicator when dot prop is true', () => {
    render(<Badge dot data-testid="badge">With Dot</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass(styles.withDot);
    
    const dot = badge.querySelector(`.${styles.dot}`);
    expect(dot).toBeInTheDocument();
  });

  it('does not show right icon when removable', () => {
    const TestIcon = () => <span data-testid="test-icon">→</span>;
    
    render(
      <Badge removable rightIcon={<TestIcon />} onRemove={() => {}}>
        Removable with Icon
      </Badge>
    );
    
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove badge/i })).toBeInTheDocument();
  });

  it('renders as different HTML elements', () => {
    const { rerender } = render(
      <Badge as="div" data-testid="badge">Div Badge</Badge>
    );
    expect(screen.getByTestId('badge').tagName).toBe('DIV');

    rerender(
      <Badge as="button" data-testid="badge">Button Badge</Badge>
    );
    expect(screen.getByTestId('badge').tagName).toBe('BUTTON');
  });

  it('applies custom className', () => {
    render(
      <Badge className="custom-class" data-testid="badge">
        Custom Badge
      </Badge>
    );
    
    expect(screen.getByTestId('badge')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    
    render(<Badge ref={ref} data-testid="badge">Ref Badge</Badge>);
    
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    expect(ref.current).toHaveAttribute('data-testid', 'badge');
  });

  it('has proper accessibility attributes for interactive badges', () => {
    render(
      <Badge interactive onClick={() => {}} data-testid="badge">
        Interactive Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('role', 'button');
    expect(badge).toHaveAttribute('tabIndex', '0');
    expect(badge).toHaveAttribute('aria-label', 'Interactive Badge badge');
  });

  it('does not have button attributes for non-interactive badges', () => {
    render(<Badge data-testid="badge">Non-interactive Badge</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).not.toHaveAttribute('role');
    expect(badge).not.toHaveAttribute('tabIndex');
    expect(badge).not.toHaveAttribute('aria-label');
  });

  it('combines multiple style classes correctly', () => {
    render(
      <Badge 
        variant="outline" 
        color="success" 
        size="large" 
        interactive 
        dot
        data-testid="badge"
      >
        Multi-style Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass(styles.badge);
    expect(badge).toHaveClass(styles.large);
    expect(badge).toHaveClass(styles.outline);
    expect(badge).toHaveClass(styles.success);
    expect(badge).toHaveClass(styles.interactive);
    expect(badge).toHaveClass(styles.withDot);
  });

  it('handles remove button focus correctly', async () => {
    const user = userEvent.setup();
    
    render(
      <Badge removable onRemove={() => {}}>
        Removable Badge
      </Badge>
    );
    
    const removeButton = screen.getByRole('button', { name: /remove badge/i });
    expect(removeButton).toHaveAttribute('tabIndex', '-1');
    
    // The remove button should be focusable but not in tab order
    removeButton.focus();
    expect(removeButton).toHaveFocus();
  });

  it('renders correctly with all props combined', () => {
    const LeftIcon = () => <span data-testid="left-icon">L</span>;
    const handleClick = vi.fn();
    const handleRemove = vi.fn();
    
    render(
      <Badge
        variant="soft"
        color="primary"
        size="large"
        interactive
        removable
        dot
        leftIcon={<LeftIcon />}
        onClick={handleClick}
        onRemove={handleRemove}
        className="custom-badge"
        data-testid="complex-badge"
      >
        Complex Badge
      </Badge>
    );
    
    const badge = screen.getByTestId('complex-badge');
    
    // Check all classes are applied
    expect(badge).toHaveClass(styles.badge);
    expect(badge).toHaveClass(styles.large);
    expect(badge).toHaveClass(styles.soft);
    expect(badge).toHaveClass(styles.primary);
    expect(badge).toHaveClass(styles.interactive);
    expect(badge).toHaveClass(styles.removable);
    expect(badge).toHaveClass(styles.withDot);
    expect(badge).toHaveClass('custom-badge');
    
    // Check content is rendered
    expect(screen.getByText('Complex Badge')).toBeInTheDocument();
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remove badge/i })).toBeInTheDocument();
    
    // Check dot indicator
    const dot = badge.querySelector(`.${styles.dot}`);
    expect(dot).toBeInTheDocument();
    
    // Check accessibility
    expect(badge).toHaveAttribute('role', 'button');
    expect(badge).toHaveAttribute('tabIndex', '0');
  });
});