import { useContext } from 'react';
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
  const {CaptainData}=useContext(CaptainDataContext);
  return (
    <>
      <div className="flex items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0"
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TU9kZWwlMjBtZW58ZW58MHx8MHx8fDA%3D"
            alt=""
          />
          <h1 className="text-base sm:text-lg font-medium capitalize truncate">{CaptainData.fullname.firstname} {CaptainData.fullname.lastname}</h1>
        </div>  
        <div className="shrink-0 text-right">
          <h4 className="text-lg sm:text-xl font-bold">₹473</h4>
          <p className="text-xs sm:text-sm text-gray-700 -mt-1">Earned</p>
        </div>
      </div>
      <div className="flex bg-[#eee] rounded-lg justify-between gap-2 sm:gap-6 p-3 sm:p-5 mt-4 sm:mt-6">
        <div className="flex-1 items-center text-center">
          <i className="text-2xl sm:text-3xl ri-timer-2-line"></i>
          <h2 className="text-lg sm:text-xl font-medium">7.2</h2>
          <p className="text-xs sm:text-sm text-gray-700">Hours Online</p>
        </div>
        <div className="flex-1 items-center text-center">
          <i className="text-2xl sm:text-3xl ri-speed-up-line"></i>
          <h2 className="text-lg sm:text-xl font-medium">25</h2>
          <p className="text-xs sm:text-sm text-gray-700">Total Distance</p>
        </div>
        <div className="flex-1 items-center text-center">
          <i className="text-2xl sm:text-3xl ri-booklet-line"></i>
          <h2 className="text-lg sm:text-xl font-medium">13</h2>
          <p className="text-xs sm:text-sm text-gray-700">Total Jobs</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;