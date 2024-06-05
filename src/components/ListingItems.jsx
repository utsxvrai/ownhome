import React from 'react'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { MdLocationOn } from "react-icons/md";

export default function ListingItems({listing ,id}) {
  return (
    
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
        <Link className="contents" to={`/category/${listing.type}/${id}`}>
            <img 
                className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in" 
                loading='lazy'
                src={listing.imgUrls[0]} 
                alt={listing.title} 
            
            />
            <Moment className="absolute top-2 left-2 bg-green-700 text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg  " fromNow  >
            {listing.timestamp?.toDate()}
            </Moment>
            <div className="w-full p-[10px]">
              <div className="flex items-center space-x-1">
                <MdLocationOn className="h-4 w-4 text-green-700" />
                <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{listing.address}</p>
              </div>
              <p className="font-semibold m-0 text-xl truncate text-green-900">{listing.name}</p>
              <p className="text-green-700 mt-2 font-semibold">${listing.offer ?  listing.discountedPrice : listing.regularPrice }
              {listing.type === "rent" &&" / Month"} </p>
            <div className="flex items-center mt-[10px] space-x-3">
                <div className="flex items-center space-x-1">
                    <p className="font-bold text-xs">{listing.bedrooms > 1 ? ` ${listing.bedrooms} Beds` : "1 Bed"}</p>
                    <div className="">
                    <p className="font-bold text-xs">{listing.bathrooms > 1 ? ` ${listing.bathrooms} Baths` : "1 Bath"}</p>
                    </div>
                </div>
              </div>
            </div>
        </Link>
    </li>
  )
}
