import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import samplePDF from "./na.pdf";
import SinglePage from "./Components/SinglePage";
import ModifyPage from "./Components/ModifyPage";
import AutoTextArea from "./Components/AutoTextArea";
import EditPosition from "./Components/EditPosition";

const getTextAreaStyles = (pos) => {
  if (pos.x === 120 && pos.y === 232) {
    return {
      width: "175px",
      height: "12px",
    };
  } else if (pos.x === 308 && pos.y === 248) {
    return {
      width: "260px",
      height: "42px",
    };
  } else if (pos.x === 135 && pos.y === 258) {
    return {
      width: "160px",
      height: "33px",
    };
  } else if (pos.x === 200 && pos.y === 297) {
    return {
      width: "365px",
      height: "23px",
    };
  } else if (pos.x === 152 && pos.y === 324) {
    return {
      width: "37px",
      height: "22px",
    };
  } else if (pos.x === 262 && pos.y === 324) {
    return {
      width: "59px",
      height: "22px",
    };
  } else if (pos.x === 398 && pos.y === 324) {
    return {
      width: "49px",
      height: "22px",
    };
  } else if (pos.x === 507 && pos.y === 324) {
    return {
      width: "61px",
      height: "22px",
    };
  } else if (pos.x === 105 && pos.y === 352) {
    return {
      width: "85px",
      height: "38px",
    };
  } else if (pos.x === 260 && pos.y === 352) {
    return {
      width: "95px",
      height: "38px",
    };
  } else if (pos.x === 430 && pos.y === 352) {
    return {
      width: "139px",
      height: "38px",
    };
  } else if (pos.x === 128 && pos.y === 392) {
    return {
      width: "440px",
      height: "23px",
    };
  } else if (pos.x === 185 && pos.y === 418) {
    return {
      width: "380px",
      height: "48px",
    };
  } else if (pos.x === 212 && pos.y === 469) {
    return {
      width: "355px",
      height: "48px",
    };
  } else if (pos.x === 245 && pos.y === 521) {
    return {
      width: "323px",
      height: "48px",
    };
  }
};

export default function App() {
  const [result, setResult] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [redoStack, setRedoStack] = useState([]);
  const [flag, setFlag] = useState("");
  const [bounds, setBounds] = useState({});
  const [isText, setIsText] = useState(false);
  const [buttonType, setButtonType] = useState("");
  const [positions, setPositions] = useState([
    {
      x: 120,
      y: 232,
      text: "fsf",
    },
    {
      x: 308,
      y: 248,
      text: "sad",
    },
    {
      x: 135,
      y: 258,
      text: "sds",
    },
    {
      x: 200,
      y: 297,
      text: "sda",
    },
    {
      x: 152,
      y: 324,
      text: "dsf",
    },
    {
      x: 262,
      y: 324,
      text: "ka",
    },
    {
      x: 398,
      y: 324,
      text: "ka",
    },
    {
      x: 507,
      y: 324,
      text1: "ka",
    },
    {
      x: 105,
      y: 352,
      text: "ka",
    },
    {
      x: 260,
      y: 352,
      text: "ka",
    },
    {
      x: 430,
      y: 352,
      text: "ka",
    },
    {
      x: 128,
      y: 392,
      text: "ka",
    },
    {
      x: 185,
      y: 418,
      text: "ka",
    },
    {
      x: 212,
      y: 469,
      text: "ka",
    },
    {
      x: 245,
      y: 521,
      text: "35",
    },
  ]);

  useEffect(() => {
    positions.forEach(({ x, y }) => {
      addText(x, y);
    });
  }, [positions]);

  const tempRef = useRef(null);

  //Keep track of current page number
  const pageChange = (num) => {
    setPageNumber(num);
  };

  //Function to add text in PDF
  const addText = (x, y) => {
    setIsText(true);
    setResult((result) => [
      ...result,
      {
        id: generateKey(x),
        x: x,
        y: y,
        text: "",
        page: pageNumber,
        type: "text",
        ref: tempRef,
      },
    ]);
  };

  //Flag for DrawArea reference
  const changeFlag = () => {
    setFlag("");
  };

  const getPaths = (el) => {
    setResult((res) => [...res, el]);
  };

  const getBounds = (obj) => {
    setBounds(obj);
  };

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };
  const onTextChange = (id, txt, ref) => {
    let indx = result.findIndex((x) => x.id === id);
    let item = { ...result[indx] };
    item.text = txt;
    item.ref = ref;
    result[indx] = item;
    setResult(result);
  };

  const changeButtonType = (type) => {
    setButtonType(type);
  };

  const resetButtonType = () => {
    setButtonType("");
  };

  return (
    <div className="App">
      {positions.map((pos, idx) => (
        <EditPosition
          key={idx}
          x={pos.x}
          y={pos.y}
          addText={addText}
          text={pos.text}
        />
      ))}
      {result.map((res) => {
        if (res.type === "text") {
          let isShowing = "hidden";
          if (res.page === pageNumber) {
            isShowing = "visible";
          }
          return (
            <div>
              {positions.map((pos, index) => (
                <AutoTextArea
                  id={res.id}
                  x={res.x}
                  y={res.y}
                  isShowing={isShowing}
                  ref={res.ref}
                  unique_key={res.id}
                  val={res.text}
                  key={pos.x}
                  text={pos.text}
                  display={pos.display}
                  flexWrap={pos.flexWrap}
                  onTextChange={onTextChange}
                  textAreaStyles={getTextAreaStyles(res)}
                  style={{
                    visibility: isShowing,
                    color: "red",
                    fontWeight: "normal",
                    fontSize: 12,
                    zIndex: 20,
                    position: "absolute",
                    left: res.x + "px",
                    top: res.y + "px",
                  }}
                />
              ))}
            </div>
            //<h1 key={index} style = {{textAlign: "justify",color: "red" ,fontWeight:'normal',width: 200, height: 80,fontSize: 33+'px', fontSize: 16, zIndex:10, position: "absolute", left: res.x+'px', top: res.y +'px'}}>{res.text}</h1>
          );
        } else {
          return null;
        }
      })}

      <h1 style={{ color: "#3f51b5" }}>Descargar PDF</h1>

      <hr />

      <div className="navbar">
        <button onClick={() => changeButtonType("download")}>
          <i style={{ fontSize: 25 }} className="fa fa-fw fa-download"></i>
        </button>
      </div>

      {/* 
<button onClick = {undo} style = {{marginTop: "1%"}}>Undo</button>
<button onClick = {redo} style = {{marginTop: "1%"}}>Redo</button>
<br></br>
<button onClick={addText} style = {{marginTop: "1%"}}>Add Text</button>*/}
      <SinglePage
        resetButtonType={resetButtonType}
        buttonType={buttonType}
        cursor={isText ? "text" : "default"}
        pdf={samplePDF}
        pageChange={pageChange}
        getPaths={getPaths}
        flag={flag}
        getBounds={getBounds}
        changeFlag={changeFlag}
      />
      <ModifyPage
        resetButtonType={resetButtonType}
        buttonType={buttonType}
        pdf={samplePDF}
        result={result}
        bounds={bounds}
      />
      <hr></hr>
    </div>
  );
}
