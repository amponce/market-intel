import Header from "@/components/Header";
import Layout from "@/components/Layout";
import markdownToHtml from "@/lib/markdownToHtml";
import { getDocumentSlugs, load } from "outstatic/server";
import Image from "next/image";
import ContentGrid from "@/components/ContentGrid";
import { OstDocument } from "outstatic";
import { Metadata } from "next";
import { absoluteUrl, formatCurrency } from "@/lib/utils";
import { AmazonEvent } from "@/components/AmazonEvent";

export type Product = {
  tags: { value: string; label: string }[];
  productLink?: string; // Optional based on your schema
  itemPrice?: number; // Optional based on your schema
  ageRange?: string; // Optional based on your schema
  affiliateSource?: string; // Optional based on your schema
} & OstDocument;

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata(params: Params): Promise<Metadata> {
  const { product } = await getData(params);

  if (!product) {
    return {};
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      type: "article",
      url: absoluteUrl(`/products/${product.slug}`),
      images: [
        {
          url: absoluteUrl(product?.coverImage || "/images/og-image.png"),
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: absoluteUrl(product?.coverImage || "/images/og-image.png"),
    },
  };
}

export default async function Product(params: Params) {
  const { product, moreProducts, content } = await getData(params);

  return (
    <Layout>
      <Header />
      <div className="mt-8 max-w-6xl mx-auto px-5">
        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative mb-2 md:mb-4 sm:mx-0 aspect-square border shadow">
              <div>
                {product.productLink && (
                  <a
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      alt={product.title}
                      src={product.coverImage ?? ""}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 768px) 347px, 192px"
                    />
                  </a>
                )}
              </div>
            </div>
            <div>
              <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
                {product.title}
              </h1>
              {product?.description ? (
                <div className="inline-block p-4 border mb-4 font-semibold text-lg rounded shadow">
                  {product.description}
                </div>
              ) : null}

              <div className="max-w-2xl mx-auto">
                <div
                  className="prose lg:prose-xl"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
              <div className="flex items-center justify-between mb-4 mt-8">
                <div>
                  {product.productLink && (
                    <a
                      href={product.productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
                    >
                      {Array.isArray(product.tags) &&
                      product.tags.find((tag) => tag.value === "amazon") ? (
                        <>
                          <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              ></path>
                            </svg>
                          </span>
                          <span className="relative">Get on Amazon</span>
                        </>
                      ) : (
                        <>
                          <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                          <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              ></path>
                            </svg>
                          </span>
                          <span className="relative">Add to cart</span>
                        </>
                      )}
                    </a>
                  )}

                  {product.itemPrice !== undefined && (
                    <span
                      className={`ml-4 py-2 px-4 no-underline rounded-full bg-gray-200 text-gray font-sans font-semibold text-sm hover:text-gray-900 hover:bg-gray-100 focus:outline-none active:shadow-none  `}
                    >
                      {formatCurrency(product.itemPrice ?? 0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
        <div className="mb-16">
          {moreProducts.length > 0 && (
            <ContentGrid
              title="Other Products"
              items={moreProducts}
              collection="products"
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

async function getData({ params }: Params) {
  const db = await load();
  const product = await db
    .find<Product>({ collection: "products", slug: params.slug }, [
      "title",
      "publishedAt",
      "description",
      "slug",
      "author",
      "content",
      "coverImage",
      "productLink", // New field
      "itemPrice", // New field
      "ageRange", // New field
      "affiliateSource", // New field
      "tags", // New field
    ])
    .first();

  const content = await markdownToHtml(product.content);

  const moreProducts = await db
    .find({ collection: "products", slug: { $ne: params.slug } }, [
      "title",
      "slug",
      "coverImage",
      "productLink", // New field
      "itemPrice", // New field
      "tags", // New field
      "ageRange", // New field
      "affiliateSource", // New field
    ])
    .toArray();

  return {
    product,
    content,
    moreProducts,
  };
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs("products");
  return posts.map((slug) => ({ slug }));
}
