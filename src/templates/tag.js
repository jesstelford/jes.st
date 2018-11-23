import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Bio from '../components/Bio'
import get from 'lodash/get'

// Components
import { Link, graphql } from 'gatsby'

const Tag = ({ location, data, pageContext }) => {
  const { edges, totalCount } = data.allMarkdownRemark
  const siteTitle = get(data, 'site.siteMetadata.title')
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${pageContext.tag}"`
  const siteDescription = `${siteTitle} | ${get(
    this,
    'props.data.site.siteMetadata.description'
  )}`

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />

      <h1>{title}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { title } = node.frontmatter
          return (
            <li key={node.fields.slug}>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link style={{ boxShadow: 'none' }} to="/">
        All posts
      </Link>
      <Bio />
    </Layout>
  )
}

export default Tag

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
