function Spinner(props) {
  const style = {
    transform: `translateY(-50%) rotate(${props.angle}deg)`,
    transformOrigin: "bottom",
  };

  return (
    <>
      <img src="/needle-dark.svg" style={style} alt="Needle" />
      <img
        src="/wheel-center-light.webp"
        width={80}
        height={80}
        className="absolute w-[80px] h-[80px]"
        alt="Needle"
      />
    </>
  );
}

export default Spinner;
