export type Post = {
  body: string;
  title: string;
  author: string;
  slug: string;
  imageUrl: string;
};

export type Posts = Array<Post>;
