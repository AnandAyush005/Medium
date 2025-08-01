import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../Config/config";

export interface Blog {
    "content" : string
    "title" : string
    "id" : number
    "author" : {
        "name" : string
    }
}

export const useBlog = ({ id } : { id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();
    
    useEffect(()=>{
       axios.get(`${BACKEND_URL}/blog/${id}`,{
        headers : {
            Authorization : "Bearer " + localStorage.getItem('token')
        }
       })
       .then(response => {
            setBlog(response.data.blog);
            setLoading(false)
       })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    },[id]);

    return {
        loading,
        blog
    }

}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    
    useEffect(()=>{
       axios.get(`${BACKEND_URL}/blog/bulk`,{
        headers : {
            Authorization : "Bearer " + localStorage.getItem('token')
        }
       })
       .then(response => {
            setBlogs(response.data.blog);
            setLoading(false)
       })
        .catch(error => {
            console.error("Error fetching blogs:", error);
            setLoading(false);
        });
    },[]);

    return {
        loading,
        blogs
    }
        
   

}