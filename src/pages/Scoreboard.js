import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Scoreboard = () => {
    const [user, setUser] = useState(null);
    const [products,setProducts]=useState([])
    const fetchProducts = async () => {
      try {
        const usersCollection = collection(db, 'users'); // Assuming 'users' is your collection name
        const data = await getDocs(usersCollection);
    
        const fetchedProducts = [];
        data.docs.forEach((doc) => {
          fetchedProducts.push(doc.data());
        });
    
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        if (authUser) {
          // User is signed in
          setUser(authUser);
        } else {
          // User is signed out
          setUser(null);
        }
      });
    
      
      fetchProducts();
      
      return () => unsubscribe();
    }, []);
  

  
    
  
  
    return (
      <div className='scoreboard font-pokemon'><br></br><br></br>
        <h1 className='animated-gradient'>Scoreboard</h1>
        <table>
        <tr>
          <th>Player</th>
          <th>Score</th>
        </tr>
        {products && products.map(product => (
          <tr key={product.id}>
            <td>
              <p>{product.nickname}</p>
            </td>
            <td>
              <p>{product.score}</p>
            </td>
          </tr>
    ))}
  </table>
        </div>
    );
  };
  
  export default Scoreboard;