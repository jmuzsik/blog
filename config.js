'use strict';

module.exports = {
  url: 'https://lumen.netlify.com',
  pathPrefix: '/',
  title: 'Blog by Jerry Muzsik',
  subtitle: 'Clarity through poetry.',
  copyright: '',
  disqusShortname: 'fuzzduck-org',
  postsPerPage: 2,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'Stuff to consume later',
      path: '/pages/consume'
    },
    {
      label: 'Code to keep track of',
      path: '/pages/code'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Tags',
      path: '/tags'
    },
    {
      label: 'Categories',
      path: '/categories'
    }
  ],
  author: {
    name: 'Jerry Muzsik',
    photo: '/jerry-muzsik.jpg',
    bio: 'Writing for the thoughtful. Almost daily updates.',
    contacts: {
      email: 'jerrymuzsik@gmail.com',
      github: 'https://github.com/jMuzsik'
    }
  }
};
