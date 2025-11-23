import Link from 'next/link';
import Image from 'next/image';
interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string;
  };
}
const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      {post.coverImage && (
        <Image
          className="w-full h-48 object-cover"
          src={post.coverImage}
          alt={`Cover image for ${post.title}`}
          width={400}
          height={200}
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
          <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            {post.title}
          </Link>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
          {post.excerpt}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <Link href={`/blog/${post.slug}`} className="text-blue-500 dark:text-blue-400 hover:underline">
          Read More
        </Link>
      </div>
    </div>
  );
};
export default BlogCard;