export interface PageComponentConfig {
  type: string;
  label?: string;
  visible?: boolean;
  order?: number;
}

export interface PageConfig {
  module_id: string;
  components: PageComponentConfig[];
}

export const DEFAULT_PAGE_COMPONENTS: PageComponentConfig[] = [
  { type: 'table', label: 'Data Table', visible: true, order: 0 },
];
