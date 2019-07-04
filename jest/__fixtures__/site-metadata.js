'use strict';

module.exports = {
  site: {
    siteMetadata: {
      url: 'http://localhost',
      title: 'Jerry Muzsik',
      subtitle: 'My blog and other assorted information',
      copyright: 'No copyright',
      postsPerPage: 4,
      menu: [
        {
          label: 'Test label 1',
          path: '/test/1/'
        },
        {
          label: 'Test label 2',
          path: '/test/2/'
        },
        {
          label: 'Test label 3',
          path: '/test/3/'
        }
      ],
      author: {
        name: 'Jerry Muzsik',
        photo: '/test.jpg',
        bio: 'Test bio',
        contacts: {
          email: '#',
          telegram: '#',
          twitter: '#',
          github: '#',
          rss: '#',
          vkontakte: '#'
        }
      }
    }
  }
};
