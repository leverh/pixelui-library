import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.css';

const Avatar = forwardRef(({
  src,
  alt,
  name,
  size = 'medium',
  shape = 'circle',
  color = 'secondary',
  status,
  badge,
  loading = false,
  interactive = false,
  onClick,
  className = '',
  ...props
}, ref) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '';
    
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Generate color based on name for consistency
  const getColorFromName = (name) => {
    if (!name) return color;
    
    const colors = ['primary', 'success', 'warning', 'error', 'info'];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleClick = (event) => {
    if (interactive && onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event) => {
    if (interactive && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick?.(event);
    }
  };

  const shouldShowImage = src && !imageError && !loading;
  const shouldShowInitials = !shouldShowImage && name && !loading;
  const isLoading = loading || imageLoading;
  const finalColor = name && color === 'secondary' ? getColorFromName(name) : color;

  const avatarClasses = [
    styles.avatar,
    styles[size],
    styles[shape],
    !shouldShowImage && styles[`color${finalColor.charAt(0).toUpperCase() + finalColor.slice(1)}`],
    isLoading && styles.loading,
    interactive && styles.interactive,
    status && styles.withStatus,
    badge && styles.withBadge,
    className
  ].filter(Boolean).join(' ');

  const avatarProps = {
    ref,
    className: avatarClasses,
    onClick: interactive ? handleClick : undefined,
    onKeyDown: interactive ? handleKeyDown : undefined,
    tabIndex: interactive ? 0 : undefined,
    role: interactive ? 'button' : undefined,
    'aria-label': interactive && name ? `${name} avatar` : alt || undefined,
    ...props
  };

  return (
    <div {...avatarProps}>
      {shouldShowImage && (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {shouldShowInitials && (
        <span aria-hidden="true">
          {getInitials(name)}
        </span>
      )}
      
      {status && (
        <div 
          className={`${styles.status} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}
          aria-label={`Status: ${status}`}
        />
      )}
      
      {badge && (
        <div className={styles.badge} aria-label={`${badge} notifications`}>
          {badge > 99 ? '99+' : badge}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

// Avatar Group component
const AvatarGroup = ({ 
  children, 
  max = 5, 
  className = '', 
  onMoreClick,
  ...props 
}) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  const groupClasses = [styles.avatarGroup, className].filter(Boolean).join(' ');

  return (
    <div className={groupClasses} {...props}>
      {visibleAvatars.map((avatar, index) => 
        React.cloneElement(avatar, {
          key: index,
          className: `${avatar.props.className || ''} ${styles.avatarGroupItem}`.trim()
        })
      )}
      
      {remainingCount > 0 && (
        <div
          className={`${styles.avatar} ${styles.medium} ${styles.circle} ${styles.avatarGroupItem} ${styles.avatarGroupMore}`}
          onClick={onMoreClick}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && onMoreClick) {
              e.preventDefault();
              onMoreClick(e);
            }
          }}
          tabIndex={onMoreClick ? 0 : undefined}
          role={onMoreClick ? 'button' : undefined}
          aria-label={`${remainingCount} more users`}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

// PropTypes
Avatar.propTypes = {
  /** Image source URL */
  src: PropTypes.string,
  
  /** Alt text for image */
  alt: PropTypes.string,
  
  /** Name to generate initials from */
  name: PropTypes.string,
  
  /** Size of the avatar */
  size: PropTypes.oneOf(['extraSmall', 'small', 'medium', 'large', 'extraLarge']),
  
  /** Shape of the avatar */
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  
  /** Color theme for initials */
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
  
  /** Status indicator */
  status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
  
  /** Badge number */
  badge: PropTypes.number,
  
  /** Loading state */
  loading: PropTypes.bool,
  
  /** Whether the avatar is interactive */
  interactive: PropTypes.bool,
  
  /** Click handler for interactive avatars */
  onClick: PropTypes.func,
  
  /** Additional CSS classes */
  className: PropTypes.string,
};

AvatarGroup.propTypes = {
  /** Avatar components */
  children: PropTypes.node.isRequired,
  
  /** Maximum number of avatars to show */
  max: PropTypes.number,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** Click handler for "more" indicator */
  onMoreClick: PropTypes.func,
};

// Attach AvatarGroup to Avatar
Avatar.Group = AvatarGroup;

export default Avatar;