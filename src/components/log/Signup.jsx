import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './login.css';
import dontsPic from "./../images/Group 100.png"
// import dontsPic from'./images/Group 100.png'
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LockIcon from '@mui/icons-material/Lock';


const Signup =(props)=> {
  const navigate = useNavigate()
  const [data, setData] = useState({email:"",password:"", confirmPassword:""}) 
  const [confirmPassword, setCofirmPassword] = useState("")
  const [valid, setValid] = useState(false)
  const [message, setMessage] = useState({status:"", message:""})
//   useEffect(()=>{
//     const getUserDetails = JSON.parse(localStorage.getItem("token"))
// if(getUserDetails){
//     navigate("/main")
// } 
// },[])
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(confirmPassword=== data.password){
        if(data.password.length < 6){
            setMessage({status:"Note!",message:"Password length should be minimum 6 charecters and above "})
            setValid(true)
        }
        else{
            axios.post('http://localhost:5050/register', data)
            .then(result=>{
               navigate('/')
            }).catch((e)=>{
                setMessage(e?.response?.data)
                setValid(true)
            }) 
        } 
    }else{
        setMessage({status:"Note!",message:"Password and Confirm Password doesn't matched"})
        setValid(true)
    }

}
    return (
        <React.Fragment>
        <main className='main-cont'>
            <img className='img-1' src={require('../images/Ellipse 31.png')} alt="round"/>
            <section className='form-container col-lg-10'>

                        <img src={dontsPic} className="dotsImg1"  alt="dots" />
          
                    <div className="row d-flex align-items-center justify-content-center ">
                        <div className="col-8  d-flex align-items-center justify-content-center" style={{ "text-align": "center" }}>
                            <div className="row">

                                <div className="col">
                                    <div className="row">
                                        <h1 className='logo'>Logo</h1>
                                        <p>Create A New Account </p>
                                        <div className="row d-flex justify-content-around align-items-center h-100">
                                            <div className="col-lg-10">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="col-sm-12 inputBox">
                                                    <input className='form-control m-2 px-5' type='email' name="email" placeholder='User Id' required onChange={(e) => setData({ ...data, email: e.target.value })} />
                                                    <EmailIcon className='icons'/>
                                                    </div>
                                                    <div className="col-sm-12 inputBox">
                                                    <input className='form-control m-2 px-5' type="password" name='password' placeholder='Password' required onChange={(e) => setData({ ...data, password: e.target.value })} />
                                                    <LockIcon className='icons'/>
                                                    </div>
                                                    <div className="col-sm-12 inputBox">
                                                    <input className='form-control m-2 px-5' type="password" name='confirmPassword' placeholder='Confirm Password' required onChange={(e) => setCofirmPassword(e.target.value)} />
                                                    <EnhancedEncryptionIcon className='icons'/>
                                                    </div>
                                                    <button className='signin m-2 p-1 rounded-2'>Sign Up</button>
                                                    <Link to={'/'}><button className='signUp m-2 p-1 rounded-2'>Sign In</button></Link>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <img src={dontsPic} alt="dots" style={{width:"20%", height:"30%",opacity:0.8,position:"absolute", bottom:"0px", left:"0px",margin: "10px"}} id='dotsImg2' />

                    </div>
                
            </section>
            <img className='img-2'  src={require('../images/Ellipse 32.png')} alt="right dot"/>
            <Validation trigger={valid}>
                <div className='card-message'>
                    <h3>{message.status}</h3>
                    <p>{message.message}</p>
                    <button onClick={()=>setValid(false)}>ok</button> 
                </div>
                
            </Validation>
        </main>
    </React.Fragment>
    );
}

export default Signup;

const Validation=(props)=>{
    return(props.trigger)?(
        <div className='popupCard'>
            {props.children}
        </div>
    ):""
}
