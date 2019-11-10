// csv로 된 상품 정보를 업로드하는 페이지
// parse하고 그 결과를 db에 insert한다.

import React from 'react'
import Papa from 'papaparse'
import CSVReader from 'react-csv-reader'
import SEO from '../components/seo'

const test1 = () => (
  <>
    <SEO title="Page two" />
    <h1>Upload items</h1>
    <p>This page is for uploading items by uploading a csv file.</p>
    {/* <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={this.handleForce}
        onError={this.handleDarkSideForce}
        inputId="ObiWan"
        inputStyle={{color: 'red'}}
      /> */}
  </>
)

export default test1;