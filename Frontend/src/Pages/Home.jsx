import { useRef, useState, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmVehicle from "../components/ConfirmVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import { useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmVehiclePanelOpen, setConfirmVehiclePanelOpen] = useState(false);
  const lookingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmVehicleRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const tripButtonRef = useRef(null);
  const [vehicle, setVehicle] = useState({});
  const [activeField, setActiveField] = useState(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [lookingforDriverPanelOpen, setLookingforDriverPanelOpen] =
    useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [pickUpSuggestions, setpickUpSuggetions] = useState("");
  const [destinationSuggestions, setdestinationSuggestions] = useState("");
  const [fare, setFare] = useState({ car: null, auto: null, moto: null });
  const [ride, setRide] = useState("");
  const navigate= useNavigate()

  const { socket } = useContext(SocketContext);
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: userData._id });
  }, [userData]);

  socket.on("ride-accepted", (ride) => {
    setRide(ride);
    setWaitingForDriver(true);
    setLookingforDriverPanelOpen(false);
  });

  socket.on('ride-started',(ride)=>{
    setWaitingForDriver(false);
    navigate('/riding');
  })
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const pickUpHandler = async (e) => {
    setPickup(e.target.value);
    try {
      if (e.target.value.length < 4) {
        setpickUpSuggetions([]);
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setpickUpSuggetions(response.data);
    } catch (err) {
      console.log("Error while finding suggestions", err);
    }
  };

  const destinationHandler = async (e) => {
    setDestination(e.target.value);
    try {
      if (e.target.value.length < 4) {
        setdestinationSuggestions([]);
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setdestinationSuggestions(response.data);
    } catch (err) {
      console.log("Error while finding suggestions", err);
    }
  };

  const findTrip = async (e) => {
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    setFare(response.data.fare);
  };

  const createRide = async function (vehicleType) {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: "24px",
        });
        gsap.to(panelCloseRef.current, {
          rotate: 0,
        });

        gsap.to(tripButtonRef.current, {
          display: "block",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: "0px",
        });
        gsap.to(panelCloseRef.current, {
          rotate: 180,
        });
        gsap.to(tripButtonRef.current, {
          display: "none",
        });
      }
    },
    [panelOpen],
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen],
  );

  useGSAP(
    function () {
      if (confirmVehiclePanelOpen) {
        gsap.to(confirmVehicleRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmVehicleRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmVehiclePanelOpen],
  );

  useGSAP(
    function () {
      if (lookingforDriverPanelOpen) {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingforDriverPanelOpen],
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

  return (
    <div className=" h-screen relative  overflow-hidden">
      <img
        className="w-20 absolute top-2 left-2"
        src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
        alt=""
      />

      <div className="h-screen w-screen">
        <img
          className="h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className=" flex flex-col absolute justify-end h-screen bottom-0 w-full">
        <div className="h-[30%] p-5 bg-white relative">
          <h2
            ref={panelCloseRef}
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute right-5.5 "
          >
            <i className="text-2xl font-bold ri-arrow-down-wide-line"></i>
          </h2>
          <h3 className="text-2xl font-semibold">Find a trip </h3>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line h-15 w-1 absolute top-[44%] left-[10%] bg-black rounded-full "></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              value={pickup}
              onChange={(e) => {
                pickUpHandler(e);
              }}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              placeholder="Add a pick up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              onChange={(e) => destinationHandler(e)}
              placeholder="Enter your destination"
            />
            <button
              ref={tripButtonRef}
              className="flex w-full items-center justify-center bg-black text-white py-2 rounded-lg text-lg font-medium mb-3 mt-3"
              onClick={(e) => {
                findTrip(e);
              }}
            >
              Find Trip
            </button>
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? pickUpSuggestions
                : destinationSuggestions
            }
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed  z-3 bottom-0 translate-y-full bg-white px-3 py-8 w-full "
      >
        <VehiclePanel
          setVehicle={setVehicle}
          fare={fare}
          setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen}
          setVehiclePanelOpen={setVehiclePanelOpen}
        />
      </div>
      <div
        ref={confirmVehicleRef}
        className="fixed  z-2 bottom-0 translate-y-full bg-white px-3 py-8 w-full"
      >
        <ConfirmVehicle
          vehicle={vehicle}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen}
          setLookingforDriverPanelOpen={setLookingforDriverPanelOpen}
          createRide={createRide}
        />
      </div>
      <div
        ref={lookingForDriverRef}
        className="fixed  z-1 bottom-0 translate-y-full bg-white px-3 py-8 w-full"
      >
        <LookingForDriver
          vehicle={vehicle}
          pickup={pickup}
          destination={destination}
          fare={fare}
          setLookingforDriverPanelOpen={setLookingforDriverPanelOpen}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed  z-0 bottom-0 translate-y-full bg-white px-3 py-8 w-full"
      >
        <WaitingForDriver ride={ride} setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
