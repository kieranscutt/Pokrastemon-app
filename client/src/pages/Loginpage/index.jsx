import { LoginForm, RegisterForm } from "../../components";
import React, {useState} from "react";
import '../../App.css'


export default function Loginpage() {
    const [currentForm, setCurrentForm] = useState("LoginForm")

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
    return (
        <div className="forms">
            {
                currentForm === "LoginForm" ? <LoginForm onFormSwitch={toggleForm} /> : <RegisterForm onFormSwitch={toggleForm}/>
            }

        </div>
    )
}
