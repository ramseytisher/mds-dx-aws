import React, { useState } from "react"
import { graphql } from "gatsby"
import { Box, Form, FormField, Button, Heading, DataTable, Text, CheckBox, ResponsiveContext } from 'grommet';
import _ from "lodash";

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const [filtered, setFiltered] = useState(data.allPdpmMapCsv.edges);
  const [showCodes, setShowCodes] = useState(false);
  const [searchOr, setSearchOr] = useState(false);

  const handleSearch = (search) => {
    const searchItems = search.split(",");

    let filteredResults = [];

    // if , = OR
    if (searchOr) {
      for (var i = 0; i < searchItems.length; i++) {
        const find = searchItems[i].toString();
        let found = _.filter(data.allPdpmMapCsv.edges, ({ node }) => {
          const str = node.Description.toString().toUpperCase() +
            node.ICD_10_CM_Code.toString().toUpperCase() +
            node.Default_Clinical_Category.toString().toUpperCase() +
            node.NTA_Comorbidity.toString().toUpperCase() +
            node.SLP_Comorbidity.toString().toUpperCase();
          return str.includes(find.trim().toUpperCase())
        })
        filteredResults.push(found);
  
        if (i === searchItems.length - 1) {
          setFiltered(_.flatten(filteredResults));
        }
      }
    } else {
      for (var i = 0; i < searchItems.length; i++) {
        const find = searchItems[i].toString();
        let toFilter = data.allPdpmMapCsv.edges;
        if (i !== 0) {
          toFilter = _.flatten(filteredResults);
        }
        let found = _.filter(toFilter, ({ node }) => {
          const str = node.Description.toString().toUpperCase() +
            node.ICD_10_CM_Code.toString().toUpperCase() +
            node.Default_Clinical_Category.toString().toUpperCase() +
            node.NTA_Comorbidity.toString().toUpperCase() +
            node.SLP_Comorbidity.toString().toUpperCase();
          return str.includes(find.trim().toUpperCase())
        })
        filteredResults = found;
  
        if (i === searchItems.length - 1) {
          setFiltered(_.flatten(filteredResults));
        }
      }
    }
  }

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Form onSubmit={({ value }) => handleSearch(value.search)}>
        <FormField name="search" label="Search" help="Use a , to submit multiple items"/>
        <Box direction="row" margin="small" gap="small">
          <Button label={`Search By: ${searchOr ? "OR" : "AND"}`} onClick={()=>setSearchOr(!searchOr)}/>
          <Button label={showCodes ? "Show Details": "Show Code Details"} onClick={() => setShowCodes(!showCodes)} />
        </Box>
        <Button type="submit" primary label="Submit" />
      </Form>
      <Box>
        
      </Box>
      <Box>
        <Heading level={4}>{`Found ${filtered.length} out of ${data.allPdpmMapCsv.edges.length}`}</Heading>
      </Box>
      {showCodes ? (
        <Box pad="small">
          <Text>{filtered.map(({ node }) => `${node.ICD_10_CM_Code}, `)}</Text>
        </Box>
      ) : (
      <ResponsiveContext.Consumer>{size => {
        if (size === 'small') {
          return (
            <DataTable
              columns={[
                {
                  property: 'Id',
                  primary: true,
                  header: <Text>Results</Text>,
                  render: ({ node }) => (
                    <Box margin="small" elevation="small" pad="small" fill key={node.id}>
                      <Box>{node.ICD_10_CM_Code}</Box>
                      <Heading level={4}>{node.Description}</Heading>
                      <Box>
                        {node.Default_Clinical_Category}
                      </Box>
                      <Box direction="column">
                        {node.SLP_Comorbidity !== "#N/A" && <Box>{`SLP: ${node.SLP_Comorbidity}`}</Box>}
                        {node.NTA_Comorbidity !== "#N/A" && <Box>{`NTA: ${node.NTA_Comorbidity}`}</Box>}
                      </Box>
                      <Box direction="column">
                        <Heading level={4}>{node.Points} Points</Heading>
                        <Box>{`Source: ${node.MDS_Field}`}</Box>
                      </Box>
                    </Box>
                  )
                }
              ]}
              data={filtered}
            />
          )
        }

        return (
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
                  <Box direction="column" key={node.id}>
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
        )
      }}</ResponsiveContext.Consumer>
      )}
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