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
			title: 'Title',
			type: 'string',
		},
		{
			name: 'coverImage',
			title: 'Cover Image',
			type: 'image',
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
