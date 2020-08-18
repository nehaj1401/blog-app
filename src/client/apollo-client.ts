import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

let client: ApolloClient<NormalizedCacheObject> | null = null;

export const ApolloClientFactory = () => {
    console.log(`Inside ApolloClientFactory`);
    if (client !== null) {
        return client;
    }
    return client = new ApolloClient({
        uri: 'http://localhost:4000/',
        cache: new InMemoryCache()
    });
};

// export const getBlogsData = () => {

//     return client.query({
//         query: gql`
//          {
//             getPosts {
//                 postId,
//                 blogId,
//                 postTitle,
//                 postText,
//                 blogCategory,
//                 postedBy,
//                 ownerId
//           }
//         }`
//     })
//         .then((result: { data: { getPosts: any[]; }; }) => {
//             console.log(result.data.getPosts[0]);
//             Promise.resolve(result.data.getPosts);
//         });

// }

