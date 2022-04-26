import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import GallerySection from '../../components/gallery-section'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'

export default function Post({ post, morePosts, preview }) {
	const router = useRouter()
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />
	}
	return (
		<Layout preview={preview}>
			<Container>
				<Header />
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article>
							<Head>
								<title>Jim and Corie in {post.places}</title>
								{/* <meta property="og:image" content={post.ogImage.url} /> */}
							</Head>
							<PostHeader date={post.year} places={post.places} image={post.image} />
							<div className='grid grid-cols-1 md:grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-8 md:row-gap-10 mb-16'>
							{ post.gallerySection.map((section, index) => <GallerySection key={index} section={section}/>)}</div>
						</article>
						<SectionSeparator />

						<MoreStories posts={morePosts} />
					</>
				)}
			</Container>
		</Layout>
	)
}

export async function getStaticProps({ params, preview = false }) {
	const data = await getPostAndMorePosts(params.slug, preview)
	return {
		props: {
			preview,
			post: data?.post || null,
			morePosts: data?.morePosts || null,
		},
	}
}

export async function getStaticPaths() {
	const allPosts = await getAllPostsWithSlug()
	return {
		paths:
			allPosts?.map((post) => ({
				params: {
					slug: post.slug,
				},
			})) || [],
		fallback: true,
	}
}
