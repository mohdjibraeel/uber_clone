import React from "react";

const LocationSearchPanel = (props) => { 
  // Sample location array 
  const location = [ 
    'Aurobindo hostel, Mnit, JLN marg, Jaipur, Rajasthan',
    'Vinodini hostel, Mnit, JLN marg, Jaipur, Rajasthan',
    'Varun hostel, Mnit, JLN marg, Jaipur, Rajasthan',
    'Drona hostel, Mnit, JLN marg, Jaipur, Rajasthan'
  ]
  return (
    <div>
      {location.map((elem,idx)=>{
        return <div key={idx} onClick={()=>{
          props.setVehiclePanelOpen(true)
          props.setPanelOpen(false)
        }} className="flex items-center justify-start mb-2 px-1 gap-2 border rounded-2xl border-gray-400 active:border-black p-3">
        <h2 className="bg-gray-200 h-7.5 w-7 rounded-full ml-2 items-center flex justify-center"><i className=" text-lg ri-map-pin-fill"></i></h2>
        <h4 className="font-medium"> {elem}</h4>
      </div>
      })
      }
      
    </div>
  );
};

export default LocationSearchPanel;
