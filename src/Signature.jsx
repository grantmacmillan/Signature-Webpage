import './App.css';
import React, { useEffect, useRef } from "react";
import SignatureCanvas from 'react-signature-canvas';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

// React Signature Canvas -- Grant MacMillan

const Signature = () => {
  const signCanvasRef = useRef(null); // canvas reference

  // clear function
  const handleClear = () => {
    signCanvasRef.current.clear();
  }

  // save function
  const handleSave = () => {
    const signCanvas = signCanvasRef.current;
    const canvasData = signCanvas.toData(); // used for acceptance check
  
    //if there is NO data in the canvas, do not save
    if (canvasData.length === 0) {
      alert("Please provide a signature before saving.");
      return;
    }
  
    //if there is data, save it
    const dataURL = signCanvas.toDataURL();
  
    //create file link and download
    const downloadLink = document.createElement("a"); 
    downloadLink.href = dataURL; 
    downloadLink.download = "signature.png"; //save as PNG file
    downloadLink.click(); //trigger download
  }

  useEffect(() => {
    const container = document.getElementById("signature-container"); // get sig canvas container

    // set container height and width depending on window size
    const handleResize = () => {
      const containerHeight = window.innerHeight * 0.4; //set container height to 40% of window height
      container.style.height = `${containerHeight}px`; 
      const containerWidth = window.innerWidth * 0.8; //set container width to 80% of window width
      container.style.width = `${containerWidth}px`;

      //Clear canvas on resize -- otherwise signature will become warped upon resize
      if (signCanvasRef.current) {
        const signCanvas = signCanvasRef.current;
        signCanvas.clear();
        signCanvas.fromDataURL("");
        signCanvas._canvas.width = containerWidth;
        signCanvas._canvas.height = containerHeight;
      }
    };

    window.addEventListener('resize', handleResize); //listener for resize event
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="main" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>React Signature Canvas</h1>

      <div id="signature-container" style={{ border: "2px solid black", overflow: "hidden" }}>
        <SignatureCanvas
          canvasProps={{ className: 'signatureCanvas' }}
          ref={signCanvasRef}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      
      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={handleClear}>Clear</Button>
        <Button variant="success" onClick={handleSave} style={{ marginLeft: '10px' }}>Save</Button>
      </div>

      
    </div>
    
    
  );
}

export default Signature;