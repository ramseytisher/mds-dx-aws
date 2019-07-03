import React, { useState } from "react"
import { graphql } from "gatsby"

import _ from "lodash";

import { Box, Form, Button, FormField, DataTable, Text, ResponsiveContext, CheckBox, DropButton, Menu } from 'grommet';
import { Edit, Up } from 'grommet-icons';

import styled from 'styled-components';

import Layout from "../components/layout";
import CategoryText from "../components/category-text";

const Toggle = styled(CheckBox)`
  background: blue;
`;

const IndexPage = ({ data }) => {
  const [filtered, setFiltered] = useState([]);
  const [showCodes, setShowCodes] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchOr, setSearchOr] = useState(true);
  const [searchStr, setSearchStr] = useState('');
  const [orderBy, setOrderBy] = useState('Points');
  const [orderAsc, setOrderAsc] = useState(false);

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
          let results = _.orderBy(_.flatten(filteredResults), ({ node }) => node[orderBy], [`${orderAsc ? 'asc' : 'desc'}`]);

          setFiltered(_.flatten(results));
        }
      }
    } else {
      for (var j = 0; j < searchItems.length; j++) {
        const find = searchItems[j].toString();
        let tofilter = data.allPdpmMapCsv.edges;
        if (j !== 0) {
          tofilter = _.flatten(filteredResults);
        }
        let found = _.filter(tofilter, ({ node }) => {
          const str = node.Description.toString().toUpperCase() +
            node.ICD_10_CM_Code.toString().toUpperCase() +
            node.Default_Clinical_Category.toString().toUpperCase() +
            node.NTA_Comorbidity.toString().toUpperCase() +
            node.SLP_Comorbidity.toString().toUpperCase();
          return str.includes(find.trim().toUpperCase())
        })
        filteredResults = found;

        if (j === searchItems.length - 1) {
          setFiltered(_.flatten(filteredResults));
        }
      }
    }

    setSearchStr(search.replace(/,/g, `${searchOr ? " OR " : " AND "}`));
  }

  const Settings = () => (
    <Box align="center" justify="center" width="40vw">
      <Box direction="row" gap="small" align="center">
        <Text weight="bold" size="small">Convert commas to:</Text>
        <Box direction="row" pad="small" gap="small" align="center">
          <Text weight={!searchOr && "bold"}>AND</Text>
          <Toggle checked={searchOr} toggle onChange={() => setSearchOr(!searchOr)} />
          <Text weight={searchOr && "bold"}>OR</Text>
        </Box>
      </Box>
      <Box direction="row" gap="small" align="center">
        <Text weight="bold" size="small">Sort By:</Text>
        <Box border={{ color: 'light-4' }}>
          <Menu
            label={_.startCase(orderBy)}
            items={[
              { label: 'ICD 10 CM Code', onClick: () => setOrderBy('ICD_10_CM_Code') },
              { label: 'Description', onClick: () => setOrderBy('Description') },
              { label: 'SLP Comorbidity', onClick: () => setOrderBy('SLP_Comorbidity') },
              { label: 'NTA Comorbidity', onClick: () => setOrderBy('NTA_Comorbidity') },
              { label: 'Points', onClick: () => setOrderBy('Points') },
            ]}
          />
        </Box>
      </Box>
      <Box direction="row" gap="small" align="center">
        <Text weight="bold" size="small">Sort Direction:</Text>
        <Box direction="row" pad="small" gap="small" align="center">
          <Text weight={!orderAsc && "bold"}>DESC</Text>
          <Toggle checked={orderAsc} toggle onChange={() => setOrderAsc(!orderAsc)} />
          <Text weight={orderAsc && "bold"}>ASC</Text>
        </Box>
      </Box>
      {/* <Text>Show:</Text>
              <Box direction="row" pad="small" gap="small" align="center">
                <Text weight={!showCodes && "bold"}>Details</Text>
                <CheckBox checked={showCodes} toggle onChange={() => setShowCodes(!showCodes)} />
                <Text weight={showCodes && "bold"}>List Codes</Text>
              </Box> */}
    </Box>
  )

  return (
    <Layout>
      <ResponsiveContext.Consumer>
        {size => (
          <Box elevation="small" pad="small" gap="small" margin={{ bottom: 'medium' }} direction={size === "small" ? "column" : "row"}>
            <Box fill={size !== "small"}>
              <Form onSubmit={({ value }) => handleSearch(value.search)} messages={{ required: "search value(s) required" }}>
                <Box gap="small">
                  <FormField name="search" help="Use , to search multiple items" style={{ 'fontSize': '1.5rem' }} required />
                  <Box direction="row" gap="small" justify="center">
                    <Text size="small">Convert commas to {searchOr ? 'OR' : 'AND'} | Sort by {orderBy} - {orderAsc ? 'Ascending' : 'Descending'}</Text>
                    {size === 'small' && <Button onClick={() => setShowSettings(!showSettings)}>{showSettings ? <Up /> : <Edit />}</Button>}
                  </Box>
                  {(size === 'small' && showSettings) && <Settings />}
                  <Button type="submit" color="#007CBA" primary label="Search" />
                </Box>
              </Form>
              <Box>
                <Text size="small">
                  {searchStr &&
                    `Results displayed when searching for: "${searchStr}"`}
                </Text>
              </Box>
            </Box>
            {size !== 'small' && <Settings />}
          </Box>
        )}
      </ResponsiveContext.Consumer>

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
                          <Text size="large" weight="bold">{node.ICD_10_CM_Code}</Text>
                          <Text>{node.Description}</Text>
                          <CategoryText text={node.Default_Clinical_Category} />
                          <Box direction="column">
                            {node.SLP_Comorbidity !== "#N/A" && <Text weight="bold" color="#77BC1F">{`SLP: ${node.SLP_Comorbidity}`}</Text>}
                            {node.NTA_Comorbidity !== "#N/A" && <Text weight="bold" color="#77BC1F">{`NTA: ${node.NTA_Comorbidity}`}</Text>}
                          </Box>
                          {node.Points !== "#N/A" && <Text>{node.Points} Points</Text>}
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
                    primary: true,
                    header: <Text>Code</Text>,
                    render: ({ node }) => <Text size="large">{node.ICD_10_CM_Code}</Text>
                  },
                  {
                    property: 'Description',
                    header: <Text>Description</Text>,
                    render: ({ node }) => <Text>{node.Description}</Text>
                  },
                  {
                    property: 'Default_Clinical_Category',
                    header: <Text>Default Clinical Category</Text>,
                    sortable: true,
                    render: ({ node }) => <CategoryText text={node.Default_Clinical_Category} />
                  },
                  {
                    property: 'Comorbidity',
                    header: <Text>Comorbidity</Text>,
                    render: ({ node }) => (
                      <Box direction="column">
                        {node.SLP_Comorbidity !== "#N/A" && (
                          <DropButton
                            label="SLP"
                            color="#77BC1F"
                            dropAlign={{ top: 'bottom', right: 'right' }}
                            dropContent={
                              <Box
                                pad="xsmall"
                                elevation='small'
                                align='center'
                              >
                                {`SLP: ${node.SLP_Comorbidity}`}
                              </Box>
                            }
                          />

                        )}
                        {node.NTA_Comorbidity !== "#N/A" && (
                          <DropButton
                            label="NTA"
                            color="#77BC1F"
                            dropAlign={{ top: 'bottom', right: 'right' }}
                            dropContent={
                              <Box
                                pad="xsmall"
                                elevation='small'
                                align='center'
                              >{`NTA: ${node.NTA_Comorbidity}`}</Box>
                            }
                          />
                        )}
                      </Box>
                    )
                  },
                  {
                    property: 'Points',
                    header: <Text>Points</Text>,
                    render: ({ node }) => <Text>{node.Points}</Text>
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

export const GetCodeList = graphql`
  query GetCodeList{
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