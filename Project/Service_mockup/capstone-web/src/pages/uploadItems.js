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

import Cookies from 'universal-cookie';
import { Button, Modal, Dialog } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const cookies = new Cookies();



const keys = [
  "category",
  "item",
  "quantity",
  "floor"
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
    //uploadItems(file["item"], file["quantity"]);
    //cookies.set("editingMarketMaxFloor"
    // category, item, quantity
    uploadItems(file, cookies.get("editingMarketID"));


    //navigate('/floorinfo');
  }

  handleError = error => {
    console.log("error!");
    console.log(error);

  }


  render() {
    return (
      <>
        <h1>상품 업로드</h1>
        <p>재고 현황을 저장하고 있는 파일을 업로드하세요.</p>

        <CSVReader
          keys={keys}
          cssClass="csv-reader-input"
          label="업로드할 csv 파일을 선택하세요."
          onFileLoaded={this.handleFile}
          onError={this.handleError}
          parserOptions={papaparseOptions}
          inputId="ObiWan"
          inputStyle={{ color: 'red' }}
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {navigate('/floorinfo');}}
        >
        완료
        </Button>

      </>
    );
  }
}

export default Form;