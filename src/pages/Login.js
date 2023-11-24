import React, {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            toast.success('User signed in successfully');
            navigate('/');
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            toast.error('Please check your Email/Password');
        });
       
    }
 
    return(
        <div className='background'> 
            <div className='spacer'></div>                           
            <form>
                <h1> Login </h1>                                                 
                <div>
                    <input
                        id="email-address"
                        name="email"
                        type="email"                                    
                        required                                                                                
                        placeholder=" Email Address "
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        id="password"
                        name="password"
                        type="password"                                    
                        required                                                                                
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                                                
                <div>
                    <button className='button' onClick={onLogin}> Login </button>
                </div>

            </form>                            
        </div>
    );
}
 
export default Login;