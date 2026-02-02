import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
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
    [vehiclePanelOpen]
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
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full"
      >
        <h2 className="text-2xl font-semibold mb-6">Choose a Vehicle</h2>
        <div className="flex items-center justify-between w-full p-3 border-2 active:border-black border-gray-300 rounded-xl mb-2">
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
        <div className="flex items-center justify-between w-full p-3 border-2 active:border-black border-gray-300 rounded-xl mb-2">
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
        <div className="flex items-center justify-between w-full p-3 border-2 active:border-black border-gray-300 rounded-xl mb-2">
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
      </div>
    </div>
  );
};

export default Home;
