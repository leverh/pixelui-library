import { useState, useRef, useEffect } from 'react';
import styles from './Tabs.module.css';

const Tabs = ({ 
  tabs = [],
  defaultTab = 0,
  variant = 'default', // 'default', 'pills', 'underline'
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const activeTabElement = tabsRef.current[activeTab];
    if (activeTabElement && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      
      setIndicatorStyle({
        width: `${tabRect.width}px`,
        transform: `translateX(${tabRect.left - containerRect.left}px)`,
      });
    }
  }, [activeTab, tabs]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  if (!tabs || tabs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No tabs provided</p>
      </div>
    );
  }

  return (
    <div className={styles.tabsWrapper}>
      {/* Tab Navigation */}
      <div 
        ref={containerRef}
        className={`${styles.tabsContainer} ${styles[variant]}`}
      >
        {/* Animated Indicator */}
        <div
          className={`${styles.indicator} ${styles[`indicator${variant.charAt(0).toUpperCase() + variant.slice(1)}`]}`}
          style={indicatorStyle}
        />

        {/* Tab Buttons */}
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabsRef.current[index] = el)}
            onClick={() => handleTabClick(index)}
            className={`
              ${styles.tabButton} 
              ${styles[size]} 
              ${activeTab === index ? styles.active : styles.inactive}
            `}
          >
            {tab.icon && (
              <span className={styles.tabIcon}>
                {tab.icon}
              </span>
            )}
            {tab.label}
            {tab.badge && (
              <span className={styles.badge}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.contentWrapper}>
        <div
          className={styles.contentContainer}
          style={{ transform: `translateX(-${activeTab * 100}%)` }}
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`
                ${styles.contentPanel}
                ${activeTab === index ? styles.contentActive : styles.contentInactive}
              `}
            >
              <div className={styles.contentCard}>
                {tab.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;