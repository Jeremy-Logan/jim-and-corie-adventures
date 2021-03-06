import { useState, useCallback } from 'react'
import GalleryImage from '../components/gallery-image'
import SliderImage from '../components/slider-image'
import Carousel from 'nuka-carousel'
import { Modal, ModalGateway } from 'react-images'
import { imageBuilder } from '../lib/sanity'

export default function GallerySection({ section }) {
	// const items = images.map((section) => (
	// 	<GalleryImage
	// 		key={section.slug}
	// 		title={section.heading}
	// 		url={section.image.map((image) => image)}
	// 	/>
	// ))
	const [currentImage, setCurrentImage] = useState(0)
	const [viewerIsOpen, setViewerIsOpen] = useState(false)

	const openLightbox = useCallback((event) => {
		// setCurrentImage(index)
		setViewerIsOpen(true)
	}, [])

	const closeLightbox = () => {
		setCurrentImage(0)
		setViewerIsOpen(false)
	}

	return (
		<section>
			<>
				<div className='grid grid-cols-1 md:grid-cols-1 md:col-gap-16 lg:col-gap-32 row-gap-8 md:row-gap-10 mb-16'>
					<div key={section.heading}>
						<h2 className='text-2xl md:text-4xl font-bold underline tracking-tight md:tracking-tighter leading-tight mb-8 mt-8'>
							{section.heading}
						</h2>
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-gap-4 lg:col-gap-8 row-gap-8 md:row-gap-4 lg:row-gap-8 mb-16 cursor-pointer'>
							{section.images.map((image, index) => (
								<div onClick={openLightbox}>
									<GalleryImage
										key={image._key}
										alt={image.alt}
										url={image}
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
												className='p-1 ml-auto bg-transparent border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
												onClick={closeLightbox}>
												<span className='bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
													×
												</span>
											</button>
										</div>

										<Carousel
											width={'100%'}
											slidesToShow={1}
											heightMode={'current'}
											slideIndex={currentImage}>
											{section.images.map((image, i) => (
												<div className='justify-center'>
													<SliderImage
														key={image._key}
														alt={image.alt}
														url={image}
													/>
												</div>
											))}
										</Carousel>
									</div>
								</div>
							</div>
							<div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
						</>
					) : null}
				</div>
			</>
		</section>
	)
}
