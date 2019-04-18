import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Grommet, Box, Heading } from "grommet";

import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <Grommet>
        <Box>
          <Box pad="small" background="dark-1">
            <Heading>{data.site.siteMetadata.title}</Heading>
            <Heading level={3}>{data.site.siteMetadata.description}</Heading>
          </Box>
        </Box>
        <Box pad="medium">
          {children}
        </Box>
      </Grommet>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
