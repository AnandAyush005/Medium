import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import {signinInput, signupInput} from '@anandayush05/medium-common-pkg'


// Creating hono object with generics
export const userRoutes = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string
	},
  
}>();

// Sign Up Backend
userRoutes.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const result = signupInput.safeParse(body);
  if(!result.success) return c.json({message : "Invalid Input " + result.error.format()})

  try{
    const user = await prisma.user.create({
      data : {
        name: body.name,
        password : body.password,
        username : body.username
      }
    })

    const jwt = await sign({id:user.id}, c.env.JWT_SECRET);
    return c.json({jwt});
  }
  catch(e){
    c.status(403);
    return c.json({Error : "Erorr while signing up" + e});
  }
  
  
})

// Sign In backend
userRoutes.post('/signin', async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  
  if(!success) return c.json({message : "Invalid Input"})

  const user = await prisma.user.findUnique({
    where : {
      username : body.username,
      password : body.password
    }
  })

  if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

  const jwt = await sign({id : user.id}, c.env.JWT_SECRET)
  return c.json({jwt});

})