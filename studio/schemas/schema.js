// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Document types
import page from './documents/page';
import route from './documents/route';
import siteConfig from './documents/siteConfig';
import gallery from './documents/gallery';
import post from './documents/post';


// Object types
import cta from './objects/cta';
import embedHTML from './objects/embedHTML';
import figure from './objects/figure';
import internalLink from './objects/internalLink';
import link from './objects/link';
import portableText from './objects/portableText';
import simplePortableText from './objects/simplePortableText';

// Landing page sections
import hero from './objects/hero';
import imageSection from './objects/imageSection';
import mailchimp from './objects/mailchimp';
import textSection from './objects/textSection';
import gallerySection from './objects/gallerySection';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    cta,
    embedHTML,
    figure,
    hero,
    imageSection,
    internalLink,
    link,
    mailchimp,
    page,
    portableText,
    route,
    simplePortableText,
    siteConfig,
    textSection,
    gallerySection,
    gallery,
    post

    // {
    //   name: 'post',
    //   type: 'document',
    //   title: 'Post',
    //   fields: [
    //     {
    //       name: 'title',
    //       title: 'Title',
    //       type: 'string',
    //     },
    //     {
    //       name: 'content',
    //       title: 'Content',
    //       type: 'array',
    //       of: [{ type: 'block' }],
    //     },
    //     {
    //       name: 'excerpt',
    //       title: 'Excerpt',
    //       type: 'string',
    //     },
    //     {
    //       name: 'coverImage',
    //       title: 'Cover Image',
    //       type: 'image',
    //     },
    //     {
    //       name: 'date',
    //       title: 'Date',
    //       type: 'datetime',
    //     },
    //     {
    //       name: 'author',
    //       title: 'Author',
    //       type: 'reference',
    //       to: [{ type: 'author' }],
    //     },
    //     {
    //       name: 'slug',
    //       title: 'Slug',
    //       type: 'slug',
    //     },],},
  ]),
});
