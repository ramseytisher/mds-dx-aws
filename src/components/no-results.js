import React from 'react';
import { Box, Text } from 'grommet';
import { Search } from 'grommet-icons';

export default () => (
    <Box align="center">
        <Search size="xlarge" />
        <Text size="large" weight="bold">No Matching Results</Text>
        <Text>Refine your search criteria and try again</Text>
    </Box>
)