module.exports = {
  siteMetadata: {
    title: `PDPM Diagnosis Search Prototype`,
    description: `A simple prototype`,
    author: `@ramseytisher`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `not-dx-search`,
        short_name: `notDxSearch`,
        start_url: `/`,
        background_color: `#ff9f23`,
        theme_color: `#ff9f23`,
        display: `minimal-ui`,
        icon: `src/images/search-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
