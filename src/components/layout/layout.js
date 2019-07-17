import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Grommet, Box, Heading, DropButton } from "grommet";
import { grommet } from 'grommet/themes';
import { deepMerge } from "grommet/utils";
import { CircleInformation } from 'grommet-icons';

import { css } from "styled-components";
import "./layout.css"
import HelpInfo from "../help-info";

const checkboxCheckStyle = css`
  background-color: #77BC1F;
  border-color: #77BC1F;
`;

const customToggleTheme = {
  global: {
    colors: {
      "toggle-bg": "#77BC1F",
      "toggle-knob": "light-6",
      "toggle-accent": "#77BC1F"
    }
  },
  checkBox: {
    border: {
      color: {
        light: "toggle-bg"
      }
    },
    color: {
      light: "toggle-knob"
    },
    check: {
      radius: "2px"
    },
    hover: {
      border: {
        color: undefined
      }
    },
    toggle: {
      background: { light: "toggle-accent" },
      color: {
        light: "toggle-knob"
      },
      size: "36px",
      knob: {
        extend: `
          top: -4px;
          box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24);
        `
      },
      extend: ({ checked }) => `
        height: 14px;
        ${checked && checkboxCheckStyle}
      `
    },
    gap: "xsmall",
    size: "18px"
  }
};

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
      <Grommet theme={deepMerge(grommet, customToggleTheme)}>
        <Box>
          <Box pad="xsmall" background="light-2" elevation="small" direction="row" overflow="none">
            <Heading margin="small" level={3}>{data.site.siteMetadata.title}</Heading>
            <DropButton
              icon={<CircleInformation />}
              dropAlign={{ top: 'center' }}
              dropContent={<HelpInfo />}
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
