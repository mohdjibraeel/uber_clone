
const CaptainDetails = () => {
  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TU9kZWwlMjBtZW58ZW58MHx8MHx8fDA%3D"
            alt=""
          />
          <h1 className="text-lg font-medium">MS Dhoni</h1>
        </div>
        <div>
          <h4 className=" text-xl font-bold">₹473</h4>
          <p className="text-sm text-gray-700 -mt-1">Earned</p>
        </div>
      </div>
      <div className="flex bg-[#eee] rounded-lg justify-center gap-6 p-5 mt-6">
        <div className="items-center text-center">
          <i className="text-3xl ri-timer-2-line"></i>
          <h2 className="text-xl font-medium">7.2</h2>
          <p className="text-sm text-gray-700">Hours Online</p>
        </div>
        <div className="items-center text-center">
          <i className="text-3xl ri-speed-up-line"></i>
          <h2 className="text-xl font-medium">25</h2>
          <p className="text-sm text-gray-700">Total Distance</p>
        </div>
        <div className="items-center text-center">
          <i className="text-3xl ri-booklet-line"></i>
          <h2 className="text-xl font-medium">13</h2>
          <p className="text-sm text-gray-700">Total Jobs</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;
