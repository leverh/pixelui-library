import { useState } from 'react';
import Select from './Select';

export default {
  title: 'Components/Form/Select',
  component: Select,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A modern, accessible select component with search, multi-selection, and premium animations. Features glassmorphism effects, smooth micro-interactions, and comprehensive keyboard navigation.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'floating', 'glass'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Component size',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multi-selection with animated tags'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality with live filtering'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire component'
    },
    error: {
      control: 'boolean',
      description: 'Show error state with visual feedback'
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when value is selected'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner'
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required for forms'
    },
    maxHeight: {
      control: { type: 'range', min: 100, max: 500, step: 50 },
      description: 'Maximum dropdown height in pixels'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value selected'
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input'
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no options available'
    }
  },
};

// ===== SAMPLE DATA =====
const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mango', label: 'Mango' }
];

const teamOptions = [
  {
    value: 'john',
    label: 'John Doe',
    description: 'Senior Software Engineer • Full Stack',
    icon: '👨‍💻'
  },
  {
    value: 'jane',
    label: 'Jane Smith',
    description: 'Product Manager • Growth Team',
    icon: '👩‍💼'
  },
  {
    value: 'mike',
    label: 'Mike Johnson',
    description: 'UX Designer • Design Systems',
    icon: '🎨'
  },
  {
    value: 'sarah',
    label: 'Sarah Wilson',
    description: 'Data Scientist • Machine Learning',
    icon: '📊'
  },
  {
    value: 'david',
    label: 'David Brown',
    description: 'DevOps Engineer • Infrastructure',
    icon: '⚙️'
  },
  {
    value: 'lisa',
    label: 'Lisa Chen',
    description: 'Frontend Developer • React Specialist',
    icon: '💻'
  },
  {
    value: 'alex',
    label: 'Alex Rodriguez',
    description: 'Backend Developer • API Design',
    icon: '🔧'
  },
  {
    value: 'emma',
    label: 'Emma Taylor',
    description: 'QA Engineer • Test Automation',
    icon: '🧪'
  }
];

const countryOptions = [
  {
    value: 'us',
    label: 'United States',
    description: 'North America • Washington, D.C.',
    icon: '🇺🇸'
  },
  {
    value: 'uk',
    label: 'United Kingdom',
    description: 'Europe • London',
    icon: '🇬🇧'
  },
  {
    value: 'ca',
    label: 'Canada',
    description: 'North America • Ottawa',
    icon: '🇨🇦'
  },
  {
    value: 'au',
    label: 'Australia',
    description: 'Oceania • Canberra',
    icon: '🇦🇺'
  },
  {
    value: 'jp',
    label: 'Japan',
    description: 'Asia • Tokyo',
    icon: '🇯🇵'
  },
  {
    value: 'de',
    label: 'Germany',
    description: 'Europe • Berlin',
    icon: '🇩🇪'
  },
  {
    value: 'fr',
    label: 'France',
    description: 'Europe • Paris',
    icon: '🇫🇷'
  },
  {
    value: 'it',
    label: 'Italy',
    description: 'Europe • Rome',
    icon: '🇮🇹'
  },
  {
    value: 'es',
    label: 'Spain',
    description: 'Europe • Madrid',
    icon: '🇪🇸'
  },
  {
    value: 'br',
    label: 'Brazil',
    description: 'South America • Brasília',
    icon: '🇧🇷'
  }
];

const statusOptions = [
  {
    value: 'active',
    label: 'Active',
    description: 'Currently operational and available',
    icon: '🟢'
  },
  {
    value: 'pending',
    label: 'Pending',
    description: 'Awaiting approval or processing',
    icon: '🟡'
  },
  {
    value: 'inactive',
    label: 'Inactive',
    description: 'Temporarily disabled or suspended',
    icon: '🔴'
  },
  {
    value: 'maintenance',
    label: 'Maintenance',
    description: 'Under maintenance or updates',
    icon: '🔧'
  }
];

const technologyOptions = [
  {
    value: 'react',
    label: 'React',
    description: 'JavaScript library for building user interfaces',
    icon: '⚛️'
  },
  {
    value: 'vue',
    label: 'Vue.js',
    description: 'Progressive JavaScript framework',
    icon: '💚'
  },
  {
    value: 'angular',
    label: 'Angular',
    description: 'Platform for building mobile and desktop apps',
    icon: '🅰️'
  },
  {
    value: 'svelte',
    label: 'Svelte',
    description: 'Cybernetically enhanced web apps',
    icon: '🧡'
  },
  {
    value: 'nextjs',
    label: 'Next.js',
    description: 'React framework for production',
    icon: '▲'
  },
  {
    value: 'nuxt',
    label: 'Nuxt.js',
    description: 'Intuitive Vue framework',
    icon: '💚'
  }
];

