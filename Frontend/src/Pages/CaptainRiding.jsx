import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

const CaptainRiding = () => {
  const [finishRide, setFinishRide] = useState(false);
  const finishRideRef = useRef(null);
  const location=useLocation();
  const ride=location.state?.ride;

  useGSAP(function () {
    if (finishRide) {
      gsap.to(finishRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  },[finishRide]);
  return (
    <div className=" h-screen relative  overflow-hidden">
      <div className="flex absolute top-3 left-3">
        <img
          className="h-15 translate-x-[-10%] mb-7"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="logo"
        />
        <div className="translate-x-[-60%] translate-y-[20%]">
          <ArrowRight size={28} strokeWidth={2.7} />
        </div>
      </div>
      <div className="h-4/5 w-screen">
        <img
          className="h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div
        onClick={() => {
          setFinishRide(true);
        }}
        className="h-1/5 bg-[#fed32a] px-6 py-2 "
      >
        <h2 className="text-center -mt-1">
          <i className="text-2xl font-semibold ri-arrow-up-wide-line"></i>
        </h2>
        <div className="flex justify-between items-center mt-3">
          <h2 className="text-xl font-semibold">Click to Finish</h2>
          <button className=" bg-green-600 text-white p-3 px-8 text-lg font-medium rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>
      <div
        ref={finishRideRef}
        className="fixed z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full"
      >
        <FinishRide ride={ride} setFinishRide={setFinishRide}/>
      </div>
    </div>
  );
};

export default CaptainRiding;
