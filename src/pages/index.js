import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { Box, Form, FormField, Button, Heading, DataTable, Text } from 'grommet';
import _ from "lodash";

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const [filtered, setFiltered] = useState(data.allPdpmMapCsv.edges)

  const handleSearch = (search) => {
    const filteredResults = _.filter(data.allPdpmMapCsv.edges, ({ node }) => {
      const str = node.Description.toString().toUpperCase() + 
      node.ICD_10_CM_Code.toString().toUpperCase() + 
      node.Default_Clinical_Category.toString().toUpperCase() + 
      node.NTA_Comorbidity.toString().toUpperCase() +
      node.SLP_Comorbidity.toString().toUpperCase();
      return str.includes(search.toUpperCase());
    })
    setFiltered(filteredResults);
  }

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Form onSubmit={({ value }) => handleSearch(value.search)}>
        <FormField name="search" label="Search" />
        <Button type="submit" primary label="Submit" />
      </Form>
      <Box>
        <Heading>{`Found ${filtered.length} out of ${data.allPdpmMapCsv.edges.length} items.`}</Heading>
      </Box>
      <DataTable
        columns={[
          {
            property: 'Id',
            primary: true
          },
          {
            property: 'Description',
            header: <Text>Description</Text>,
            render: ({ node }) => (
              <Box direction="column">
                <Box>{node.ICD_10_CM_Code}</Box>
                <Heading level={4}>{node.Description}</Heading>
              </Box>
            )
          },
          {
            property: 'Default_Clinical_Category',
            header: <Text>Default Clinical Category</Text>,
            render: ({ node }) => (
              <Box>
                {node.Default_Clinical_Category}
              </Box>
            )
          },
          {
            property: 'Comorbidity',
            header: <Text>Comorbidity</Text>,
            render: ({ node }) => (
              <Box direction="column">
                {node.SLP_Comorbidity !== "#N/A" && <Box>{`SLP: ${node.SLP_Comorbidity}`}</Box>}
                {node.NTA_Comorbidity !== "#N/A" && <Box>{`NTA: ${node.NTA_Comorbidity}`}</Box>}
              </Box>
            )
          },
          {
            property: 'Points',
            header: <Text>Points</Text>,
            render: ({ node }) => (
              <Box direction="column">
                <Heading level={4}>{node.Points}</Heading>
                <Box>{`Source: ${node.MDS_Field}`}</Box>
              </Box>
            )
          }
        ]}
        data={filtered}
      />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage

export const dataQuery = graphql`
  query dataQuery{
    allPdpmMapCsv(sort: {fields: [Points], order: DESC}) {
      edges {
        node {
          id
          ICD_10_CM_Code
          Description
          Default_Clinical_Category
          Resident_Had_a_Major_Procedure_during_the_Prior_Inpatient_Stay_that_Impacts_the_SNF_Care_Plan_
          Points
          SLP_Comorbidity
          NTA_Comorbidity
          MDS_Field
        }
      }
    }
  }
  `;