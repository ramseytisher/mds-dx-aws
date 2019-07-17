# What this tool is
This tool is intended to be a simple search on top of information that CMS has provided related to the Patient-Driven Payment Model (PDPM) and ICD-10-CM Mappings based on information provided by CMS.

## Source information
The data set used by this tool was developed by compiling information together from different sources. The ICD-10-CM code list is used as the base, and then the PDPM information provided by CMS [here](https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/SNFPPS/PDPM.html) is layered on top of it to produce the source data file found in the src > data > pdpm-map.csv

## What Other Vendors Are Doing
[Matrix Care](http://www.matrixcare.com/pdpm/)
[SimpleLTC](https://www.simpleltc.com/free-pdpm-diagnosis-tool/)

# Development Information

## Primary Development Technology
This tool was developed with the following tools:
* [Gatsby](https://www.gatsbyjs.org/) - Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps
* [gatsby-transformer-csv](https://www.gatsbyjs.org/packages/gatsby-transformer-csv/) - Parses a CSV file into JSON arrays.
* [Grommet](https://v2.grommet.io/) - a simple and responsive react-based UI framework

## Contacts
Ramsey Tisher - ramsey.tisher@cerner.com

# Development/Deployment Guide

The Gatsby command line tool (CLI) is the main entry point for getting up and running with a Gatsby application and for using functionality including like running a development server and building out your Gatsby application for deployment.

More info on the CLI [here](https://www.gatsbyjs.org/docs/gatsby-cli/).

```sh
npm install -g gatsby-cli
```

Clone this Github repo to your local machine

```sh
git clone ...
```
## Development 

Go to the root directory of the project and start the development server

```sh
gatsby develop
```

## Deployment

This application is deployed as static files that are hosted at: ...

### Local Production Build 
To locally test the production build process

```sh
gatsby build
```

### Final Production Build
Since this application is not hosted at the root ( / ) of the domain, it requires a slight modification in the build step to produce a final production build that supports this. See [here](https://www.gatsbyjs.org/docs/path-prefix/) for more information.

```sh
gatsby build --prefix-paths
```

Once this process completes, the static files produced in the ./public directory can be given to the Hosted Operations team to replace the existing ones.

