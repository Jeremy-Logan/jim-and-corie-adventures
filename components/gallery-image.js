import cn from 'classnames'
import Link from 'next/link'
import { imageBuilder } from '../lib/sanity'

export default function GalleryImage({ alt,  url,  }) {
	const image = (
		<img
			width={1000}
			height={500}
			alt={`${alt}`}
			className='shadow-small hover:shadow-medium transition-shadow duration-200'
			src={imageBuilder.image(url).height(500).width(1000).url()}
		/>
	)

	return (
		<div className='sm:mx-0'>
				{image}
		</div>
	)
}
