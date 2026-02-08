
const LocationSearchPanel = (props) => { 
  const locations = props.suggestions|| [];
  return (
    <div>
      {locations.map((elem,idx)=>{
        return <div key={idx} onClick={()=>{
          if(props.activeField==='pickup'){
            props.setPickup(elem.description)
          }else{
            props.setDestination(elem.description)
          }
        }} className="flex items-center justify-start mb-2 px-1 gap-2 border rounded-2xl border-gray-400 active:border-black p-3">
        <h2 className="bg-gray-200 h-7.5 w-7 rounded-full ml-2 items-center flex justify-center"><i className=" text-lg ri-map-pin-fill"></i></h2>
        <h4 className="font-medium"> {elem.description}</h4>
      </div>
      })
      }
      
    </div>
  );
};

export default LocationSearchPanel;
