import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { blue } from "@mui/material/colors";
import "./DeleteContactComfirmation.css";
import Button from "@mui/material/Button";
import axios from "axios";

const DeleteContactComfirmation = (props) => {
  const hide = () => {
    props.hide(false);
  };

  const handledelete = async () => {
    console.log(props);
    const userid = JSON.parse(localStorage.getItem("userdetails"))._id;
    let idsArr = props.arr;
    if(!idsArr || idsArr.length===0) {
        
    }
    await axios.delete(
      `http://localhost:5050/deletecontact/${userid}`,
      {
        data: { ids: idsArr },
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    props.hide(false);
    props.rend();
    props.checkids([]);
    props.setDeleteSuccessMessage(true);
    setTimeout(() => {
      props.setDeleteSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      {props.trigger3 ? (
        <div className="container-2">
          <section className="box-3">
            <DeleteIcon
              sx={{ fontSize: 40, color: blue[400] }}
              className="sucess"
            />
            <h4 className="text-head-3">Delete Contacts</h4>
            <h5 className="drop-3">Sure you want delete this Contacts ?</h5>
            <div style={{ display: "inline-block" }}>
              <Button onClick={hide} className="cancel" variant="contained">
                Cancel
              </Button>
              <Button
                onClick={handledelete}
                style={{ color: "black" }}
                variant="text"
              >
                OK
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
};

export default DeleteContactComfirmation;
