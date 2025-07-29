import { Loader } from "../Component/Loader";
import { FullBlog } from "../Component/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export const Blog = () =>{
  const { id } = useParams();
  const {loading, blog} = useBlog({
    id: id || ""
  });

  if(loading){
    return <div>
      <Loader />
    </div>
  }
  return <div>
    {blog && <FullBlog blog={blog}/>}
  </div>
}