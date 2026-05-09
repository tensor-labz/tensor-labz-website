export interface TableColumnConfig {
  field: string;           // DB column key
  title: string;           // column header display name
  visible?: boolean;       // default true
  sortable?: boolean;      // default true
  order?: number;          // ascending display order
  width?: string;          // fixed CSS width e.g. "120px"
  height?: string;         // fixed row/cell height e.g. "48px"
  align?: 'left' | 'center' | 'right';
  link?: string;           // URL template — use ${fieldName} for dynamic row values, e.g. /admin/services/${service_id}
}

export interface TableConfig {
  module_id: string;
  columns: TableColumnConfig[];
  page_size?: number;
}
