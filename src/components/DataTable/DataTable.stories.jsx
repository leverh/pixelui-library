import DataTable from './DataTable';

export default {
  title: 'Components/Data/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'A modern, feature-rich data table component with gradient backgrounds, smooth animations, and premium micro-interactions. Perfect for displaying complex datasets with sorting, filtering, pagination, and selection capabilities.'
      }
    }
  },
  argTypes: {
    sortable: { 
      control: 'boolean',
      description: 'Enable column sorting with smooth animations'
    },
    filterable: { 
      control: 'boolean',
      description: 'Enable search/filter functionality'
    },
    paginated: { 
      control: 'boolean',
      description: 'Enable pagination controls'
    },
    selectable: { 
      control: 'boolean',
      description: 'Enable row selection with checkboxes'
    },
    loading: { 
      control: 'boolean',
      description: 'Show loading state with spinner'
    },
    pageSize: { 
      control: { type: 'number', min: 5, max: 50 },
      description: 'Number of rows per page'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Table size and spacing'
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual style variant'
    }
  }
};

// Sample data with more realistic content
const employeeData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    salary: 95000,
    hireDate: new Date('2021-03-15'),
    status: 'active',
    location: 'New York',
    performance: 4.8,
    projects: 12
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Design',
    role: 'UX Designer',
    salary: 78000,
    hireDate: new Date('2020-08-22'),
    status: 'active',
    location: 'San Francisco',
    performance: 4.6,
    projects: 8
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    salary: 82000,
    hireDate: new Date('2019-11-30'),
    status: 'active',
    location: 'Austin',
    performance: 4.9,
    projects: 15
  },
  {
    id: 4,
    name: 'David Park',
    email: 'david.park@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
    salary: 88000,
    hireDate: new Date('2022-01-10'),
    status: 'inactive',
    location: 'Seattle',
    performance: 4.3,
    projects: 6
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    department: 'Sales',
    role: 'Sales Director',
    salary: 105000,
    hireDate: new Date('2018-05-14'),
    status: 'active',
    location: 'Chicago',
    performance: 4.7,
    projects: 20
  },
  {
    id: 6,
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    department: 'Engineering',
    role: 'Junior Developer',
    salary: 65000,
    hireDate: new Date('2023-02-28'),
    status: 'pending',
    location: 'Remote',
    performance: 4.1,
    projects: 3
  },
  {
    id: 7,
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    department: 'HR',
    role: 'HR Manager',
    salary: 75000,
    hireDate: new Date('2020-09-15'),
    status: 'active',
    location: 'Miami',
    performance: 4.5,
    projects: 10
  },
  {
    id: 8,
    name: 'Robert Kim',
    email: 'robert.kim@company.com',
    department: 'Finance',
    role: 'Financial Analyst',
    salary: 68000,
    hireDate: new Date('2021-07-20'),
    status: 'active',
    location: 'Boston',
    performance: 4.4,
    projects: 7
  },
  {
    id: 9,
    name: 'Jennifer Lee',
    email: 'jennifer.lee@company.com',
    department: 'Design',
    role: 'Product Designer',
    salary: 85000,
    hireDate: new Date('2019-12-05'),
    status: 'inactive',
    location: 'Los Angeles',
    performance: 4.2,
    projects: 11
  },
  {
    id: 10,
    name: 'Alex Turner',
    email: 'alex.turner@company.com',
    department: 'Engineering',
    role: 'Tech Lead',
    salary: 115000,
    hireDate: new Date('2017-04-12'),
    status: 'active',
    location: 'Portland',
    performance: 4.9,
    projects: 25
  },
  {
    id: 11,
    name: 'Sophie Martinez',
    email: 'sophie.martinez@company.com',
    department: 'Product',
    role: 'Product Manager',
    salary: 92000,
    hireDate: new Date('2020-11-08'),
    status: 'active',
    location: 'Denver',
    performance: 4.6,
    projects: 14
  },
  {
    id: 12,
    name: 'Ryan O\'Connor',
    email: 'ryan.oconnor@company.com',
    department: 'Engineering',
    role: 'Full Stack Developer',
    salary: 89000,
    hireDate: new Date('2021-09-12'),
    status: 'active',
    location: 'Remote',
    performance: 4.4,
    projects: 9
  }
];

