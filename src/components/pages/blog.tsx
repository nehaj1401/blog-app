import React, { FunctionComponent, useState } from 'react';
import { Card, CardBody, CardHeader, CardText, CardFooter, Button } from 'reactstrap';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_POSTS, DELETE_POST } from '../../client/query/postInfo';
import { PostInfo } from '../interface/postInfo';
import EditPost from './edit';
import { removePostFromCache } from './helper';

const Blog: FunctionComponent = () => {

const  { param } = useParams();
const { loading, error, data } = useQuery(GET_ALL_POSTS);
const [state, updateState] = useState({ show: false, post: data?.posts[0] });
const [deletePost] = useMutation(DELETE_POST, { update(cache, { data: { deletePost } }) {
  removePostFromCache(cache, deletePost); }
});

if (loading) {
  return <p>Loading...</p>;
}
if (error) {
  return <p>Error :(</p>;
} 

const type = param.split('_')[0];
const id = param.split('_')[1];
let relatedPosts = null;

if (type === 'author') {
  relatedPosts =  data.posts.filter( (value: PostInfo) => {
    return value.ownerId === id;
  });
} else {
  relatedPosts =  data.posts.filter( (value: PostInfo) => {
    return value.id === id;
  });
}

const onDeleteClick = (event: any) => {
  deletePost({ variables: { id: event.target.id }});
};

const onEditClick = ( post: any) => {
  updateState({show: true, post: post});
};

const onPostUpdate = () => {
  updateState((prevState) => {
    return { ...prevState, show: false };
  });
};

if(state.show) {
  return  <EditPost post={state.post} onSubmitCallback={onPostUpdate}/>;
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
          <Button id= {value.id} color='danger' onClick ={onDeleteClick}>Delete</Button>
        </CardBody>
      <CardFooter>Posted by {value.postedBy}</CardFooter>
      </Card>
      );
      }) }
    </div> 
  );
};

export default Blog;
