import React from "react";

const Eventcard = ({ item }) => {
  return (
    <div className="flex flex-col shadow-xl rounded-3xl justify-between items-stretch lg:max-w-96 gap-3 h-full">
      <div className="px-3 flex flex-col h-full w-full">
        <div className="flex justify-between w-full px-2 h-8">
          <p className="text-[#00A896] font-semibold line-clamp-1">{item?.date}</p>
        </div>
        <div className="flex flex-col flex-grow w-full px-2">
          <p className="text-black font-semibold text-lg mb-2 line-clamp-2">{item?.title}</p>
          <p className="flex-grow line-clamp-3">{item?.description}</p>
        </div>
        <div className="w-full p-2">
          <button
            type="button"
            className="focus:outline-none w-full rounded-xl text-white bg-[#008C95] hover:scale-95 duration-300 py-2 px-4"
          >
            Prenota ora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Eventcard;
