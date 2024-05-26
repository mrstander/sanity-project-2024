export const page = { 
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'banners',
        title: 'Banners',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'banner' }] }],
      },
    ],
  };