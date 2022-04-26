export default {
	type: 'object',
	name: 'imageSection',
	title: 'Image With Caption',
	fields: [
		{
			name: 'heading',
			type: 'string',
			title: 'Heading',
		},
		{ name: 'caption', type: 'string', title: 'Caption' },
		{
			name: 'image',
			type: 'figure',
			title: 'Image',
		},
	],
	preview: {
		select: {
			heading: 'heading',
			subtitle: 'label',
			media: 'image',
		},
		prepare({ heading, media }) {
			return {
				title: `Image: ${heading}`,
				subtitle: 'Image section',
				media,
			}
		},
	},
}
