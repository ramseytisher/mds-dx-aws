import React from "react"

import _ from "lodash";

import { Box, DataTable, Text, DropButton } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export default ({ data }) => (
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
          render: ({ node }) => {
            if (node.Default_Clinical_Category === 'Return to Provider') {
              return <Text color="#CC0000" weight="bold">Return to Provider</Text>
            } else {
              return <Text>{node.Default_Clinical_Category}</Text>
            }
          }
        },
        {
          property: 'Comorbidity',
          header: <Text>Comorbidity</Text>,
          render: ({ node }) => (
            <Box direction="column">
              {!_.isEmpty(node.SLP_Comorbidity) && (
                <DropButton
                  label="SLP"
                  icon={<CircleInformation color="lightblue" />}
                  reverse
                  plain
                  dropAlign={{ top: 'bottom', right: 'right' }}
                  dropContent={
                    <Box
                      pad="xsmall"
                      elevation='small'
                      align='center'
                    >
                      <Text>{node.SLP_Comorbidity}</Text>
                    </Box>
                  }
                />
              )}
              {!_.isEmpty(node.NTA_Comorbidity) && (
                <DropButton
                  label="NTA"
                  icon={<CircleInformation color="lightblue" />}
                  reverse
                  plain
                  dropAlign={{ top: 'bottom', right: 'right' }}
                  dropContent={
                    <Box
                      pad="xsmall"
                      elevation='small'
                      align='center'
                    >
                      <Text>{node.NTA_Comorbidity}</Text>
                    </Box>
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
      data={data}
    />
  )