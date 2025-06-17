import React, { useRef, useEffect } from "react";
import { MessagesSquare, CircleArrowUp } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import ProfileImage from "@/components/ui/profile-image";
import { Comment, Resource } from "@/types/types";
import { findChapterId, getRelativeTimeFromNow } from "@/utils";
import { useCourse } from "@/context/CourseContext";
import { courseApi } from "@/api/course.api";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

interface QAListItemProps {
  comment: Comment;
  resource: Resource;
  onCommentClick: (comment: Comment, resource: Resource) => void;
}

const QAListItem: React.FC<QAListItemProps> = ({
  comment,
  resource,
  onCommentClick,
}) => {
  const { course, setActiveResource, refetch } = useCourse();
  const isMounted = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const upVoteCommentMutation = useMutation({
    mutationFn: async () => {
      await courseApi.upVoteComment({
        commentId: comment.id,
        resourceId: resource.id,
        courseId: course!.id,
        chapterId: findChapterId(resource, course?.chapters)!,
      });
    },
    onSuccess: async () => {
      await refetch();
    },
    onError() {
      if (isMounted.current) {
        alert("Error up voting question");
      }
    },
  });

  const removeUpVoteCommentMutation = useMutation({
    mutationFn: async () => {
      await courseApi.removeUpVoteComment(comment.id);
    },
    onSuccess: async () => {
      await refetch();
    },
    onError() {
      if (isMounted.current) {
        alert("Error removing upVote");
      }
    },
  });

  return (
    <div className="border-b py-4 px-2 flex items-start space-x-4 hover:bg-gray-50 cursor-pointer">
      <div
        className="flex items-start space-x-4 w-full"
        onClick={() => onCommentClick(comment, resource)}
      >
        <ProfileImage
          src={`${profilePicsEndPoint}/${comment.user.id}?${comment.user.sasTokenForReadingProfilePic}`}
          firstName={comment.user.firstName}
          lastName={comment.user.lastName}
          className="mr-2"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{comment.text}</p>
          <p className="text-xs text-gray-500 mt-2">
            {comment.user.firstName} {comment.user.lastName} •{" "}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveResource(resource);
              }}
              className="text-[var(--addi-color-400)] hover:underline bg-transparent border-none p-0 cursor-pointer"
            >
              {resource.title}
            </button>{" "}
            • {getRelativeTimeFromNow(comment.dateOfCreation)}
          </p>
        </div>
        <div className="flex flex-col items-center space-y-1 text-gray-500 text-sm flex-shrink-0 gap-1">
          <button
            className="cursor-pointer flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              if (comment.hasCurrentUserUpVotedThisComment) {
                removeUpVoteCommentMutation.mutate();
              } else {
                upVoteCommentMutation.mutate();
              }
            }}
            disabled={
              upVoteCommentMutation.isPending ||
              removeUpVoteCommentMutation.isPending
            }
          >
            <span className="text-[#2a2b3f] text-base">{comment.upVotes}</span>
            <CircleArrowUp
              size={24}
              className={`${
                comment.hasCurrentUserUpVotedThisComment
                  ? "bg-[#2a2b3f] text-white rounded-full p-1 scale-110"
                  : "text-gray-500 hover:text-[#2a2b3f] hover:bg-gray-100"
              } transition-all duration-300 ease-in-out ml-1`}
            />
          </button>
          <button
            className="cursor-pointer flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              onCommentClick(comment, resource);
            }}
          >
            <span className="text-[#2a2b3f] text-base">
              {comment.replyComments.length}
            </span>
            <MessagesSquare
              size={24}
              className="text-gray-500 hover:text-[#2a2b3f] transition-colors ml-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QAListItem;
