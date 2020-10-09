// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Task',
  templates: {
    StrapiBlog: '/blog-details/:id',
    project: '/project-details/:id'
  },
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: 'http://localhost:1337',
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['page', 'blog'],
        singleTypes: ['configuration', 'master'],
      },
    },
  ],
}
