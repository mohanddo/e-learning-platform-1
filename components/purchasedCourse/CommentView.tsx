import React, { useRef, useEffect, useState } from "react";
import { X, CircleArrowUp, MoreVertical } from "lucide-react";
import ProfileImage from "@/components/ui/profile-image";
import { Comment, ReplyComment, Resource } from "@/types/types";
import {
  getRelativeTimeFromNow,
  updateCommentInCourse,
  updateReplyCommentInCourse,
} from "@/utils";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { courseApi } from "@/api/course.api";
import { useCourse } from "@/context/CourseContext";
import ReplyCommentInput from "./ReplyCommentInput";
import { findChapterId } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteComponent from "../ui/DeleteComponent";
import UpdateComponent from "../ui/UpdateComponent";
import { useCreateOrUpdateReplyCommentMutation } from "@/hooks/useCreateOrUpdateReplyCommentMutation";
import { useCreateOrUpdateCommentMutation } from "@/hooks/useCreateOrUpdateCommentMutation";
import showAlert from "../ui/AlertC";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

interface CommentViewProps {
  comment: Comment;
  resource: Resource;
  onClose: () => void;
  onReplyCommentPosted: () => void;
  role: "student" | "teacher";
}

const CommentView: React.FC<CommentViewProps> = ({
  comment,
  resource,
  onClose,
  onReplyCommentPosted,
  role,
}) => {
  const { course, refetch, setCourse } = useCourse();
  const isMounted = useRef<boolean | undefined>(undefined);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);
  const [replyCommentToDelete, setReplyCommentToDelete] =
    useState<ReplyComment | null>(null);
  const [commentToUpdate, setCommentToUpdate] = useState<Comment | null>(null);
  const [replyCommentToUpdate, setReplyCommentToUpdate] =
    useState<ReplyComment | null>(null);
  const [question, setQuestion] = useState<string | null>(null);
  const [reply, setReply] = useState<string | null>(null);

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
    onSuccess: () => {
      setCourse((prevCourse) => {
        if (!prevCourse) return prevCourse;
        return updateCommentInCourse(prevCourse, comment.id, (c) => {
          c.upVotes = c.upVotes + 1;
          c.hasCurrentUserUpVotedThisComment = true;
        });
      });
    },
  });

  const removeUpVoteCommentMutation = useMutation({
    mutationFn: async () => {
      await courseApi.removeUpVoteComment(comment.id);
    },
    onSuccess: () => {
      setCourse((prevCourse) => {
        if (!prevCourse) return prevCourse;
        return updateCommentInCourse(prevCourse, comment.id, (c) => {
          c.upVotes = c.upVotes - 1;
          c.hasCurrentUserUpVotedThisComment = false;
        });
      });
    },
  });

  const upVoteReplyCommentMutation = useMutation({
    mutationFn: async (replyCommentId: number) => {
      await courseApi.upVoteReplyComment({
        commentId: comment.id,
        resourceId: resource.id,
        courseId: course!.id,
        replyCommentId: replyCommentId,
        chapterId: findChapterId(resource, course?.chapters)!,
      });
    },
    onSuccess: (_data, replyCommentId) => {
      setCourse((prevCourse) => {
        if (!prevCourse) return prevCourse;
        return updateReplyCommentInCourse(prevCourse, replyCommentId, (c) => {
          c.upVotes = c.upVotes + 1;
          c.hasCurrentUserUpVotedThisReplyComment = true;
        });
      });
    },
  });

  const removeUpVoteReplyCommentMutation = useMutation({
    mutationFn: async (replyCommentId: number) => {
      await courseApi.removeUpVoteReplyComment(replyCommentId);
    },
    onSuccess: (_data, replyCommendId) => {
      setCourse((prevCourse) => {
        if (!prevCourse) return prevCourse;
        return updateReplyCommentInCourse(prevCourse, replyCommendId, (c) => {
          c.upVotes = c.upVotes - 1;
          c.hasCurrentUserUpVotedThisReplyComment = false;
        });
      });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      await courseApi.deleteComment(comment.id);
    },
    onSuccess: async () => {
      if (isMounted.current) {
        setCommentToDelete(null);
        onClose();
      }

      await refetch();
    },
    onError() {
      showAlert("warning", "Failed to delete the question. Please try again.");
    },
  });

  const deleteReplyCommentMutation = useMutation({
    mutationFn: async () => {
      await courseApi.deleteReplyComment(replyCommentToDelete!.id);
    },
    onSuccess: async () => {
      if (isMounted.current) {
        setReplyCommentToDelete(null);
      }
      await refetch();
    },
    onError() {
      if (isMounted.current) {
        setReplyCommentToDelete(null);
      }
      showAlert("warning", "Failed to delete the question. Please try again.");
    },
  });

  const updateCommentMutation = useCreateOrUpdateCommentMutation({
    onSuccess: async () => {
      if (isMounted.current) {
        setCommentToUpdate(null);
      }

      await refetch();
    },
    onError: () => {
      if (isMounted.current) {
        setCommentToUpdate(null);
      }

      showAlert("warning", "Failed to update question. Please try again.");
    },
    createOrUpdateCommentRequest: {
      text: question!,
      resourceId: resource.id,
      chapterId: findChapterId(resource, course?.chapters)!,
      courseId: course!.id,
      commentId: comment.id,
    },
  });

  const postReplyCommentMutation = useCreateOrUpdateReplyCommentMutation({
    createOrUpdateReplyCommentRequest: {
      text: reply!,
      commentId: comment.id,
      replyCommentId: replyCommentToUpdate ? replyCommentToUpdate.id : null,
      resourceId: resource.id,
      chapterId: findChapterId(resource, course?.chapters)!,
      courseId: course!.id,
    },
    onSuccess: async () => {
      if (isMounted.current) {
        setReplyCommentToUpdate(null);
      }
      await refetch();
    },
    onError() {
      showAlert(
        "warning",
        "Failed to post a reply. Please try again Please try again Please try again"
      );
    },
  });

  return (
    <div className="w-full bg-white pb-10 p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center pb-3 border-b mb-4">
        <h3 className="text-lg font-bold text-gray-900">Question & Answers</h3>
        <Button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={onClose}
          variant="ghost"
          size="icon"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-4">
        {/* Original Comment */}
        <div className="flex items-start space-x-4">
          <ProfileImage
            src={`${profilePicsEndPoint}/${comment.user.id}?${comment.user.sasTokenForReadingProfilePic}`}
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
            className="mr-2"
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              {comment.user.firstName} {comment.user.lastName} •{" "}
              <span className="text-gray-500 font-normal">
                {getRelativeTimeFromNow(comment.dateOfCreation)}
              </span>
            </p>
            <p className="text-gray-700 mt-1">{comment.text}</p>
          </div>
          <div className="flex items-center space-x-0 text-sm text-gray-500">
            <button
              className="cursor-pointer flex items-center"
              onClick={() => {
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
              <span className="text-[#2a2b3f] text-base">
                {comment.upVotes}
              </span>
              <CircleArrowUp
                size={20}
                className={`${
                  comment.hasCurrentUserUpVotedThisComment
                    ? "bg-[#2a2b3f] text-white rounded-full p-1 scale-110"
                    : "text-gray-500 hover:text-[#2a2b3f] hover:bg-gray-100"
                } transition-all duration-300 ease-in-out ml-1`}
              />
            </button>
            {comment.userOwnsThisComment && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-0 w-8 h-8 rounded-full hover:bg-gray-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setQuestion(comment.text);
                      setCommentToUpdate(comment);
                    }}
                  >
                    Update
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setCommentToDelete(comment);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Reply Section */}
        <div className="mt-6 pt-4">
          <h4 className="font-bold text-gray-800 mb-3">
            Replies{" "}
            <span className="text-gray-500 font-normal">
              ({comment.replyComments.length})
            </span>
          </h4>
          {comment.replyComments.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No replies yet. Be the first to answer!
            </p>
          ) : (
            comment.replyComments.map((reply) => (
              <div key={reply.id} className="flex items-start space-x-4 mt-4">
                <ProfileImage
                  src={`${profilePicsEndPoint}/${reply.user.id}?${reply.user.sasTokenForReadingProfilePic}`}
                  firstName={reply.user.firstName}
                  lastName={reply.user.lastName}
                  className="mr-2"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {reply.user.firstName} {reply.user.lastName}
                    {reply.user.role === "ROLE_TEACHER" &&
                      course?.ownsCourse && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Teacher
                        </span>
                      )}{" "}
                    •{" "}
                    <span className="text-gray-500 font-normal">
                      {getRelativeTimeFromNow(reply.dateOfCreation)}
                    </span>
                  </p>
                  <p className="text-gray-700 mt-1">{reply.text}</p>
                </div>
                <div className="flex items-center space-x-0 text-sm text-gray-500">
                  <button
                    className="cursor-pointer flex items-center"
                    onClick={() => {
                      if (reply.hasCurrentUserUpVotedThisReplyComment) {
                        removeUpVoteReplyCommentMutation.mutate(reply.id);
                      } else {
                        upVoteReplyCommentMutation.mutate(reply.id);
                      }
                    }}
                    disabled={
                      upVoteReplyCommentMutation.isPending ||
                      removeUpVoteReplyCommentMutation.isPending
                    }
                  >
                    <span className="text-[#2a2b3f] text-base">
                      {reply.upVotes}
                    </span>
                    <CircleArrowUp
                      size={20}
                      className={`${
                        reply.hasCurrentUserUpVotedThisReplyComment
                          ? "bg-[#2a2b3f] text-white rounded-full p-1 scale-110"
                          : "text-gray-500 hover:text-[#2a2b3f] hover:bg-gray-100"
                      } transition-all duration-300 ease-in-out ml-1`}
                    />
                  </button>
                  {reply.userOwnsThisReplyComment && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="p-0 w-8 h-8 rounded-full hover:bg-gray-100 !m-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setReply(reply.text);
                            setReplyCommentToUpdate(reply);
                          }}
                        >
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setReplyCommentToDelete(reply);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))
          )}

          <div className="mt-4">
            <ReplyCommentInput
              onPost={async () => {
                onReplyCommentPosted();
              }}
              commentId={comment.id}
              resourceId={resource.id}
              chapterId={findChapterId(resource, course?.chapters)!}
              role={role}
            />
          </div>
        </div>
      </div>

      {commentToDelete && (
        <DeleteComponent
          title="Delete Question"
          text="Are you sure you want to delete this Question"
          onClose={() => {
            setCommentToDelete(null);
          }}
          mutation={deleteCommentMutation}
        />
      )}

      {replyCommentToDelete && (
        <DeleteComponent
          title="Delete Reply"
          text="Are you sure you want to delete this Reply"
          onClose={() => {
            setReplyCommentToDelete(null);
          }}
          mutation={deleteReplyCommentMutation}
        />
      )}

      {commentToUpdate && (
        <UpdateComponent
          title="Update Question"
          text={commentToUpdate.text}
          placeHolder="Update your question here."
          onClose={() => {
            setCommentToUpdate(null);
          }}
          mutation={updateCommentMutation}
          onChange={(text: string) => setQuestion(text)}
        />
      )}

      {replyCommentToUpdate && (
        <UpdateComponent
          title="Update Reply"
          text={replyCommentToUpdate.text}
          onClose={() => {
            setReplyCommentToUpdate(null);
          }}
          mutation={postReplyCommentMutation}
          placeHolder="Update your reply here."
          onChange={(text: string) => {
            setReply(text);
          }}
        />
      )}
    </div>
  );
};

export default CommentView;
