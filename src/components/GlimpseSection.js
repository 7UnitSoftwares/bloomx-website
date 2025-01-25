// components/GlimpseSection.js
import Image from "next/image";
import Container from "./Container";

export default function GlimpseSection() {
  return (
    <Container className="">
      <h2 className="lg:text-4xl text-xl mt-6 mb- font-semibold mb-7 text-teal-500">
        A Glimpse Inside
      </h2>
      <div className="flex gap-2">
        <div>
          <img src="/images/image1.png" className="" alt="" />
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <img src="/images/image2.png" alt="" />
          </div>
          <div className="flex gap-2">
            <div>
              <img src="/images/image3.png" alt="" />
            </div>
            <div>
              <img src="/images/image4.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
