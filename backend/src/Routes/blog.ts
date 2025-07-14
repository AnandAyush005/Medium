import { Hono } from 'hono'
import { PrismaClient } from '../generated/prisma/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@anandayush05/medium-common-pkg';

// Creating hono object with generics
export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    id: string
  }
}>();

// Authorizing the user and extracting the id
blogRoutes.use('/*', async ( c, next )=>{

  const header = await c.req.header("Authorization");

  if (!header) {
    c.status(401);
    return c.json({ error: "Authorization header missing" });
  }

  const jwt = header.split(" ")[1];

  const response = await verify(jwt, c.env.JWT_SECRET);

  if(!response.id){
    c.status(403);
    return c.json({error : "Can't verify the header"})
  }
          
  c.set('id', String(response.id));
  await next();
  
})

// Creating the blog
blogRoutes.post('/', async (c) => {
  
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = createBlogInput.safeParse(body);
  if(!success) return c.json({message : "Invalid Input"})

  if(!body) return c.json({message : "Request body is missing"});

  try{
    const blog = await prisma.blog.create({
      data : {
        title : body.title,
        content : body.content,
        authorId : parseInt(c.get('id'))
      }
    })

    c.status(200)
    return c.json({
      message: "Blog is posted",
      id: parseInt(c.get('id')),
      blog
    });

  }
  catch(e){

    c.status(400)
    return c.json({message:"Error while posting the blog " + e})
  }
})

// Updating the blog
blogRoutes.put('/', async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body);
  if(!success) return c.json({message : "Invalid Input"})

  if(!body) return c.json({message : "Request body is missing"});

  try{
    const blog = await prisma.blog.update({
    where: {
      id: body.id
    },
    data: {
      title:body.title,
      content : body.content
    }
    })
    
    c.status(200)
    return c.json({message : "Blog is updated", blog})
  }
  catch(e){
    c.status(403)
    return c.json({message : "Error While updating the blog"})
  }
})

// Finding all blogs
blogRoutes.get('/bulk', async (c) => {

  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


  try{
    const blog = await prisma.blog.findMany({
      select : {
        content : true,
        title : true,
        id : true,
        author : {
          select : {
            name : true
          }
        }
      }
    });
    
    c.status(200);
    return c.json({blog})
  }
  catch(e){
    c.status(403)
    return c.json({message : "Error while finding the blog " + e});
  }

})

// Finding a blog
blogRoutes.get('/:id', async (c) => {
  const prisma = new PrismaClient({
  datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const value = await c.req.param('id')

  if(!value) return c.json({message : "Request params is missing"});

  try{
    const blog = await prisma.blog.findFirst({
      where : {
        id : parseInt(value),
      },
      select : {
        id:true,
        title : true,
        content : true,
        author : {
          select : {
            name : true
          }
        }
      }
    });
    c.status(200);
    return c.json({blog})
  }
  catch(e){
    c.status(403);
    return c.json({message : "Error while finding the blog"});
  }
});

