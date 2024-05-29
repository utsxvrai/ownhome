import React from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {db} from '../firebase';
import OAuth from '../components/OAuth';
import { setDoc, doc , serverTimestamp} from 'firebase/firestore';

export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e){
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
    

      
      updateProfile(auth.currentUser,{
        displayName:name,
      });
      const user = userCredentials.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      console.log("User Created"); 
    } catch (error) {
      console.log("Error");
    }

  }



  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold text-green-900"> REGISTER</h1> 
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/keys-on-hand-jJnZg7vBfMs' alt='sign in' 
            className="w-fill rounded-2xl shadow-xl"
          />
        </div>
      
        <div className="w-full  md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
          <input type ='text' id ='name' 
            value={name} 
            onChange={onChange}
            placeholder='Full Name'
            className="  w-full px-4 py-2 text-xl text-gra-700 bg-white border-gray-300 rounded transition ease-in-out" 
            />
            <div className='relative mb-6'></div>
            <input type ='email' id ='email' 
            value={email} 
            onChange={onChange}
            placeholder='Email'
            className=" mb-6 w-full px-4 py-2 text-xl text-gra-700 bg-white border-gray-300 rounded transition ease-in-out" 
            />
            <div className='relative mb-6'>
            <input type ={showPassword ? 'text' : 'password'} 
              id ='password' 
              value={password} 
              onChange={onChange}
              placeholder='Password'
              className=" w-full px-4 py-2 text-xl text-gra-700 bg-white border-gray-300 rounded transition ease-in-out" 
            />
            {showPassword ? (
              <IoEye 
                className="absolute right-3 top-2.5 text-xl cursor-pointer"
                onClick={()=>setShowPassword
                ((prevState)=>!prevState)}
              />) : (
              <IoEyeOff 
                className="absolute right-3 top-2.5 text-xl cursor-pointer"  
                onClick={()=>setShowPassword
                ((prevState)=>!prevState)}
              />)
            }
            </div>
            <div >
              <p className='text-centre text-sm'> Already have an account?
              <Link to='/sign-in' className=' text-red-800 transition ease-in-out hover:text-red-700 hover:font-bold'> Sign-in</Link>
              </p>
            </div>
          
          <button
          className="w-full   uppercase bg-green-800 text-white px-7 py-3 text-sm font-semibold rounded shadow-md  mt-6 transition ease-in-out hover:bg-green-700 hover:shadow-xl active:bg-green-800" type='submit'
          
          >register</button>

          <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
