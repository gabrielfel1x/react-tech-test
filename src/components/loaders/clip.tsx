import { ClipLoader } from "react-spinners";

export default function ClipLoaderComponent({
  size = 40,
  color = "var(--primary-foreground)",
}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-card gap-4">
      <ClipLoader color={color} size={size} />
      <span className="text-card-foreground text-sm font-medium">
        Loading recipes
      </span>
    </div>
  );
}
