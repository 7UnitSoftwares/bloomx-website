import Container from "./Container";

const Banner = () => {
  return (
    <Container>
      <div className=" mx-auto">
        <div
          className={` bg-[#008C95] rounded-3xl relative  mt-16 pb-16
             lg:bg-contain bg-cover  flex justify-center 
            items-start lg:p-16 p-5 flex-col lg:gap-12 gap-5   
            bg-no-repeat mx-auto`}
        >
          <div className="absolute inset-0 z-0 bg-grid-banner opacity-90"></div>
          <h1 className="text-[#F3FDFD] font-semibold lg:text-4xl">
            Ready to Get Started?
          </h1>
          <p className="text-[#F3FDFD] font-semibold lg:text-2xl">
            Book a tour of our coworking space today and discover how Bloom can{" "}
            <br />
            support your work and creativity
          </p>
          <button
            type="button"
            className="focus:outline-none rounded-xl bg-white text-[#00A896] hover:scale-95 duration-300 py-2 px-4"
          >
            Register Now
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Banner;
