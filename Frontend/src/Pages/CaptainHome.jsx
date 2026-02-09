import React, { useRef, useState } from "react";
import CaptainDetails from "../components/CaptainDetails";
import AcceptRide from "../components/AcceptRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRide from "../components/ConfirmRide";
import { useContext } from "react";
import CaptainContext, { CaptainDataContext } from "../context/CaptainContext";
import SocketContext from "../context/SocketContext";
import { useEffect } from "react";

const CaptainHome = () => {
  const [acceptRidePanel, setAcceptRidePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const acceptRidePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { CaptainData } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.emit("join", { userId: CaptainData._id, userType: "captain" });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId:CaptainData._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
    const locationInterval=setInterval(updateLocation,10000)
    updateLocation();
  }, [CaptainData]);

  socket.on('new-ride',(data)=>{
    setRide(data)
    setAcceptRidePanel(true);
  })

  useGSAP(
    function () {
      if (acceptRidePanel) {
        gsap.to(acceptRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(acceptRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [acceptRidePanel],
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel],
  );
  return (
    <div className=" h-screen relative  overflow-hidden">
      <img
        className="w-20 absolute top-2 left-2"
        src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
        alt=""
      />

      <div className="h-3/5 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-5">
        <CaptainDetails />
      </div>
      <div
        ref={acceptRidePanelRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full"
      >
        <AcceptRide
          ride={ride}
          setAcceptRidePanel={setAcceptRidePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 translate-y-full h-screen bg-white px-3 py-8 w-full"
      >
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
