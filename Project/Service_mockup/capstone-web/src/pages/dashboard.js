// 대시보드 페이지
// 각 상품별 재고 현황을 그래프로 보여준다.
// react-chartjs-2: chart.js를 react로 포팅한 것
// 참고: https://www.chartjs.org

import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { getStocks, getPopularity } from '../api/stores';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
//dashboardMallId
//const datasets = getStocks();
//const labels = JSON.parse(datasets[0]);
//const dataset_parsed = JSON.parse(datasets);
//console.log(datasets);
class ChartsPage extends React.Component {

  // data = getStocks(),
  // data: name, quantity

  componentDidMount() {

  }
  constructor(props) {
    //https://jsdev.kr/t/componentdidmount-setstate/4023 참고
    super();
    this.state = {
      dataBar: {
        //labels: labels, 
        datasets: [
          {
            label: "재고(개)",
            order: 1,
            data: [],
            backgroundColor: [],
            borderWidth: 2,
            borderColor: []
          }
        ]
      },
      popularBar: {
        datasets: [
          {
            label: "리스트 등록 횟수",
            order: 1,
            data: [],
            backgroundColor: [],
            borderWidth: 2,
            borderColor: []
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
    getStocks(cookies.get('dashboardMallId')).then(res => {
      //state 내부 값 업데이트하는 법
      //https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
      let dataBar = { ...this.state.dataBar };

      res.map(element => {
        const { category, item, quantity } = element;
        dataBar.labels.push(item);
        dataBar.datasets[0].data.push(quantity);
        dataBar.datasets[0].backgroundColor.push("rgba(255, 134,159,0.4)");
        dataBar.datasets[0].borderColor.push("rgba(255, 134, 159, 1)");
      });
      this.setState({ dataBar });
    });
    getPopularity(cookies.get('dashboardMallId')).then(res => {
      let popularBar = { ...this.state.popularBar };
      res.map(element => {
        console.log(element);
        const { name, count } = element;
        popularBar.labels.push(name);
        popularBar.datasets[0].data.push(Number(count));
        popularBar.datasets[0].backgroundColor.push("rgba(255, 134,159,0.4)");
        popularBar.datasets[0].borderColor.push("rgba(255, 134, 159, 1)");
      });
      this.setState({ popularBar });
    });
  }
  render() {
    console.log('dashboard loaded');
    return (
      <MDBContainer>
        <h3 className="mt-5">재고 현황</h3>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
        <h3 className="mt-5">인기 상품</h3>
        <Bar data={this.state.popularBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;