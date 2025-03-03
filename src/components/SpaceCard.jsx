import Image from "next/image";

const SpaceCard = ({ item }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-xl max-w-96">
      <Image
        src={item.src}
        className="w-full 96 object-cover rounded-xl"
        alt={item.alt || "Space Image"}
        height={250}
        width={150}
      />
      <div className="flex flex-col mt-5 gap-2">
        <h1 className="text-xl font-semibold text-[#00A59B]">{item.title}</h1>
        <p className="text-md font-medium text-[#373737]">{item.description}</p>
      </div>
    </div>
  );
};

export default SpaceCard;
