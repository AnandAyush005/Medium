import { Quote } from "../Component/Quote"
import { Auth } from "../Component/Auth"

export const Signin = () =>{
  return <div className="grid grid-cols-1 lg:grid-cols-2">
    <div>
      <Auth type="signin" />
    </div>
    <div className="hidden lg:block">
      <Quote />
    </div>
  </div>
}