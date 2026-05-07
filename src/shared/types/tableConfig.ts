export interface TableColumnConfig {
  key: string;
  label: string;
  visible: boolean;
  align: 'left' | 'center' | 'right';
}

export interface TableConfig {
  module_id: string;
  columns: TableColumnConfig[];
}
