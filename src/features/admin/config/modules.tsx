export interface RelationConfig {
  table: string; // Supabase table to fetch options from
  labelField: string; // field to display in the dropdown
  valueField?: string; // field to store as value — defaults to 'id'
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
    | 'richtext'
    | 'radio'
    | 'select';
  placeholder?: string;
  required?: boolean;
  span?: 'full' | 'half';
  options?: string[];
  relation?: RelationConfig; // when set on a 'select' field, options are fetched from Supabase
}

export interface ModuleConfig {
  id: string;
  label: string;
  icon: string;
  imageField?: string;
  titleField: string;
  descriptionField?: string;
  tableColumns?: string[]; // extra column keys shown in CrudTable beyond title+description
  fields: FieldConfig[];
}

export const MODULES: ModuleConfig[] = [
  {
    id: 'services',
    label: 'Services',
    icon: 'FaCogs',
    imageField: 'imageURL',
    titleField: 'title',
    descriptionField: 'description',
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
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'FaProjectDiagram',
    imageField: 'imageURL',
    titleField: 'title',
    descriptionField: 'description',
    tableColumns: ['service_id'],
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
];
