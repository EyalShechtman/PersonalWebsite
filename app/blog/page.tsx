import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import BlogCard from '@/app/components/BlogCard';
export const metadata = {
  title: 'Blog',
};
export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}