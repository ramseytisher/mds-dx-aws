import React from 'react'

import {Box} from 'grommet';

export default ({check, display}) => (
    check ? 
    <Box 
        border={{ color: 'status-warning', size: 'small' }}
        pad="xsmall"
        round
        elevation='xsmall'
        align='center'
    >
        {display}
    </Box>:
    <Box>{display}</Box>
)