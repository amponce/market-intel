import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { load } from 'outstatic/server';
import ContentGrid from '@/components/ContentGrid';
import markdownToHtml from '@/lib/markdownToHtml';
import Hero from '@/components/AlternateHero';
import ClientSideFiltering from '@/components/ClientSideFiltering';
import EnergyWidget from '@/components/EnergyWidget';

export default async function Index() {
  const { content, allPosts, allProducts } = await getData();

  return (
    <Layout>
      <Header />
      <Hero />
      <section>
        <div className="max-w-6xl mx-auto px-5">
          {/* HERO Section will go here */}

          <div
            className="prose lg:prose-2xl home-intro"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <EnergyWidget />

          {allProducts?.length > 0 && (
            <ClientSideFiltering initialProducts={allProducts} />
          )}
        </div>
      </section>
    </Layout>
  );
}

async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: 'pages', slug: 'home' }, ['content'])
    .first();

  const content = await markdownToHtml(page.content);

  const allPosts = await db
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

  const allProducts = await db // <-- Fetch products from DB
    .find({ collection: 'products' }, [
      'title',
      'slug',
      'coverImage',
      'tags',
      'productLink',
      'itemPrice',
      'ageRange',
      'affiliateSource',
    ])
    .sort({ publishedAt: -1 })
    .toArray();

  return {
    content,
    allProducts,
    allPosts,
  };
}
