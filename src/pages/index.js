import React, { Fragment } from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import SEO from '../components/SEO'
import Bio from '../components/Bio'
import Tag from '../components/Tag'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'
import tagUrl from '../utils/tag-url'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.posts.edges')
    const pages = get(this, 'props.data.pages.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet htmlAttributes={{ lang: 'en' }} />
        <SEO title={siteTitle} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '1em',
            justifyContent: 'space-around',
          }}
        >
          {pages.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug
            return (
              <Link
                key={node.fields.slug}
                style={{ boxShadow: 'none', marginBottom: rhythm(1 / 4) }}
                to={node.fields.slug}
              >
                {title}
              </Link>
            )
          })}
        </div>
        <Bio style={{ marginBottom: '0' }} />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div
              key={node.fields.slug}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small style={{ color: '#9da2b7' }}>
                {node.frontmatter.date}
              </small>
              {node.frontmatter.tags && node.frontmatter.tags.length ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '1em',
                  }}
                >
                  {node.frontmatter.tags.map(tag => (
                    <Link style={{ boxShadow: 'none' }} to={tagUrl(tag)}>
                      <Tag>{tag}</Tag>
                    </Link>
                  ))}
                </div>
              ) : null}
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "posts" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    pages: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "pages" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
