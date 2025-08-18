import React from "react";
import "./App.css"

function Avatar(){
  return (
    <div className="avatar">
        <img src="./img/avatar.jpeg" alt="Avatar"></img>
    </div>
  )
}


function MemberInfo(){
  return (
    <div className="info">
      <h2>Vương Đức Thoại</h2>
      <p>Tuổi: 21</p>
    </div>
  );
}

function Comment(){
  return (
    <div className="comment">
      Sinh viên năm 4 CNTT - HCMUTE
    </div>
  );
}

function Member(){
  return (
    <div className="member">
      <Avatar/>
      <MemberInfo/>
      <Comment/>
    </div>
  );
}

function App(){
  return (
    <div className="App">
      <Member/>
    </div>
  );
}

export default App;
