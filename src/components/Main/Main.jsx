import React from "react";
import Side from "../Side/Side";
import TotalContacts from "../TotalContacts/TotalContacts";
import "./Main.css"
import { useState } from "react";


const Main = ()=>{

    const [update,setUpdate] = useState(0)
    const [total, setTotal] = useState(0)

    const updateTotalContact = (n) => setTotal(n);

    return <>
    <div className="main">
        <div className="sidebar">
            <Side total={total}/>
        </div>
        <div className="mainbar">
            <TotalContacts update={update} setUpdate={setUpdate} updateTotalContact={updateTotalContact}/>
        </div>
    </div>
    
    </>
}

export default Main