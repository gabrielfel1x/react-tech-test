// loader skeleton (mostra o esqueleto de um card enquanto os renderiza)
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonCard() {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Skeleton height={160} className="mb-2" />
      <Skeleton width="80%" height={24} />
      <Skeleton width="60%" height={16} />
    </div>
  );
}
