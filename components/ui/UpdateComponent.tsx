import React, { useEffect, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseMutationResult } from "@tanstack/react-query";

interface UpdateComponentProps {
  onClose: () => void;
  mutation: UseMutationResult<void, Error, void, unknown>;
  title: string;
  text: string;
  placeHolder: string;
  onChange: (text: string) => void;
}

const UpdateComponent: React.FC<UpdateComponentProps> = ({
  onClose,
  onChange,
  title,
  text,
  placeHolder,
  mutation,
}) => {
  const isMounted = useRef(false);

  const [newComment, setNewComment] = useState(text);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[950] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-4 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-lg font-bold">{title}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-all duration-200 cursor-pointer"
            aria-label="Close review modal"
          >
            <X size={24} />
          </Button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <textarea
            className="w-full min-h-[100px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeHolder}
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              onChange(e.target.value);
            }}
          />
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-4">
          <Button
            variant="ghost"
            className="text-[var(--addi-color-500)] font-bold"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className={`bg-[var(--addi-color-500)] text-white font-bold hover:bg-[var(--addi-color-400)]
                ${mutation.isPending ? "opacity-50" : ""}
              `}
            onClick={() => {
              if (newComment.length > 1) {
                mutation.mutate();
              }
            }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateComponent;
