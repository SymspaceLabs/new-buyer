// ===================================================================
// Glassmorphic Banner
// ===================================================================

export default function GlassBanner({
    title,
    subtitle,
    btnText,
    onClick,
    className = ''
}) {
  return (
    <div className={`w-full ${className}`}>
        <div className="relative rounded-[30px] p-6 sm:p-10 overflow-hidden bg-white/35 backdrop-blur-[10px]"
          style={{
            boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
                        inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
                        inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
                        inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
                        inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`
          }}
        >
            <div className="flex flex-col sm:flex-row justify-between gap-2">
                <div className="flex flex-col">
                    <h1 className="text-[20px] sm:text-[40px] text-white pb-1">
                        {title}
                    </h1>
                    <p className="text-[14px] sm:text-[18px] text-white max-w-[850px]">
                        {subtitle}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center w-full sm:max-w-[350px]">
                    <button 
                        onClick={onClick}
                        className="w-full sm:w-auto px-8 py-3 rounded-[25px] bg-white text-black font-medium text-base uppercase transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}