import { BrowserRouter, Route, Routes } from "react-router-dom"


import { Signin } from "./Pages/Signin"
import { Signup } from "./Pages/Signup"
import { Blog } from "./Pages/Blog"
import { Blogs } from "./Pages/Blogs"
import { Publish } from "./Pages/Publish"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
