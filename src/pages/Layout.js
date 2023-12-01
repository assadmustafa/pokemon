import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import '../App.css';
import '../index.css';
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = () => {

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  console.log(currentUser);
  return (
    <>
      <nav>
        <ul>
          
          {!currentUser  ? (
          <>
          <li>
            <Link to="/register" className="link"> Sign Up </Link>
          </li>
          <li>
            <Link to="/login" className="link"> Login </Link>
          </li>
          </>
          
          ) : 
          <li onClick={()=>{
            auth.signOut();
            toast.success('User signed out successfully');

            }}>
            <p className="link">Logout</p>
          </li>
          }
          <li>
            <Link to="/" className="link"> Main </Link>
          </li>
          <li>
            <Link to="/scoreboard" className="link"> Scoreboard </Link>
          </li>
          
        </ul>
      </nav>

      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
      
      <Outlet />
    </>
  )
};

export default Layout;