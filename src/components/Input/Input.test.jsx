import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Input from './Input';
import styles from './Input.module.css';

describe('Input', () => {
  it('renders input with label', () => {
    render(<Input label="Email" />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles controlled input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(<Input value="test" onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'ing');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('handles uncontrolled input', async () => {
    const user = userEvent.setup();
    
    render(<Input defaultValue="initial" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('initial');
    
    await user.clear(input);
    await user.type(input, 'new value');
    
    expect(input).toHaveValue('new value');
  });

  it('shows required indicator', () => {
    render(<Input label="Email" required />);
    
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('shows optional indicator when not required', () => {
    render(<Input label="Email" />);
    
    expect(screen.getByText('Optional')).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Input size="small" />);
    expect(screen.getByRole('textbox')).toHaveClass(styles.small);
    
    rerender(<Input size="large" />);
    expect(screen.getByRole('textbox')).toHaveClass(styles.large);
  });

  it('applies validation state classes', () => {
    const { rerender } = render(<Input state="error" />);
    expect(screen.getByRole('textbox')).toHaveClass(styles.error);
    
    rerender(<Input state="success" />);
    expect(screen.getByRole('textbox')).toHaveClass(styles.success);
    
    rerender(<Input state="warning" />);
    expect(screen.getByRole('textbox')).toHaveClass(styles.warning);
  });

  it('shows error text and sets aria-invalid', () => {
    render(<Input label="Email" errorText="Invalid email" />);
    
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows success text', () => {
    render(<Input label="Email" successText="Looks good!" />);
    
    expect(screen.getByText('Looks good!')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Input label="Email" helperText="Enter your email address" />);
    
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('prioritizes error text over other helper texts', () => {
    render(
      <Input 
        label="Email" 
        helperText="Helper" 
        successText="Success" 
        errorText="Error" 
      />
    );
    
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.queryByText('Success')).not.toBeInTheDocument();
  });

  it('renders with left icon', () => {
    const TestIcon = () => <span data-testid="test-icon">icon</span>;
    
    render(<Input leftIcon={<TestIcon />} />);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass(styles.hasLeftIcon);
  });

  it('renders with right icon', () => {
    const TestIcon = () => <span data-testid="test-icon">icon</span>;
    
    render(<Input rightIcon={<TestIcon />} />);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass(styles.hasRightIcon);
  });

  it('handles password type with toggle', async () => {
    const user = userEvent.setup();
    
    render(<Input type="password" label="Password" />);
    
    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByLabelText('Show password');
    
    expect(input).toHaveAttribute('type', 'password');
    
    await user.click(toggleButton);
    
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('shows character count when enabled', () => {
    render(
      <Input 
        maxLength={100} 
        showCharacterCount 
        defaultValue="Hello"
      />
    );
    
    const characterCount = screen.getByTestId('character-count');
    expect(characterCount).toHaveTextContent('5/100');
  });

  it('shows character count error when over limit', () => {
    render(
      <Input 
        maxLength={5} 
        showCharacterCount 
        defaultValue="This is too long"
      />
    );
    
    const characterCount = screen.getByTestId('character-count');
    expect(characterCount).toHaveTextContent('16/5');
    expect(characterCount).toHaveClass(styles.characterCountError);
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('placeholder', 'Disabled input');
  });

  it('handles readonly state', () => {
    render(<Input readOnly defaultValue="Read only" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveValue('Read only');
  });

  it('generates unique IDs when not provided', () => {
    render(
      <div>
        <Input label="First" />
        <Input label="Second" />
      </div>
    );
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveAttribute('id');
    expect(inputs[1]).toHaveAttribute('id');
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });

  it('uses provided ID', () => {
    render(<Input id="custom-id" label="Custom" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'custom-id');
  });

  it('links label and input correctly', () => {
    render(<Input id="test-input" label="Test Label" />);
    
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    
    const input = screen.getByRole('textbox');
    
    await user.click(input);
    expect(handleFocus).toHaveBeenCalled();
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    
    render(<Input ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    
    rerender(<Input type="number" />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number');
    
    rerender(<Input type="tel" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
  });

  it('sets aria-describedby correctly', () => {
    render(<Input label="Test" helperText="Helper text" />);
    
    const input = screen.getByRole('textbox');
    const helperTextId = input.getAttribute('aria-describedby');
    
    expect(helperTextId).toBeTruthy();
    expect(screen.getByText('Helper text')).toHaveAttribute('id', helperTextId);
  });
});