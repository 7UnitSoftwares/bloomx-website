import React from "react";

const Eventcard = ({ item }) => {
  return (
    <div className="flex flex-col shadow-xl rounded-3xl justify-center items-center lg:max-w-96 gap-3">
      <div>
        <img src={item?.icon} alt="" />
      </div>
      <div className="flex justify-between w-full px-2">
        <p className="text-[#00A896] font-semibold rounded-full">{item.type}</p>
        <p className="text-[#00A896] font-semibold">{item?.date}</p>
      </div>
      <div className=" w-full px-2">
        <p className="text-black font-semibold text-lg ">{item?.title}</p>
      </div>
      <div className="px-2 ">
        <p>{item?.description}</p>
      </div>
      <div className="w-full p-2 mb-2">
        <button
          type="button"
          className="focus:outline-none w-full rounded-xl text-white bg-[#008C95] hover:scale-95 duration-300 py-2 px-4"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Eventcard;
