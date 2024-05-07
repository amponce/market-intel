import Image from "next/image";
import { Metadata } from "next";
import { OstDocument } from "outstatic";
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { getDocumentSlugs, load } from "outstatic/server";
import DateFormatter from "@/components/DateFormatter";
import { absoluteUrl } from "@/lib/utils";
import modifyHtmlContent from "@/lib/modifyHtmlContent";
import markdownToHtml from "@/lib/markdownToHtml";
import ContactForm from "@/components/ContactForm";
const defaultBanner = "/banners/aboutBanner-lg.jpg";

type SubPage = {
  tags: { value: string; label: string }[];
} & OstDocument;

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata(params: Params): Promise<Metadata> {
  const page = await getData(params);

  if (!page) {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
    };
  }
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "article",
      url: absoluteUrl(`/details/about`),
      images: [
        {
          url: absoluteUrl(page?.coverImage || defaultBanner),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: absoluteUrl(page?.coverImage || "/images/og-image.png"),
    },
  };
}

export default async function SubPage(params: Params) {
  const page = await getData(params);

  return (
    <Layout>
      <Header />
      <Hero />
      <div className="max-w-6xl mx-auto px-5">
        <section className="mt-16 mb-16 md:mb-12">
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: page?.content }}
          />
          {page?.tags?.find((tag) => tag?.value === "contact") ? (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-8">
              <ContactForm />
            </div>
          ) : null}
        </section>
      </div>
    </Layout>
  );
}

async function getData({ params }: Params) {
  const db = await load();

  const page = await db
    .find<SubPage>({ collection: "details", slug: params.slug }, [
      "title",
      "content",
      "tags",
      "coverImage",
      "tags",
    ])
    .first();

  const content = await markdownToHtml(page?.content);

  return {
    ...page,
    content,
  };
}

export async function generateStaticParams() {
  const slugs = getDocumentSlugs("details");
  return slugs.map((slug) => ({ slug }));
}
