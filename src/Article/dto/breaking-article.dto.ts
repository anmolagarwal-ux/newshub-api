export class BreakingArticleDto {
  id?: number;
  title?: string;
  slug?: string;
  short_description?: string;
  content?: string;
  featured_image?: string;
  category_id?: number;
  author_id?: number;
  status_id?: number;
  is_featured?: boolean;
  is_breaking?: boolean;
}
