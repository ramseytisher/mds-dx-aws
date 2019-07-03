import React from "react";
import { Text } from 'grommet';

export default ({ text }) => {
    switch (text) {
        case 'Return to Provider': return <Text color="red" weight="bold">{text}</Text>;
        default: return <Text>{text}</Text>
    }
}