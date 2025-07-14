import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName : string,
    title : string,
    content : string,
    publishedDate : string,
    id : number
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 pl-2 w-screen max-w-screen-md cursor-pointer">
            <div className="flex items-center">
                <Avatar name={authorName} size={"small"}/>
                <div className="font-extralight pl-2 text-sm">{authorName}</div> 
                <div className="font-semibold">&nbsp;&middot;&nbsp;</div>
                <div className="font-thin text-sm">{publishedDate}</div>
            </div>
            <div className="text-2xl font-semibold">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100) + '...'}
            </div>
            <div className="text-slate-400 pb-2 mt-2">
                {Math.ceil(content.length/100) + " minute(s)"}
            </div>
            <hr />
        </div> 
        </Link>
}

export function Avatar({name , size = "small"} : {name:string, size: "small" | "big"}) {
    return (
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-5 h-5" : "w-8 h-8"} overflow-hidden bg-gray-600 rounded-full ml-1`} >
        <span className={`${size === "small" ? "text-xs" : "text-xl"} text-gray-600 dark:text-gray-300`}>
            {name[0].toUpperCase()}
        </span>
</div>)
}