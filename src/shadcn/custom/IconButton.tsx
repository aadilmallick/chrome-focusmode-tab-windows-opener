import { ButtonProps } from "@/components/ui/button";

const IconButton = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <button className="p-0 bg-none border-none" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
