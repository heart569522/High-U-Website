import React, { useState, useEffect } from 'react';
import { BarChart, SelectBox, SelectBoxItem } from '@tremor/react';
import _ from 'lodash';

interface ChartData {
    totalVisitors: number;
    totalMonth: number;
    totalYear: number;
    totalDay: number;
    chartDayData: { day: string; view: number }[];
    chartMonthData: { month: string; view: number }[];
}

export default function WebsiteView_AreaChart() {
    const [chartData, setChartData] = useState<ChartData>({
        totalVisitors: 0,
        totalMonth: 0,
        totalYear: 0,
        totalDay: 0,
        chartDayData: [],
        chartMonthData: [],
    });
    const [showDaily, setShowDaily] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${process.env.API_URL}/api/web_data/getViewWebsite`)
            .then((response) => response.json())
            .then((data) => {
                setChartData(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const chartDataToUse = showDaily ? chartData.chartDayData : chartData.chartMonthData;

    return (
        <div className='pt-2'>
            <SelectBox className="py-2" onValueChange={(selectedValue) => setShowDaily(selectedValue === 'Daily')}>
                <SelectBoxItem value="Daily">Daily</SelectBoxItem>
                <SelectBoxItem value="Monthly">Monthly</SelectBoxItem>
            </SelectBox>
            <BarChart
                data={chartDataToUse}
                index={showDaily ? 'day' : 'month'}
                categories={['view']}
                colors={[showDaily ? 'red' : 'amber']}
            />
        </div>
    );
}