const productData = [
  {
    id: 'PRD-001',
    name: 'Wireless Headphones Pro',
    category: 'Electronics',
    price: 299.99,
    stock: 150,
    sku: 'WHP-PRO-001',
    supplier: 'TechCorp Inc.',
    rating: 4.8,
    status: 'active',
    lastUpdated: new Date('2024-01-15'),
    revenue: 44998.50
  },
  {
    id: 'PRD-002',
    name: 'Smart Fitness Watch',
    category: 'Wearables',
    price: 199.99,
    stock: 75,
    sku: 'SFW-002',
    supplier: 'FitTech Solutions',
    rating: 4.6,
    status: 'active',
    lastUpdated: new Date('2024-01-20'),
    revenue: 14999.25
  },
  {
    id: 'PRD-003',
    name: 'USB-C Hub 7-in-1',
    category: 'Accessories',
    price: 79.99,
    stock: 0,
    sku: 'UCH-7IN1-003',
    supplier: 'ConnectPlus',
    rating: 4.3,
    status: 'out_of_stock',
    lastUpdated: new Date('2024-01-18'),
    revenue: 0
  },
  {
    id: 'PRD-004',
    name: 'Mechanical Keyboard RGB',
    category: 'Computer Hardware',
    price: 159.99,
    stock: 200,
    sku: 'MKB-RGB-004',
    supplier: 'KeyMaster Ltd.',
    rating: 4.9,
    status: 'active',
    lastUpdated: new Date('2024-01-22'),
    revenue: 31998.00
  },
  {
    id: 'PRD-005',
    name: 'Wireless Mouse Ergonomic',
    category: 'Computer Hardware',
    price: 49.99,
    stock: 300,
    sku: 'WME-005',
    supplier: 'ErgoTech',
    rating: 4.4,
    status: 'active',
    lastUpdated: new Date('2024-01-19'),
    revenue: 14997.00
  },
  {
    id: 'PRD-006',
    name: 'Bluetooth Speaker Portable',
    category: 'Electronics',
    price: 89.99,
    stock: 45,
    sku: 'BSP-006',
    supplier: 'SoundWave Co.',
    rating: 4.2,
    status: 'low_stock',
    lastUpdated: new Date('2024-01-21'),
    revenue: 8999.10
  }
];

// Component helpers
const StatusBadge = ({ status }) => {
  const statusMap = {
    active: { className: 'statusActive', label: 'Active' },
    inactive: { className: 'statusInactive', label: 'Inactive' },
    pending: { className: 'statusPending', label: 'Pending' },
    out_of_stock: { className: 'statusOutOfStock', label: 'Out of Stock' },
    low_stock: { className: 'statusLowStock', label: 'Low Stock' }
  };

  const config = statusMap[status] || statusMap.active;
  
  return (
    <span className={`statusBadge ${config.className}`}>
      {config.label}
    </span>
  );
};

const ActionButtons = ({ onEdit, onDelete, onView }) => (
  <div className="tableActions">
    {onView && (
      <button 
        className="actionBtn view" 
        onClick={(e) => {
          e.stopPropagation();
          onView();
        }}
        title="View details"
      >
        👁️ View
      </button>
    )}
    {onEdit && (
      <button 
        className="actionBtn edit" 
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        title="Edit item"
      >
        ✏️ Edit
      </button>
    )}
    {onDelete && (
      <button 
        className="actionBtn delete" 
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete item"
      >
        🗑️ Delete
      </button>
    )}
  </div>
);

const PerformanceBar = ({ value, max = 5 }) => {
  const percentage = (value / max) * 100;
  const color = value >= 4.5 ? '#10b981' : value >= 4.0 ? '#f59e0b' : '#ef4444';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        width: '60px',
        height: '6px',
        backgroundColor: '#e5e7eb',
        borderRadius: '3px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '3px',
          transition: 'width 0.3s ease'
        }} />
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: '600', color }}>{value}</span>
    </div>
  );
};

const Avatar = ({ name, size = 32 }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: colors[colorIndex],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: size < 32 ? '10px' : '12px',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {initials}
    </div>
  );
};

