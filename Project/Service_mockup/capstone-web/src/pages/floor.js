// a page for showing and editting the floor
// https://ui.toast.com/tui-chart
// TOAST UI를 사용해볼까?

// 박스를 그려서 그 안에다가 배열을 출력한다.

// 왼쪽: 행렬을 표시, 오른쪽: 각 물품의 재고 현황 표시

import React from 'react'
import { navigate } from 'gatsby';

import SEO from '../components/seo'

const floor = () => (
  <>
    <SEO title="floor plan" />
    <h1>Floor</h1>
    <p>Welcome to the floor page.</p>

    <Container maxWidth="500">
    </Container>

  </>
)

export default floor