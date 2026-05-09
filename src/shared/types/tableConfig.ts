export interface TableColumnConfig {
  key: string;
  label: string;
  visible?: boolean;   // default true — hide column without removing from config
  sortable?: boolean;  // default true
  order?: number;      // ascending display order
  width?: string;      // fixed pixel/rem width, e.g. "120px"
  align?: 'left' | 'center' | 'right';
}

export interface TableConfig {
  module_id: string;
  columns: TableColumnConfig[];
  page_size?: number;  // rows per page, default 20 — add column to table_config if needed
}
