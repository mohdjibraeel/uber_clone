
const WaitingForDriver = (props) => {
  const nameSetter = (str) => {
    const index = str?.indexOf(",");
    const firstWord = str?.slice(0, index);
    const remaining = str?.slice(index + 1).trim();
    return [firstWord, remaining];
  };
  return (
    <>
      <h2
        onClick={() => props.setWaitingForDriver(false)}
        className="absolute right-5.5 "
      >
        <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
      </h2>
      <h2 className="text-xl font-semibold mb-2 ">Captain arriving shortly</h2>
      <div className="flex items-center text-center justify-between w-full p-3 rounded-xl mb-2">
        <img
          className="h-16"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt=""
        />
        <div className="text-right">
          <h2 className="font-medium capitalize ">
            {props.ride?.captain?.fullname.firstname}{" "}
            {props.ride?.captain?.fullname.lastname}
          </h2>
          <h3 className="text-sm font-bold">{props.ride?.captain?.vehicle.plate}</h3>
          <p className="text-xs text-gray-600">
            {props.ride?.captain?.vehicle.color}{" "}
            {props.ride?.captain?.vehicle.vehicleType}
          </p>
          <p className="text-xs">{props.ride?.otp}</p>
        </div>
      </div>
      <div className="w-full border-b flex gap-3 items-center py-3 px-2">
        <div>
          <i className="text-2xl ri-map-pin-user-line"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">{nameSetter(props.ride?.pickup)[0]}</h3>
          <p className="text-sm text-gray-700">{nameSetter(props.ride?.pickup)[1]}</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
        <div>
          <i className="text-2xl ri-map-pin-fill"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">{nameSetter(props.ride?.destination)[0]}</h3>
          <p className="text-sm text-gray-700">{nameSetter(props.ride?.destination)[1]}</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2">
        <div>
          <i className="text-2xl ri-cash-line"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">₹{props.ride?.fare}</h3>
          <p className="text-sm text-gray-700">Payment Cash</p>
        </div>
      </div>
    </>
  );
};

export default WaitingForDriver;