const largeDataset = Array.from({ length: 100 }, (_, i) => ({
  value: `item-${i + 1}`,
  label: `Item ${i + 1}`,
  description: `This is a detailed description for item number ${i + 1}`,
  icon: ['📝', '📊', '📈', '📉', '📋', '📌', '📍', '📎'][i % 8]
}));

// ===== STORY WRAPPER =====
const SelectWrapper = ({ onValueChange, ...args }) => {
  const [value, setValue] = useState(args.value || null);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    onValueChange?.(newValue);
    console.log('Selected:', newValue);
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Select
        {...args}
        value={value}
        onChange={handleChange}
      />
      <div style={{ 
        marginTop: '1.5rem', 
        padding: '1rem', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        borderRadius: '0.75rem',
        fontSize: '0.875rem',
        color: '#64748b',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
          Selected Value:
        </div>
        <pre style={{ 
          margin: 0, 
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.8rem',
          lineHeight: '1.4',
          maxHeight: '120px',
          overflow: 'auto'
        }}>
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// ===== MAIN PLAYGROUND =====
export const Playground = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: teamOptions,
    placeholder: 'Select a team member...',
    searchPlaceholder: 'Search by name or role...',
    searchable: true,
    clearable: true,
    size: 'md',
    variant: 'default',
    maxHeight: 250,
  },
};

// ===== BASIC EXAMPLES =====
export const BasicUsage = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: basicOptions,
    placeholder: 'Choose your favorite fruit...',
    size: 'md',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple select with basic options. Click to open dropdown and select an option.'
      }
    }
  }
};

export const WithSearch = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: countryOptions,
    placeholder: 'Search and select country...',
    searchPlaceholder: 'Type to search countries...',
    searchable: true,
    clearable: true,
    size: 'md',
    variant: 'floating',
  },
  parameters: {
    docs: {
      description: {
        story: 'Searchable select with rich content including icons and descriptions. Try typing to filter options.'
      }
    }
  }
};

export const MultiSelect = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: teamOptions,
    placeholder: 'Select team members...',
    searchPlaceholder: 'Search team members...',
    searchable: true,
    multiple: true,
    clearable: true,
    size: 'md',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-selection with animated tags. Selected items appear as dismissible tags with smooth animations.'
      }
    }
  }
};

// ===== SIZE VARIATIONS =====
export const AllSizes = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '2rem', 
      maxWidth: '500px', 
      margin: '0 auto' 
    }}>
      {['xs', 'sm', 'md', 'lg', 'xl'].map(size => (
        <div key={size}>
          <div style={{ 
            marginBottom: '0.75rem', 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: '#374151',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Size: {size}
          </div>
          <SelectWrapper 
            options={basicOptions} 
            size={size} 
            placeholder={`${size.toUpperCase()} select component...`}
            clearable
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available size variations from extra small (xs) to extra large (xl).'
      }
    }
  }
};

// ===== VARIANT SHOWCASE =====
export const AllVariants = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem', 
      maxWidth: '1000px', 
      margin: '0 auto' 
    }}>
      {[
        { variant: 'default', title: 'Default', desc: 'Standard border with gradient background' },
        { variant: 'minimal', title: 'Minimal', desc: 'Clean, subtle styling' },
        { variant: 'floating', title: 'Floating', desc: 'Elevated with premium shadows' },
        { variant: 'glass', title: 'Glass', desc: 'Glassmorphism with blur effects' }
      ].map(({ variant, title, desc }) => (
        <div key={variant} style={{
          padding: '1.5rem',
          background: variant === 'glass' ? 
            'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' : 
            '#f8fafc',
          borderRadius: '1rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ 
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              margin: '0 0 0.25rem 0', 
              fontSize: '1.125rem', 
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {title}
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '0.875rem', 
              color: '#6b7280',
              lineHeight: '1.4'
            }}>
              {desc}
            </p>
          </div>
          <SelectWrapper 
            options={statusOptions} 
            variant={variant} 
            placeholder={`${title} variant...`}
            searchable
            clearable
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All visual variants showcasing different styling approaches and use cases.'
      }
    }
  }
};

