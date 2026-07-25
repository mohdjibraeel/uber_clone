const ConfirmVehicle = (props) => {
  const nameSetter = (str) => {
    const index = str.indexOf(",");
    const firstWord = str.slice(0, index);
    const remaining = str.slice(index + 1).trim();
    return [firstWord,remaining]
  };

  return (
    <>
      <h2
        onClick={() => props.setConfirmVehiclePanelOpen(false)}
        className="absolute right-5 sm:right-5.5 top-3"
      >
        <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
      </h2>
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Confirm your Ride</h2>
      <div className="flex items-center text-center justify-center w-full p-3 rounded-xl mb-2">
        <img className="h-24 sm:h-28 md:h-32 object-contain" src={props.vehicle.imgUrl} alt="vehicle" />
      </div>
      <div className="w-full border-b flex gap-3 items-center py-3 px-2">
        <div className="shrink-0">
          <i className="text-xl sm:text-2xl ri-map-pin-user-line"></i>
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-base sm:text-lg truncate">{nameSetter(props.pickup)[0]}</h3>
          <p className="text-xs sm:text-sm text-gray-700 break-words">{nameSetter(props.pickup)[1]}</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
        <div className="shrink-0">
          <i className="text-xl sm:text-2xl ri-map-pin-fill"></i>
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-base sm:text-lg truncate">{nameSetter(props.destination)[0]}</h3>
          <p className="text-xs sm:text-sm text-gray-700 break-words">{nameSetter(props.destination)[1]}</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2">
        <div className="shrink-0">
          <i className="text-xl sm:text-2xl ri-cash-line"></i>
        </div>
        <div className="min-w-0">
          <h3 className="font-medium text-base sm:text-lg">
            ₹{props.fare[props.vehicle.type]}
          </h3>
          <p className="text-xs sm:text-sm text-gray-700">Payment Cash</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            props.setLookingforDriverPanelOpen(true);
            props.setConfirmVehiclePanelOpen(false);
            props.createRide(`${props.vehicle.type}`)
          }}
          className="w-full bg-green-600 text-white p-3 text-lg sm:text-xl font-medium mt-3 rounded-lg active:scale-95 transition-transform"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default ConfirmVehicle;