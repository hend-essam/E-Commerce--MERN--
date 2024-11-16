const Logo = ({ hideWord = false }) => {
  return (
    <div className="flex justify-between items-center h-[61px]">
      <div className="flex items-center">
        <div className="flex flex-col items-end mb-[-7px]">
          <span
            className="w-5 h-5"
            style={{
              borderRadius: "0 100% 0 100% / 0 100% 0 100%",
              background: "linear-gradient(to bottom, #E6DBD7, #8b684c)",
            }}
          ></span>
          <span
            className="w-[30px] h-[30px]"
            style={{
              borderRadius: "0 100% 0 100% / 0 100% 0 100%",
              background: "linear-gradient(to bottom, #E6DBD7, #8b684c)",
              transform: "rotateX(180deg)",
            }}
          ></span>
        </div>
        {!hideWord && (
          <h2 className="ml-[3px] text-2xl font-bold hidden md:block">
            Furniture
          </h2>
        )}
      </div>
    </div>
  );
};

export default Logo;
