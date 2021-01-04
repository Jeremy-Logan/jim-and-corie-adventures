export default {
	name: 'post',
	type: 'document',
	title: 'Post',
	fieldsets: [
		{
			title: 'SEO & metadata',
			name: 'metadata',
		},
	],
	fields: [
		{
			name: 'title',
			title: 'Year',
			type: 'string',
		},
		{
			name: 'places',
			title: 'Places',
			type: 'string',
		},
		{
			name: 'image',
			title: 'Cover Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
		},
		{
			name: 'gallerySection',
			title: 'Gallery Section',
			description:
				'This section is for photos from a specific trip which happened in the year of this gallery.',
			type: 'array',
			of: [{ type: 'gallerySection' }],
		},
	],
	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
	},
}
