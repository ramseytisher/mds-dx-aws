import React from "react";
import { Box, Text } from 'grommet';

export default ({codes}) => (
    <Box pad="small">
        <Text>
            {codes.map(({node}) => `${node.ICD_10_CM_Code}, `)}
        </Text>
    </Box>
)