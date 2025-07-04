export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: Date;
  content: string;
  imageUrl?: string;
}