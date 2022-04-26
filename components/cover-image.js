import cn from 'classnames'
import Link from 'next/link'
import { imageBuilder } from '../lib/sanity'

export default function CoverImage({ places, url, slug }) {
  const image = (
    <img
      width={800}
      height={800}
      alt={`Cover Image for ${places}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={imageBuilder.image(url).height(800).width(800).url()}
    />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={places}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
