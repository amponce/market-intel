import Layout from '../components/Layout'
import Head from 'next/head'
import { Document } from '../interfaces/document'
import { getDocumentBySlug, getDocuments } from 'outstatic/server'
import ContentGrid from '../components/ContentGrid'
import markdownToHtml from '../lib/markdownToHtml'
import {LogoPrimary} from '../components/Logo'
import Link from 'next/link'

type Props = {
  page: Document
  allPosts: Document[]
  allProjects: Document[]
}
// make back to rfpes link a button

export default function Index({ page, allPosts, allProjects }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>RFP Energy Solutions Market Intel</title>
        </Head>
        <div className="max-w-6xl mx-auto px-5">
          <Link href='https://rfpenergysolutions.com'>
            <LogoPrimary />
          </Link>
    
          <section className="mt-16 mb-16 md:mb-12">
            <div
              className="prose lg:prose-2xl home-intro"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </section>
          {allPosts.length > 0 && (
            <ContentGrid title="News & Market Intel" items={allPosts} collection="posts" />
          )}
          {allProjects.length > 0 && (
            <ContentGrid
              title="Projects"
              items={allProjects}
              collection="projects"
            />
          )}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const page = getDocumentBySlug('pages', 'home', ['content'])

  const allPosts = getDocuments('posts', [
    'title',
    'publishedAt',
    'slug',
    'coverImage',
    'description'
  ])

  const allProjects = getDocuments('projects', ['title', 'slug', 'coverImage'])

  const content = await markdownToHtml(page.content || '')

  return {
    props: { page: { content }, allPosts, allProjects }
  }
}
