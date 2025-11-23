import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
type Props = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Post not found',
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
  };
}
export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  return (
    <main className="container mx-auto px-5 py-12">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        {post.coverImage && (
          <div className="mb-8">
            <Image
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              width={1200}
              height={630}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </main>
  );
}
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}