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
          }
        }
      }
    `}
    render={data => (
      <Grommet>
        <Box>
          <Box pad="small" background="dark-1">
            <Heading margin="small" level={3}>{data.site.siteMetadata.title}</Heading>
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
