import {
    Card,
    Metric,
    Footer,
    ButtonInline,
    Text,
    Button,
} from '@tremor/react';
import { Grid } from '@mui/material';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export default function Example() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    <Text>{}</Text>
                    <Metric>{}</Metric>
                    <Footer>
                        <Button
                            variant="light"
                            size="sm"
                            text="View Details"
                            icon={ArrowRightAltIcon}
                            iconPosition="right"
                            color="amber"
                        />
                    </Footer>
                </Card>
            </Grid>
        </Grid>
    );
}