import util from 'util'; 

export const postsRoutes = (app: any, fs: any) => {
  
  const writeFile = util.promisify(fs.writeFile);
  const readFile = util.promisify(fs.readFile);
  const dataPath = "./data/posts.json";

  app.get("/posts", (req: any, res: any) => {
    fs.readFile(dataPath, "utf8", (err: any, data: any) => {
      if (err) {
        throw err;
      }
      res.send(JSON.parse(data));
    });
  });

  app.post("/posts", async (req: any, res: any) => {
    const input = req.body;
    console.log("request body:::: ");
    console.log(req.body);
    try {
      const response = JSON.parse(await readFile(dataPath, 'utf8'));
      response.push(input);
      await writeFile(dataPath, JSON.stringify(response));
      res.send({ success : true });
    } catch (err) {
      // console.log(`Error while deleting post id: ${id}`);
      res.send({ success : false });
    }
  });

  app.delete("/posts/:id", async (req: any, res: any) => {
    const id = req.params.id;
    try {
      const response = JSON.parse(await readFile(dataPath, 'utf8'));
      const index = response.findIndex((value: any) =>  value.id === id);
      response.splice(index, 1);
      await writeFile(dataPath, JSON.stringify(response));
      res.send({ success : true });
    } catch (err) {
      console.log(`Error while deleting post id: ${id}`);
      res.send({ success : false });
    }
  });

  app.put("/posts", async (req: any, res: any) => {
    const input = req.body;
    console.log('request body')
    console.log(req.body);
    try {
      const response = JSON.parse(await readFile(dataPath, 'utf8'));
      const index = response.findIndex((value: any) =>  value.id === input.id);
      console.log(`index... ${index}`)
      response[index].postText = input.postText;
      response[index].postTitle = input.postTitle;
      await writeFile(dataPath, JSON.stringify(response));
      res.send({ success: true });
    } catch (err) {
      console.log(err);
      res.send({ success: false });
    }
  });

};
