const AcceptRide = (props) => {
  const nameSetter = (str) => {
    const index = str?.indexOf(",");
    const firstWord = str?.slice(0, index);
    const remaining = str?.slice(index + 1).trim();
    return [firstWord, remaining];
  };
  console.log(props.ride);
  return (
    <>
      <h2
        onClick={() => props.setAcceptRidePanel(false)}
        className="absolute right-5.5 "
      >
        <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
      </h2>
      <h2 className="text-2xl font-semibold mb-6">New Ride Available!</h2>

      <div className="flex items-center justify-between p-2 my-2 rounded-lg bg-[#eee]">
        <div className="flex items-center gap-2">
          <img
            className="h-12 w-12 rounded-full"
            src="https://images.unsplash.com/photo-1769643501027-b454e657395b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <h1 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}
          </h1>
        </div>
        <div>
          <h4 className=" text-lg font-bold">₹{props.ride?.fare}</h4>
          <p className="text-center text-sm -mt-1">{props.ride?.distance} KM</p>
        </div>
      </div>

      <div className="w-full border-b flex gap-3 items-center py-3 px-2">
        <div>
          <i className="text-2xl ri-map-pin-user-line"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">
            {nameSetter(props.ride?.pickup)[0]}
          </h3>
          <p className="text-sm text-gray-700">
            {nameSetter(props.ride?.pickup)[1]}
          </p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
        <div>
          <i className="text-2xl ri-map-pin-fill"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">
            {nameSetter(props.ride?.destination)[0]}
          </h3>
          <p className="text-sm text-gray-700">
            {nameSetter(props.ride?.destination)[1]}
          </p>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 flex gap-3 items-center py-3 px-2 ">
          <div>
            <i className="text-2xl ri-cash-line"></i>
          </div>
          <div>
            <h3 className="font-medium text-lg">₹{props.ride?.fare}</h3>
            <p className="text-sm text-gray-700">Payment Cash</p>
          </div>
        </div>
        <div className="w-1/2 flex gap-3 items-center py-3 px-2">
          <div>
            <i className="text-2xl ri-pin-distance-line"></i>
          </div>
          <div>
            <h3 className="font-medium text-lg">{props.ride?.distance} KM</h3>  
            <p className="text-sm text-gray-700">Ride Distance</p>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between mt-3">
        <button
          onClick={() => {
            props.setAcceptRidePanel(false);
          }}
          className="bg-gray-500 text-white p-2 px-14 text-lg font-medium mt-3 rounded-lg"
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePanel(true);
            props.setAcceptRidePanel(false);
          }}
          className=" bg-green-600 text-white p-2 px-14 text-lg font-medium mt-3 rounded-lg"
        >
          Accept
        </button>
      </div>
    </>
  );
};

export default AcceptRide;
