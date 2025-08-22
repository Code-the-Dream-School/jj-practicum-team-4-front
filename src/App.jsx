import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import UserCard from './components/usercard/usercard';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 

  useEffect(() => {

    (async () => {
      const myData = await getAllData(URL)
      setMessage(myData);
    })();
      
    return () => {
      console.log('unmounting');
    }

  }, []);

  return (
    <>
      <UserCard
        username="Jane Doe"
        title="Sunset Landscape"
        description="A beautiful view of the mountains during sunset."
        socialLink="@jane_art"
        image="../../assets/images.jpeg"
      />
    </>
  );

}

export default App
