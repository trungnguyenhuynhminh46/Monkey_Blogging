import React, { useState } from "react";

const Image = ({ src, alt, classname, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const handleError = () => {
    setImgSrc("/image-placeholder.png");
  };
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={classname}
      onError={handleError}
      {...props}
    />
  );
};

export default Image;
