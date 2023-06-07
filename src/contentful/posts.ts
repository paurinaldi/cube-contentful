import { TypePostSkeleton } from "./types";
import { Entry } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";
import contentfulClient from "./contentfulClient";

type PostEntry = Entry<TypePostSkeleton, undefined, string>;

// Our simplified version of a BlogPost.
// We don't need all the data that Contentful gives us.
export interface Post {
  description: string;
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulBlogPost(postEntry?: PostEntry): Post | null {
  if (!postEntry) {
    return null;
  }

  return {
    description: postEntry.fields.postId || "",
  };
}

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchBlogPostsOptions {
  preview: boolean;
}
export async function fetchBlogPosts({
  preview,
}: FetchBlogPostsOptions): Promise<Post[]> {
  const contentful = contentfulClient({ preview });

  const blogPostsResult = await contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    include: 2,
    // order: ["fields.title"],
  });

  return blogPostsResult.items.map(
    (blogPostEntry) => parseContentfulBlogPost(blogPostEntry) as Post
  );
}

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
interface FetchBlogPostOptions {
  slug: string;
  preview: boolean;
}
export async function fetchBlogPost({
  slug,
  preview,
}: FetchBlogPostOptions): Promise<Post | null> {
  const contentful = contentfulClient({ preview });

  const blogPostsResult = await contentful.getEntries<TypePostSkeleton>({
    content_type: "post",
    // "fields.slug": slug,
    include: 2,
  });

  return parseContentfulBlogPost(blogPostsResult.items[0]);
}
