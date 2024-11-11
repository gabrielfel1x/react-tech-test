import { ClipLoader } from "react-spinners";

export default function ClipLoaderComponent({ size = 40, color = "black" }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-card gap-4">
      <ClipLoader color={color} size={size} />
      <span>Carregando receitas</span>
    </div>
  );
}
