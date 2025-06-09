import React from "react";
import { ArrowLeft } from "lucide-react";

interface OpenSidebarButtonProps {
  onOpen: () => void;
}

const OpenSidebarButton: React.FC<OpenSidebarButtonProps> = ({ onOpen }) => {
  return (
    <button
      onClick={onOpen}
      className="fixed top-1/4 transform -translate-y-1/2 right-0 z-50 p-3 text-white rounded-l-md shadow-lg bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] transition-colors duration-200 cursor-pointer"
      aria-label="Open sidebar"
      type="button"
    >
      <ArrowLeft size={24} />
    </button>
  );
};

export default OpenSidebarButton;
