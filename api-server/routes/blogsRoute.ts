import util from 'util'; 

export const blogsRoutes = (app: any, fs: any) => {
    
    const writeFile = util.promisify(fs.writeFile);
    const readFile = util.promisify(fs.readFile);
    const dataPath = "./data/blogs.json";
    
    app.get("/blogs", (req: any, res: any) => {
      fs.readFile(dataPath, "utf8", (err: any, data: any) => {
        if (err) {
          throw err;
        }
        res.send(JSON.parse(data));
      });
    });

    app.post("/blogs", async (req: any, res: any) => {
        const input = req.body;
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
  };
