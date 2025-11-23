import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
const postsDirectory = path.join(process.cwd(), 'content/blog');
export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  contentHtml: string;
}
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
}
export async function getAllPosts(): Promise<PostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      return {
        slug,
        ...(matterResult.data as {
          title: string;
          date: string;
          excerpt: string;
          coverImage?: string;
        }),
      };
    });
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    slug,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      date: string;
      excerpt: string;
      coverImage?: string;
    }),
  };
}