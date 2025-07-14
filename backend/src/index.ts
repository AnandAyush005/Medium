import { Hono } from 'hono'
import { userRoutes } from './Routes/user';
import { blogRoutes } from './Routes/blog';
import { cors } from 'hono/cors';

// Creating hono object with generics
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET: string
	},
  
}>();

app.use('/api/*', cors());
app.route('/api/v1/user', userRoutes );
app.route('/api/v1/blog', blogRoutes );

export default app
