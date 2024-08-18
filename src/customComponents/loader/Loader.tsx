import { cn } from "@/lib/utils";

export const Loader = ({
  size = "small",
}: {
  size: "small" | "medium" | "large";
}) => {
  return (
    <div
      className={cn(
        "rounded-full border-8 border-t-transparent border-b-transparent border-l-transparent border-r-blue-400 animate-spin",
        size === "small" && "w-8 h-8",
        size === "medium" && "w-16 h-16",
        size === "large" && "w-24 h-24"
      )}
    ></div>
  );
};
