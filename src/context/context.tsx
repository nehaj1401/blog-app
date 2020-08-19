import React,{createContext, useState, useEffect} from 'react';
// import { blogsData } from '../content/data';
//import { ApolloClientFactory } from '../client/apollo-client'

export const blogContext = createContext({posts: [],
    updateData : (action: string, postData: any) => {} });

const Context = (props: any) => {

useEffect( () => {
    // const client = ApolloClientFactory();
    // getBlogsData().then((data: any) => {
    //     updatePosts(blogsData);
    //     console.log(data);
    // });
    // updatePosts(blogsData);
}, []);

let data: any = [];
const [posts, updatePosts] = useState(data);

const updateData = (action: string, postData: {postId: number} | any)  => {
    console.log(`Inside updateData`);
    switch (action) {
        case 'delete':
            deletePost(postData.postId);
            break;
        case 'add':
            addPost(postData);
            break;
    }
};
const deletePost = (id: number) => {
    const index = posts.findIndex((value: any) =>  value.postId === id);
    const data = [...posts];
    data.splice(index, 1);
    updatePosts(data);
};

const addPost = (postData: any) => {
    const data = [...posts];
    data.push(postData)
    updatePosts(data);
};

return(
    <blogContext.Provider value={{posts, updateData}}>
    {props.children}
    </blogContext.Provider>
);
}
export default Context;