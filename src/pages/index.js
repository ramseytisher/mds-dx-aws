import React, { useState } from "react"
import { graphql } from "gatsby"

import _ from "lodash";

import { Box, Form, Button, FormField, Text, ResponsiveContext, CheckBox, Menu } from 'grommet';
import { Search } from 'grommet-icons';

import styled from 'styled-components';

import Layout from "../components/layout/layout";
// import CodeList from "../components/code-list";
import NoResults from "../components/no-results";
import SmallTable from "../components/tables/small-table";
import BigTable from "../components/tables/big-table"

const Toggle = styled(CheckBox)`
  background: blue;
`;

const IndexPage = ({ data }) => {
  const [filtered, setFiltered] = useState([]);
  // const [showCodes, setShowCodes] = useState(false);
  const [searchOr, setSearchOr] = useState(true);
  const [searchStr, setSearchStr] = useState('');
  const [orderBy, setOrderBy] = useState('ICD_10_CM_Code');
  const [orderAsc, setOrderAsc] = useState(true);

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
            node.Default_Clinical_Category.toString().toUpperCase()
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
            node.Default_Clinical_Category.toString().toUpperCase()
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
    <Box direction="row" align="start" justify="center" gap="small" wrap>
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
              { label: 'ICD-10 CM Code', onClick: () => setOrderBy('ICD_10_CM_Code') },
              { label: 'Description', onClick: () => setOrderBy('Description') },
              { label: "Clinical Category", onClick: () => setOrderBy('Default_Clinical_Category') },
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
      {/* <Box direction="row" gap="small" align="center">
        <Text weight="bold" size="small">Show:</Text>
        <Box direction="row" pad="small" gap="small" align="center">
          <Text weight={!showCodes && "bold"}>Details</Text>
          <CheckBox checked={showCodes} toggle onChange={() => setShowCodes(!showCodes)} />
          <Text weight={showCodes && "bold"}>List Codes</Text>
        </Box>
      </Box> */}
    </Box>
  )

  return (
    <Layout>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <Box elevation="small" gap="small" justify="center" direction={size === "small" ? "column" : "row"}>
              <Form onSubmit={({ value }) => handleSearch(value.search)} messages={{ required: "search value(s) required" }}>
                <Box gap="small">
                  <Box pad="small">
                    <Box direction="row" align="center" >
                      <Search />
                      <FormField
                        name="search"
                        style={{ 'fontSize': '1.5rem', 'width': '80vw' }}
                        required
                        placeholder="Search"
                      />
                    </Box>
                    <Text size="small">Use , to search multiple items</Text>
                  </Box>
                  <Settings size={size} />
                  <Button type="submit" color="#007CBA" primary label="Search" />
                </Box>
              </Form>
            </Box>
            <Box>
              <Box pad="xsmall">
                {searchStr && <Text size="small">{`Results displayed when searching for: "${searchStr}"`}</Text>}
              </Box>
              {/* <Box>
                {showCodes && <CodeList codes={filtered} />}
              </Box> */}
              <Box>
                {size === 'small' ? <SmallTable data={filtered} /> : <BigTable data={filtered} />}
              </Box>
              <Box>
                {_.isEmpty(filtered) && <NoResults />}
              </Box>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
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
          Points
          SLP_Comorbidity
          NTA_Comorbidity
        }
      }
    }
  }
  `;