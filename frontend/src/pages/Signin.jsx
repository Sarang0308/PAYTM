import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Signin = () => {
  const navigate = useNavigate();
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
          setUsername(e.target.value)
        }} placeholder="sarang@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
          setPassword(e.target.value)
        }} placeholder="12345678" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async () => {
           try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
              username,
              password
            });

            // Save the token and navigate to the dashboard
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
          } catch (error) {
            // Show a pop-up alert if the sign-in fails
            alert(error.response?.data?.message || "An error occurred during sign-in.");
          }
        }}
        label={"Sign in"}
            />
          
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}