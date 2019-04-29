import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Grommet, Box, Heading, DropButton, Text, Button } from "grommet";
import { CircleInformation, Share } from 'grommet-icons';

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
          <Box pad="xsmall" background="light-2" elevation="small" direction="row" overflow="none">
            <Heading margin="small" level={3}>{data.site.siteMetadata.title}</Heading>
            <DropButton
              icon={<CircleInformation />}
              dropContent={
                <Box width="50vw" pad="medium" gap="medium">
                  <Text>
                    This tool is a prototype for providing a diagnosis lookup to support PDPM
                    ICD-10 Mappings based on information provided by CMS
                  </Text>
                  <Button 
                    label="CMS Information" 
                    icon={<Share />} 
                    color="dark-4"
                    reverse
                    target="__blank"
                    href="https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/SNFPPS/PDPM.html"
                  />
                </Box>
              }
            />
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
