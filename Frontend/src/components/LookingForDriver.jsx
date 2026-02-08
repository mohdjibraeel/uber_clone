const LookingForDriver = (props) => {
  const nameSetter = (str) => {
    const index = str.indexOf(",");
    const firstWord = str.slice(0, index);
    const remaining = str.slice(index + 1).trim();
    return [firstWord, remaining];
  };

  return (
    <>
      <h2
        onClick={() => props.setLookingforDriverPanelOpen(false)}
        className="absolute right-5.5 "
      >
        <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
      </h2>
      <h2 className="text-2xl font-semibold mb-2 ">Looking for the Driver</h2>
      <div className="flex items-center text-center justify-center w-full p-3 rounded-xl mb-2">
        <img className="h-28" src={props.vehicle.imgUrl} alt="vehicle" />
      </div>
      <div className="w-full border-b flex gap-3 items-center py-3 px-2">
        <div>
          <i className="text-2xl ri-map-pin-user-line"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">{nameSetter(props.pickup)[0]}</h3>
          <p className="text-sm text-gray-700">{nameSetter(props.pickup)[1]}</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
        <div>
          <i className="text-2xl ri-map-pin-fill"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">
            {nameSetter(props.destination)[0]}
          </h3>
          <p className="text-sm text-gray-700">
            {nameSetter(props.destination)[1]}
          </p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2">
        <div>
          <i className="text-2xl ri-cash-line"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">
            ₹{props.fare[props.vehicle.type]}
          </h3>
          <p className="text-sm text-gray-700">Payment Cash</p>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default LookingForDriver;
