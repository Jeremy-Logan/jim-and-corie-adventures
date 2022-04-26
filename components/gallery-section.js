import { useState, useRef, useEffect } from 'react'
import GalleryImage from '../components/gallery-image'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'

import ImageGallery from 'react-image-gallery'

import { imageBuilder } from '../lib/sanity'

import OutsideClickHandler from 'react-outside-click-handler'

const ImageComponent = ({ value, isInline }) => {
	const { width, height } = getImageDimensions(value)
	return (
		<img
			src={imageBuilder
				.image(value)
				.width(isInline ? 100 : 700)
				.fit('max')
				.auto('format')
				.url()}
			alt={value.alt || ' '}
			loading='lazy'
			style={{
				// Display alongside text if image appears inside a block text span
				display: isInline ? 'inline-block' : 'block',

				// Avoid jumping around with aspect-ratio CSS property
				aspectRatio: width / height,
			}}
		/>
	)
}

const BlockComponent = {
	// Ex. 1: customizing common block types
	h1: ({ children }) => <h1 className='text-2xl'>{children}</h1>,
	blockquote: ({ children }) => (
		<blockquote className='border-l-purple-500'>{children}</blockquote>
	),

	// Ex. 2: rendering custom styles
	customHeading: ({ children }) => (
		<h2 className='text-lg text-primary text-purple-700'>{children}</h2>
	),
}

const ListComponent = {
	// Ex. 1: customizing common list types
	bullet: ({ children }) => <ul className='mt-xl'>{children}</ul>,
	number: ({ children }) => <ol className='mt-lg'>{children}</ol>,

	// Ex. 2: rendering custom lists
	checkmarks: ({ children }) => (
		<ol className='m-auto text-lg'>{children}</ol>
	),
}

const ListItemComponent = {
	// Ex. 1: customizing common list types
	bullet: ({ children }) => (
		<li style={{ listStyleType: 'disclosure-closed' }}>{children}</li>
	),

	// Ex. 2: rendering custom list items
	checkmarks: ({ children }) => <li>✅ {children}</li>,
}

const MarksComponent = {
	em: ({ children }) => (
		<em className='text-gray-600 font-semibold'>{children}</em>
	),
	link: ({ children, value }) => {
		const rel = !value.href.startsWith('/')
			? 'noreferrer noopener'
			: undefined
		return (
			<a href={value.href} rel={rel}>
				{children}
			</a>
		)
	},
}

const portableTextComponents = {
	block: {
		h1: ({ children }) => <h1 className='text-3xl'>{children}</h1>,
		h2: ({ children }) => <h2 className='text-2xl'>{children}</h2>,
		h3: ({ children }) => <h3 className='text-xl'>{children}</h3>,
		h4: ({ children }) => (
			<h4 className='text-lg font-semibold'>{children}</h4>
		),
		blockquote: ({ children }) => (
			<blockquote className='border-l-purple-700 text-gray-700 italic text-lg m-6'>"{children}"</blockquote>
		),
	},
	marks: {
		em: ({ children }) => (
			<em className='text-gray-600 font-semibold'>{children}</em>
		),
		link: ({ children, value }) => {
			const rel = !value.href.startsWith('/')
				? 'noreferrer noopener'
				: undefined
			return (
				<a
					className='text-blue-700 underline'
					href={value.href}
					rel={rel}>
					{children}
				</a>
			)
		},
	},
	list: {
		// Ex. 1: customizing common list types
		bullet: ({children}) => <ul className="mt-xl">{children}</ul>,
		number: ({children}) => <ol className="mt-lg">{children}</ol>,
	  },
	  listItem: {
		// Ex. 1: customizing common list types
		bullet: ({children}) => <li className='list-disc'>{children}</li>,
		number: ({children}) => <li className="list-decimal">{children}</li>,
	  },	
	types: {
		image: ImageComponent,
	},
}

export default function GallerySection({ section }) {
	const [currentImage, setCurrentImage] = useState(0)
	const [viewerIsOpen, setViewerIsOpen] = useState(false)

	const items = section.imageSection.map((item, index) => {
		return {
			original: imageBuilder
				.image(item.image)
				.auto('format')
				.height(800)
				.url(),
			thumbnail: imageBuilder
				.image(item.image)
				.auto('format')
				.height(800)
				.url(),
			description: item.caption,
			originalAlt: item.caption,
			originalTitle: item.heading,
			key: index,
		}
	})

	const refImg = useRef(null)

	useEffect(() => {
		let open = viewerIsOpen
		if (open) {
			refImg.current.slideToIndex(currentImage)
		}
	}, [viewerIsOpen])

	const openLightbox = (index) => {
		setCurrentImage(index), setViewerIsOpen(true)
	}

	const closeLightbox = () => {
		setCurrentImage(0)
		setViewerIsOpen(false)
	}

	return (
		<section>
			<>

					<div key={section.heading}>
						<h2 className='text-2xl md:text-4xl font-bold underline tracking-tight md:tracking-tighter leading-tight mb-8 mt-8'>
							{section.heading}
						</h2>
						<div className='max-w-[1000px]'>
						<PortableText
							value={section.description}
							components={portableTextComponents}
						/></div>
						<div className='grid gap-1 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-gap-4 lg:col-gap-8 row-gap-8 md:row-gap-4 lg:row-gap-8 mb-16 cursor-pointer mt-12'>
							{section.imageSection.map((image, index) => (
								<div
									onClick={() => openLightbox(index)}
									key={index}>
									<GalleryImage
										alt={image.alt}
										url={image.image}
									/>
								</div>
							))}
						</div>
					</div>

					{viewerIsOpen ? (
						<>
							<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full pointer-cursor'>
							
								<div className='relative my-6 mx-auto md:w-2/3'><OutsideClickHandler
											onOutsideClick={() => {
												setViewerIsOpen(false)
											}}>
									<div className='border-0 shadow-lg pt-10 pb-10 relative flex flex-col bg-black outline-none focus:outline-none text-white'>
									<button onClick={() => setViewerIsOpen(false)} className='text-lg font-bold text-right relative right-10'>X</button>
										
											<ImageGallery
												ref={refImg}
												items={items}
												showBullets='true'
											/>
										
									</div></OutsideClickHandler>
								</div>
							</div>
							<div className='opacity-60 fixed inset-0 z-40 bg-black'></div>
						</>
					) : null}
			
			</>
		</section>
	)
}
