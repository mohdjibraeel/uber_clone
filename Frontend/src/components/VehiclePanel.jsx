
const VehiclePanel = (props) => {
  return (
    <>
    <h2 onClick={() => props.setVehiclePanelOpen(false)}className="absolute right-5.5 "><i className="text-2xl font-bold ri-arrow-down-wide-line"></i></h2>
    <h2 className="text-2xl font-semibold mb-6">Choose a Vehicle</h2>
        <div onClick={()=>{
          props.setConfirmVehiclePanelOpen(true)
          props.setVehiclePanelOpen(false)
        }} className="flex items-center justify-between w-full p-3 border-2 active:border-black border-gray-300 rounded-xl mb-2">
          <img
            className="h-13"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
            alt=""
          />
          <div className=" w-1/2">
            <h3 className="font-medium text-base]">
              UberGo{" "}
              <span>
                <i className="ri-user-fill"></i>4
              </span>
            </h3>
            <h4 className="font-medium text-sm">2 mins away</h4>
            <p className="text-xs text-gray-600">Afforadable compact rides</p>
          </div>
          <div>
            <h2 className="text-lg font-bold ">₹193.20 </h2>
          </div>
        </div>
        <div onClick={()=>{
          props.setConfirmVehiclePanelOpen(true)
          props.setVehiclePanelOpen(false)
        }} className="flex items-center justify-between w-full p-3 border-2 active:border-black border-gray-300 rounded-xl mb-2">
          <img
            className="h-13"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
            alt=""
          />
          <div className="-ml-4 w-1/2">
            <h3 className="font-medium text-base]">
              Moto
              <span>
                <i className="ri-user-fill"></i>1
              </span>
            </h3>
            <h4 className="font-medium text-sm">4 mins away</h4>
            <p className="text-xs text-gray-600">Afforadable Moto rides</p>
          </div>
          <div>
            <h2 className="text-lg font-bold ">₹69 </h2>
          </div>
        </div>
        <div onClick={()=>{
          props.setConfirmVehiclePanelOpen(true)
          props.setVehiclePanelOpen(false)
        }} className="flex items-center justify-between w-full p-3 border-2 active:border-black border-gray-300 rounded-xl mb-2">
          <img
            className="h-13"
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
            alt=""
          />
          <div className="ml-1 w-1/2">
            <h3 className="font-medium text-base]">
              Uber Auto{" "}
              <span>
                <i className="ri-user-fill"></i>3
              </span>
            </h3>
            <h4 className="font-medium text-sm">7 mins away</h4>
            <p className="text-xs text-gray-600">Afforadable auto rides</p>
          </div>
          <div>
            <h2 className="text-lg font-bold ">₹118.6 </h2>
          </div>
        </div>
    </>
  )
}

export default VehiclePanel