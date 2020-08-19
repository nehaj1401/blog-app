import React, { FunctionComponent, useState } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { PostInfo } from '../../interface/postInfo'

interface Props{
    post: PostInfo
}

const EditPost: FunctionComponent<Props> = ({ post}) => {

 const [state, updateState] = useState(post);

  const onSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
    
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
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 5 }}>
          <Button>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

export default EditPost;