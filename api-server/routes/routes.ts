import { postsRoutes } from  "./postsRoute";
import { authorsRoutes } from  "./authorsRoute";
import { blogsRoutes } from  "./blogsRoute";
import { commentsRoutes } from  "./commentsRoute";


export const appRouter = (app: any, fs: any) => {

  app.get("/", (req: any, res: any) => {
    res.send("welcome to the development api-server");
  });

  postsRoutes(app, fs);
  authorsRoutes(app, fs);
  blogsRoutes(app, fs);
  commentsRoutes(app, fs);
};
