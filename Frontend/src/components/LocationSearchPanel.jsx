const LocationSearchPanel = (props) => { 
  const locations = props.suggestions|| [];
  return (
    <div className="px-1 sm:px-2 ">
      {locations.map((elem,idx)=>{
        return <div key={idx} onClick={()=>{
          if(props.activeField==='pickup'){
            props.setPickup(elem.description)
          }else{
            props.setDestination(elem.description)
          }
        }} className="flex items-center justify-start mb-2 px-2 sm:px-3 gap-3 border rounded-2xl border-gray-400 active:border-black hover:border-black transition-colors p-3 cursor-pointer">
        <h2 className="shrink-0 bg-gray-200 h-8 w-8 sm:h-9 sm:w-9 rounded-full items-center flex justify-center"><i className="text-base sm:text-lg ri-map-pin-fill"></i></h2>
        <h4 className="font-medium text-sm sm:text-base break-words"> {elem.description}</h4>
      </div>
      })
      }
      
    </div>
  );
};

export default LocationSearchPanel;