// Column configurations
const employeeColumns = [
  {
    key: 'employee',
    title: 'Employee',
    width: '250px',
    render: (value, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar name={row.name} size={36} />
        <div>
          <div style={{ fontWeight: '600', fontSize: '14px' }}>{row.name}</div>
          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
            {row.email}
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'department',
    title: 'Department',
    width: '120px',
    render: (value) => (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
        color: '#0277bd'
      }}>
        {value}
      </span>
    )
  },
  {
    key: 'role',
    title: 'Role',
    width: '160px'
  },
  {
    key: 'salary',
    title: 'Salary',
    width: '120px',
    align: 'right',
    format: 'currency',
    render: (value) => (
      <span style={{ fontWeight: '600', color: '#059669' }}>
        ${value.toLocaleString()}
      </span>
    )
  },
  {
    key: 'performance',
    title: 'Performance',
    width: '120px',
    render: (value) => <PerformanceBar value={value} />
  },
  {
    key: 'hireDate',
    title: 'Hire Date',
    width: '120px',
    render: (value) => (
      <span style={{ fontSize: '13px' }}>
        {value.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })}
      </span>
    )
  },
  {
    key: 'status',
    title: 'Status',
    width: '100px',
    render: (value) => <StatusBadge status={value} />
  },
  {
    key: 'location',
    title: 'Location',
    width: '120px'
  },
  {
    key: 'actions',
    title: 'Actions',
    width: '140px',
    sortable: false,
    searchable: false,
    render: (value, row) => (
      <ActionButtons
        onView={() => console.log('👁️ View:', row.name)}
        onEdit={() => console.log('✏️ Edit:', row.name)}
        onDelete={() => console.log('🗑️ Delete:', row.name)}
      />
    )
  }
];

const productColumns = [
  {
    key: 'product',
    title: 'Product',
    width: '220px',
    render: (value, row) => (
      <div>
        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
          {row.name}
        </div>
        <div style={{ fontSize: '11px', color: '#6b7280' }}>
          SKU: {row.sku}
        </div>
      </div>
    )
  },
  {
    key: 'category',
    title: 'Category',
    width: '140px',
    render: (value) => (
      <span style={{
        padding: '4px 10px',
        borderRadius: '14px',
        fontSize: '11px',
        fontWeight: '600',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        color: '#92400e'
      }}>
        {value}
      </span>
    )
  },
  {
    key: 'price',
    title: 'Price',
    width: '100px',
    align: 'right',
    format: 'currency',
    render: (value) => (
      <span style={{ fontWeight: '600', fontSize: '14px' }}>
        ${value.toFixed(2)}
      </span>
    )
  },
  {
    key: 'stock',
    title: 'Stock',
    width: '80px',
    align: 'center',
    render: (value, row) => (
      <span style={{ 
        fontWeight: '700',
        fontSize: '14px',
        color: value === 0 ? '#dc2626' : value < 50 ? '#d97706' : '#059669'
      }}>
        {value}
      </span>
    )
  },
  {
    key: 'revenue',
    title: 'Revenue',
    width: '120px',
    align: 'right',
    render: (value) => (
      <span style={{ 
        fontWeight: '600', 
        color: value > 20000 ? '#059669' : value > 10000 ? '#d97706' : '#6b7280'
      }}>
        ${value.toLocaleString()}
      </span>
    )
  },
  {
    key: 'rating',
    title: 'Rating',
    width: '120px',
    render: (value) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ color: '#fbbf24', fontSize: '14px' }}>
          {'★'.repeat(Math.floor(value))}
          {'☆'.repeat(5 - Math.floor(value))}
        </span>
        <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '4px' }}>
          ({value})
        </span>
      </div>
    )
  },
  {
    key: 'status',
    title: 'Status',
    width: '120px',
    render: (value) => <StatusBadge status={value} />
  },
  {
    key: 'actions',
    title: 'Actions',
    width: '140px',
    sortable: false,
    searchable: false,
    render: (value, row) => (
      <ActionButtons
        onView={() => console.log('👁️ View Product:', row.name)}
        onEdit={() => console.log('✏️ Edit Product:', row.name)}
        onDelete={() => console.log('🗑️ Delete Product:', row.name)}
      />
    )
  }
];

// Basic story with clean data
export const Default = {
  args: {
    data: employeeData.slice(0, 5),
    columns: employeeColumns.slice(0, 6),
    sortable: true,
    filterable: true,
    paginated: false,
    size: 'md',
    variant: 'elevated'
  }
};

// Employee management table
export const EmployeeTable = () => (
  <DataTable
    data={employeeData}
    columns={employeeColumns}
    sortable={true}
    filterable={true}
    paginated={true}
    pageSize={6}
    selectable={true}
    size="md"
    variant="elevated"
    onRowClick={(row, index) => {
      console.log('🎯 Employee selected:', row.name);
      alert(`Employee Details:\n\nName: ${row.name}\nRole: ${row.role}\nDepartment: ${row.department}\nSalary: ${row.salary.toLocaleString()}\nPerformance: ${row.performance}/5.0`);
    }}
    onSelectionChange={(selected) => {
      console.log('📋 Selected employees:', selected.map(emp => emp.name));
    }}
    aria-label="Employee management table"
  />
);

