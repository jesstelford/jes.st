import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import SEO from '../components/SEO'
import Tag from '../components/Tag'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm, scale } from '../utils/typography'
import tagUrl from '../utils/tag-url'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const siteDescription = post.excerpt
    const slug = get(this.props, 'post.fields.slug')
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet htmlAttributes={{ lang: 'en' }} />
        <SEO
          title={post.frontmatter.title}
          description={siteDescription}
          pathname={slug}
          article
          tags={post.frontmatter.tags}
          date={post.frontmatter.isoDate}
        />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        {post.frontmatter.tags && post.frontmatter.tags.length ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '1em',
            }}
          >
            {post.frontmatter.tags.map(tag => (
              <Link style={{ boxShadow: 'none' }} to={tagUrl(tag)}>
                <Tag>{tag}</Tag>
              </Link>
            ))}
          </div>
        ) : null}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio title="Jess Telford" />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        isoDate: date
        tags
      }
    }
  }
`
