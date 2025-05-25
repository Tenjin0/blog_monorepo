export type Post = {
  id: number;
  title: string;
  slug: string;
  author: User;
  content: string;
  thumbnail: string | null;
  published: boolean;
  authorId: number;
  tags?: Tag[];
  createdAt: Date;
  updatedAt: Date;
};

export type TMinUser = {
  name: string;
  id: number;
  avatar?: string;
}

export interface User extends TMinUser {
  email: string;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: string;
  name: string;
};

export type Comment = {
  id: number;
  content: string;
  post: Post;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};
