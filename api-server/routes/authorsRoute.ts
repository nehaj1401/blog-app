export const authorsRoutes = (app: any, fs: any) => {
  
  const dataPath = "./data/authors.json";
  console.log('get authors');
  app.get("/authors", (req: any, res: any) => {
    fs.readFile(dataPath, "utf8", (err: any, data: any) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });
};
