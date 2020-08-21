import React, { FunctionComponent, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';
import { BLOG_CATEGORIES, ADD_POST } from '../../client/query/postInfo';
import { BlogInfo } from '../../interface/postInfo';
import { addPostToCache } from './helper';

const CreatePost: FunctionComponent = () => {

  const { loading, error, data } = useQuery(BLOG_CATEGORIES);
  
  const postInfo = { postTitle: '', postText: '', blogId: null,
  blogCategory: ''};
  const [state, updateState] = useState(postInfo);

  const [addPost] = useMutation(ADD_POST, { update(cache, { data: { addPost } }) {
    addPostToCache(cache, addPost); }
  });
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
  return <p>Error :{error}</p>;
  } 

  const onSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.blogId !== null && state.postTitle !== '' && state.postText !== '') {
      const postData = {...state, id: '123', postedBy: 'Neha', ownerId: 234};
      addPost({ variables: { post: postData } });
    } else {
      alert('Fill all the required fields..');
    }
    updateState(() => postInfo);
  };

  const onStateChange = (event: any): void => {
    const target = event.target;
    const fieldName = target?.name;
    const value = target.value;
    switch(fieldName) {
      case 'title' :
        updateState((prevState) => {
          return {...prevState,  postTitle: value};
        })
        break;
      case 'text' :
        updateState((prevState) => {
          return {...prevState,  postText: value};
        })
        break;
      case 'category' :
        const selectedIndex = target.selectedIndex;
        const blogId = data.blogCategories[selectedIndex].id;
        updateState((prevState) => {
          return {...prevState,  blogId, blogCategory: value};
        });
        break;
    }
  };

  return (
    <Form onSubmit= {onSubmitClick}>
      <FormGroup row>
        <Label for="title" sm={2}>Title</Label>
        <Col sm={10}>
          <Input type="text" name="title" placeholder="Enter title..." value= {state.postTitle}
          onChange= {onStateChange}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="text" sm={2}>Post</Label>
        <Col sm={10}>
          <Input type="textarea" name="text" placeholder="Enter text..." 
          value= {state.postText} onChange= {onStateChange}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="category" sm={2}>Blog Category</Label>
        <Col sm={10}>
          <Input type="select" name="category" id="category" value= {state.blogCategory} onChange= {onStateChange}>
          { data.blogCategories.map( (value: BlogInfo) => {
              return ( <option>{value.name}</option> )
            })
          }
          </Input>
        </Col>
      </FormGroup>
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 5 }}>
          <Button>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

export default CreatePost;