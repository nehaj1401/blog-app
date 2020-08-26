import React, { FunctionComponent } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../../client/query/postInfo';
import '../../App.css';
import { AuthorInfo } from '../interface/postInfo';

const AUthorsList: FunctionComponent = () => {

  const { loading, error, data } = useQuery(GET_AUTHORS);
  if (loading) {
    return null;
  }
  if (error) {
    return <p>Error :(</p>;
  } 

  return (
    <div className="author-list">
    <ListGroup flush>
        <ListGroupItem disabled>Authors</ListGroupItem>
        { data.authors.map((item: AuthorInfo)=> {
            const href = `/blogpage/author_${item.id}`;
            return( 
            <ListGroupItem><Link to={href}>{item.name}</Link></ListGroupItem>
            )
        }) }
    </ListGroup>
    </div>
  );
};

export default AUthorsList;
