// just a page for testing(sandbox)
// delete when deploying

// https://ui.toast.com/
// TOAST UI를 사용해볼까?

// 박스를 그려서 그 안에다가 배열을 출력한다.

import React from 'react'

import Apple from 'react-dom'


import SEO from '../components/seo'
import { navigate } from 'gatsby';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

/*
if ( !cookies.get( 'userId' ) ) {
  console.log('not logged in');
  navigate('/');
}

React.componentWillMount () {
  console.log("componentWillMount");
}
*/
const test = () => (
  <>
    <SEO title="Page two" />
    <h1>Test</h1>
    <p>Welcome to the test page.</p>
  </>
) ss


export default test