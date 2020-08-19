import React, { FunctionComponent, useState } from 'react';
import { Card, CardBody, CardHeader, CardText, CardFooter, Button } from 'reactstrap';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { POSTS_ALL, DELETE_POST } from '../../client/query/postInfo';
import { PostInfo } from '../../interface/postInfo';
import EditPost from './edit';

const Blog: FunctionComponent = () => {

// const { posts, updateData } = useContext(blogContext);
const  { id } = useParams();
const { loading, error, data } = useQuery(POSTS_ALL);
const [deletePost] = useMutation(DELETE_POST);
const [state, updateState] = useState({ show: false, post: data?.posts[0] });

if (loading) {
  return <p>Loading...</p>;
}
if (error) {
  return <p>Error :(</p>;
} 

const postId: number = parseInt(id.split('_')[1]);

const relatedPosts =  data.posts.filter( (value: PostInfo) => {
  return value.postId === postId;
});

const onDeleteClick = (event: any) => {
  deletePost({ variables: { id: event.target.id }});
};

const onEditClick = ( post: any) => {
  updateState({show: true, post: post});
};
if(state.show) {
  return  <EditPost post={state.post}/>;
}
return (
    <div>
      { relatedPosts.map((value: PostInfo)=> {
      return ( 
      <Card>
        <CardHeader>{value.postTitle}</CardHeader>
        <CardBody>
          <CardText>{value.postText}</CardText>
          <Button onClick ={() => onEditClick(value)}>Edit</Button> {' '}
          <Button id= {value.postId.toString()} color='danger' onClick ={onDeleteClick}>Delete</Button>
        </CardBody>
      <CardFooter>Posted by {value.postedBy}</CardFooter>
      </Card>
      );
      }) }
    </div> 
  );
};

export default Blog;
