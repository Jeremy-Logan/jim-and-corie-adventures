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
			name: 'places',
			title: 'Places / Title',
			type: 'string',
		},
		{
			name: 'year',
			title: 'Year',
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
			options: {
				source: 'places',
				maxLength: 96,
			},
		},
		{
			name: 'gallerySection',
			title: 'Gallery Section',
			description:
				'This section is for photos from a specific trip which happened in the year of this gallery.',
			type: 'array',
			of: [{ type: 'gallerySection' }],
			validation: Rule => Rule.required()
		},
	],
	preview: {
		select: {
			title: 'places',
			media: 'image',
		},
	},
}
