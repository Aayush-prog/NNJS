const HeroSection = ({ image, title, body }) => {
  const api = import.meta.env.VITE_URL;
  return (
    <div
      className="relative h-[40vh] sm:h-[50vh] md:h-[75vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${api}/images/${image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-center px-4 space-y-4 sm:space-y-6 md:space-y-10">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-secondary leading-tight">
          {title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-primary">
          {body}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
