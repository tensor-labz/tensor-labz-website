export type ProjectItem = {
  id: string;
  slug: string; // = Firestore doc id (echoed so existing /project/:id links work)
  title: string;
  imageURL: string;
  description: string;
  service: string; // service doc-id (reference resolved to id)
  tags?: string[];
  additional_media?: { url: string; type: string }[];
  content?: string;
  is_top?: boolean;
};
