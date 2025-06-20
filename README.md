# 🎨 Premium UI Component Library

A modern, accessible, and beautifully crafted React component library featuring glassmorphism effects, smooth animations, and comprehensive design system patterns.

[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://68553fec355209b1c95b45f8-engtyheyzi.chromatic.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/css-modules/css-modules)

## ✨ Features

### 🎯 **Modern Design Patterns**
- **Glassmorphism Effects** with backdrop blur and semi-transparent backgrounds
- **Premium Animations** using cubic-bezier easing for buttery smooth transitions
- **Micro-interactions** with hover lifts, scale transforms, and glow effects
- **Gradient Backgrounds** and contemporary color palettes

### ⚡ **Performance Optimized**
- **Hardware-accelerated transforms** for 60fps animations
- **Efficient collision detection** for smart positioning
- **Optimized event handling** and memory management
- **Reduced motion support** for accessibility

### ♿ **Accessibility First**
- **WCAG 2.1 compliant** with proper ARIA attributes
- **Keyboard navigation** support for all interactive elements
- **Screen reader friendly** with semantic markup
- **High contrast mode** support
- **Focus management** with visible focus indicators

### 📱 **Responsive Design**
- **Mobile-optimized** touch targets and interactions
- **Fluid typography** and spacing scales
- **Breakpoint-aware** components that adapt to screen size
- **Touch-friendly** interfaces for mobile devices

## 📦 Components

### 🧩 **Core Components**
- **Button** - Premium buttons with multiple variants and animations
- **Card** - Flexible content containers with glassmorphism effects
- **Avatar** - User profile images with status indicators
- **Badge** - Notification and status badges with pulsing animations

### 🧭 **Navigation**
- **Sidebar** - Collapsible navigation with smooth animations and search
- **Tabs** - Elegant tab navigation with smooth transitions
- **Header** - Responsive page headers and navigation bars

### 📋 **Form Components**
- **Input** - Enhanced text inputs with validation states
- **Select** - Custom dropdowns with search and multi-select

### 📊 **Data Display**
- **DataTable** - Feature-rich tables with sorting, filtering, and pagination
- **Grid** - Flexible layout system for responsive designs
- **Accordion** - Collapsible content sections

### 💬 **Feedback**
- **Tooltip** - Smart positioning tooltips with rich content support
- **Modal** - Accessible overlays with backdrop blur effects

## 🎨 Design System
**Use CSS variables where possible**
### **Color Palette**
```css
/* Primary Colors */
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
```

### **Typography Scale**
```css
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-base: 1rem;    /* 16px */
--text-lg: 1.125rem;  /* 18px */
--text-xl: 1.25rem;   /* 20px */
```

### **Spacing System**
Based on 4px grid system:
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-4: 1rem;     /* 16px */
--space-8: 2rem;     /* 32px */
```

## 🛠️ Advanced Usage

### **Theme Customization**

```jsx
// Custom theme provider
import { ThemeProvider } from 'your-component-library';

const customTheme = {
  colors: {
    primary: '#your-brand-color',
    secondary: '#your-secondary-color'
  },
  borderRadius: {
    lg: '0.75rem',
    xl: '1rem'
  }
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### **Dark Mode Support**

```jsx
// Automatic dark mode detection
import { useDarkMode } from 'your-component-library';

function App() {
  const { isDark, toggle } = useDarkMode();
  
  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <Button onClick={toggle}>
        Toggle {isDark ? '☀️' : '🌙'}
      </Button>
    </div>
  );
}
```

### **Animation Controls**

```jsx
// Customize animations
<Button 
  animation="bounce"
  duration="300ms"
  easing="cubic-bezier(0.4, 0, 0.2, 1)"
>
  Animated Button
</Button>
```

## 📖 Documentation

### **Storybook**
Explore all components with interactive examples:
```bash
npm run storybook
```

### **Component Props**
Each component includes comprehensive PropTypes and TypeScript definitions:

```jsx
// Example: Tooltip props
<Tooltip
  content="Tooltip content"
  position="top" | "bottom" | "left" | "right" | "auto"
  color="dark" | "light" | "primary" | "success" | "warning" | "error"
  size="xs" | "sm" | "md" | "lg" | "xl"
  trigger="hover" | "focus" | "click" | "both"
  animation="scale" | "fade" | "slide" | "bounce"
  interactive={boolean}
  multiline={boolean}
  showArrow={boolean}
/>
```

## 🧪 Testing

### **Visual Testing**
- **Chromatic** integration for visual regression testing
- **Cross-browser** testing across modern browsers
- **Responsive** testing at multiple breakpoints

### **Accessibility Testing**
- **axe-core** integration for automated a11y testing
- **Screen reader** testing with NVDA, JAWS, and VoiceOver
- **Keyboard navigation** testing

### **Performance Testing**
- **Lighthouse** audits for performance metrics
- **Bundle size** analysis and optimization
- **Animation performance** monitoring


### **Development Setup**

```bash
# Clone the repository
git clone https://github.com/leverh/pixelui-library

# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

```

### **Code Standards**

- **ESLint** and **Prettier** for code formatting
- **My Eyes** for little red dot errors on VS Code

## 📄 License

This project is licensed under the MIT License. Copy or share - I really don't care 🖖✌️

## 🙏 Acknowledgments

- **Animation techniques** from Framer Motion and React Spring
- **Accessibility patterns** from WAI-ARIA guidelines

## 📞 Links

- **Code**: [View Storybook](https://68553fec355209b1c95b45f8-engtyheyzi.chromatic.com/)
- **GitHub**: [GitHub](https://github.com/leverh/pixelui-library)
- **Portfolio Website**: [PixelSummit](https://pixelsummit.dev/)
- **Email**: contact@pixelsummit.dv

---



**If ya want...**

• [⭐ Star on GitHub](https://github.com/leverh/pixelui-library)
