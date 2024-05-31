import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Header() {
    const [pageState, setPageState] = useState('Sign In');
    const location = useLocation();
    const navigate = useNavigate(); 
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {  
            if(user){
                setPageState('Profile');
            }
            else{
                setPageState('Sign In');
            }
        }); 
    },[auth]);
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }
    


    return (
    <div className='bg-green-800 border-b shadow-m sticky top-0 z-40' >
        <header  className='flex justify-between items-center px-3 max-w-6xl mx-auto' >
            <div >
                <img src='/ownLogo.png' alt='logo' className='h-12' cursor-pointer
                onClick ={()=>navigate('/')} />    
            </div>
            <div>
                <ul className='flex space-x-10 '>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent hover:text-yellow-300 ${
                pathMatchRoute("/") && "text-white border-b-yellow-400"}` 
                    }
                    onClick ={()=>navigate('/')}
                    
                    >Home</li>
                    <li className={`hover:text-yellow-300 cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-white border-b-yellow-400"}`}
                
                onClick={() => navigate("offers")}
                >Offers</li>
                    <li className={`hover:text-yellow-300 cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-white border-b-yellow-400"}` }
                onClick={()=>navigate('profile')}
                >{pageState}</li>
                </ul>
            </div>
        </header>
    </div>
    )
}
