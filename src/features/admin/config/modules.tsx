export interface RelationConfig {
  table: string; // Supabase table to fetch options from
  labelField: string; // field to display in the dropdown
  valueField?: string; // field to store as value — defaults to 'id'
}

export interface SubFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'url' | 'radio' | 'covertype' | 'socialplatform';
  placeholder?: string;
  options?: string[];
}

export interface SubRecordConfig {
  table: string; // Supabase table name (e.g. 'post_social_links')
  foreignKey: string; // FK column that points back to the parent (e.g. 'post_id')
  subFields: SubFieldConfig[];
}

export interface TabConfig {
  label: string;
  icon?: string;
  fields: FieldConfig[];
}

export interface FieldConfig {
  key: string;
  label: string;
  type:
    | 'text'
    | 'textarea'
    | 'url'
    | 'image'
    | 'images'
    | 'toggle'
    | 'checkbox'
    | 'tags'
    | 'multiinput'
    | 'structuredlist' // local array of objects stored as JSONB
    | 'subrecords' // related table rows edited inline, saved via FK
    | 'richtext'
    | 'radio'
    | 'select'
    | 'number'
    | 'covermedia'
    | 'resetpassword'
    | 'date';
  placeholder?: string;
  required?: boolean;
  span?: 'full' | 'half';
  options?: string[];
  relation?: RelationConfig;
  subFields?: SubFieldConfig[]; // used by structuredlist
  subRecordConfig?: SubRecordConfig; // used by subrecords
  storage?: 'supabase'; // upload via Supabase Storage instead of S3/Lambda
}

export interface ModuleConfig {
  id: string;
  table?: string; // Supabase table name — defaults to id when not set
  label: string;
  icon: string;
  imageField?: string;
  titleField: string;
  descriptionField?: string;
  tableColumns?: string[]; // extra column keys shown in CrudTable beyond title+description
  fields: FieldConfig[];
  tabs?: TabConfig[]; // when set, form renders with tabs instead of flat grid
}

/** Returns all fields across tabs (or flat fields for non-tabbed modules). */
export function getModuleFields(mod: ModuleConfig): FieldConfig[] {
  if (mod.tabs?.length) return mod.tabs.flatMap((t) => t.fields);
  return mod.fields;
}

