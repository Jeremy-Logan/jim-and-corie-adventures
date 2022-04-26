import { useState, useRef, useEffect} from 'react'
import GalleryImage from '../components/gallery-image'
import {PortableText} from '@portabletext/react'

import ImageGallery from 'react-image-gallery'

import { imageBuilder } from '../lib/sanity'

import OutsideClickHandler from 'react-outside-click-handler'

const myPortableTextComponents = {
	types: {
	  image: ({value}) => <img src={value.imageUrl} />,
	  callToAction: ({value, isInline}) =>
		isInline ? (
		  <a href={value.url}>{value.text}</a>
		) : (
		  <div className="callToAction">{value.text}</div>
		),
	},
  
	marks: {
	  link: ({children, value}) => {
		const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
		return (
		  <a href={value.href} rel={rel}>
			{children}
		  </a>
		)
	  },
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
		refImg.current.slideToIndex(currentImage)}
		
	}, [viewerIsOpen])


	const openLightbox = (index) => {
		setCurrentImage(index),
		setViewerIsOpen(true)
	}

	const closeLightbox = () => {
		setCurrentImage(0)
		setViewerIsOpen(false)
	}

	return (
		<section>
			<>
				{console.log(items[0])}
				<div className='grid grid-cols-1 md:grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-8 md:row-gap-10 mb-16'>
					<div key={section.heading}>
						<h2 className='text-2xl md:text-4xl font-bold underline tracking-tight md:tracking-tighter leading-tight mb-8 mt-8'>
							{section.heading}
						</h2>
						<PortableText value={section.description} components={myPortableTextComponents} />
						<div className='grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-gap-4 lg:col-gap-8 row-gap-8 md:row-gap-4 lg:row-gap-8 mb-16 cursor-pointer'>
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
							<div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full'>
								<div className='relative my-6 mx-auto w-2/3'>
									<div className='border-0 shadow-lg relative flex flex-col bg-black outline-none focus:outline-none'>
										<div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t '>
											<button
												className='p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none z-50'
												onClick={closeLightbox}>
												<span className='bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none z-50'>
													×
												</span>
											</button>
										</div>
										<OutsideClickHandler
											onOutsideClick={() => {
												setViewerIsOpen(false)
											}}>
											<ImageGallery
												ref={refImg}
												items={items}
												showBullets='true'
												
											/>
										</OutsideClickHandler>
									</div>
								</div>
							</div>
							<div className='opacity-40 fixed inset-0 z-40 bg-black'></div>
						</>
					) : null}
				</div>
			</>
		</section>
	)
}
