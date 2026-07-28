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
    <div className="h-screen relative overflow-hidden">
      <div className="flex items-center gap-2 absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
        <img
          className="h-8 sm:h-10 md:h-12"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="logo"
        />
        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.7} />
      </div>
      <div className="h-4/5 w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div
        onClick={() => {
          setFinishRide(true);
        }}
        className="h-1/5 bg-[#fed32a] px-4 sm:px-6 py-2 cursor-pointer"
      >
        <h2 className="text-center -mt-1">
          <i className="text-2xl font-semibold ri-arrow-up-wide-line"></i>
        </h2>
        <div className="flex justify-between items-center gap-3 mt-2 sm:mt-3">
          <h2 className="text-base sm:text-xl font-semibold truncate">Click to Finish</h2>
          <button className="shrink-0 bg-green-600 text-white p-2 sm:p-3 px-4 sm:px-8 text-sm sm:text-lg font-medium rounded-lg active:scale-95 transition-transform">
            Complete Ride
          </button>
        </div>
      </div>
      <div
        ref={finishRideRef}
        className="fixed inset-x-0 mx-auto z-10 bottom-0 translate-y-full bg-white px-3 py-8 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
      >
        <FinishRide ride={ride} setFinishRide={setFinishRide}/>
      </div>
    </div>
  );
};

export default CaptainRiding;