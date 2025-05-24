import { Spinner } from "./Spinner";

type LoadingScreenProps = {
  message?: string;
  fullScreen?: boolean;
  className?: string;
  spinnerSize?: "sm" | "md" | "lg";
};

export const LoadingScreen = ({
  message = "Cargando...",
  fullScreen = true,
  className = "",
  spinnerSize = "md",
}: LoadingScreenProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "h-screen w-full" : "h-full w-full"
      } ${className}`}
    >
      <Spinner size={spinnerSize} />
      <p className="text-gray-600 animate-pulse">{message}</p>
    </div>
  );
};