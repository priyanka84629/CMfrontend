import React, { useState } from "react";
import "./TotalContacts.css";
import axios from "axios";
import Header from "./Header/Header";
import Functionalities from "./Functionalities/Functionalities";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import DeleteContactComfirmation from "./Functionalities/DeleteContactComfirmation";
import DeleteSuccessfullyFile from "./Functionalities/DeleteSuccessfullyFile";

//    TOOL-TIP IMPLEMENTATION

import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 16,
    fontWeight: 600,
    color: "#2DA5FC",
  },
  arrow: { color: red },
}));

const TotalContacts = (props) => {
  const [arr, setArr] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [deletefile, setDeletefile] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // eslint-disable-next-line
  const [all, setAll] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userdetails"))._id;
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchData();
    setArr(
      arr.map((d) => {
        return {
          select: false,
          _id: d._id,
          name: d.name,
          designation: d.designation,
          company: d.company,
          industry: d.industry,
          email: d.email,
          phonenumber: d.phonenumber,
          category: d.category,
        };
      })
    );
// eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    let result = await axios.get(
      `http://localhost:5050/allcontacts/${userId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setArr(result.data.contacts);
    props.updateTotalContact(result.data.contacts.length);
  };

  const ActionButtonDelete = (id) => {
    setCheckedIds([...checkedIds, id]);
    setDeletefile(true);
  };

  return (
    <div className="totalContact">
      <div className="popup">
        <DeleteContactComfirmation
          something={setAll}
          trigger3={deletefile}
          hide={setDeletefile}
          arr={checkedIds}
          checkids={setCheckedIds}
          rend={fetchData}
          setDeleteSuccessMessage={setDeleteSuccess}
        />
        <div className="deletefile">
          <DeleteSuccessfullyFile 
            trigger4={deleteSuccess} 
          />
        </div>
      </div>
      <div>
        <Header setarr={setArr} />
        <Functionalities
          ids={checkedIds}
          checkids={setCheckedIds}
          rend={fetchData}
        />
      </div>

      <table className="table table-striped">
        <thead className="thead">
          <tr>
            <th scope="col">
            {/* //=========== HANDELLING HEADER CHECKBOX ======= */}
              <input
                type="checkbox"
                onChange={(e) => {
                  let checked = e.target.checked;
                  setArr(
                    arr.map((data) => {
                      data.select = checked;
                      return data;
                    })
                  );
                  let user = [];
                  if (e.target.checked) {
                    user = arr.map((data) => {
                      return data._id;
                    });
                  }
                  setCheckedIds(user);
                }}
              />
            </th>
            {/* //============================================= */}
            <th scope="col">Name</th>
            <th scope="col">Designation</th>
            <th scope="col">Company</th>
            <th scope="col">Industry</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Country</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {arr.map((data, key) => {
            return (
              <tr key={data._id}>
                <td>
                {/* //=================  HANDELLING INDIVISUAL CHECKBOXES ========
                //----------- binding states of checkboxes with its particular ids ----- */}
                  <input
                    onChange={(event) => {
                      let checked = event.target.checked;
                      setArr(
                        arr.map((d) => {
                          if (data._id === d._id) {
                            d.select = checked;
                          }
                          return d;
                        })
                      );

                      const { target } = event;
                      const { id } = target;
                      if (target.checked) {
                        setCheckedIds([...checkedIds, id]);
                      } else {
                        setCheckedIds(
                          checkedIds.filter((checkedId) => checkedId !== id)
                        );
                      }
                    }}
                    type="checkbox"
                    id={data._id}
                    checked={data.select}
                  />
                </td>
                {/* //========================================================== */}

                <td>{data.name}</td>
                <td>{data.designation}</td>
                <td>{data.company}</td>
                <td>{data.industry}</td>

                {/* //===============  TOOL-TIP HANDELLING =========== */}
                <LightTooltip
                  placement="bottom"
                  title={data.email}
                  arrow
                  sx={{ "& .MuiTooltip-arrow": { color: "white" } }}
                >
                  <td className="email">{data.email}</td>
                </LightTooltip>
                {/* //================================================ */}
                <td>{data.phonenumber}</td>
                <td>{data.category}</td>
                <td>
                  <div className="tableaction">
                    <div className="table-row-edit">
                      <EditIcon sx={{ color: blue[400] }} />
                    </div>
                    <div>
                      <DeleteIcon
                        onClick={() => ActionButtonDelete(data._id)}
                        sx={{ color: red[400] }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TotalContacts;
