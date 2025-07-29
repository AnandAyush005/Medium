import { Appbar } from "../Component/Appbar"
import { BlogCard } from "../Component/BlogCard"
import { Loader } from "../Component/Loader";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <Loader />
        </div>
    }
    
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl" >
                {blogs.map(blog => <BlogCard id={blog.id}
                authorName={blog.author.name}
                title = {blog.title}
                content={blog.content}
                publishedDate={ Date()} />)}
  
            </div>
        </div>
    </div>
}