import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Avatar from './Avatar';
import styles from './Avatar.module.css';

describe('Avatar', () => {
  it('renders avatar with image', () => {
    render(
      <Avatar 
        src="https://example.com/avatar.jpg" 
        alt="Test Avatar"
        name="John Doe"
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    expect(image).toHaveAttribute('alt', 'Test Avatar');
  });

  it('renders initials when no image provided', () => {
    render(<Avatar name="John Doe" data-testid="avatar" />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('generates correct initials for single name', () => {
    render(<Avatar name="John" data-testid="avatar" />);
    
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('generates correct initials for multiple names', () => {
    render(<Avatar name="John Michael Doe" data-testid="avatar" />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Avatar name="John" size="small" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.small);

    rerender(<Avatar name="John" size="large" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.large);

    rerender(<Avatar name="John" size="extraLarge" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.extraLarge);
  });

  it('applies shape classes correctly', () => {
    const { rerender } = render(<Avatar name="John" shape="circle" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.circle);

    rerender(<Avatar name="John" shape="square" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.square);

    rerender(<Avatar name="John" shape="rounded" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.rounded);
  });

  it('applies color classes correctly', () => {
    const { rerender } = render(<Avatar name="John" color="primary" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.colorPrimary);

    rerender(<Avatar name="John" color="success" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.colorSuccess);

    rerender(<Avatar name="John" color="error" data-testid="avatar" />);
    expect(screen.getByTestId('avatar')).toHaveClass(styles.colorError);
  });

  it('shows loading state', () => {
    render(<Avatar loading data-testid="avatar" />);
    
    expect(screen.getByTestId('avatar')).toHaveClass(styles.loading);
  });

  it('handles interactive state', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Avatar 
        name="John Doe" 
        interactive 
        onClick={handleClick}
        data-testid="avatar"
      />
    );
    
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass(styles.interactive);
    expect(avatar).toHaveAttribute('role', 'button');
    expect(avatar).toHaveAttribute('tabIndex', '0');
    
    await user.click(avatar);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation for interactive avatars', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(
      <Avatar 
        name="John Doe" 
        interactive 
        onClick={handleClick}
        data-testid="avatar"
      />
    );
    
    const avatar = screen.getByTestId('avatar');
    avatar.focus();
    
    // Test Enter key
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    // Test Space key
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('shows status indicator', () => {
    render(
      <Avatar 
        name="John Doe" 
        status="online"
        data-testid="avatar"
      />
    );
    
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass(styles.withStatus);
    
    const statusIndicator = avatar.querySelector(`.${styles.status}`);
    expect(statusIndicator).toBeInTheDocument();
    expect(statusIndicator).toHaveClass(styles.statusOnline);
  });

  it('shows badge indicator', () => {
    render(
      <Avatar 
        name="John Doe" 
        badge={5}
        data-testid="avatar"
      />
    );
    
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveClass(styles.withBadge);
    
    const badge = avatar.querySelector(`.${styles.badge}`);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  it('shows 99+ for badges over 99', () => {
    render(
      <Avatar 
        name="John Doe" 
        badge={150}
        data-testid="avatar"
      />
    );
    
    const badge = screen.getByTestId('avatar').querySelector(`.${styles.badge}`);
    expect(badge).toHaveTextContent('99+');
  });

  it('falls back to initials when image fails to load', async () => {
    render(
      <Avatar 
        src="https://invalid-url.com/image.jpg"
        name="John Doe"
        data-testid="avatar"
      />
    );
    
    // Initially shows image
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    
    // Simulate image error
    fireEvent.error(image);
    
    // Should now show initials
    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  it('handles image load events', async () => {
    render(
      <Avatar 
        src="https://example.com/avatar.jpg"
        name="John Doe"
      />
    );
    
    const image = screen.getByRole('img');
    
    // Simulate successful image load
    fireEvent.load(image);
    
    // Image still be visible
    expect(image).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Avatar 
        name="John Doe" 
        className="custom-avatar"
        data-testid="avatar"
      />
    );
    
    expect(screen.getByTestId('avatar')).toHaveClass('custom-avatar');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    
    render(<Avatar name="John Doe" ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('generates consistent colors based on name', () => {
    const { rerender } = render(
      <Avatar name="John Doe" data-testid="avatar" />
    );
    
    const firstRenderClasses = screen.getByTestId('avatar').className;
    
    rerender(<Avatar name="John Doe" data-testid="avatar" />);
    
    // Same color class for same name
    expect(screen.getByTestId('avatar')).toHaveClass(firstRenderClasses.split(' ').find(cls => cls.includes('color')));
  });

  it('has proper accessibility attributes', () => {
    render(
      <Avatar 
        name="John Doe" 
        interactive
        onClick={() => {}}
        data-testid="avatar"
      />
    );
    
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toHaveAttribute('role', 'button');
    expect(avatar).toHaveAttribute('aria-label', 'John Doe avatar');
  });
});

describe('Avatar.Group', () => {
  it('renders multiple avatars', () => {
    render(
      <Avatar.Group>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Wilson" />
      </Avatar.Group>
    );
    
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.getByText('BW')).toBeInTheDocument();
  });

  it('shows overflow indicator when max is exceeded', () => {
    render(
      <Avatar.Group max={2}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Wilson" />
        <Avatar name="Alice Johnson" />
      </Avatar.Group>
    );
    
    // Should show first 2 avatars
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
    
    // Should show +2 for remaining
    expect(screen.getByText('+2')).toBeInTheDocument();
    
    // Should not show the hidden avatars
    expect(screen.queryByText('BW')).not.toBeInTheDocument();
    expect(screen.queryByText('AJ')).not.toBeInTheDocument();
  });

  it('handles more button click', async () => {
    const user = userEvent.setup();
    const handleMoreClick = vi.fn();
    
    render(
      <Avatar.Group max={2} onMoreClick={handleMoreClick}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Wilson" />
      </Avatar.Group>
    );
    
    const moreButton = screen.getByText('+1');
    await user.click(moreButton);
    
    expect(handleMoreClick).toHaveBeenCalledTimes(1);
  });

  it('handles more button keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleMoreClick = vi.fn();
    
    render(
      <Avatar.Group max={2} onMoreClick={handleMoreClick}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Wilson" />
      </Avatar.Group>
    );
    
    const moreButton = screen.getByText('+1');
    moreButton.focus();
    
    // Test Enter key
    await user.keyboard('{Enter}');
    expect(handleMoreClick).toHaveBeenCalledTimes(1);
    
    // Test Space key
    await user.keyboard(' ');
    expect(handleMoreClick).toHaveBeenCalledTimes(2);
  });

  it('applies group item classes to avatars', () => {
    render(
      <Avatar.Group>
        <Avatar name="John Doe" data-testid="avatar-1" />
        <Avatar name="Jane Smith" data-testid="avatar-2" />
      </Avatar.Group>
    );
    
    expect(screen.getByTestId('avatar-1')).toHaveClass(styles.avatarGroupItem);
    expect(screen.getByTestId('avatar-2')).toHaveClass(styles.avatarGroupItem);
  });

  it('applies custom className to group', () => {
    render(
      <Avatar.Group className="custom-group" data-testid="group">
        <Avatar name="John Doe" />
      </Avatar.Group>
    );
    
    expect(screen.getByTestId('group')).toHaveClass('custom-group');
  });

  it('shows no overflow when avatars are within max limit', () => {
    render(
      <Avatar.Group max={5}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
      </Avatar.Group>
    );
    
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
  });
});