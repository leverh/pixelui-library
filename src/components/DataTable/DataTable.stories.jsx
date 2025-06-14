import DataTable from './DataTable';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'A powerful, feature-rich data table component with sorting, filtering, pagination, and selection capabilities. Perfect for displaying complex datasets in business applications.'
      }
    }
  },
  argTypes: {
    sortable: { control: 'boolean' },
    filterable: { control: 'boolean' },
    paginated: { control: 'boolean' },
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
    pageSize: { control: { type: 'number', min: 5, max: 50 } },
  }
};

// Sample Employee Data
const employeeData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    salary: 95000,
    hireDate: '2021-03-15',
    status: 'active',
    location: 'New York'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Design',
    role: 'UX Designer',
    salary: 78000,
    hireDate: '2020-08-22',
    status: 'active',
    location: 'San Francisco'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    salary: 82000,
    hireDate: '2019-11-30',
    status: 'active',
    location: 'Austin'
  },
  {
    id: 4,
    name: 'David Park',
    email: 'david.park@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
    salary: 88000,
    hireDate: '2022-01-10',
    status: 'inactive',
    location: 'Seattle'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    department: 'Sales',
    role: 'Sales Director',
    salary: 105000,
    hireDate: '2018-05-14',
    status: 'active',
    location: 'Chicago'
  },
  {
    id: 6,
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    department: 'Engineering',
    role: 'Junior Developer',
    salary: 65000,
    hireDate: '2023-02-28',
    status: 'pending',
    location: 'Remote'
  },
  {
    id: 7,
    name: 'Maria Garcia',
    email: 'maria.garcia@company.com',
    department: 'HR',
    role: 'HR Manager',
    salary: 75000,
    hireDate: '2020-09-15',
    status: 'active',
    location: 'Miami'
  },
  {
    id: 8,
    name: 'Robert Kim',
    email: 'robert.kim@company.com',
    department: 'Finance',
    role: 'Financial Analyst',
    salary: 68000,
    hireDate: '2021-07-20',
    status: 'active',
    location: 'Boston'
  },
  {
    id: 9,
    name: 'Jennifer Lee',
    email: 'jennifer.lee@company.com',
    department: 'Design',
    role: 'Product Designer',
    salary: 85000,
    hireDate: '2019-12-05',
    status: 'inactive',
    location: 'Los Angeles'
  },
  {
    id: 10,
    name: 'Alex Turner',
    email: 'alex.turner@company.com',
    department: 'Engineering',
    role: 'Tech Lead',
    salary: 115000,
    hireDate: '2017-04-12',
    status: 'active',
    location: 'Portland'
  }
];

// Sample Product Data
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
    lastUpdated: '2024-01-15'
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
    lastUpdated: '2024-01-20'
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
    lastUpdated: '2024-01-18'
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
    lastUpdated: '2024-01-22'
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
    lastUpdated: '2024-01-19'
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
    lastUpdated: '2024-01-21'
  },
  {
    id: 'PRD-007',
    name: 'Phone Case Clear',
    category: 'Accessories',
    price: 24.99,
    stock: 500,
    sku: 'PCC-007',
    supplier: 'ProtectAll Inc.',
    rating: 4.0,
    status: 'active',
    lastUpdated: '2024-01-17'
  },
  {
    id: 'PRD-008',
    name: 'Laptop Stand Adjustable',
    category: 'Accessories',
    price: 69.99,
    stock: 120,
    sku: 'LSA-008',
    supplier: 'DeskPro Solutions',
    rating: 4.7,
    status: 'active',
    lastUpdated: '2024-01-16'
  }
];

