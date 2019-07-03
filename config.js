'use strict';

module.exports = {
  url: 'https://lumen.netlify.com',
  pathPrefix: '/',
  title: 'Blog by Jerry Muzsik',
  subtitle: 'Clarity through poetry.',
  copyright: '© Do whatever you want with this licence.',
  postsPerPage: 4,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Contact me',
      path: '/pages/contact'
    }
  ],
  author: {
    name: 'Jerry Muzsik',
    photo: '/me.jpg',
    bio: 'Fuzzy duck',
    contacts: {
      email: 'jerrymuzsik@gmail.com',
      github: 'https://github.com/jMuzsik'
    }
  }
};
