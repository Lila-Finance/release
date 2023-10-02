const TimeStamps = ({ Countnumber, content }) => {
  const formatWithLeadingZero = (value) => value.toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-black text-base md:text-lg leading-none">
        {formatWithLeadingZero(Countnumber)}
      </h1>

      <p className="text-black text-[10px] lg:-mt-[6px]">{content}</p>
    </div>
  );
};

export default TimeStamps;