// ===== INTERACTIVE STATES =====
export const InteractiveStates = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem', 
      maxWidth: '900px', 
      margin: '0 auto' 
    }}>
      {[
        { 
          title: '✨ Normal State', 
          props: { options: basicOptions, placeholder: 'Normal interactive state...' }
        },
        { 
          title: '🔴 Error State', 
          props: { options: basicOptions, placeholder: 'Field with validation error...', error: true }
        },
        { 
          title: '⏳ Loading State', 
          props: { options: [], placeholder: 'Loading options...', loading: true, disabled: true }
        },
        { 
          title: '🚫 Disabled State', 
          props: { options: basicOptions, placeholder: 'Disabled select...', disabled: true }
        },
        { 
          title: '📋 Required Field', 
          props: { options: basicOptions, placeholder: 'Required field...', required: true }
        },
        { 
          title: '🔍 Empty Results', 
          props: { 
            options: [], 
            placeholder: 'Search with no results...', 
            searchable: true,
            emptyMessage: '🔍 No items match your search'
          }
        }
      ].map(({ title, props }, index) => (
        <div key={index}>
          <div style={{ 
            marginBottom: '0.75rem', 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: '#374151'
          }}>
            {title}
          </div>
          <SelectWrapper {...props} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various interactive states including error, loading, disabled, and empty states.'
      }
    }
  }
};

// ===== REAL WORLD EXAMPLES =====
export const TechnologyStack = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: technologyOptions,
    placeholder: 'Select your tech stack...',
    searchPlaceholder: 'Search frameworks...',
    searchable: true,
    multiple: true,
    clearable: true,
    size: 'md',
    variant: 'floating',
    maxHeight: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: Technology stack selection with rich icons and descriptions.'
      }
    }
  }
};

export const TeamAssignment = {
  render: () => {
    const [assignee, setAssignee] = useState(null);
    const [reviewers, setReviewers] = useState([]);
    
    return (
      <div style={{ 
        maxWidth: '500px', 
        margin: '0 auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        borderRadius: '1rem',
        border: '1px solid #bae6fd'
      }}>
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            color: '#0f172a'
          }}>
            📋 Task Assignment
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Assign team members to tasks with multi-select
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              👤 Assignee
            </label>
            <Select
              options={teamOptions}
              value={assignee}
              onChange={setAssignee}
              placeholder="Select main assignee..."
              searchable
              clearable
              variant="floating"
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              👥 Reviewers
            </label>
            <Select
              options={teamOptions.filter(member => member.value !== assignee?.value)}
              value={reviewers}
              onChange={setReviewers}
              placeholder="Select reviewers..."
              searchable
              multiple
              clearable
              variant="floating"
              maxHeight={200}
            />
          </div>
        </div>
        
        {(assignee || reviewers.length > 0) && (
          <div style={{ 
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
              📝 Assignment Summary:
            </div>
            {assignee && (
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                <strong>Assignee:</strong> {assignee.label}
              </div>
            )}
            {reviewers.length > 0 && (
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                <strong>Reviewers:</strong> {reviewers.map(r => r.label).join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex real-world scenario with dependent selects and business logic.'
      }
    }
  }
};

// ===== PERFORMANCE DEMO =====
export const LargeDataset = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    options: largeDataset,
    placeholder: 'Search through 100 items...',
    searchPlaceholder: 'Type to filter items...',
    searchable: true,
    clearable: true,
    size: 'md',
    variant: 'default',
    maxHeight: 300,
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance test with 100 options. Search functionality helps narrow down results efficiently.'
      }
    }
  }
};

