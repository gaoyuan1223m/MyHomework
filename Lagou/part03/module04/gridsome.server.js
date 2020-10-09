// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios')
const githubName = 'qimo090'

async function getFollowings (actions) {
  const collection = actions.addCollection('following')
  const { data } = await axios.get(`https://api.github.com/users/${githubName}/following`)
  if (data) {
    for (const item of data) {
      collection.addNode(item)
    }
  }
}

async function getFollowers (actions) {
  const collection = actions.addCollection('followers')
  let { data } = await axios.get(`https://api.github.com/users/${githubName}/followers`)
  if (!data || !data.length) {
    data = [{
      avatar_url: '',
      html_url: '',
      login: '',
      id: '-1',
    }]
  }
  if (data) {
    for (const item of data) {
      collection.addNode(item)
    }
  }
}

async function getUser (actions) {
  const collection = actions.addCollection('user')
  const { data } = await axios.get(`https://api.github.com/users/${githubName}`)
  if (data) {
    collection.addNode(data)
  }
}

async function getProjects (actions) {
  const collection = actions.addCollection('project')
  const { data } = await axios.get(`https://api.github.com/users/${githubName}/repos`)
  if (data && data) {
    for (const item of data) {
      collection.addNode(item)
    }
  }
}

module.exports = function (api) {
  api.loadSource(async (actions) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    await getFollowings(actions)
    await getFollowers(actions)
    await getUser(actions)
    await getProjects(actions)
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
