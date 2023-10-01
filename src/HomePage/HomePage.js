import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';
import { axiosGet } from './../axiosService';


function HomePage() {
    const refChart = useRef(null);
    const refChartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosGet('/budget');

                if (response && response.data && response.data.myBudget) {
                    const myBudgetData = response.data.myBudget;

                    const labels = myBudgetData.map((item) => item.title);
                    const data = myBudgetData.map((item) => item.budget);

                    if (refChartInstance.current) {
                        refChartInstance.current.destroy();
                    }

                    const chartContext = refChart.current.getContext('2d');
                    const newChartInstance = new Chart(chartContext, {
                        type: 'pie',
                        data: {
                            labels: labels,
                            datasets: [
                                {
                                    data: data,
                                    backgroundColor: [
                                        "red",
                                        "blue",
                                        "violet",
                                        "black",
                                        "yellow",
                                        "green",
                                        "pink"
                                    ],
                                },
                            ],
                        },
                    });

                    refChartInstance.current = newChartInstance;

                    drawD3DonutChart(myBudgetData);

                }
            } catch (error) {
                console.error('Unable to fetch data', error);
            }
        };

        fetchData();
    }, []);


    return (
        <main className="center" id="main">

            <div className="page-area">

                <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear...
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </article>

                <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear...
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h1>Chart.js</h1>
                    <p>
                        <canvas id="myChart" width="400" height="400" ref={refChart}></canvas>
                    </p>
                </article>

                <article>
                    <h1>D3 Chart</h1>
                    <div id="d3DonutChart"></div>
                </article>
            </div>

        </main>
    );
}

function drawD3DonutChart(data) {
    const height = 600;
    const width = 600;
    const radius = (Math.min(width, height) / 3);

    const existingChart = d3.select('#d3DonutChart svg');
    if (!existingChart.empty()) {

        return;
    }

    const svg = d3.select('#d3DonutChart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.title))
        .range(['#C8644F', '#DEBA40', '#3E80F5', '#11F2F9', '#F911C1', '#F9113F', '#9E11F9' ]);

    const pie = d3.pie()
        .value(d => d.budget);

    const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    const outerArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    const arcs = svg.selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.title));


    arcs.append('text')
        .attr('transform', d => {
            const pos = outerArc.centroid(d);
            const midAngle = Math.atan2(pos[1], pos[0]);
            return `translate(${Math.cos(midAngle) * (radius + 20)},${Math.sin(midAngle) * (radius + 20)})`;
        })
        .attr('dy', '0.35em')
        .style('text-anchor', d => {
            const pos = outerArc.centroid(d);
            return (Math.cos(Math.atan2(pos[1], pos[0])) > 0) ? 'start' : 'end';
        })
        .text(d => `${d.data.title} (${d.data.budget})`);
}

export default HomePage;