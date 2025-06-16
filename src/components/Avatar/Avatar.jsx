import { useState, forwardRef } from 'react';
import styles from './Avatar.module.css';

const Avatar = forwardRef(({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  color,
  status,
  badge,
  loading = false,
  interactive = false,
  onClick,
  className = '',
  variant = 'default',
  ...props
}, ref) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(!!src);

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  // Generate color from name hash
  const getColorFromName = (name) => {
    if (!name) return 'neutral';
    const colors = ['blue', 'green', 'purple', 'pink', 'orange', 'indigo', 'teal'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleClick = (e) => {
    if (interactive && onClick) onClick(e);
  };

  const handleKeyDown = (e) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e);
    }
  };

  const showImage = src && !imageError && !loading;
  const showInitials = !showImage && name && !loading;
  const finalColor = color || getColorFromName(name);

  return (
    <div
      ref={ref}
      className={`
        ${styles.avatar}
        ${styles[size]}
        ${styles[shape]}
        ${styles[variant]}
        ${!showImage ? styles[finalColor] : ''}
        ${loading ? styles.loading : ''}
        ${interactive ? styles.interactive : ''}
        ${className}
      `}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      aria-label={name || alt}
      {...props}
    >
      {/* Avatar Content */}
      {showImage && (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {showInitials && (
        <span className={styles.initials}>
          {getInitials(name)}
        </span>
      )}
      
      {loading && (
        <div className={styles.spinner} />
      )}

      {/* Status Indicator */}
      {status && (
        <span 
          className={`${styles.status} ${styles[`status_${status}`]}`}
          aria-label={`Status: ${status}`}
        />
      )}

      {/* Badge */}
      {badge && (
        <span className={styles.badge}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

// Avatar Group Component
const AvatarGroup = ({ 
  children, 
  max = 5, 
  size = 'md',
  spacing = 'default',
  onMoreClick,
  className = '',
  ...props 
}) => {
  const validChildren = children ? (Array.isArray(children) ? children : [children]).filter(Boolean) : [];
  const visibleChildren = validChildren.slice(0, max);
  const remainingCount = Math.max(0, validChildren.length - max);

  return (
    <div 
      className={`${styles.group} ${styles[`spacing_${spacing}`]} ${className}`}
      {...props}
    >
      {visibleChildren.map((child, index) => 
        <div key={child.key || index} className={styles.groupItem}>
          {typeof child === 'object' ? 
            { ...child, props: { ...child.props, size } } : 
            child
          }
        </div>
      )}
      
      {remainingCount > 0 && (
        <div
          className={`${styles.avatar} ${styles[size]} ${styles.circle} ${styles.groupItem} ${styles.more}`}
          onClick={onMoreClick}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && onMoreClick) {
              e.preventDefault();
              onMoreClick(e);
            }
          }}
          tabIndex={onMoreClick ? 0 : undefined}
          role={onMoreClick ? 'button' : undefined}
          aria-label={`View ${remainingCount} more`}
        >
          <span className={styles.initials}>+{remainingCount}</span>
        </div>
      )}
    </div>
  );
};

Avatar.Group = AvatarGroup;
export default Avatar;