export const MODULES: ModuleConfig[] = [
  {
    id: 'users',
    table: 'profiles',
    label: 'Users',
    icon: 'FaUsers',
    imageField: 'avatar_url',
    titleField: 'name',
    descriptionField: 'email',
    tableColumns: ['role', 'status'],
    fields: [
      {
        key: 'avatar_url',
        label: 'Avatar',
        type: 'image',
        span: 'full',
        storage: 'supabase',
      },
      {
        key: 'name',
        label: 'Full Name',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'phone',
        label: 'Phone',
        type: 'text',
        span: 'half',
        placeholder: '+1 555 000 0000',
      },
      {
        key: 'location',
        label: 'Location',
        type: 'text',
        span: 'half',
        placeholder: 'City, Country',
      },
      {
        key: 'website',
        label: 'Website',
        type: 'url',
        span: 'half',
        placeholder: 'https://...',
      },
      {
        key: 'role',
        label: 'Role',
        type: 'select',
        span: 'half',
        options: ['Super Admin', 'Admin', 'Editor', 'Viewer'],
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        span: 'half',
        options: ['Active', 'Inactive', 'Suspended'],
      },
      { key: 'bio', label: 'Bio', type: 'textarea', span: 'full' },
      {
        key: 'reset_password',
        label: 'Password Reset',
        type: 'resetpassword',
        span: 'full',
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'FaCogs',
    imageField: 'imageURL',
    titleField: 'title',
    descriptionField: 'description',
    tableColumns: ['sort_order'],
    fields: [
      { key: 'imageURL', label: 'Image', type: 'image', span: 'full' },
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'slug',
        label: 'Slug',
        type: 'text',
        required: true,
        span: 'half',
        placeholder: 'my-service',
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        span: 'full',
      },
      { key: 'icon', label: 'Icon Class', type: 'text', span: 'half' },
      {
        key: 'show_in_home',
        label: 'Show on Home Page',
        type: 'toggle',
        span: 'half',
      },
      {
        key: 'sort_order',
        label: 'Sort Order',
        type: 'number',
        span: 'half',
        placeholder: '0',
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'FaProjectDiagram',
    imageField: 'imageURL',
    titleField: 'title',
    descriptionField: 'description',
    tableColumns: ['sort_order', 'service_id'],
    fields: [
      { key: 'imageURL', label: 'Image', type: 'image', span: 'full' },
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'slug',
        label: 'Slug',
        type: 'text',
        required: true,
        span: 'half',
        placeholder: 'my-project',
      },
      {
        key: 'service_id',
        label: 'Service',
        type: 'select',
        span: 'half',
        relation: { table: 'services', labelField: 'title', valueField: 'id' },
      },
      {
        key: 'sort_order',
        label: 'Sort Order',
        type: 'number',
        span: 'half',
        placeholder: '0',
      },
      {
        key: 'tags',
        label: 'Tags (comma separated)',
        type: 'tags',
        span: 'half',
      },
      {
        key: 'description',
        label: 'Short Description',
        type: 'textarea',
        span: 'full',
      },
      {
        key: 'content',
        label: 'Full Content (HTML)',
        type: 'richtext',
        span: 'full',
      },
      {
        key: 'vedio_demo',
        label: 'Video Demo URL',
        type: 'url',
        span: 'full',
        placeholder: 'https://youtube.com/embed/...',
      },
      {
        key: 'extraImages',
        label: 'Extra Images (gallery)',
        type: 'images',
        span: 'full',
      },
      {
        key: 'is_top',
        label: 'Featured Project',
        type: 'toggle',
        span: 'half',
      },
    ],
  },
  {
    id: 'about',
    label: 'About Us',
    icon: 'FaInfoCircle',
    titleField: 'components',
    descriptionField: 'value',
    fields: [
      {
        key: 'components',
        label: 'Title',
        type: 'text',
        required: true,
        span: 'full',
      },
      {
        key: 'value',
        label: 'Description',
        type: 'textarea',
        required: true,
        span: 'full',
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Info',
    icon: 'FaEnvelope',
    titleField: 'title',
    descriptionField: 'value',
    fields: [
      {
        key: 'contact',
        label: 'Contact Type',
        type: 'text',
        required: true,
        span: 'half',
        placeholder: 'email / phone / address',
      },
      {
        key: 'title',
        label: 'Label',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'value',
        label: 'Value',
        type: 'text',
        required: true,
        span: 'full',
        placeholder: 'contact@example.com',
      },
    ],
  },
  {
    id: 'posts',
    label: 'Posts',
    icon: 'FaNewspaper',
    imageField: 'cover_image',
    titleField: 'title',
    descriptionField: 'description',
    tableColumns: ['sort_order', 'status', 'tags'],
    fields: [
      {
        key: 'cover_image',
        label: 'Cover Media',
        type: 'covermedia',
        span: 'full',
      },
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'slug',
        label: 'Slug',
        type: 'text',
        required: true,
        span: 'half',
        placeholder: 'my-post',
      },
      {
        key: 'status',
        label: 'Status',
        type: 'radio',
        span: 'half',
        options: ['draft', 'published', 'hidden'],
      },
      {
        key: 'sort_order',
        label: 'Sort Order',
        type: 'number',
        span: 'half',
        placeholder: '0',
      },
      {
        key: 'tags',
        label: 'Tags (comma separated)',
        type: 'tags',
        span: 'half',
      },
      {
        key: 'description',
        label: 'Meta Description (internal)',
        type: 'textarea',
        span: 'full',
      },
      {
        key: 'meta_title',
        label: 'SEO Title (optional override)',
        type: 'text',
        span: 'full',
      },
      { key: 'content', label: 'Full Content', type: 'richtext', span: 'full' },
      {
        key: 'social_links',
        label: 'Social Links',
        type: 'subrecords',
        span: 'full',
        subRecordConfig: {
          table: 'post_social_links',
          foreignKey: 'post_id',
          subFields: [
            { key: 'platform', label: 'Platform', type: 'socialplatform' },
            {
              key: 'url',
              label: 'URL',
              type: 'url',
              placeholder: 'https://...',
            },
          ],
        },
      },
      {
        key: 'additional_media',
        label: 'Additional Media',
        type: 'subrecords',
        span: 'full',
        subRecordConfig: {
          table: 'post_additional_media',
          foreignKey: 'post_id',
          subFields: [
            { key: 'type', label: 'Type', type: 'covertype' },
            {
              key: 'url',
              label: 'URL',
              type: 'url',
              placeholder: 'https://...',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'social',
    label: 'Social Links',
    icon: 'FaAddressBook',
    titleField: 'social_media',
    descriptionField: 'value',
    fields: [
      {
        key: 'social_media',
        label: 'Platform',
        type: 'text',
        required: true,
        span: 'half',
        placeholder: 'Linkedin / FaceBook / Instagram...',
      },
      {
        key: 'value',
        label: 'URL',
        type: 'url',
        required: true,
        span: 'half',
        placeholder: 'https://...',
      },
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: 'FaClipboardList',
    titleField: 'name',
    descriptionField: 'status',
    tableColumns: ['status', 'customer_id', 'final_value'],
    fields: [], // all fields live in tabs
    tabs: [
      {
        label: 'Overview',
        icon: 'FaInfoCircle',
        fields: [
          {
            key: 'name',
            label: 'Order Name',
            type: 'text',
            required: true,
            span: 'full',
          },
          {
            key: 'customer_id',
            label: 'Customer',
            type: 'select',
            span: 'half',
            relation: {
              table: 'customers',
              labelField: 'firstname',
              valueField: 'id',
            },
          },
          {
            key: 'project_id',
            label: 'Linked Project (optional)',
            type: 'select',
            span: 'half',
            relation: {
              table: 'projects',
              labelField: 'title',
              valueField: 'id',
            },
          },
          {
            key: 'service_id',
            label: 'Service Basis (optional)',
            type: 'select',
            span: 'half',
            relation: {
              table: 'services',
              labelField: 'title',
              valueField: 'id',
            },
          },
          {
            key: 'status',
            label: 'Status',
            type: 'select',
            span: 'half',
            options: [
              'todo',
              'in_process',
              'review',
              'pending',
              'complete',
              'delivered',
            ],
          },
          { key: 'due_date', label: 'Due Date', type: 'date', span: 'half' },
          {
            key: 'deliver_at',
            label: 'Delivered At',
            type: 'date',
            span: 'half',
          },
        ],
      },
      {
        label: 'Requirements',
        icon: 'FaFileAlt',
        fields: [
          {
            key: 'description',
            label: 'Summary',
            type: 'textarea',
            span: 'full',
          },
          {
            key: 'requirement',
            label: 'Requirements',
            type: 'richtext',
            span: 'full',
          },
        ],
      },
      {
        label: 'Financials',
        icon: 'FaDollarSign',
        fields: [
          {
            key: 'quotation_value',
            label: 'Quotation',
            type: 'number',
            span: 'half',
            placeholder: '0.00',
          },
          {
            key: 'discount',
            label: 'Discount',
            type: 'number',
            span: 'half',
            placeholder: '0.00',
          },
          {
            key: 'final_value',
            label: 'Final Value',
            type: 'number',
            span: 'half',
            placeholder: '0.00',
          },
          { key: 'notes', label: 'Notes', type: 'textarea', span: 'full' },
        ],
      },
      {
        label: 'Status Log',
        icon: 'FaHistory',
        fields: [
          {
            key: 'status_log',
            label: 'Status History',
            type: 'subrecords',
            span: 'full',
            subRecordConfig: {
              table: 'order_status_logs',
              foreignKey: 'order_id',
              subFields: [
                {
                  key: 'status',
                  label: 'Status',
                  type: 'radio',
                  options: [
                    'todo',
                    'in_process',
                    'review',
                    'pending',
                    'complete',
                    'delivered',
                  ],
                },
                {
                  key: 'note',
                  label: 'Note',
                  type: 'text',
                  placeholder: 'What changed?',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'FaUsers',
    titleField: 'firstname',
    descriptionField: 'email',
    tableColumns: ['mobile_num1', 'occupation'],
    fields: [
      {
        key: 'firstname',
        label: 'First Name',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'lastname',
        label: 'Last Name',
        type: 'text',
        required: true,
        span: 'half',
      },
      {
        key: 'email',
        label: 'Email',
        type: 'text',
        span: 'half',
        placeholder: 'customer@example.com',
      },
      {
        key: 'mobile_num1',
        label: 'Mobile 1',
        type: 'text',
        required: true,
        span: 'half',
        placeholder: '+1 555 000 0000',
      },
      {
        key: 'mobile_num2',
        label: 'Mobile 2',
        type: 'text',
        span: 'half',
        placeholder: '+1 555 000 0001',
      },
      { key: 'occupation', label: 'Occupation', type: 'text', span: 'half' },
      { key: 'work_place', label: 'Work Place', type: 'text', span: 'half' },
      { key: 'address', label: 'Address', type: 'textarea', span: 'full' },
    ],
  },
];
