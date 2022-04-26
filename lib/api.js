import client, { previewClient } from './sanity'

const getUniquePosts = (posts) => {
  const slugs = new Set()
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false
    } else {
      slugs.add(post.slug)
      return true
    }
  })
}

const postFields = `
  name,
  title,
  places,
  year,
  excerpt,
  'slug': slug.current,
  'image': image.asset->url,
  gallerySection,
  imageSection,
  'imageHeading': imageSection.heading,
  figure,
  caption,
  heading,
`

const getClient = (preview) => (preview ? previewClient : client)

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(date desc){
      ${postFields}
      content
    }`,
    { slug }
  )
  return data[0]
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return data
}

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(date desc){
      ${postFields}
    }`)
  return getUniquePosts(results)
}

export async function getPostAndMorePosts(slug, preview) {
  const curClient = getClient(preview)
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug]  {
        ${postFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(date desc){
        ${postFields}
        content,
      }[0...20]`,
      { slug }
    ),
  ])
  return { post, morePosts: getUniquePosts(morePosts) }
}
