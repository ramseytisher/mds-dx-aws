import React from 'react'
import { Box, Text, Button } from "grommet";
import { Share } from 'grommet-icons';

export default () => (
    <Box pad="large" gap="medium">
        <Text>
            This tool provides ICD-10-CM related mappings under the Patient-Driven Payment Model (PDPM) for Medicare
            Part A SNF stays. Mappings include PDPM Clinical Categories, PDPM SLP Components, and PDPM NTA Components
        </Text>
        <Text color="status-critical" style={{ fontStyle: 'italic' }}>
            Resources provided here are for informational purposes only.
        </Text>
        <Text size="large" weight="bold">Information Source</Text>
        <Text>
            This information was derived from the CMS published resources found here:
        </Text>
        <Button
            label="CMS Information"
            icon={<Share />}
            color="dark-3"
            primary
            reverse
            target="__blank"
            href="https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/SNFPPS/PDPM.html"
        />
    </Box>
)