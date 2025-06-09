import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from "@/context/context";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { CreateOrUpdateAnnouncementComment } from "@/types/request";
const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

interface CommentInputProps {
  onPost: (comment: string) => void;
  announcementId: number;
  courseId: number;
}

const CommentInput: React.FC<CommentInputProps> = ({
  onPost,
  announcementId,
  courseId,
}) => {
  const [comment, setComment] = useState("");
  const { student } = useAppContext();
  const handleSubmit = () => {
    if (comment.trim()) {
      const request: CreateOrUpdateAnnouncementComment = {
        comment: comment,
        announcementId: announcementId,
        courseId: courseId,
        commentId: null,
      };
      postAnnouncementCommentMutation.mutate(request);
    }
  };

  const isMounted = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const postAnnouncementCommentMutation = useMutation({
    mutationFn: async (
      createOrUpdateAnnouncementComment: CreateOrUpdateAnnouncementComment
    ) => {
      await courseApi.postAnnouncementComment(
        createOrUpdateAnnouncementComment
      );
    },
    onSuccess() {
      onPost(comment);
      setComment("");
    },
    onError() {
      if (isMounted) {
        alert("There is a problem, please try again");
      }
    },
  });

  return (
    <div className="flex items-center space-x-2 border rounded p-2 focus-within:ring-1">
      <div className="flex-shrink-0">
        {/* Placeholder for user avatar - you can replace with actual avatar */}

        <Avatar className="w-8 h-8 mr-2">
          <AvatarImage
            src={`${profilePicsEndPoint}/${student?.id}?${student?.sasTokenForReadingProfilePic}`}
          />
          <AvatarFallback className="bg-black text-white text-md">
            {student?.firstName[0]}
            {student?.lastName[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <input
        type="text"
        placeholder="Enter Your comment"
        className="flex-1 p-1 border-none focus:outline-none focus:ring-0 text-base focus:bo"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <Button
        className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-sm font-semibold h-8"
        onClick={handleSubmit}
        disabled={postAnnouncementCommentMutation.isPending}
      >
        {postAnnouncementCommentMutation.isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Posting
          </>
        ) : (
          "Post"
        )}
      </Button>
    </div>
  );
};

export default CommentInput;
