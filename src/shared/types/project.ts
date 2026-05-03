export type ProjectItem = {
  id: number;
  slug: string;
  title: string;
  imageURL: string;
  description: string;
  service: string;
  extraImages?: string[];
  content?: string;
  vedio_demo?: string;
  is_top?: boolean;
};
