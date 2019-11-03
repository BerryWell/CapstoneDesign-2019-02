// 대시보드 페이지
// 각 상품별 재고 현황을 그래프로 보여준다.
// react-chartjs-2: chart.js를 react로 포팅한 것
// 참고: https://www.chartjs.org

import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { getStocks } from '../api/stores';
//const datasets = getStocks();
//const labels = JSON.parse(datasets[0]);
//const dataset_parsed = JSON.parse(datasets);
//console.log(datasets);
class ChartsPage extends React.Component {
  // data: name, quantity
  state = {
    dataBar: {
      labels: ["소고기", "돼지고기", "양고기"],
      datasets: [
        {
          label: "재고(개)",
          order: 1,
          data: [7, 19, 3],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)"
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
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
  componentDidMount(){

    getStocks().then(res=>{
      //this.state.dataBar.labels = res['category'];
      console.log(res);
    });
  }

  render() {
    console.log('dashboard loaded');
    //console.log(this.state.dataBar);
    return (
      <MDBContainer>
        <h3 className="mt-5">재고 현황</h3>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;