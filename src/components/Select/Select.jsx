import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Select.module.css';

const Select = ({
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
  size = 'md', // 'sm', 'md', 'lg'
  variant = 'default', // 'default', 'minimal', 'floating'
  maxHeight = 200,
  virtualScroll = false,
  clearable = false,
  loading = false,
  emptyMessage = 'No options found',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionRefs = useRef([]);

  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(option => 
        option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Dropdown positioning
  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const selectRect = selectRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const spaceBelow = viewportHeight - selectRect.bottom;
      const spaceAbove = selectRect.top;
      
      if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen, filteredOptions.length]);

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (highlightedIndex >= 0) {
            handleOptionClick(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [highlightedIndex]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHighlightedIndex(-1);
    }
  };

  const handleOptionClick = (option) => {
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
      setIsOpen(false);
      setSearchTerm('');
    }
    setHighlightedIndex(-1);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setHighlightedIndex(-1);
    onSearch?.(term);
  };

  const handleRemoveTag = (optionToRemove) => {
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter(v => v.value !== optionToRemove.value));
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : null);
    setSearchTerm('');
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

  const showClearButton = clearable && ((multiple && Array.isArray(value) && value.length > 0) || (!multiple && value));

  return (
    <div className={`${styles.selectWrapper} ${className}`} ref={selectRef}>
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
        `}
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={styles.selectContent}>
          {/* Selected Values / Tags */}
          {multiple && Array.isArray(value) && value.length > 0 ? (
            <div className={styles.tagsContainer}>
              {value.slice(0, 3).map((selectedOption, index) => (
                <span
                  key={selectedOption.value}
                  className={styles.tag}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveTag(selectedOption);
                  }}
                >
                  {selectedOption.icon && (
                    <span className={styles.tagIcon}>{selectedOption.icon}</span>
                  )}
                  {selectedOption.label}
                  <span className={styles.tagRemove}>×</span>
                </span>
              ))}
              {value.length > 3 && (
                <span className={styles.tagMore}>+{value.length - 3} more</span>
              )}
            </div>
          ) : (
            <span className={`${styles.selectValue} ${!value ? styles.placeholder : ''}`}>
              {value?.icon && <span className={styles.valueIcon}>{value.icon}</span>}
              {getDisplayValue()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className={styles.selectActions}>
          {loading && (
            <div className={styles.spinner} />
          )}
          {showClearButton && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="Clear selection"
            >
              ×
            </button>
          )}
          <div className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`}>
            ▼
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
        >
          {/* Search Input */}
          {searchable && (
            <div className={styles.searchContainer}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => e.stopPropagation()}
              />
              <div className={styles.searchIcon}>🔍</div>
            </div>
          )}

          {/* Options List */}
          <div className={styles.optionsList}>
            {filteredOptions.length === 0 ? (
              <div className={styles.emptyState}>
                {loading ? 'Loading...' : emptyMessage}
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
                  onClick={() => !option.disabled && handleOptionClick(option)}
                  role="option"
                  aria-selected={isSelected(option)}
                >
                  <div className={styles.optionContent}>
                    {option.icon && (
                      <span className={styles.optionIcon}>{option.icon}</span>
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
                    <div className={styles.checkmark}>✓</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;