import React, {useState, useEffect} from 'react';
import {MdVisibility, MdVisibilityOff, MdLockOutline} from "react-icons/md";
import {RiLoader3Fill} from 'react-icons/ri'; 
import { useStateContext } from '../Context/datacontext';
import { createPosts } from '../API';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import {toast} from 'react-hot-toast';

const Auth = () => {
    const router = useRouter();
    const [isSignup, setIsSignup] = useState(false);
    const[showPassword, setShowPassword] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
 
    //fetching data from contextApi
   const {setError, setErrorMessage,Error, errorMessage, validateEmail, validatePassword, setCustomer} = useStateContext();

//rotate loader animation
   useEffect(() => {
    let tl = gsap.timeline({paused: true});
    tl.to(".loader3fill", {
        rotate: 360,
        scale: 1.2,
        duration: 2,
        ease: "Power2.inOut",
        repeat: -1
    });
if(authLoader){
    gsap.to(".loader3fill", {
        autoAlpha: 1,
        ease: "power2.inOut",
        duration: .5
    });
    tl.play();
}else{
    gsap.to(".loader3fill", {
        autoAlpha: 0,
        ease: "power2.inOut",
        duration: .5
    });
    tl.pause();
}
   }, [authLoader])
   
   //on form submit function
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            setAuthLoader(true);
            if(isSignup){
                
                    const data = await createPosts('/auth/signup', {
                        ...userData
                    });
                    console.log(data);
                    
                    localStorage.setItem('profile', JSON.stringify(data?.data));
               }
            if(!isSignup){
                const data = await createPosts('/auth/signin', userData);
                localStorage.setItem('profile', JSON.stringify(data?.data));
            }
            router.push('/');
            toast.success("successfully logged in");
        }catch(err){
            setError(true);
            setAuthLoader(false);
            setErrorMessage(err.response.data.message)
            toast.error(`${err.response.data.message}`);
        }finally{
            setAuthLoader(false);
        }

    }
    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }
    
    


  return (
    <div className='mainAuthContainer'>
        
         <div className='authFlexContainer'>
        <div className='authContainer'>
            <div className='authIcon'>
                <MdLockOutline/>
            </div>
            <h6>{isSignup ? "Sign Up" : "Login" } </h6>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    {
                        isSignup && (
                            <>
                            <div className='inputContainer'>
                            <input name="firstName" placeholder=' '
                             required
                             type="text"
                            onChange={(e) => handleChange(e)}/>
                             <label htmlFor="firstName" className='authLabel'>FirstName</label>
                            </div>

                            <div className='inputContainer'>
                            <input name="lastName" placeholder=' '
                            required
                            type="text"
                            onChange={(e) => handleChange(e)}/>
                             <label htmlFor="lastName" className='authLabel'>LastName</label>
                            </div>
                            </>
                        )
                    }
                     <div className='inputContainer'>
                            <input name="email" placeholder=' '
                            required
                            type="text"
                            onChange={(e) => 
                            { handleChange(e)
                            validateEmail(e.target.value)
                            }}/>
                             <label htmlFor="email" className='authLabel'>email</label>
                            </div>

                            <div className='inputPasswordContainer'>
                            <input name="password" placeholder=' '
                            required
                            type={showPassword ? "text" : "password"}
                            onChange={(e) =>{ handleChange(e)
                            validatePassword(e.target.value);
                            }}
                        />
                         <label htmlFor="password" className='authLabel'>Password</label>
                        <div className='revealPassword' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <MdVisibility/> : <MdVisibilityOff/>}
                        </div>
                    {Error && (<p className='errorM'>{errorMessage}</p>)}
                    <div className='loaderContainer'><RiLoader3Fill className='loader3fill'/></div>
                            </div>
                </div>
                <button className='authBtn' type='submit'>{isSignup ? "Sign Up" : "Login"}</button>
                
              
        <div className='authAsk'>
                    <button className="authAskBtn" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Already have an account? Login': "Don't have an account? Sign Up"}
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Auth