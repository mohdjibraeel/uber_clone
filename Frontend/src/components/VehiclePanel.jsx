const VehiclePanel = (props) => {
  return (
    <>
      <h2 
        onClick={() => props.setVehiclePanelOpen(false)}
        className="absolute right-5 sm:right-5.5 top-3"
      >
        <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
      </h2>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Choose a Vehicle</h2>
      <div
        onClick={() => {
          props.setVehicle({
            type: "car",
            imgUrl:
              "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n",
          });
          props.setConfirmVehiclePanelOpen(true);
          props.setVehiclePanelOpen(false);
        }}
        className="flex items-center justify-between w-full gap-3 sm:gap-4 p-3 sm:p-4 border-2 active:border-black hover:border-black transition-colors border-gray-300 rounded-xl mb-2 sm:mb-3 cursor-pointer"
      >
        <img
          className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 object-contain shrink-0"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt=""
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm sm:text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h3>
          <h4 className="font-medium text-xs sm:text-sm">2 mins away</h4>
          <p className="text-xs text-gray-600 truncate">Afforadable compact rides</p>
        </div>
        <div className="shrink-0">
          <h2 className="text-base sm:text-lg font-bold ">₹{props.fare?.car ?? "--"}</h2>
        </div>
      </div>
      <div
        onClick={() => {
          props.setVehicle({
            type: "moto",
            imgUrl:
              "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n",
          });
          props.setConfirmVehiclePanelOpen(true);
          props.setVehiclePanelOpen(false);
        }}
        className="flex items-center justify-between w-full gap-3 sm:gap-4 p-3 sm:p-4 border-2 active:border-black hover:border-black transition-colors border-gray-300 rounded-xl mb-2 sm:mb-3 cursor-pointer"
      >
        <img
          className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 object-contain shrink-0"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n"
          alt=""
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm sm:text-base">
            Moto
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h3>
          <h4 className="font-medium text-xs sm:text-sm">4 mins away</h4>
          <p className="text-xs text-gray-600 truncate">Afforadable Moto rides</p>
        </div>
        <div className="shrink-0">
          <h2 className="text-base sm:text-lg font-bold ">₹{props.fare?.moto ?? "--"} </h2>
        </div>
      </div>
      <div
        onClick={() => {
          props.setVehicle({
            type: "auto",
            imgUrl:
              "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n",
          });
          props.setConfirmVehiclePanelOpen(true);
          props.setVehiclePanelOpen(false);
        }}
        className="flex items-center justify-between w-full gap-3 sm:gap-4 p-3 sm:p-4 border-2 active:border-black hover:border-black transition-colors border-gray-300 rounded-xl mb-2 sm:mb-3 cursor-pointer"
      >
        <img
          className="h-12 sm:h-14 md:h-16 w-12 sm:w-14 md:w-16 object-contain shrink-0"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n"
          alt=""
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm sm:text-base">
            Uber Auto{" "}
            <span>
              <i className="ri-user-fill"></i>3
            </span>
          </h3>
          <h4 className="font-medium text-xs sm:text-sm">7 mins away</h4>
          <p className="text-xs text-gray-600 truncate">Afforadable auto rides</p>
        </div>
        <div className="shrink-0">
          <h2 className="text-base sm:text-lg font-bold ">₹{props.fare?.auto ?? "--"}</h2>
        </div>
      </div>
    </>
  );
};

export default VehiclePanel;