// Product catalog table
export const ProductCatalog = () => (
  <DataTable
    data={productData}
    columns={productColumns}
    sortable={true}
    filterable={true}
    paginated={true}
    pageSize={5}
    selectable={true}
    size="md"
    variant="elevated"
    onRowClick={(row, index) => {
      console.log('🛍️ Product selected:', row.name);
      alert(`Product Details:\n\nName: ${row.name}\nPrice: ${row.price}\nStock: ${row.stock}\nRating: ${row.rating}/5.0\nRevenue: ${row.revenue.toLocaleString()}`);
    }}
    onSelectionChange={(selected) => {
      console.log('📦 Selected products:', selected.map(prod => prod.name));
      const totalValue = selected.reduce((sum, prod) => sum + (prod.price * prod.stock), 0);
      console.log('💰 Total inventory value:', `${totalValue.toLocaleString()}`);
    }}
    aria-label="Product catalog table"
  />
);

// Different table variants
export const TableVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Elevated Variant</h3>
      <DataTable
        data={employeeData.slice(0, 4)}
        columns={employeeColumns.slice(0, 5)}
        variant="elevated"
        paginated={false}
        filterable={false}
      />
    </div>
    
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Outlined Variant</h3>
      <DataTable
        data={employeeData.slice(0, 4)}
        columns={employeeColumns.slice(0, 5)}
        variant="outlined"
        paginated={false}
        filterable={false}
      />
    </div>
    
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Filled Variant</h3>
      <DataTable
        data={employeeData.slice(0, 4)}
        columns={employeeColumns.slice(0, 5)}
        variant="filled"
        paginated={false}
        filterable={false}
      />
    </div>
  </div>
);

// Different table sizes
export const TableSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Extra Large (XL)</h3>
      <DataTable
        data={employeeData.slice(0, 3)}
        columns={employeeColumns.slice(0, 4)}
        size="xl"
        paginated={false}
        filterable={false}
      />
    </div>
    
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Large (LG)</h3>
      <DataTable
        data={employeeData.slice(0, 3)}
        columns={employeeColumns.slice(0, 4)}
        size="lg"
        paginated={false}
        filterable={false}
      />
    </div>
    
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Medium (MD) - Default</h3>
      <DataTable
        data={employeeData.slice(0, 3)}
        columns={employeeColumns.slice(0, 4)}
        size="md"
        paginated={false}
        filterable={false}
      />
    </div>
    
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Small (SM)</h3>
      <DataTable
        data={employeeData.slice(0, 3)}
        columns={employeeColumns.slice(0, 4)}
        size="sm"
        paginated={false}
        filterable={false}
      />
    </div>
    
    <div>
      <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Extra Small (XS)</h3>
      <DataTable
        data={employeeData.slice(0, 3)}
        columns={employeeColumns.slice(0, 4)}
        size="xs"
        paginated={false}
        filterable={false}
      />
    </div>
  </div>
);

// Loading and empty states
export const LoadingState = () => (
  <DataTable
    data={[]}
    columns={employeeColumns}
    loading={true}
    aria-label="Loading employee data"
  />
);

export const EmptyState = () => (
  <DataTable
    data={[]}
    columns={employeeColumns}
    emptyMessage="No employees found. Try adjusting your search criteria or add new employees to get started."
    aria-label="Empty employee table"
  />
);

// Table
export const SimpleTable = () => (
  <DataTable
    data={employeeData.slice(0, 8)}
    columns={[
      { 
        key: 'name', 
        title: 'Employee Name', 
        width: '200px',
        render: (value, row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar name={value} size={24} />
            <span style={{ fontWeight: '500' }}>{value}</span>
          </div>
        )
      },
      { key: 'department', title: 'Department', width: '120px' },
      { key: 'role', title: 'Position', width: '150px' },
      { 
        key: 'salary', 
        title: 'Annual Salary', 
        align: 'right',
        render: (value) => (
          <span style={{ fontWeight: '600', color: '#059669' }}>
            ${value.toLocaleString()}
          </span>
        )
      },
      { 
        key: 'performance', 
        title: 'Rating', 
        width: '100px',
        render: (value) => <PerformanceBar value={value} />
      }
    ]}
    sortable={true}
    filterable={false}
    paginated={false}
    selectable={false}
    size="md"
    variant="outlined"
  />
);

