// csv로 된 상품 정보를 업로드하는 페이지
// parse하고 그 결과를 db에 insert한다.

// https://github.com/vtex/react-csv-parse

import React, { Component } from 'react'
import Papa from 'papaparse'
import CsvParse from 'react-csv-reader'
//import SEO from '../components/seo'

const keys = [
  "header1",
  "header2",
  "header3",
  "header4",
  "header5",
]

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onChangeHandler = event => {
    console.log({"event":event.target.files[0]});
  }
  render() {
    return (
      <>
        <h1>Upload items</h1>
        <p>This page is for uploading items by uploading a csv file.</p>

        {/* <input
          type="file"
          ref={(input) => { 
            this.fileInput = input;
          console.log(input);}}
          name="file"
          icon='file text outline'
          iconPosition='left'
          label='Upload CSV'
          labelPosition='right'
          placeholder='UploadCSV...'
          onChange={this.onChangeHandler}
        /> */}

        


        <CsvParse
          keys={keys}
          onDataUploaded={this.handleData}
          onError={this.handleError}
          render={onChange => <input type="file" onChange={onChange} />}
        />
      </>
    );
  }
}

export default Form;