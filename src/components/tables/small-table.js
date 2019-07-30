import React from "react"

import _ from "lodash";

import { Box, DataTable, Text } from 'grommet';

export default({ data }) => (
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
              {node.Default_Clinical_Category === 'Return to Provider' ?
                <Text color="#CC0000" weight="bold">Return to Provider</Text> :
                <Text>{node.Default_Clinical_Category}</Text>
              }
              <Box direction="column">
                {!_.isEmpty(node.SLP_Comorbidity) && <Text weight="bold" color="#77BC1F">{`SLP: ${node.SLP_Comorbidity}`}</Text>}
                {!_.isEmpty(node.NTA_Comorbidity) && <Text weight="bold" color="#77BC1F">{`NTA: ${node.NTA_Comorbidity}`}</Text>}
              </Box>
              {node.Points !== "#N/A" && <Text>{node.Points} Points</Text>}
            </Box>
          )
        }
      ]}
      data={data}
    />
  )