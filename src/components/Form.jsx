import React, {useState} from "react";
import '../App'
import './Register.css'
import ValueCheck from "./ValueCheck";

const Form = ()=>{

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        DOB: "",
        password: "",
        confirmPassword: ""
    })


    const [errors, setErrors] = useState({});

    const HandleChange = (e)=>{
        const {name, value} = e.target;
        setValues({
            ...values, [name]: value
        })
    }

    const [Modal, setModal] = useState(false);

    const HandleSubmit = (e)=>{
        e.preventDefault();

        setErrors(ValueCheck(values))

        const ErrorMessage = {}

        if(!values.firstname){
            ErrorMessage.firstname = "first name is required"
        }
        if(!values.lastname){
            ErrorMessage.lastname = "last name is required"
        }
        if(!values.username){
            ErrorMessage.username = "username is required"
        }
        if(!values.email){
            ErrorMessage.email = "email is required"
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            ErrorMessage.email = "email is not valid"
        }
        if(!values.password){
            ErrorMessage.password = "password is required"
        }
        else if(values.password.length < 8){
            ErrorMessage.password = "password should be morethan 7 characters"
        }
        else if(values.password.length < 5){
            ErrorMessage.password = "password should be morethan 4 characters"
        }
        else if(values.password !== values.confirmPassword){
            ErrorMessage.confirmPassword = "password does not match"
        }
        setErrors(ErrorMessage);

        if(Object.keys(ErrorMessage).length === 0){
            setModal(!Modal);
        }
       
    }

    return (
        <div className="form-container">
            <div className="input-container">
                <label>FirstName</label>
                <input type="text" name="firstname" placeholder="first name" value={values.firstname} onChange={HandleChange}></input>
                {errors.firstname && <span className="error">{errors.firstname}</span>}
            </div>
            

            <div className="input-container">
                <label>LastName</label>
                <input type="text" name="lastname" placeholder="last name" onChange={HandleChange} value={values.lastname}></input>
                {errors.lastname && <span className="error">{errors.lastname}</span>}
            </div>
            

            <div className="input-container">
                <label>UserName</label>
                <input type="text" name="username" placeholder="username" value={values.username} onChange={HandleChange}></input>
                {errors.username && <span className="error">{errors.username}</span>}
            </div>
            

            <div className="input-container">
                <label>email</label>
                <input type="email" name="email" placeholder="email" onChange={HandleChange} value={values.email}></input>
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
           
            <div className="input-container">
                <label>DOB</label>
                <input type="date" name="DOB" onChange={HandleChange} value={values.DOB}></input>
                {errors.DOB && <span className="error">{errors.DOB}</span>}
            </div>
            

            <div className="input-container">
                <label>Password</label>
                <input type="password" name="password" placeholder="password" onChange={HandleChange} value={values.password}></input>
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            

            <div className="input-container">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="confirm password" onChange={HandleChange} value={values.confirmPassword}></input>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            

            <div className="btn">
                <button onClick={HandleSubmit}>SignUp</button>
           </div>

            {Modal && (
                <div className="modal">
                    <div className="overlay">
                        <h1>ACCOUNT WAS CREATED SUCCESFULLY</h1>
                        <button onClick={()=>{
                            setValues({
                                firstname: "",
                                lastname: "",
                                username: "",
                                email: "",
                                DOB: "",
                                password: "",
                                confirmPassword: ""
                            })
                            setModal()
                        }}>OK</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Form;