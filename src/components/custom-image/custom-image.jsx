export const CustomImage = ({ src, alt, width, height }) => {
  return (
    <div className="img">
      <img src={src} alt={alt} width={width} height={height} />
    </div>
  );
};