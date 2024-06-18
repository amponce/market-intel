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

interface Tag {
  label: string; // Assuming each tag has at least a label property.
  value?: string; // Optionally include other properties, like 'value' if needed.
}
interface Author {
  name?: string; // Make 'name' optional if it can be undefined
  picture?: string; // Include this property if it's part of your data model
}
interface Article {
  slug: string;
  tags?: Tag[]; // Now Tag is properly defined.
  title: string; // Add all other used properties to avoid similar issues.
  publishedAt: string;
  author?: Author; // Assuming 'author' might be optional and has a 'name'.
}

const renderArticles = (articles: Article[]) => (
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
        {/* <!-- Will add back sections back later --> */}
        {allPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured</h2>
            <ContentGrid title="" items={allPosts} collection="posts" />
          </div>
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
