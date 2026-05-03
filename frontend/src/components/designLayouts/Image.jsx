import React from "react";

const Image = ({ imgSrc, className, alt = "image" }) => {
  return (
    <img
      className={className}
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};

export default Image;
