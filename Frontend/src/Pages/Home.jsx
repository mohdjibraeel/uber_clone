import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmVehicle from "../components/ConfirmVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmVehiclePanelOpen, setConfirmVehiclePanelOpen] = useState(false);
  const lookingForDriverRef=useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmVehicleRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [lookingforDriverPanelOpen, setLookingforDriverPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
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
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: "0px",
        });
        gsap.to(panelCloseRef.current, {
          rotate: 180,
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
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setPanelOpen(true)}
              placeholder="Add a pick up location"
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              value={destination}
              onClick={() => setPanelOpen(true)}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel
             vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPanelOpen={setPanelOpen}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full ">
        <VehiclePanel setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
      <div ref={confirmVehicleRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full">
        <ConfirmVehicle setConfirmVehiclePanelOpen={setConfirmVehiclePanelOpen} setLookingforDriverPanelOpen={setLookingforDriverPanelOpen}/>     
      </div>
      <div ref={lookingForDriverRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full">
        <LookingForDriver  setLookingforDriverPanelOpen={setLookingforDriverPanelOpen}/>     
      </div>  
      <div ref={waitingForDriverRef} className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full">
        <WaitingForDriver  setWaitingForDriver={setWaitingForDriver}/>     
      </div>

    </div>
  );
};

export default Home;
