import React from "react";

const LookingForDriver = (props) => {
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
        <img
          className="h-28"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt=""
        />
      </div>
      <div className="w-full border-b flex gap-3 items-center py-3 px-2">
        <div>
          <i className="text-2xl ri-map-pin-user-line"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">526/64-A</h3>
          <p className="text-sm text-gray-700">Gandhinagar Jaipur</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2 border-b">
        <div>
          <i className="text-2xl ri-map-pin-fill"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">H14/64-D</h3>
          <p className="text-sm text-gray-700">MNIT Jaipur</p>
        </div>
      </div>
      <div className="w-full flex gap-3 items-center py-3 px-2">
        <div>
          <i className="text-2xl ri-cash-line"></i>
        </div>
        <div>
          <h3 className="font-medium text-lg">₹ 193.20</h3>
          <p className="text-sm text-gray-700">Payment Cash</p>
        </div>
      </div>
      <div>
      </div>
    </>
  );
};

export default LookingForDriver;
