import React, { FunctionComponent } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { POSTS_ALL } from '../../client/query/postInfo';
import { PostInfo } from '../interface/postInfo'

const Home: FunctionComponent = () => {

  const { loading, error, data } = useQuery(POSTS_ALL);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  } 

  return (
    <div>
      { data.posts.map((item: PostInfo)=> {
        const href = `/blogpage/post_${item.id}`;
        return( <Card>
        <CardBody>
          <Link to={href}>{item.postTitle}</Link>
          <CardText>
            <small className="text-muted">Posted By {item.postedBy}</small>
          </CardText>
        </CardBody>
      </Card>)
      }) }
    </div>
  );
};

export default Home;
