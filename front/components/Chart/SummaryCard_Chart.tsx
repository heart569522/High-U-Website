import {
    Card,
    Metric,
    Text,
    Button,
    Block,
    Icon,
    Flex,
} from '@tremor/react';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Face3Icon from '@mui/icons-material/Face3';
import GroupsIcon from '@mui/icons-material/Groups';
import OutboundIcon from '@mui/icons-material/Outbound';

import Website_View from '../../helper/Website_View.json'
import Wig_Product from '../../helper/Wig_Product.json'
import Member_Data from '../../helper/Member_Data.json'

export default function SummaryCard_Chart() {
    const totalViews = Website_View.reduce((acc, current) => {
        return acc + current.view;
    }, 0);
    const totalWigs = Wig_Product.length;
    const totalMembers = Member_Data.length;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card decoration="top" decorationColor="yellow">
                    <Box data-aos="fade-zoom-in">
                        <Flex justifyContent="justify-start" spaceX="space-x-4">
                            <Icon
                                icon={TravelExploreIcon}
                                variant="light"
                                size="xl"
                                color="yellow"
                            />
                            <Block truncate={true}>
                                <Text>Total Website Views</Text>
                                <Metric>{totalViews}</Metric>
                            </Block>
                        </Flex>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card decoration="top" decorationColor="amber">
                    <Box data-aos="fade-zoom-in">
                        <Flex justifyContent="justify-start" spaceX="space-x-4">
                            <Icon
                                icon={Face3Icon}
                                variant="light"
                                size="xl"
                                color="amber"
                            />
                            <Block truncate={true}>
                                <Text>Total Wigs</Text>
                                <Metric>{totalWigs}</Metric>
                            </Block>
                            <Link href="/admin/WigManage">
                                <Button
                                    text="View Details"
                                    icon={OutboundIcon}
                                    iconPosition="right"
                                    variant="light"
                                    size="md"
                                    color="amber"
                                />
                            </Link>
                        </Flex>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card decoration="top" decorationColor="orange">
                    <Box data-aos="fade-zoom-in">
                        <Flex justifyContent="justify-start" spaceX="space-x-4">
                            <Icon
                                icon={GroupsIcon}
                                variant="light"
                                size="xl"
                                color="orange"
                            />
                            <Block truncate={true}>
                                <Text>Total Members</Text>
                                <Metric>{totalMembers}</Metric>
                            </Block>
                            <Link href="/admin/MemberList">
                                <Button
                                    text="View Details"
                                    icon={OutboundIcon}
                                    iconPosition="right"
                                    variant="light"
                                    size="md"
                                    color="orange"
                                />
                            </Link>
                        </Flex>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}
