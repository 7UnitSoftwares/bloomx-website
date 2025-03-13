// components/TestimonialCard.js
import Image from "next/image";
// Removed the FaMapMarkerAlt import as it's no longer needed

const TestimonialCard = ({ data }) => {
  return (
    <a
      href="https://maps.app.goo.gl/mXWKwW4m24KTEdDB9"
      target="_blank"
      rel="noopener noreferrer"
      className="block max-w-sm mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex gap-2 justify-center items-center">
            <Image
              src={data.profilePic}
              alt={`${data.name}'s profile`}
              width={48}
              height={48}
              className="rounded-full h-12 w-12 border-gray-200"
            />
            <div>
              <h3 className="text-lg font-semibold">{data.name}</h3>
              <p className="text-sm text-gray-500">{data.location}</p>
            </div>
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < data.rating ? "text-teal-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.373 2.448a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.373-2.448a1 1 0 00-1.175 0L5.924 16.01c-.785.57-1.84-.197-1.54-1.118l1.286-3.95a1 1 0 00-.364-1.118L1.933 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.95z" />
              </svg>
            ))}
          </div>
        </div>

        <p className="text-gray-600">{data.review}</p>
        <p className="text-right text-sm text-gray-400">{data.date}</p>
      </div>
    </a>
  );
};

export default TestimonialCard;
