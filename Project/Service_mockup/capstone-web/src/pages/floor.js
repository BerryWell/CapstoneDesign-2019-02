// a page for showing and editting the floor
// https://ui.toast.com/xtui-chart
// TOAST UI를 사용해볼까?

// 박스를 그려서 그 안에다가 배열을 출력한다.

// 왼쪽: 행렬을 표시, 오른쪽: 각 물품의 재고 현황 표시
// ex.
// |0|0|0|0|0|
// |0|0|0|0|0|
// |0|0|0|0|0|
// |0|0|0|0|0|

// make a util module


import React from 'react'
import { navigate } from 'gatsby';

import SEO from '../components/seo'

const floor = () => (
  <>
    <SEO title="floor plan" />
    <h1>Floor</h1>
    <p>Welcome to the floor page.</p>

    
  </>
)

export default floor