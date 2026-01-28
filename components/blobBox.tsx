"use client";

export const BlobBox = ({
  top = null,
  right = null,
  bottom = null,
  left = null,
  background = "#0366FE",
  displayNoneMobile = false,
  widthHeight = '500px',
}) => {
  return (
    <div
      className={`${displayNoneMobile ? 'hidden sm:block' : 'block'} absolute rounded-full filter blur-[75px] opacity-50 animate-blob`}
      style={{
        top,
        right,
        bottom,
        left,
        width: widthHeight,
        height: widthHeight,
        background,
      }}
    />
  );
};

// Tailwind animation in globals.css or tailwind.config.js
/*
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}
*/
