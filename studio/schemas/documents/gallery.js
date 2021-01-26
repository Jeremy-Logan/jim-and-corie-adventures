export default {
  name: 'gallery',
  type: 'document',
  title: 'Gallery',
  fieldsets: [
    {
      title: 'SEO & metadata',
      name: 'metadata'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'image',
      type: 'figure',
      title: 'Image'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'This description populates meta-tags on the webpage',
      fieldset: 'metadata'
    },
    {
      name: 'gallerySection',
      title: 'Gallery Section',
      description:
        'This section is for photos from a specific trip which happened in the year of this gallery.',
      type: 'array',
      of: [{  type: 'gallerySection'  }],
      validation: Rule => Rule.required()
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image'
    }
  }
}
