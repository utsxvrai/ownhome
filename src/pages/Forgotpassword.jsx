import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';



export default function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  

  function onChange(e) {
    setEmail( e.target.value);
  }

  async function onSubmit(e){
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      // send error if no user found
      if(email){
        toast.success("Password reset link sent to your email")
        navigate('/sign-in');
      }
      
      

    } catch (error) {
      toast.error("No user found with this email")
    }

  }



  return (
    <section>
            <h1 className="text-3xl text-center mt-6 font-bold text-green-900">FORGOT PASSWORD</h1> 
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/keys-on-hand-jJnZg7vBfMs' alt='sign in' 
            className="w-fill rounded-2xl shadow-xl"
          />
        </div>
      
        <div className="w-full  md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <input type ='email' id ='email' 
            value={email} 
            onChange={onChange}
            placeholder='Email'
            className=" mb-6 w-full px-4 py-2 text-xl text-gra-700 bg-white border-gray-300 rounded transition ease-in-out" 
            />
            <div className="flex justify-between whitespace-nowrap text-sm ">
              <p> Don't have a account?
              <Link to='/sign-up' className='text-red-800 transition ease-in-out hover:text-red-700 hover:font-bold'> Register</Link>
              </p>
              <p>
              <Link to="/sign-in" className='text-sm  text-green-800 hover:text-green-700  hover:font-bold'>Sign-in</Link>
              </p>
              

            </div>


          
          <button
          className="w-full uppercase bg-green-800 text-white px-7 py-3 text-sm font-semibold rounded shadow-md  mt-6 transition ease-in-out hover:bg-green-700 hover:shadow-xl active:bg-green-800" type='submit'
          
          >REset password</button>

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
