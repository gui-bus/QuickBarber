import { ClipLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex min-h-screen w-full flex-grow flex-col items-center justify-center bg-[url('/capa.png')] bg-cover bg-center bg-no-repeat">
      <ClipLoader color="#3B82F6" size={40} />
    </div>
  );
};

export default Loading;
