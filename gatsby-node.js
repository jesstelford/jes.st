const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const tagUrl = require('./src/utils/tag-url');

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('./src/templates/blog-post.js')
    const pageTemplate = path.resolve('./src/templates/page.js')
    const tagTemplate = path.resolve('./src/templates/tag.js')
    resolve(
      graphql(
        `
          {
            posts: allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC },
              limit: 1000,
              filter: { fields: { collection: { eq: "posts" }}}
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                    date(formatString: "YYYY")
                  }
                }
              }
            }
            pages: allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC },
              limit: 1000,
              filter: { fields: { collection: { eq: "pages" }}}
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.posts.edges;

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;
          const slug = post.node.fields.slug;

          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug,
              previous,
              next,
            },
          })

          const year = post.node.frontmatter.date;

          console.log(`\nRedirect fom: /${year}${slug.replace(/\/$/, '')}, to: ${slug}\n`);

          // Redirect /2015/foo/ -> /foo/
          // NOTE: maintains trailing slash
          createRedirect({
            fromPath: `/${year}${slug}`,
            isPermanent: true,
            redirectInBrowser: true,
            toPath: slug,
          })

          // Redirect /2015/foo -> /foo/
          // NOTE: adds back in trailing slash
          createRedirect({
            fromPath: `/${year}${slug.replace(/\/$/, '')}`,
            isPermanent: true,
            redirectInBrowser: true,
            toPath: slug,
          })

        })

        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        _.each(posts, edge => {
          if (_.get(edge, "node.frontmatter.tags")) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags).filter(tag => tag);

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: tagUrl(tag),
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })

        // Create blog posts pages.
        const pages = result.data.pages.edges;

        _.each(pages, (page, index) => {
          createPage({
            path: page.node.fields.slug,
            component: pageTemplate,
            context: {
              slug: page.node.fields.slug,
            },
          })
        })
      })
    )
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (_.get(node, 'internal.type') === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // Get the parent node
    const parent = getNode(_.get(node, 'parent'))

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    // see: https://github.com/gatsbyjs/gatsby/issues/1634#issuecomment-388899348
    createNodeField({
      node,
      name: 'collection',
      value: _.get(parent, 'sourceInstanceName'),
    });
  }
}
