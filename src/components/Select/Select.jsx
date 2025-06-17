import { useState, useRef, useEffect, useCallback, forwardRef } from 'react';
import styles from './Select.module.css';

const Select = forwardRef(({
  options = [],
  value = null,
  onChange,
  onSearch,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search options...',
  multiple = false,
  searchable = false,
  disabled = false,
  error = false,
  size = 'md', // 'xs', 'sm', 'md', 'lg', 'xl'
  variant = 'default', // 'default', 'minimal', 'floating', 'glass'
  maxHeight = 200,
  virtualScroll = false,
  clearable = false,
  loading = false,
  emptyMessage = 'No options found',
  className = '',
  required = false,
  name = '',
  id = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  onFocus,
  onBlur,
  ...rest
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const [isFocused, setIsFocused] = useState(false);
  
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionRefs = useRef([]);

  // Combine internal ref with forwarded ref
  const combinedRef = useCallback((node) => {
    selectRef.current = node;
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  }, [ref]);

  // Filter options based on search term with matching
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => {
        const searchLower = searchTerm.toLowerCase();
        return (
          option.label?.toLowerCase().includes(searchLower) ||
          option.description?.toLowerCase().includes(searchLower) ||
          option.value?.toLowerCase().includes(searchLower)
        );
      })
    : options;

  // Dropdown positioning with collision detection
  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      const spaceBelow = viewportHeight - (selectRect.bottom - scrollY);
      const spaceAbove = selectRect.top - scrollY;
      
      if (spaceBelow < dropdownRect.height + 10 && spaceAbove > dropdownRect.height + 10) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen, filteredOptions.length]);

  // Click outside with escape key support
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
        selectRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  // Keyboard navigation with type-ahead
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) {
        // Open dropdown on Enter or Space when closed
        if ((event.key === 'Enter' || event.key === ' ') && !searchable) {
          event.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => {
            const nextIndex = prev < filteredOptions.length - 1 ? prev + 1 : 0;
            return filteredOptions[nextIndex]?.disabled ? 
              findNextEnabledOption(nextIndex, 1) : nextIndex;
          });
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => {
            const nextIndex = prev > 0 ? prev - 1 : filteredOptions.length - 1;
            return filteredOptions[nextIndex]?.disabled ? 
              findNextEnabledOption(nextIndex, -1) : nextIndex;
          });
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0 && !filteredOptions[highlightedIndex]?.disabled) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Home':
          event.preventDefault();
          setHighlightedIndex(findNextEnabledOption(-1, 1));
          break;
        case 'End':
          event.preventDefault();
          setHighlightedIndex(findNextEnabledOption(filteredOptions.length, -1));
          break;
        case 'Tab':
          handleClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions, searchable]);

  const findNextEnabledOption = (startIndex, direction) => {
    let index = startIndex + direction;
    while (index >= 0 && index < filteredOptions.length) {
      if (!filteredOptions[index]?.disabled) {
        return index;
      }
      index += direction;
    }
    return -1;
  };

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Smooth scroll to highlighted option
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex]);

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
    setIsFocused(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setHighlightedIndex(-1);
      setIsFocused(true);
    }
  };

  const handleOptionClick = (option) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const isSelected = currentValue.some(v => v.value === option.value);
      
      if (isSelected) {
        onChange?.(currentValue.filter(v => v.value !== option.value));
      } else {
        onChange?.([...currentValue, option]);
      }
    } else {
      onChange?.(option);
      handleClose();
    }
    
    // Focus back to main button for accessibility
    if (!multiple) {
      selectRef.current?.focus();
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setHighlightedIndex(-1);
    onSearch?.(term);
  };

  const handleRemoveTag = (optionToRemove, event) => {
    event?.stopPropagation();
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter(v => v.value !== optionToRemove.value));
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : null);
    setSearchTerm('');
    selectRef.current?.focus();
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    if (!selectRef.current?.contains(e.relatedTarget)) {
      setIsFocused(false);
      onBlur?.(e);
    }
  };

  const isSelected = (option) => {
    if (multiple) {
      return Array.isArray(value) && value.some(v => v.value === option.value);
    }
    return value?.value === option.value;
  };

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return `${value.length} selected`;
    }
    return value?.label || placeholder;
  };

  const showClearButton = clearable && (
    (multiple && Array.isArray(value) && value.length > 0) || 
    (!multiple && value)
  );

  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (multiple) return `Multi-select dropdown${value?.length ? `, ${value.length} items selected` : ''}`;
    return `Select dropdown${value ? `, ${value.label} selected` : ''}`;
  };

  return (
    <div 
      className={`${styles.selectWrapper} ${className}`} 
      ref={combinedRef}
      data-size={size}
      data-variant={variant}
      data-disabled={disabled}
      data-error={error}
      data-open={isOpen}
      data-focused={isFocused}
    >
      {/* Hidden input for form integration */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={multiple ? JSON.stringify(value) : (value?.value || '')}
          required={required && !value}
        />
      )}

      {/* Main Select Button */}
      <button
        type="button"
        className={`
          ${styles.selectButton}
          ${styles[size]}
          ${styles[variant]}
          ${isOpen ? styles.open : ''}
          ${error ? styles.error : ''}
          ${disabled ? styles.disabled : ''}
          ${isFocused ? styles.focused : ''}
        `}
        onClick={handleToggle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={getAriaLabel()}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-required={required}
        aria-invalid={error}
        id={id}
        {...rest}
      >
        <div className={styles.selectContent}>
          {/* Selected Values / Tags */}
          {multiple && Array.isArray(value) && value.length > 0 ? (
            <div className={styles.tagsContainer}>
              {value.slice(0, 3).map((selectedOption, index) => (
                <span
                  key={selectedOption.value}
                  className={styles.tag}
                  onClick={(e) => handleRemoveTag(selectedOption, e)}
                  role="button"
                  tabIndex={-1}
                  aria-label={`Remove ${selectedOption.label}`}
                >
                  {selectedOption.icon && (
                    <span className={styles.tagIcon} aria-hidden="true">
                      {selectedOption.icon}
                    </span>
                  )}
                  <span className={styles.tagLabel}>{selectedOption.label}</span>
                  <span className={styles.tagRemove} aria-hidden="true">×</span>
                </span>
              ))}
              {value.length > 3 && (
                <span className={styles.tagMore} aria-label={`${value.length - 3} more items selected`}>
                  +{value.length - 3} more
                </span>
              )}
            </div>
          ) : (
            <span className={`${styles.selectValue} ${!value ? styles.placeholder : ''}`}>
              {value?.icon && (
                <span className={styles.valueIcon} aria-hidden="true">
                  {value.icon}
                </span>
              )}
              <span className={styles.valueText}>{getDisplayValue()}</span>
            </span>
          )}
        </div>

        {/* Actions */}
        <div className={styles.selectActions}>
          {loading && (
            <div className={styles.spinner} aria-label="Loading options" />
          )}
          {showClearButton && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear selection"
              tabIndex={-1}
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
          <div 
            className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`
            ${styles.dropdown}
            ${styles[`dropdown${dropdownPosition.charAt(0).toUpperCase() + dropdownPosition.slice(1)}`]}
            ${styles[variant]}
          `}
          style={{ maxHeight: `${maxHeight}px` }}
          role="listbox"
          aria-label="Options"
          aria-multiselectable={multiple}
        >
          {/* Search Input */}
          {searchable && (
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <input
                  ref={searchInputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Search options"
                />
                <div className={styles.searchIcon} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Options List */}
          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.emptyState} role="status">
                {loading ? (
                  <div className={styles.emptyStateContent}>
                    <div className={styles.emptySpinner} />
                    <span>Loading options...</span>
                  </div>
                ) : (
                  <div className={styles.emptyStateContent}>
                    <span>🔍</span>
                    <span>{emptyMessage}</span>
                  </div>
                )}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  ref={(el) => (optionRefs.current[index] = el)}
                  className={`
                    ${styles.option}
                    ${isSelected(option) ? styles.optionSelected : ''}
                    ${index === highlightedIndex ? styles.optionHighlighted : ''}
                    ${option.disabled ? styles.optionDisabled : ''}
                  `}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={isSelected(option)}
                  aria-disabled={option.disabled}
                  tabIndex={-1}
                >
                  <div className={styles.optionContent}>
                    {option.icon && (
                      <span className={styles.optionIcon} aria-hidden="true">
                        {option.icon}
                      </span>
                    )}
                    <div className={styles.optionText}>
                      <span className={styles.optionLabel}>{option.label}</span>
                      {option.description && (
                        <span className={styles.optionDescription}>
                          {option.description}
                        </span>
                      )}
                    </div>
                  </div>
                  {isSelected(option) && (
                    <div className={styles.checkmark} aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;