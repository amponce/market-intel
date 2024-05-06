// src/app/posts/page.tsx

import Header from '@/components/Header';
import Layout from '@/components/Layout';
import ContentGrid from '@/components/ContentGrid';
import markdownToHtml from '@/lib/markdownToHtml';
import BlogHero from '@/components/BlogHero';
import { load } from 'outstatic/server';
import '../styles/index.css';

interface Tag {
  value: string;
  label: string;
}

interface Post {
  title: string;
  publishedAt: string;
  slug: string;
  coverImage: string;
  description: string;
  tags: Tag[];
}

function isPost(object: any): object is Post {
  return (
    typeof object.title === 'string' &&
    typeof object.slug === 'string' &&
    typeof object.coverImage === 'string' &&
    typeof object.description === 'string' &&
    Array.isArray(object.tags) &&
    object.tags.every(
      (tag) => tag.hasOwnProperty('value') && tag.hasOwnProperty('label')
    )
  );
}

export default async function PostsPage() {
  const data = await fetchData();

  return (
    <Layout>
      <Header />
      <BlogHero />
      <div className="max-w-6xl mx-auto px-5">
        <section className="mt-16 mb-16 md:mb-12">
          <div
            className="prose lg:prose-xl home-intro"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </section>

        {data.allPosts && (
          <ContentGrid
            title="Posts"
            items={data.allPosts as any} // Proper type casting
            collection="posts"
            priority
          />
        )}
      </div>
    </Layout>
  );
}

async function fetchData() {
  const db = await load();

  const page = await db
    .find({ collection: 'pages', slug: 'posts' }, ['content'])
    .first();

  const content = page ? await markdownToHtml(page.content) : '';

  const postsData = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags',
    ])
    .sort({ publishedAt: -1 })
    .toArray();

  const allPosts = postsData.filter(isPost);

  return {
    content,
    allPosts,
  };
}
