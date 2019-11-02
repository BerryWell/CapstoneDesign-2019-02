// 대시보드 페이지
// 각 상품별 재고 현황을 그래프로 보여준다.
// react-chartjs-2: chart.js를 react로 포팅한 것
// 참고: https://www.chartjs.org

import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { getStocks } from '../api/stores';
//const labels = JSON.parse(dataset[0]);
//const dataset_parsed = JSON.parse(dataset);
//console.log(dataset_parsed);
class ChartsPage extends React.Component {

  // data = getStocks(),
  // data: name, quantity
  state = {
    dataBar: {
      labels: ["소고기", "돼지고기", "양고기"],
      //labels: labels, 
      datasets: [
        {
          label: "재고(개)",
          order: 1,
          data: [12, 19, 3],
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
      
      console.log(res);
    });
  }

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">재고 현황</h3>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;