// Interactive features demo
export const InteractiveFeatures = () => (
  <DataTable
    data={productData}
    columns={productColumns.slice(0, 7)}
    sortable={true}
    filterable={true}
    paginated={true}
    pageSize={4}
    selectable={true}
    size="md"
    variant="elevated"
    onRowClick={(row, index) => {
      console.log('🔍 Product clicked:', row.name);
      // Simulate navigation or modal opening
      const action = Math.random() > 0.5 ? 'Quick View' : 'Edit Product';
      alert(`${action}: ${row.name}\n\nClick detected at row ${index + 1}`);
    }}
    onSelectionChange={(selected) => {
      console.log('🎯 Selection changed:', selected.length, 'items');
      if (selected.length > 0) {
        const totalValue = selected.reduce((sum, item) => sum + item.price, 0);
        console.log('💰 Total value of selected items:', `${totalValue.toFixed(2)}`);
      }
    }}
    aria-label="Interactive product table"
  />
);

// Compact dashboard table
export const DashboardTable = () => (
  <DataTable
    data={employeeData.slice(0, 6)}
    columns={[
      {
        key: 'employee',
        title: 'Team Member',
        width: '180px',
        render: (value, row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar name={row.name} size={28} />
            <div>
              <div style={{ fontWeight: '600', fontSize: '12px' }}>{row.name}</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>{row.role}</div>
            </div>
          </div>
        )
      },
      { 
        key: 'projects', 
        title: 'Projects', 
        width: '80px', 
        align: 'center',
        render: (value) => (
          <span style={{ 
            fontWeight: '700', 
            color: value > 15 ? '#059669' : value > 10 ? '#d97706' : '#6b7280'
          }}>
            {value}
          </span>
        )
      },
      { 
        key: 'performance', 
        title: 'Score', 
        width: '100px',
        render: (value) => <PerformanceBar value={value} />
      },
      { 
        key: 'status', 
        title: 'Status', 
        width: '90px',
        render: (value) => <StatusBadge status={value} />
      }
    ]}
    sortable={true}
    filterable={false}
    paginated={false}
    selectable={false}
    size="sm"
    variant="filled"
    onRowClick={(row) => {
      console.log('👤 Team member selected:', row.name);
    }}
    aria-label="Team dashboard table"
  />
);

// Large dataset with pagination
export const LargeDataset = () => {
  // Generate more data for demonstration
  const largeDataset = Array.from({ length: 50 }, (_, i) => ({
    ...employeeData[i % employeeData.length],
    id: i + 1,
    name: `${employeeData[i % employeeData.length].name} ${i > 11 ? `(${Math.floor(i / 12) + 1})` : ''}`,
    email: `user${i + 1}@company.com`
  }));

  return (
    <DataTable
      data={largeDataset}
      columns={employeeColumns.slice(0, 7)}
      sortable={true}
      filterable={true}
      paginated={true}
      pageSize={8}
      selectable={true}
      size="md"
      variant="elevated"
      onSelectionChange={(selected) => {
        console.log(`📊 Selected ${selected.length} out of ${largeDataset.length} employees`);
      }}
      aria-label="Large employee dataset"
    />
  );
};

// Non-sortable table
export const NonSortable = () => (
  <DataTable
    data={productData.slice(0, 5)}
    columns={productColumns.slice(0, 6)}
    sortable={false}
    filterable={true}
    paginated={false}
    size="md"
    variant="outlined"
    aria-label="Non-sortable product table"
  />
);

// Playground
export const Playground = {
  args: {
    data: employeeData,
    columns: employeeColumns,
    sortable: true,
    filterable: true,
    paginated: true,
    pageSize: 6,
    selectable: true,
    loading: false,
    size: 'md',
    variant: 'elevated',
    emptyMessage: "No data available. Try adjusting your filters or adding new data.",
    onRowClick: (row, index) => {
      console.log('🎮 Playground row clicked:', row.name, 'at index', index);
      alert(`Playground Demo:\n\nYou clicked on ${row.name}\nDepartment: ${row.department}\nRole: ${row.role}`);
    },
    onSelectionChange: (selected) => {
      console.log('🎮 Playground selection:', selected.map(emp => emp.name));
      if (selected.length > 0) {
        console.log('💼 Selected departments:', [...new Set(selected.map(emp => emp.department))]);
      }
    }
  }
};