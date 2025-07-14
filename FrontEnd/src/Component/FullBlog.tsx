import type { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog} : {blog : Blog}) =>{
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12" >
                <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                        {blog.title}
                </div>
                <div className="text-slate-500 py-2">
                    Post on 2nd December
                </div>
                <div className="">
                        {blog.content}
                </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex">
                        <div className="pr-4 flex items-center">
                            <Avatar name={blog.author.name} size="big"/>
                        </div>
                        <div>
                            <div className="font-bold"> 
                            {blog.author.name.toUpperCase() || "Anonyms"}
                            </div>
                            <div>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt exercitationem unde, hic harum odit suscipit aut sint explicabo est dolor? Praesentium consequatur in magnam unde ut itaque fugit nostrum? Ut!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}