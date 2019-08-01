module.exports = {
  siteMetadata: {
    title: `PDPM Diagnosis Search`,
    description: `PDPM Diagnosis Search`,
    author: `ramsey.tisher@cerner.com`,
  },
  pathPrefix: `/DiagnosisSearch`,
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    `gatsby-transformer-csv`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: false
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `pdpm-dx-search`,
        short_name: `pdpmDxSearch`,
        start_url: `/`,
        background_color: `#007CBA`,
        theme_color: `#007CBA`,
        display: `standalone`,
        icon: `src/images/search-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
