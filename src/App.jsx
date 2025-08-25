import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import UserCard from './components/usercard/UserCard';
import sampleImage from './assets/images.jpeg';

const URL = 'http://localhost:8000/api/v1/';

function App() {
  
  const [message, setMessage] = useState(''); 
  const [cardOpen, setCardOpen] = useState(true);

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
        image={sampleImage}
        isOpen={cardOpen}
        onClose={() => setCardOpen(false)}
      />
    </>
  );

}

export default App
