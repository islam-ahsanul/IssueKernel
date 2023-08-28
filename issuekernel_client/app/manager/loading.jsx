const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50  bg-steel-blue-5/80">
      <p className="text-gray-500 font-semibold text-xl tracking-widest pl-60 uppercase">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
