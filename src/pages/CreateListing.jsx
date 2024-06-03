import { useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';

export default function CreateListing() {
  const [geolocationEnabled , setgeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type:"rent",
    name : "",
    bedrooms : 0,
    bathrooms : 0,
    parkingSpot : false,
    furnished : false,
    address : "",
    description : "",
    offer: false,
    regularPrice:0,
    discountedPrice:0,
    latitude : 0,
    longitude : 0,
    images : {}
  });
  const {type,name, bedrooms, bathrooms, parkingSpot, furnished, address, description, offer,regularPrice, discountedPrice,latitude,longitude,images} = formData;

  function onChange(e) {
    let boolean = null;
    if(e.target.value==="true"){
      boolean = true;

    }
    if(e.target.value==="false"){
      boolean = false;

    }
    // files
    if(e.target.files){
      setFormData((prevState) =>({
        ...prevState,
        images: e.target.files
      }));
    }
    // text, number, select  
    if(!e.target.files){
      setFormData((prevState) =>({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e){
    e.preventDefault();
    setLoading(true);
    if(discountedPrice >= regularPrice){
      setLoading(false);
      toast.error("Discounted price should be less than regular price");
      return;
    }
    let geolocation = {};
    let location;
    if (geolocationEnabled) {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      geolocation.lat = data.results[0]?.geometry?.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry?.lng ?? 0;

      console.log(geolocation.lat , geolocation.lng);



    }
  }
  if(loading){
    return <Spinner/>
  }
  return (
    <main className="max-w-md opx-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold uppercase">Create a Listing</h1>
        <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex justify-between items-center ">
          <button type="button" id="type" value="sale"
          onClick={onChange}
          className={` mr-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
            type === "rent" ? "bg-white text-green-800" : "bg-green-800 text-white" 
          } `}>
            sell
          </button>
          <button type="button" id="type" value="rent"
          onClick={onChange}
          className={` ml-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
            type === "sale" ? "bg-white text-green-800" : "bg-green-800 text-white" 
          } `}>
            rent
          </button>
        </div>

        <p className="text-lg mt-6 font-semibold"> Name </p> 
        <input type="text" id="name" value={name} onChange={onChange} placeholder="Property Name" maxLength="32" minLength="10" required 
        className=" w-full px-4 py-2 text-xl text-green-900 bg-white border border-green-300 rounded transition duration-150 ease-in-out
        focus:text-green-900 focus:bg-white focus:border-green-700 "
        ></input>

        <div className="flex items-center flex-row">
          <div>
            <p className="text-lg mt-6 font-semibold">Beds</p>
            <input type="number" id="bedrooms" value={bedrooms} onChange={onChange} min="1" max="20" required
            className=" w-full mr-3 px-4 py-2 text-xl text-green-900 bg-white border border-green-300 rounded transition duration-150 ease-in-out
        focus:text-green-900 focus:bg-white focus:border-green-700 text-center ">
            </input>
          </div>
          <div>
            <p className="text-lg mt-6 font-semibold ml-3">Baths</p>
            <input type="number" id="bathrooms" value={bathrooms} onChange={onChange} min="1" max="20" required
            className=" w-full ml-3 px-4 py-2 text-xl text-green-900 bg-white border border-green-300 rounded transition duration-150 ease-in-out
        focus:text-green-900 focus:bg-white focus:border-green-700 text-center">
            </input>
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className="flex justify-between items-center ">
          <button type="button" id="parkingSpot" value={true}
          onClick={onChange}
          className={`mr-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
            !parkingSpot ? "bg-white text-green-800" : "bg-green-800 text-white" 
          } `}>
            yes
          </button>
          <button type="button" id="parkingSpot" value={false}
          onClick={onChange}
          className={`ml-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
            parkingSpot ? "bg-white text-green-800" : "bg-green-800 text-white" 
          } `}>
            no
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex justify-between items-center ">
          <button type="button" id="furnished" value={true}
          onClick={onChange}
          className={`mr-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
            !furnished ? "bg-white text-green-800" : "bg-green-800 text-white" 
          } `}>
            yes
          </button>
          <button type="button" id="furnished" value={false}
          onClick={onChange}
          className={`ml-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
            furnished ? "bg-white text-green-800" : "bg-green-800 text-white" 
          } `}>
            no
          </button>
        </div>

        <p className="text-lg mt-3 font-semibold"> Address </p> 
        <textarea type="text" id="address" value={address} onChange={onChange} placeholder="Address" maxLength="50" minLength="10" required 
        className=" w-full px-4 py-2 text-xl text-green-900 bg-white border border-green-300 rounded transition duration-150 ease-in-out focus:text-green-900 focus:bg-white focus:border-green-700 mb-3"
        ></textarea>

        {!geolocationEnabled && (
          <div className="flex justify-start space-x-6">
            <div className="">
              <p className="text-lg mt-3 font-semibold">Latitude</p>
              <input type="number" id="latitude" value={latitude} onChange={onChange} required min="-90" max="90" className="w-full px-4 py-2 text-xl text-green-900 bg-white border border-green-300 rounded transition duration-150 ease-in-out
        focus:text-green-900 focus:bg-white focus:border-green-700 mb-3 text-center mr-3"/>
            </div>
            <div className="">
              <p className="text-lg mt-3 font-semibold">Longitude</p>
              <input type="number" id="longitude" value={longitude} onChange={onChange} required min="-180" max="180" className="w-full px-4 py-2 text-xl text-green-900 bg-white border border-green-300 rounded transition duration-150 ease-in-out
        focus:text-green-900 focus:bg-white focus:border-green-700 mb-3 text-center "/>
            </div>
          </div>
        )}

        <p className="text-lg mt-3 font-semibold"> Description </p> 
        <textarea type="text" id="description" value={description} onChange={onChange} placeholder="Description" maxLength="50" minLength="10" required 
        className=" w-full px-4 py-2 text-xl text-green-900 bg-white border border-green-300 rounded transition duration-150 ease-in-out
        focus:text-green-900 focus:bg-white focus:border-green-700 mb-3"
        ></textarea>
        
        <p className="text-lg mt-3 font-semibold">Offer</p>
        <div className="flex justify-between items-center">
          <button type="button" id="offer" value={true}
          onClick={onChange}
          className={`mr-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
            !offer ? "bg-white text-green-900" : "bg-green-900 text-white" 
          } `}>
            yes
          </button>
          <button type="button" id="offer" value={false}
          onClick={onChange}
          className={`ml-3 uppercase px-7 py-3 font-medium test-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full mb-3 ${
            offer ? "bg-white text-green-800" : "bg-green-800 text-white" 
          } `}>
            no
          </button>
        </div>
        <div className="flex items-center mt-3">
          <div className="">
          <p className="text-lg mt-3 font-semibold">Regular Price</p>
          <div className="flex w-full justify-center items-center space-x-6 ">
            <input type="number" id="regularPrice" value={regularPrice} onChange={onChange} placeholder="Regular Price" required min="50" max="40000000" className="w-full px-4 py-2 text-xl text-green-700 bg-white border border-green-300 rounded transition ease-in-out focus:text-green-700 focus:bg-white focus:border-slate-600 test-center "/>
            {type === "rent" && (
              <div className="">
                <p className="text-md w-full whitespace-nowrap">$ / Month</p>
              </div>
            )}
          </div>
            
          </div>
        </div>
        {offer && (
          <div className="flex items-center mt-3">
          <div className="">
            <p className="text-lg mt-3 font-semibold">Discounted Price</p>
            <div className="flex w-full justify-center items-center space-x-6 ">
              <input type="number" id="discountedPrice" value={discountedPrice} onChange={onChange} placeholder="Regular Price" required={offer} min="50" max="40000000" className="w-full px-4 py-2 text-xl text-green-700 bg-white border border-green-300 rounded transition ease-in-out focus:text-green-700 focus:bg-white focus:border-slate-600 test-center "/>
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        <div className="text-lg mt-3 font-semibold">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-green-900">The first image will be the cover (max 6)</p>
          <input type="file" id="images" onChange={onChange} accept=".jpg,.png,.jpeg" multiple required  
            className="w-full px-4 py-1.5 text-green-900 bg-white border border-green-300 rounded transition duration-15 ease-in-out focus:bg-white focus:border-green-700 focus:text-green-900 mt-3"
          />
        </div>
        <button type="submit" onChange="onSubmit" className="w-full mb-6 uppercase bg-green-800 text-white px-7 py-3 text-sm font-semibold rounded shadow-md  mt-6 transition duration-150 ease-in-out hover:bg-green-700 hover:shadow-xl active:bg-green-800" >
          Create Listing</button>

      </form>
    </main>
  )
}
