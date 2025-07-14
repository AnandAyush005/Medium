import  z  from 'zod'

// Validating the Signup Inputs
export const signupInput = z.object({
  username : z.string(),
  password : z.string().min(8),
  name : z.string().optional()
}) 
export type signupType = z.infer<typeof signupInput>;

// Validating the SignIn Input
export const signinInput = z.object({
  username : z.string(),
  password : z.string().min(8),
 
}) 

export type signinType = z.infer<typeof signinInput>;

// validating the Creating Blog input
export const createBlogInput = z.object({

  title : z.string(),
  content : z.string()
})

export type createBlogInputType = z.infer<typeof createBlogInput>;

// validating the updating Blog input
export const updateBlogInput = z.object({
  title : z.string(),
  content : z.string(),
  id : z.number()
})

export type updateBlogInputType = z.infer<typeof updateBlogInput>;