import util from 'util'; 
import { response } from 'express';

export const commentsRoutes = (app: any, fs: any) => {
    
    const writeFile = util.promisify(fs.writeFile);
    const readFile = util.promisify(fs.readFile);
    const dataPath = "./data/comments.json";

    app.get("/comments", (req: any, res: any) => {
      fs.readFile(dataPath, "utf8", (err: any, data: any) => {
        if (err) {
          throw err;
        }
        res.send(JSON.parse(data));
      });
    });

    app.post("/comments", async (req: any, res: any) => {
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

    app.delete("/comments/:id", async (req: any, res: any) => {
      const id = req.params.id;
      try {
        const response = JSON.parse(await readFile(dataPath, 'utf8'));
        const index = response.findIndex((value: any) =>  value.id === id);
        response.splice(index, 1);
        await writeFile(dataPath, JSON.stringify(response));
        res.send({ success : true });
      } catch (err) {
        console.log(`Error while deleting comment id: ${id}`);
        res.send({ success : false });
      }
    });

    app.post("/comments/reply", async (req: any, res: any) => {
      const input = req.body;
      try {
        const response = JSON.parse(await readFile(dataPath, 'utf8'));
        const comment  = response.find((comment: any) => comment.id === input.comment_id);
        comment?.replies.push(input);
        await writeFile(dataPath, JSON.stringify(response));
        res.send({ success : true });
      } catch (err) {
        // console.log(`Error while deleting post id: ${id}`);
        res.send({ success : false });
      }
    });

    // app.delete("/comments/:id", async (req: any, res: any) => {
    //   const id = req.params.id;
    //   try {
    //     const data = JSON.parse(await readFile(dataPath, 'utf8'));
    //     const indexArr = data.reduce((accumulator: any[], value: any, index: number) => {
    //       if (value.post_id === id) {
    //         accumulator.push(index);
    //       }
    //       return accumulator;
    //     }, []);
    //     const dataToWrite = data.filter( (value: any, index: number) => indexArr.indexOf(index) === -1);
    //     await writeFile(dataPath, JSON.stringify(dataToWrite));
    //     res.send({ id });
    //   } catch (err) {
    //     console.log(`Error while deleting post id: ${id}`);
    //     throw err;
    //   }
    // });
  };
