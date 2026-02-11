import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {
  const nameSetter = (str) => {
    const index = str?.indexOf(",");
    const firstWord = str?.slice(0, index);
    const remaining = str?.slice(index + 1).trim();
    return [firstWord, remaining];
  };
  const navigate = useNavigate();

  async function endRide() {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: props.ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    if (response.status === 200) {
      props.setFinishRide(false);
      navigate("/captain-home");
    }
  }
  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2
            onClick={() => {
              props.setFinishRide(false);
            }}
            className="absolute right-5.5 "
          >
            <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
          </h2>
          <h2 className="text-2xl font-semibold mb-6">Finish this Ride Here</h2>

          <div className="flex items-center justify-between p-2 my-2 rounded-lg bg-[#eee]">
            <div className="flex items-center gap-2">
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1769643501027-b454e657395b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <h1 className="text-lg font-medium">
                {props.ride?.user.fullname.firstname}{" "}
                {props.ride?.user.fullname.lastname}
              </h1>
            </div>
            <div>
              <h4 className=" text-lg font-bold">₹{props.ride?.fare}</h4>
              <p className="text-center text-sm -mt-1">
                {props.ride?.distance} KM
              </p>
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
          <div className="w-full flex gap-3 items-center py-3 px-2  border-b">
            <div>
              <i className="text-2xl ri-pin-distance-line"></i>
            </div>
            <div>
              <h3 className="font-medium text-lg">{props.ride?.distance} KM</h3>
              <p className="text-sm text-gray-700">Ride Total Distance</p>
            </div>
          </div>
          <div className="w-full flex gap-3 items-center py-3 px-2">
            <div>
              <i className="text-2xl ri-cash-line"></i>
            </div>
            <div>
              <h3 className="font-medium text-lg">₹ {props.ride?.fare}</h3>
              <p className="text-sm text-gray-700">Payment Cash</p>
            </div>
          </div>
        </div>
        <div className="p-1">
          <button
            onClick={() => {
              endRide();
            }}
            className=" bg-green-600 w-full block text-center text-white p-3 px-14 text-xl font-medium mt-3 rounded-lg"
          >
            Finish Ride
          </button>
          <p className="text-sm mt-5 -mb-6">
            Finish ride if the payment is recieved
          </p>
        </div>
      </div>
    </>
  );
};

export default FinishRide;
