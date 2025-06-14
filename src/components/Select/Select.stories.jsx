import { useState } from 'react';
import Select from './Select';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'floating'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    multiple: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    maxHeight: {
      control: 'number',
    },
  },
};

// Sample options data
const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const richOptions = [
  {
    value: 'user1',
    label: 'John Doe',
    description: 'Software Engineer',
    icon: '👨‍💻'
  },
  {
    value: 'user2',
    label: 'Jane Smith',
    description: 'Product Manager',
    icon: '👩‍💼'
  },
  {
    value: 'user3',
    label: 'Mike Johnson',
    description: 'UX Designer',
    icon: '🎨'
  },
  {
    value: 'user4',
    label: 'Sarah Wilson',
    description: 'Data Scientist',
    icon: '📊'
  },
  {
    value: 'user5',
    label: 'David Brown',
    description: 'DevOps Engineer',
    icon: '⚙️'
  },
];

const countryOptions = [
  {
    value: 'us',
    label: 'United States',
    description: 'North America',
    icon: '🇺🇸'
  },
  {
    value: 'uk',
    label: 'United Kingdom',
    description: 'Europe',
    icon: '🇬🇧'
  },
  {
    value: 'ca',
    label: 'Canada',
    description: 'North America',
    icon: '🇨🇦'
  },
  {
    value: 'au',
    label: 'Australia',
    description: 'Oceania',
    icon: '🇦🇺'
  },
  {
    value: 'jp',
    label: 'Japan',
    description: 'Asia',
    icon: '🇯🇵'
  },
  {
    value: 'de',
    label: 'Germany',
    description: 'Europe',
    icon: '🇩🇪'
  },
  {
    value: 'fr',
    label: 'France',
    description: 'Europe',
    icon: '🇫🇷'
  },
];

const largeOptions = Array.from({ length: 50 }, (_, i) => ({
  value: `option-${i + 1}`,
  label: `Option ${i + 1}`,
  description: `This is the description for option ${i + 1}`,
  icon: '📝'
}));

// Controlled component wrapper for stories
const SelectWrapper = (args) => {
  const [value, setValue] = useState(args.value || null);
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#f8fafc', 
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        color: '#64748b'
      }}>
        <strong>Selected value:</strong> {JSON.stringify(value, null, 2)}
      </div>
    </div>
  );
};

// Playground
export const Playground = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: richOptions,
    placeholder: 'Select a team member...',
    searchable: true,
    clearable: true,
    size: 'md',
    variant: 'default',
    maxHeight: 200,
  },
};

// Basic Select
export const Basic = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'Choose a fruit...',
    size: 'md',
    variant: 'default',
  },
};

// With Search
export const Searchable = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: countryOptions,
    placeholder: 'Search countries...',
    searchPlaceholder: 'Type to search...',
    searchable: true,
    clearable: true,
    size: 'md',
    variant: 'default',
  },
};

// Multi-Select
export const MultiSelect = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: richOptions,
    placeholder: 'Select team members...',
    searchable: true,
    multiple: true,
    clearable: true,
    size: 'md',
    variant: 'default',
  },
};

// Content with Icons and Descriptions
export const RichContent = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: countryOptions,
    placeholder: 'Select your country...',
    searchable: true,
    clearable: true,
    size: 'md',
    variant: 'floating',
  },
};

// Different Sizes
export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Small</h3>
        <SelectWrapper options={basicOptions} size="sm" placeholder="Small select..." />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Medium</h3>
        <SelectWrapper options={basicOptions} size="md" placeholder="Medium select..." />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Large</h3>
        <SelectWrapper options={basicOptions} size="lg" placeholder="Large select..." />
      </div>
    </div>
  ),
};

// Different Variants
export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Default</h3>
        <SelectWrapper options={richOptions} variant="default" placeholder="Default variant..." searchable clearable />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Minimal</h3>
        <SelectWrapper options={richOptions} variant="minimal" placeholder="Minimal variant..." searchable clearable />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Floating</h3>
        <SelectWrapper options={richOptions} variant="floating" placeholder="Floating variant..." searchable clearable />
      </div>
    </div>
  ),
};

// Large Dataset
export const LargeDataset = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: largeOptions,
    placeholder: 'Search through 50 options...',
    searchable: true,
    clearable: true,
    size: 'md',
    variant: 'default',
    maxHeight: 250,
  },
};

// With Loading State
export const Loading = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: [],
    placeholder: 'Loading options...',
    loading: true,
    disabled: true,
    size: 'md',
    variant: 'default',
  },
};

// Error State
export const ErrorState = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'This field has an error...',
    error: true,
    size: 'md',
    variant: 'default',
  },
};

// Disabled State
export const Disabled = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'This select is disabled...',
    disabled: true,
    size: 'md',
    variant: 'default',
  },
};

// Pre-selected Values
export const PreSelected = {
  render: () => {
    const [singleValue, setSingleValue] = useState(basicOptions[2]);
    const [multiValue, setMultiValue] = useState([richOptions[0], richOptions[2]]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Single Pre-selected</h3>
          <Select
            options={basicOptions}
            value={singleValue}
            onChange={setSingleValue}
            clearable
            placeholder="Choose a fruit..."
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Multi Pre-selected</h3>
          <Select
            options={richOptions}
            value={multiValue}
            onChange={setMultiValue}
            multiple
            searchable
            clearable
            placeholder="Select team members..."
          />
        </div>
      </div>
    );
  },
};

// Empty Message
export const CustomEmpty = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: [],
    placeholder: 'Search for something...',
    searchable: true,
    emptyMessage: '🔍 No results found. Try a different search term.',
    size: 'md',
    variant: 'default',
  },
};