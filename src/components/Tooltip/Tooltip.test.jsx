import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import Tooltip from './Tooltip';

// Mock button component for testing
const TestButton = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

describe('Tooltip', () => {
  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );
      
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('does not render tooltip initially', () => {
      render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );
      
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    });

    it('renders without content gracefully', () => {
      render(
        <Tooltip>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );
      
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });
  });

  describe('Hover Trigger', () => {
    it('shows tooltip on hover with default trigger', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300); // Default medium delay
      });

      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });

    it('hides tooltip on mouse leave', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Test tooltip')).toBeInTheDocument();

      await user.unhover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(150); // Hide animation delay
      });

      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Focus Trigger', () => {
    it('shows tooltip on focus when trigger is focus', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Focus tooltip" trigger="focus">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.tab(); // Focus the button
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Focus tooltip')).toBeInTheDocument();
    });

    it('hides tooltip on blur when trigger is focus', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Tooltip content="Focus tooltip" trigger="focus">
            <TestButton>Test Button</TestButton>
          </Tooltip>
          <input placeholder="Other element" />
        </div>
      );

      await user.tab(); // Focus the button
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Focus tooltip')).toBeInTheDocument();

      await user.tab(); // Move focus away
      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(screen.queryByText('Focus tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Click Trigger', () => {
    it('toggles tooltip on click when trigger is click', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Click tooltip" trigger="click">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Click to show
      await user.click(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Click tooltip')).toBeInTheDocument();

      // Click to hide
      await user.click(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(screen.queryByText('Click tooltip')).not.toBeInTheDocument();
    });

    it('hides tooltip on outside click when trigger is click', async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Tooltip content="Click tooltip" trigger="click">
            <TestButton>Test Button</TestButton>
          </Tooltip>
          <div data-testid="outside">Outside element</div>
        </div>
      );

      // Click to show tooltip
      await user.click(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Click tooltip')).toBeInTheDocument();

      // Click outside to hide
      await user.click(screen.getByTestId('outside'));
      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(screen.queryByText('Click tooltip')).not.toBeInTheDocument();
    });

    it('hides tooltip on Escape key when trigger is click', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Click tooltip" trigger="click">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Click to show tooltip
      await user.click(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Click tooltip')).toBeInTheDocument();

      // Press Escape to hide
      await user.keyboard('{Escape}');
      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(screen.queryByText('Click tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Both Trigger', () => {
    it('shows tooltip on both hover and focus when trigger is both', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Both tooltip" trigger="both">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Test hover
      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Both tooltip')).toBeInTheDocument();

      await user.unhover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(150);
      });

      // Test focus
      await user.tab();
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Both tooltip')).toBeInTheDocument();
    });
  });

  describe('Delay Variants', () => {
    it('shows tooltip immediately with no delay', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="No delay tooltip" delay="none">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      // No need to advance timers
      
      expect(screen.getByText('No delay tooltip')).toBeInTheDocument();
    });

    it('respects short delay', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Short delay tooltip" delay="short">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      
      // Should not be visible immediately
      expect(screen.queryByText('Short delay tooltip')).not.toBeInTheDocument();
      
      act(() => {
        vi.advanceTimersByTime(100); // Short delay
      });

      expect(screen.getByText('Short delay tooltip')).toBeInTheDocument();
    });

    it('respects long delay', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Long delay tooltip" delay="long">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      
      act(() => {
        vi.advanceTimersByTime(300); // Should still not be visible
      });
      
      expect(screen.queryByText('Long delay tooltip')).not.toBeInTheDocument();
      
      act(() => {
        vi.advanceTimersByTime(200); // Complete the 500ms delay
      });

      expect(screen.getByText('Long delay tooltip')).toBeInTheDocument();
    });
  });

  describe('Positioning', () => {
    // Mock getBoundingClientRect for positioning tests
    const mockBoundingClientRect = (element, rect) => {
      element.getBoundingClientRect = vi.fn(() => rect);
    };

    beforeEach(() => {
      // Mock window dimensions
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 768,
      });
    });

    it('applies correct position classes', async () => {
      const user = userEvent.setup();
      
      const { rerender } = render(
        <Tooltip content="Test tooltip" position="top">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('top');

      // Test other positions
      rerender(
        <Tooltip content="Test tooltip" position="bottom">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(tooltip).toHaveClass('bottom');
    });
  });

  describe('Color Variants', () => {
    it('applies correct color classes', async () => {
      const user = userEvent.setup();
      
      const { rerender } = render(
        <Tooltip content="Test tooltip" color="primary">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('primary');

      // Test other colors
      rerender(
        <Tooltip content="Test tooltip" color="error">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(tooltip).toHaveClass('error');
    });
  });

  describe('Size Variants', () => {
    it('applies correct size classes', async () => {
      const user = userEvent.setup();
      
      const { rerender } = render(
        <Tooltip content="Test tooltip" size="large">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('large');

      // Test other sizes
      rerender(
        <Tooltip content="Test tooltip" size="small">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(tooltip).toHaveClass('small');
    });
  });

  describe('Interactive Tooltip', () => {
    it('keeps tooltip visible when hovering over interactive tooltip', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Interactive tooltip" interactive>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Hover over trigger
      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Interactive tooltip')).toBeInTheDocument();

      // Move from trigger to tooltip
      await user.unhover(screen.getByText('Test Button'));
      const tooltip = screen.getByRole('tooltip');
      await user.hover(tooltip);

      // Should still be visible
      expect(screen.getByText('Interactive tooltip')).toBeInTheDocument();
    });

    it('applies interactive class to interactive tooltips', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Interactive tooltip" interactive>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('interactive');
    });
  });

  describe('Multiline Content', () => {
    it('applies multiline class when multiline prop is true', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Multiline tooltip content" multiline>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('multiline');
    });

    it('renders rich content correctly', async () => {
      const user = userEvent.setup();
      
      const richContent = (
        <div>
          <strong>Rich Content</strong>
          <p>This is a paragraph</p>
        </div>
      );
      
      render(
        <Tooltip content={richContent} multiline>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Rich Content')).toBeInTheDocument();
      expect(screen.getByText('This is a paragraph')).toBeInTheDocument();
    });
  });

  describe('Arrow Display', () => {
    it('shows arrow by default', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      const arrow = tooltip.querySelector('.arrow');
      expect(arrow).toBeInTheDocument();
    });

    it('hides arrow when showArrow is false', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip" showArrow={false}>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      const arrow = tooltip.querySelector('.arrow');
      expect(arrow).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('does not show tooltip when disabled', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Disabled tooltip" disabled>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.queryByText('Disabled tooltip')).not.toBeInTheDocument();
    });

    it('does not show tooltip when content is empty', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('calls onShow when tooltip is shown', async () => {
      const user = userEvent.setup();
      const onShow = vi.fn();
      
      render(
        <Tooltip content="Test tooltip" onShow={onShow}>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(onShow).toHaveBeenCalledTimes(1);
    });

    it('calls onHide when tooltip is hidden', async () => {
      const user = userEvent.setup();
      const onHide = vi.fn();
      
      render(
        <Tooltip content="Test tooltip" onHide={onHide}>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Show tooltip
      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // Hide tooltip
      await user.unhover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(onHide).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom Class Names', () => {
    it('applies custom className to tooltip', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip" className="custom-tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('custom-tooltip');
    });
  });

  describe('Ref Handling', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef();
      
      render(
        <Tooltip content="Test tooltip" ref={ref}>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('handles function refs correctly', () => {
      let refElement = null;
      const setRef = (element) => {
        refElement = element;
      };
      
      render(
        <Tooltip content="Test tooltip" ref={setRef}>
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(refElement).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('role', 'tooltip');
    });

    it('is keyboard accessible with focus trigger', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Keyboard accessible" trigger="focus">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Should be able to focus with keyboard
      await user.tab();
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Keyboard accessible')).toBeInTheDocument();
      expect(screen.getByText('Test Button')).toHaveFocus();
    });
  });

  describe('Performance', () => {
    it('cleans up timers on unmount', () => {
      const { unmount } = render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Trigger tooltip show
      fireEvent.mouseEnter(screen.getByText('Test Button'));
      
      // Unmount before timeout completes
      unmount();
      
      // Advance timers - should not cause any errors
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // No assertions needed - test passes if no errors are thrown
    });

    it('cancels show timeout when hiding quickly', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip" delay="long">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Start hover
      await user.hover(screen.getByText('Test Button'));
      
      // Quickly unhover before delay completes
      await user.unhover(screen.getByText('Test Button'));
      
      // Advance full delay time
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Tooltip should not be visible
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid hover/unhover cycles gracefully', async () => {
      const user = userEvent.setup();
      
      render(
        <Tooltip content="Test tooltip">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      const button = screen.getByText('Test Button');

      // Rapid hover/unhover cycles
      for (let i = 0; i < 5; i++) {
        await user.hover(button);
        await user.unhover(button);
      }

      // Final hover and wait
      await user.hover(button);
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Test tooltip')).toBeInTheDocument();
    });

    it('handles component updates while tooltip is visible', async () => {
      const user = userEvent.setup();
      
      const { rerender } = render(
        <Tooltip content="Original content">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      // Show tooltip
      await user.hover(screen.getByText('Test Button'));
      act(() => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByText('Original content')).toBeInTheDocument();

      // Update content while visible
      rerender(
        <Tooltip content="Updated content">
          <TestButton>Test Button</TestButton>
        </Tooltip>
      );

      expect(screen.getByText('Updated content')).toBeInTheDocument();
      expect(screen.queryByText('Original content')).not.toBeInTheDocument();
    });
  });
});