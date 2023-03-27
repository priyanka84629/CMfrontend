import React, { useState, useEffect } from "react";
import "./importfile.css";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Button from "@mui/material/Button";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const ExportFile = (props) => {
  // const navigate = useNavigate();
  const [file, setFile] = useState(null);

//=============== FILE UPLOAD  ===========
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

//============== FILE DROPED AND DATA TRANSFER ========
  const handleFileDrop = async (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

//==============  CANCEL THE POP UP CARD ==========
  const Cancel = () => {
    props.setfile(false);
    setFile(null);
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const userId = JSON.parse(localStorage.getItem("userdetails"))._id;
    const token = JSON.parse(localStorage.getItem("token"));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    try {
      axios
        .post(
          `http://localhost:5050/addcontact`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: token,
            },
          }
        )
        .then((response) => {
          props.reFetch();
          props.setfile(false);
          props.importCompletStatus(true);
          setFile(null);
          setTimeout(() => {
            props.importCompletStatus(false);
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [file, props]);



  return props.trigger ? (
    <React.Fragment>
      <div className="container">
        <section
          className="box"
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <NoteAddIcon sx={{ fontSize: 30 }} color="primary" className="icon" />
          <h4 className="text-head">Import File</h4>
          {!file && <h5 className="drop">Drag & Drop a CSV File to Upload</h5>}
          {file && <h5 className="drop">{file.name}</h5>}
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <Button className="btn" onClick={Cancel} variant="contained">
            Cancel
          </Button>
        </section>
      </div>
      {props.children}
    </React.Fragment>
  ) : (
    ""
  );
};

export default ExportFile;
