import cn from 'classnames'
import Link from 'next/link'
import { imageBuilder } from '../lib/sanity'

export default function SliderImage({ alt, caption, url, slug }) {
	const image = (
		<img
		height={800}
			alt={`${alt}`}
			className={'justify-center ', cn('shadow-small', {
				'hover:shadow-medium transition-shadow duration-200': slug,
			})}
			src={imageBuilder.image(url).auto('format').height(800).url()}
		/>
	)

	return (
		<div className='sm:mx-0'>
				{image}
		</div>
	)
}