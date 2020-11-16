import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api/api';
import { Line,  Pie} from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
	const [dailyData, setDailyData] = useState([]);
	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		};
		fetchAPI();
	}, []);
	
	const lineChart = dailyData.length ? (
		<Line
			data={{
        labels: dailyData.map(({ date }) => date),
        fill: false,
      lineTension: 0.1,
      backgroundColor: 'white',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed),
						label: 'Infected',
						borderColor: '#3333ff',
						backgroundColor: 'rgba(255,0,0,0.5)',
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths),
						label: 'Deaths',
						borderColor: 'red',
						backgroundColor: 'rgba(255,0,0,0.5)',
						fill: true,
					},
				],
			}}
		/>
	) : null;

	
  
	const pieChart = confirmed ? (
		<Pie
			data={{
        labels: ['Infected', 'Recovered', 'Deaths', 'Active'],
      
				datasets: [
					{
						label: 'People',
						backgroundColor: [
							'rgba(0, 0, 255, 0.5)',
							'rgba(0, 255, 0, 0.5)',
							'rgba(255, 0, 0, 0.5)',
							'rgba(242, 234, 0, 0.5)',
						],
						hoverBackgroundColor: [
							'rgba(0, 77, 153)',
							'rgba(30, 102, 49)',
							'rgba(255, 51, 51)',
							'rgba(204, 153, 0)',
						],
						data: [
							confirmed.value,
							recovered.value,
							deaths.value,
							confirmed.value - (recovered.value + deaths.value),
						],
					},
        ],
			}}
			
		/>
  ) : null;



	return <div className={styles.container}>{country ? pieChart : lineChart}</div>;
};

export default Chart;
