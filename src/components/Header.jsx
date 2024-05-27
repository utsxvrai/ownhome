import React from 'react'
import { useLocation , useNavigate } from 'react-router-dom'

export default function Header() {
    const location = useLocation();
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
    }
    const navigate = useNavigate(); 

    return (
    <div className='bg-green-800 border-b shadow-m sticky top-0 z-40' >
        <header  className='flex justify-between items-center px-3 max-w-6xl mx-auto' >
            <div >
                <img src='/ownLogo.png' alt='logo' className='h-12' cursor-pointer
                onClick ={()=>navigate('/')} />    
            </div>
            <div>
                <ul className='flex space-x-10 '>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-white border-b-yellow-400"}` 
                    }
                    onClick ={()=>navigate('/')}
                    
                    >Home</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-white border-b-yellow-400"}`}
                
                onClick={() => navigate("offers")}
                >Offers</li>
                    <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/sign-in") && "text-white border-b-yellow-400"}` }
                onClick={()=>navigate('sign-in')}
                >Sign In</li>
                </ul>
            </div>
        </header>
    </div>
    )
}
