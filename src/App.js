import logo from './logo.svg';
import './App.css';
import * as xlsx from "xlsx";
import React, {useState} from 'react';

import dispozitie from './assets/dispozitie.png';
import suplimentar from './assets/suplimentar.png';


function App() {
const [convertedData, setConvertedData] = useState();

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            console.log(json);

            // remove first 2 elements from array to get only the user and not the other data
            json.shift();
            json.shift();

            console.log(json);

            setConvertedData(json);
        };
        reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  const tabel = convertedData?.map((data, index) => 
  // <h1 key={index}>serthedrtjer{data.__EMPTY_1}</h1>
<div key={index} style={{
  display: 'inline-grid', 
  width: '100%',
  justifyContent: 'center', 
  borderBottom:'2px solid black', 
  marginBottom:'10px', 
  marginTop:'10px',
  height:'60rem'
}}
  >

  <img src={dispozitie}/> 

  <img src={suplimentar}/>
<div className='numeClient' >
  {data.__EMPTY_1}
</div>
<div className='sumaClient' >
  {data.__EMPTY_8}
</div>
<div className='scopulClient' >
  {data.__EMPTY_2}
</div>
<div className='scopulClientSuplimentar' >
  {data.__EMPTY_2}
</div>
</div>
  )
  return (
    <div className="App">
 <form>
  <div id='nonePrintArea' >

  
    <label htmlFor="upload">Upload File</label>
    <input
        type="file"
        name="upload"
        id="upload"
        onChange={readUploadFile}
    />
    </div>
    <div id='printable'>
      {tabel}
    </div>
</form>
    </div>
  );
}

export default App;
