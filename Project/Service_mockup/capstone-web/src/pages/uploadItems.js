// csv로 된 상품 정보를 업로드하는 페이지
// parse하고 그 결과를 db에 insert한다.

// https://github.com/vtex/react-csv-parse
// https://www.npmjs.com/package/react-csv-reader

import React, { Component } from 'react'
import { navigate } from 'gatsby';
// import Papa from 'papaparse'
import CSVReader from 'react-csv-reader'
//import SEO from '../components/seo'
import { uploadItems } from '../api/stores';



const keys = [
  "category",
  "item", 
  "quantity"
]

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header =>
    header
      .toLowerCase()
      .replace(/\W/g, '_')
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleFile = file => {
    this.setState({ file });
    console.log("file loaded successfully!");
    console.log({ file });

    // DB 쿼리 넣기
    uploadItems(keys[0],keys[1],keys[2]);
    
  }

  handleError = error => {
    console.log("error!");
    console.log(error);
  }


  render() {
    return (
      <>
        <h1>Upload items</h1>
        <p>This page is for uploading items by uploading a csv file.</p>      

      <CSVReader
        keys={keys}
        cssClass="csv-reader-input"
        label="Upload a csv file."
        onFileLoaded={this.handleFile}
        onError={this.handleError}
        parserOptions={papaparseOptions}
        inputId="ObiWan"
        inputStyle={{color: 'red'}}
      />

      </>
    );
  }
}

export default Form;