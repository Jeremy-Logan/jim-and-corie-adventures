export default {
    type: 'object',
    name: 'gallerySection',
    title: 'Gallery Section',
    fields: [
        {
            name: 'heading',
            type: 'string',
            title: 'Heading'
        },
        {
            name: 'description',
            type: 'portableText',
            title: 'Description'
        },
        {
            name: 'imageSection',
            title: 'Image(s)',
            type: 'array',
            of: [{ type: 'imageSection' }],
            validation: Rule => Rule.required()
        }
    ]
}
