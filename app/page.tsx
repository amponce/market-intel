import React from "react";
import Layout from "@/components/Layout";
import { load } from "outstatic/server";
import ContentGrid from "@/components/ContentGrid";
import markdownToHtml from "@/lib/markdownToHtml";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import DateFormatter from "@/components/DateFormatter";

const defaultImagePath = "/images/banners/jupiter-spaceship.png";

const renderArticles = (articles) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {articles.map((post) => (
      <Link key={post.slug} as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
        <div className="cursor-pointer project-card aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <div className="p-4">
            {Array.isArray(post?.tags)
              ? post.tags.map(({ label }) => (
                  <span
                    key={label}
                    className="inline-block bg-gray-100 rounded-full px-3 py-2 text-sm font-normal text-gray-700 mr-2 mb-4"
                  >
                    {label}
                  </span>
                ))
              : null}
            <p className="text-sm text-gray-500">
              <DateFormatter dateString={post.publishedAt} />{" "}
              {post.author ? post.author.name : ""}
            </p>
            <h3 className="text-lg mb-2 leading-snug font-semibold hover:underline">
              {post.title}
            </h3>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default async function Index() {
  const { content, allPosts } = await getData();

  const marketNewsArticles = allPosts.filter((post) =>
    post.tags?.some((tag) => tag.value === "market-news")
  );
  const latestArticles = allPosts.filter((post) =>
    post.tags?.some((tag) => tag.value === "latest")
  );
  const featuredArticles = allPosts.filter((post) =>
    post.tags?.some((tag) => tag.value === "featured")
  );
  const naturalGasArticles = allPosts.filter((post) =>
    post.tags?.some((tag) => tag.value === "natural-gas")
  );
  const carbonOffsetsArticles = allPosts.filter((post) =>
    post.tags?.some((tag) => tag.value === "carbon-offsets")
  );
  const remainingArticles = allPosts.filter(
    (post) =>
      !post.tags?.some(
        (tag) =>
          tag.value === "market-news" ||
          tag.value === "latest" ||
          tag.value === "featured" ||
          tag.value === "natural-gas" ||
          tag.value === "carbon-offsets"
      )
  );

  return (
    <Layout>
      <Header />
      <Hero />

      <div className="max-w-6xl mx-auto px-5">
        <section className="mt-16 mb-16 md:mb-12">
          <div
            className="prose lg:prose-2xl home-intro"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
        <div className="mb-32">
          {marketNewsArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Market News</h2>
              {renderArticles(marketNewsArticles)}
            </div>
          )}
          {latestArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
              <ContentGrid title="" items={latestArticles} collection="posts" />
            </div>
          )}
          {featuredArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Featured</h2>
              <ContentGrid
                title=""
                items={featuredArticles}
                collection="posts"
              />
            </div>
          )}
          {naturalGasArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Natural Gas</h2>
              <ContentGrid
                title="Carbon Offsets"
                items={naturalGasArticles}
                collection="posts"
              />
            </div>
          )}
          {carbonOffsetsArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Carbon Offsets</h2>
              <ContentGrid
                title=""
                items={carbonOffsetsArticles}
                collection="posts"
              />
            </div>
          )}
          {remainingArticles.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">All Articles</h2>
              <ContentGrid
                title=""
                items={remainingArticles}
                collection="posts"
              />
            </div>
          )}
        </div>

        {allPosts.length > 0 && (
          <ContentGrid
            title="Recent Articles"
            items={allPosts}
            collection="posts"
          />
        )}
      </div>
    </Layout>
  );
}
async function getData() {
  const db = await load();

  const page = await db
    .find({ collection: "pages", slug: "home" }, ["content"])
    .first();

  const content = await markdownToHtml(page.content);

  const allPosts = await db
    .find({ collection: "posts" }, [
      "title",
      "publishedAt",
      "slug",
      "coverImage",
      "description",
      "tags",
      "author",
    ])
    .sort({ publishedAt: -1 })
    .toArray();

  return {
    content,
    allPosts,
  };
}
