import {
    Card,
    Metric,
    Text,
    Button,
    Icon,
    Flex,
} from '@tremor/react';
import { Box, Grid, Tooltip } from '@mui/material';
import Link from 'next/link';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Face3Icon from '@mui/icons-material/Face3';
import GroupsIcon from '@mui/icons-material/Groups';
import OutboundIcon from '@mui/icons-material/Outbound';

import { useEffect, useState } from 'react';

const API_URL = "http://localhost:8000"

export default function SummaryCard_Chart() {
    const [wigCount, setWigCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/api/web_data/countAllWebView`)
            .then((response) => response.json())
            .then(data => {
                const view = data.totalVisitors;
                setViewCount(view)
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/wig/countAllWigs`)
            .then((response) => response.json())
            .then(data => {
                const wig = data.count;
                setWigCount(wig)
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/member/countAllMembers`)
            .then((response) => response.json())
            .then(data => {
                const member = data.count;
                setMemberCount(member)
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card decoration="top" decorationColor="yellow">
                    <Box data-aos="fade-zoom-in">
                        <Flex className='justify-start'>
                            <Box className="flex justify-start gap-4">
                                <Icon
                                    icon={TravelExploreIcon}
                                    variant="light"
                                    size="xl"
                                    color="yellow"
                                />
                                <div className="truncate">
                                    <Text>Total Website Views</Text>
                                    <Metric>{viewCount}</Metric>
                                </div>
                            </Box>
                        </Flex>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card decoration="top" decorationColor="amber">
                    <Box data-aos="fade-zoom-in">
                        <Flex className='justify-between'>
                            <Box className="flex justify-start gap-4">
                                <Icon
                                    icon={Face3Icon}
                                    variant="light"
                                    size="xl"
                                    color="amber"
                                />
                                <div className="truncate">
                                    <Text>Total Wigs</Text>
                                    <Metric>{wigCount}</Metric>
                                </div>
                            </Box>
                            <Tooltip title="View Detail">
                                <Link href="/WigManage">
                                    <Button
                                        icon={OutboundIcon}
                                        iconPosition="right"
                                        variant="light"
                                        size="xl"
                                        color="amber"
                                    />
                                </Link>
                            </Tooltip>
                        </Flex>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card decoration="top" decorationColor="orange">
                    <Box data-aos="fade-zoom-in">
                        <Flex className='justify-between'>
                            <Box className="flex justify-start gap-4">
                                <Icon
                                    icon={GroupsIcon}
                                    variant="light"
                                    size="xl"
                                    color="orange"
                                />
                                <div className="truncate">
                                    <Text>Total Members</Text>
                                    <Metric>{memberCount}</Metric>
                                </div>
                            </Box>
                            <Tooltip title="View Detail">
                                <Link href="/MemberManage">
                                    <Button
                                        // text="View Details"
                                        icon={OutboundIcon}
                                        iconPosition="right"
                                        variant="light"
                                        size="xl"
                                        color="orange"
                                    />
                                </Link>
                            </Tooltip>
                        </Flex>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}
