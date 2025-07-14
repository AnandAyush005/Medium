import { Appbar } from "../Component/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../Config/config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";


export const Publish = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    return <div>
        <Appbar />
        <div className="flex justify-center w-full">
            
            <div className="max-w-screen-lg w-full pt-8">
                <input onChange={(e)=>{
                    setTitle(e.target.value);
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Title" />

                <TextEditor onChange={(e)=>{
                    setDescription(e.target.value);
                }}/>
                <button onClick={async ()=>{
                    const response = await axios.post(`${BACKEND_URL}/blog`,{
                        title,
                        content : description,
                        
                    },{
                        headers :{
                            Authorization : "Bearer " + localStorage.getItem('token')
                        }
                    });
                    navigate(`/blog/${response.data.id}`);
                    }} type="submit" className="mt-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 ">
                        Publish post
                </button>
            </div>
            
        </div>
        
    </div>
}

function TextEditor({onChange} : {onChange : (e : ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return <form>
    <div className="w-full mb-4  rounded-lg bg-gray-50 mt-2">
       <div className="flex items-center justify-between   ">
           
       <div className=" bg-white rounded-b-lg w-full border border-gray-200">
           <label htmlFor="editor" className="sr-only">Publish post</label>
           <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none mt-2 pl-2 block w-full px-0 text-sm text-gray-800 bg-white border-0  focus:ring-0 " placeholder="Write an article..." required ></textarea>
       </div>
        </div>
        
   </div>
</form>

}