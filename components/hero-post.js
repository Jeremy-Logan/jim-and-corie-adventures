import CoverImage from '../components/cover-image'
import Link from 'next/link'

export default function HeroPost({
	year,
	image,
	slug,
	places,
}) {
	return (
		<section>
			<div className='relative mb-4 md:mb-8'>
				<CoverImage slug={slug} year={year} url={image} />
			
			<div className=' md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28'>
				<div>
					<h3 className=' mb-4 text-4xl lg:text-6xl leading-tight'>
						<Link as={`/posts/${slug}`} href='/posts/[slug]'>
							<a className='hover:underline'>{places} <h3 className='text-2xl'>{year}</h3></a>
						</Link>
					</h3>
				</div>
			
			</div>
			</div>
		</section>
	)
}