// Helper components for rendering
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      case 'out_of_stock': return 'status-inactive';
      case 'low_stock': return 'status-pending';
      default: return 'status-active';
    }
  };

  return (
    <span className={`status-badge ${getStatusColor(status)}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="table-actions">
    <button className="action-btn edit" onClick={onEdit}>
      ✏️ Edit
    </button>
    <button className="action-btn delete" onClick={onDelete}>
      🗑️ Delete
    </button>
  </div>
);

const StarRating = ({ rating }) => {
  const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  return (
    <span title={`${rating}/5 stars`} style={{ color: '#fbbf24' }}>
      {stars} ({rating})
    </span>
  );
};

// Employee Table Columns
const employeeColumns = [
  {
    key: 'name',
    title: 'Name',
    width: '200px',
    render: (value, row) => (
      <div>
        <div style={{ fontWeight: 600 }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>{row.email}</div>
      </div>
    )
  },
  {
    key: 'department',
    title: 'Department',
    width: '120px'
  },
  {
    key: 'role',
    title: 'Role',
    width: '150px'
  },
  {
    key: 'salary',
    title: 'Salary',
    width: '100px',
    align: 'right',
    render: (value) => `$${value.toLocaleString()}`
  },
  {
    key: 'hireDate',
    title: 'Hire Date',
    width: '120px',
    render: (value) => new Date(value).toLocaleDateString()
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
    width: '120px',
    sortable: false,
    render: (value, row) => (
      <ActionButtons
        onEdit={() => alert(`Edit ${row.name}`)}
        onDelete={() => alert(`Delete ${row.name}`)}
      />
    )
  }
];

// Product Table Columns
const productColumns = [
  {
    key: 'name',
    title: 'Product',
    width: '200px',
    render: (value, row) => (
      <div>
        <div style={{ fontWeight: 600 }}>{value}</div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>SKU: {row.sku}</div>
      </div>
    )
  },
  {
    key: 'category',
    title: 'Category',
    width: '140px'
  },
  {
    key: 'price',
    title: 'Price',
    width: '100px',
    align: 'right',
    render: (value) => `$${value.toFixed(2)}`
  },
  {
    key: 'stock',
    title: 'Stock',
    width: '80px',
    align: 'center',
    render: (value, row) => (
      <span style={{ 
        color: value === 0 ? '#dc2626' : value < 50 ? '#d97706' : '#059669',
        fontWeight: 600 
      }}>
        {value}
      </span>
    )
  },
  {
    key: 'supplier',
    title: 'Supplier',
    width: '150px'
  },
  {
    key: 'rating',
    title: 'Rating',
    width: '120px',
    render: (value) => <StarRating rating={value} />
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
    width: '120px',
    sortable: false,
    render: (value, row) => (
      <ActionButtons
        onEdit={() => alert(`Edit ${row.name}`)}
        onDelete={() => alert(`Delete ${row.name}`)}
      />
    )
  }
];

// Stories
export const Default = {
  args: {
    data: employeeData.slice(0, 5),
    columns: employeeColumns.slice(0, 4),
    sortable: true,
    filterable: true,
    paginated: false
  }
};

export const EmployeeTable = () => (
  <DataTable
    data={employeeData}
    columns={employeeColumns}
    sortable={true}
    filterable={true}
    paginated={true}
    pageSize={5}
    selectable={true}
    onRowClick={(row) => alert(`Clicked on ${row.name}`)}
    onSelectionChange={(selected) => console.log('Selected employees:', selected)}
  />
);

export const ProductTable = () => (
  <DataTable
    data={productData}
    columns={productColumns}
    sortable={true}
    filterable={true}
    paginated={true}
    pageSize={6}
    selectable={true}
    onRowClick={(row) => alert(`Clicked on ${row.name}`)}
    onSelectionChange={(selected) => console.log('Selected products:', selected)}
  />
);

export const LoadingState = () => (
  <DataTable
    data={[]}
    columns={employeeColumns}
    loading={true}
  />
);

export const EmptyState = () => (
  <DataTable
    data={[]}
    columns={employeeColumns}
    emptyMessage="No employees found. Try adjusting your search criteria."
  />
);

export const SimpleTable = () => (
  <DataTable
    data={employeeData.slice(0, 6)}
    columns={[
      { key: 'name', title: 'Name', width: '200px' },
      { key: 'department', title: 'Department', width: '150px' },
      { key: 'role', title: 'Role', width: '180px' },
      { 
        key: 'salary', 
        title: 'Salary', 
        align: 'right',
        render: (value) => `$${value.toLocaleString()}` 
      }
    ]}
    sortable={true}
    filterable={false}
    paginated={false}
    selectable={false}
  />
);

export const NonSortableTable = () => (
  <DataTable
    data={productData.slice(0, 5)}
    columns={productColumns.slice(0, 5)}
    sortable={false}
    filterable={true}
    paginated={false}
  />
);

export const LargePagination = () => (
  <DataTable
    data={[...employeeData, ...employeeData, ...employeeData]} // 30 items
    columns={employeeColumns.slice(0, 6)}
    sortable={true}
    filterable={true}
    paginated={true}
    pageSize={8}
  />
);

export const CustomPageSize = () => (
  <DataTable
    data={productData}
    columns={productColumns.slice(0, 6)}
    sortable={true}
    filterable={true}
    paginated={true}
    pageSize={3}
  />
);

export const SelectableOnly = () => (
  <DataTable
    data={employeeData.slice(0, 6)}
    columns={employeeColumns.slice(0, 5)}
    sortable={false}
    filterable={false}
    paginated={false}
    selectable={true}
    onSelectionChange={(selected) => {
      alert(`Selected ${selected.length} employee(s)`);
    }}
  />
);

export const ClickableRows = () => (
  <DataTable
    data={productData.slice(0, 5)}
    columns={productColumns.slice(0, 6)}
    sortable={true}
    filterable={false}
    paginated={false}
    onRowClick={(row) => {
      alert(`You clicked on: ${row.name}\nPrice: $${row.price}\nStock: ${row.stock}`);
    }}
  />
);

// Interactive Playground
export const Playground = {
  args: {
    data: employeeData,
    columns: employeeColumns,
    sortable: true,
    filterable: true,
    paginated: true,
    pageSize: 5,
    selectable: true,
    loading: false,
    emptyMessage: "No data available"
  }
};