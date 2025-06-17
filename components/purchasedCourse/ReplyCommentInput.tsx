import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import ProfileImage from "@/components/ui/profile-image";
import { useAppContext } from "@/context/context";
import { useCourse } from "@/context/CourseContext";
import { useCreateOrUpdateReplyCommentMutation } from "@/hooks/useCreateOrUpdateReplyCommentMutation";
const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

interface ReplyCommentInputProps {
  onPost: (comment: string) => void;
  commentId: number;
  resourceId: number;
  chapterId: number;
}

const ReplyCommentInput: React.FC<ReplyCommentInputProps> = ({
  onPost,
  commentId,
  resourceId,
  chapterId,
}) => {
  const [comment, setComment] = useState("");
  const { student } = useAppContext();
  const { course } = useCourse();
  const handleSubmit = () => {
    if (comment.trim()) {
      postReplyCommentMutation.mutate();
    }
  };

  const isMounted = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const postReplyCommentMutation = useCreateOrUpdateReplyCommentMutation({
    createOrUpdateReplyCommentRequest: {
      text: comment,
      commentId: commentId,
      replyCommentId: null,
      resourceId: resourceId,
      chapterId: chapterId,
      courseId: course!.id,
    },
    onSuccess() {
      onPost(comment);
      setComment("");
    },
    onError() {
      if (isMounted.current) {
        alert("There is a problem, please try again");
      }
    },
  });

  return (
    <div className="flex items-center space-x-2 border rounded p-2 focus-within:ring-1">
      <div className="flex-shrink-0">
        {/* Placeholder for user avatar - you can replace with actual avatar */}

        <ProfileImage
          src={`${profilePicsEndPoint}/${student!.id}?${
            student!.sasTokenForReadingProfilePic
          }`}
          firstName={student!.firstName}
          lastName={student!.lastName}
          className="mr-2"
          size="sm"
        />
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
        disabled={postReplyCommentMutation.isPending}
      >
        {postReplyCommentMutation.isPending ? (
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

export default ReplyCommentInput;
