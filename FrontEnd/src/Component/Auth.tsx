import type { signupType } from "@anandayush05/medium-common-pkg";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../Config/config";

export const Auth = ({type}:{type:"signup" | "signin"}) =>{
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<signupType>({
    name:"",
    username:"",
    password:""  })


    async function sendRequest(){
      try{
        const response = await axios.post(`${BACKEND_URL}/user/${type === 'signin' ? 'signin' : 'signup'}`,
          postInputs
        );
        const jwt = response.data;
        localStorage.setItem("token", jwt.jwt);
        navigate('/blogs')
      }
      catch(e){
        console.log(`Error While ${type === 'signin' ? "signing In" : "signing Up"} the user `, e);
      }
    }

  return (
    <div className="h-screen flex justify-center flex-col ">
      <div className="flex justify-center ">
        <div>
        <div className="px-10">
          <div className="text-4xl font-bold">
            {type === "signin" ?"Login into account ":" Create an account "}
          </div>
          <div className="text-slate-400 text-center">
            {type === "signin" ?" Don't have an account ":" Already have an account " } ? <Link to={type==="signin"?"/signup":"/signin"} className="underline pl-2">{type==="signin"?"SignUp":"SignIn"}</Link>
          </div>
        </div>
          <div className="pt-4">
            {type==="signup" ?<LabelledInput label="Name" placeholder="Enter your name" onChange={(e)=>{
              setPostInputs(c => ({...c,
                name:e.target.value,
              }))
            }}/> : null}
            <LabelledInput label="Username"  placeholder="Enter your username" onChange={(e)=>{
              setPostInputs(c => ({...c,
                username:e.target.value,
              }))
            }}/>
            <LabelledInput label="Password" type={"password"} placeholder="Enter your password" onChange={(e)=>{
              setPostInputs(c => ({...c,
                password:e.target.value,
              }))
            }}/>
            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full mt-4 ">{type === "signup"? "SignUp" : "SignIn"}</button>
          </div>
      </div>
      </div>
    </div>
  )
}

interface labelledInputType {
  label:string,
  placeholder: string,
  onChange : (e : ChangeEvent<HTMLInputElement>) => void ,
  type ?: string;
}

function LabelledInput({label,placeholder, onChange, type}:labelledInputType){
  return (
    <div>
      <label htmlFor="label" className="block mb-2 text-sm font-semibold text-black-900 mt-2">{label}</label>
      <input onChange={onChange} type={ type || "text"} id="label" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
    </div>
    )
}