// ===== FORM INTEGRATION =====
export const FormIntegration = {
  render: () => {
    const [formData, setFormData] = useState({
      country: null,
      technologies: [],
      priority: null
    });
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      alert('Form submitted! Check console for data.');
    };
    
    return (
      <form onSubmit={handleSubmit} style={{ 
        maxWidth: '600px', 
        margin: '0 auto',
        padding: '2rem',
        background: 'linear-gradient(135deg, #fefbff 0%, #f3e8ff 100%)',
        borderRadius: '1rem',
        border: '1px solid #e9d5ff'
      }}>
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '1.5rem', 
            fontWeight: '700',
            color: '#0f172a'
          }}>
            📝 Project Setup Form
          </h2>
          <p style={{ 
            margin: 0, 
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Configure your new project settings
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              🌍 Country *
            </label>
            <Select
              name="country"
              options={countryOptions}
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              placeholder="Select your country..."
              searchable
              clearable
              required
              variant="glass"
              error={!formData.country}
              aria-label="Select country"
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              ⚡ Technologies
            </label>
            <Select
              name="technologies"
              options={technologyOptions}
              value={formData.technologies}
              onChange={(value) => setFormData(prev => ({ ...prev, technologies: value }))}
              placeholder="Select technologies..."
              searchable
              multiple
              clearable
              variant="glass"
              aria-label="Select technologies"
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem', 
              fontWeight: '600',
              color: '#374151'
            }}>
              🎯 Priority *
            </label>
            <Select
              name="priority"
              options={statusOptions}
              value={formData.priority}
              onChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              placeholder="Set priority level..."
              clearable
              required
              variant="glass"
              error={!formData.priority}
              aria-label="Select priority"
            />
          </div>
        </div>
        
        <div style={{ 
          marginTop: '2rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center'
        }}>
          <button
            type="button"
            onClick={() => setFormData({ country: null, technologies: [], priority: null })}
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.75rem',
              background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              color: '#374151',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={!formData.country || !formData.priority}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '0.75rem',
              background: formData.country && formData.priority ? 
                'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : 
                'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)',
              color: 'white',
              fontWeight: '600',
              cursor: formData.country && formData.priority ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              opacity: formData.country && formData.priority ? 1 : 0.6
            }}
          >
            Submit Project
          </button>
        </div>
        
        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '0.75rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
            📋 Form Data:
          </div>
          <pre style={{ 
            margin: 0, 
            fontSize: '0.75rem',
            color: '#6b7280',
            lineHeight: '1.4',
            maxHeight: '120px',
            overflow: 'auto'
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete form integration example with validation, required fields, and submission handling.'
      }
    }
  }
};

// ===== ACCESSIBILITY DEMO =====
export const AccessibilityShowcase = {
  render: () => (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto',
      padding: '2rem',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      borderRadius: '1rem',
      border: '1px solid #a7f3d0'
    }}>
      <div style={{ 
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.5rem', 
          fontWeight: '700',
          color: '#0f172a'
        }}>
          ♿ Accessibility Features
        </h2>
        <p style={{ 
          margin: 0, 
          color: '#064e3b',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}>
          Full keyboard navigation, screen reader support, and ARIA compliance
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: '#374151'
          }}>
            ⌨️ Keyboard Navigation Demo
          </label>
          <SelectWrapper
            options={teamOptions}
            placeholder="Tab to focus, Enter/Space to open, Arrow keys to navigate..."
            searchable
            clearable
            variant="floating"
            aria-label="Keyboard navigation example"
            aria-describedby="keyboard-help"
          />
          <div id="keyboard-help" style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280',
            marginTop: '0.5rem',
            lineHeight: '1.4'
          }}>
            Use Tab to focus, Enter/Space to open, Arrow keys to navigate, Enter to select, Escape to close
          </div>
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontSize: '0.875rem', 
            fontWeight: '600',
            color: '#374151'
          }}>
            🔊 Screen Reader Optimized
          </label>
          <SelectWrapper
            options={statusOptions}
            placeholder="Optimized for screen readers..."
            clearable
            variant="floating"
            aria-label="Status selection with screen reader optimization"
            aria-describedby="reader-help"
          />
          <div id="reader-help" style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280',
            marginTop: '0.5rem',
            lineHeight: '1.4'
          }}>
            Proper ARIA labels, live regions, and semantic markup for assistive technologies
          </div>
        </div>
      </div>
      
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '0.75rem',
        border: '1px solid #a7f3d0'
      }}>
        <div style={{ 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          marginBottom: '0.75rem', 
          color: '#065f46'
        }}>
          ✅ Accessibility Features:
        </div>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '1.25rem',
          fontSize: '0.8rem',
          color: '#047857',
          lineHeight: '1.6'
        }}>
          <li>Full keyboard navigation support</li>
          <li>ARIA labels and live regions</li>
          <li>Focus management and visual indicators</li>
          <li>Screen reader announcements</li>
          <li>High contrast mode support</li>
          <li>Reduced motion preferences</li>
          <li>Semantic HTML structure</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features including keyboard navigation, ARIA support, and screen reader optimization.'
      }
    }
  }
};