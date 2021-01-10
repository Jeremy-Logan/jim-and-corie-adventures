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
            name: 'images',
            title: 'Image(s)',
            type: 'array',
            of: [{ type: 'figure' }]
        }
    ]
}
