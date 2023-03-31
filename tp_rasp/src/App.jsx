import React, { useState } from "react";

function ButtonInterface() {
  const [buttonValues, setButtonValues] = useState([]);
  const [ipData, setIpData] = useState(null);

  const handleButtonClick = (value) => {
    setButtonValues([...buttonValues, value]);
  };

  const handleSubmit = () => {
    const valuesString = buttonValues.join(";");
    fetch(`http://192.168.208.150:5000/api/led?leds=${valuesString}`)
      .then((response) => response.json())
      .then((data) => {
        setIpData(data);
      });
    setButtonValues([]);
  };

  return (
    <div className="container">
      <h1>Led Control</h1>
      <div className="button-container">
        <button className="button1 button" onClick={() => handleButtonClick(1)}>Rouge</button>
        <button className="button2 button" onClick={() => handleButtonClick(2)}>Bleu</button>
        <button className="button3 button" onClick={() => handleButtonClick(3)}>Vert</button>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleSubmit}>Submit</button>
        {buttonValues.length > 0 && (
          <p className="values">
            Choix : {buttonValues.join(";")}
            {ipData ? JSON.stringify(ipData) : "loading..."}
          </p>
        )}
      </div>
    </div>
  );
}

export default ButtonInterface;
