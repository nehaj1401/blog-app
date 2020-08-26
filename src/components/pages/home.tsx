import React, { FunctionComponent } from 'react';
import '../../App.css';
import PostsList from './postsList';
import AUthorsList from './authorsList';

const Home: FunctionComponent = () => {

  return (
  <div style={{display: 'flex', flexDirection: 'row'}}>
    <PostsList/>
    <div className='separator'/>
    <AUthorsList/>
  </div>
  );
};

export default Home;
