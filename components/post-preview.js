import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  year,
  image,
  slug,
  places,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} places={places} url={image} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{places} <h3 className='text-lg'>{year}</h3></a>
        </Link>
      </h3>
    </div>
  )
}
