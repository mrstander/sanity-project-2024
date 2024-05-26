export const post = {
  name: 'banner',
  type: 'document',
  title: 'Banner',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'header',
      type: 'string',
      title: 'Header'
    },
    {
      name: 'mobileHeader',
      type: 'string',
      title: 'Mobile Header'
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
      name: 'poster',
      type: 'image',
      title: 'Poster',
      options: {
        hotspot: true
      }
    },
    {
      name: 'mobilePoster',
      type: 'image',
      title: 'Mobile Poster',
      options: {
        hotspot: true
      }
    },
    {
      name: 'posterUrl',
      type: 'url',
      title: 'Poster URL',
      description: 'URL to link the poster image to'
    },
    {
      name: 'copy',
      type: 'array',
      title: 'Copy',
      of: [{ type: 'block' }]
    },
    {
      name: 'textAlign',
      type: 'string',
      title: 'Text Alignment',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' }
        ]
      }
    },
    {
      name: 'ctaText',
      type: 'string',
      title: 'Button Title'
    },
    {
      name: 'ctaLink',
      type: 'url',
      title: 'Button Link'
    },
    {
      name: 'ctaBgColor',
      type: 'string',
      title: 'Button Background Color'
    },
    {
      name: 'mobileCtaBgColor',
      type: 'string',
      title: 'Mobile Button Background Color'
    },
    {
      name: 'position',
      type: 'number',
      title: 'Position',
      description: 'The position of the banner in the sequence',
      validation: (Rule: { required: () => { (): any; new(): any; integer: { (): { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().integer().min(1)
    }
  ]
};
