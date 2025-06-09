import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Announcement, AnnouncementComment, Course } from "@/types/types";
import { getRelativeTimeFromNow } from "@/utils";
import AnnouncementComments from "./AnnouncementComments";
import CommentInput from "./CommentInput";
// import { useAppContext } from "@/context/context";
import DeleteAnnouncementComment from "./DeleteAnnouncementComment";
import UpdateAnnouncementComment from "./UpdateAnnouncementComment";
import { useCourse } from "@/context/CourseContext";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

function AnnouncementC({ announcement }: { announcement: Announcement }) {
  const [showComments, setShowComments] = useState(false);
  // const [announcementState, setAnnouncement] = useState(announcement);
  // const { student } = useAppContext();
  const { refetch, course } = useCourse();
  const isMounted = useRef<boolean | undefined>(undefined);
  const [showDeleteComponent, setShowDeleteComponent] = useState(false);
  const [showUpdateComponent, setShowUpdateComponent] = useState(false);
  const [commentToBeDeleted, setCommentToBeDeleted] =
    useState<AnnouncementComment | null>(null);
  const [commentToBeUpdated, setCommentToBeUpdated] =
    useState<AnnouncementComment | null>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     setAnnouncement(announcement);
  //   }
  // }, [announcement]);

  return (
    <div
      className="space-y-4 border-b pb-8 border-gray-300"
      key={announcement.id}
    >
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={`${profilePicsEndPoint}/${course!.teacher.id}?${
              course!.teacher.sasTokenForReadingProfilePic
            }`}
          />
          <AvatarFallback className="bg-black text-white text-md">
            {course!.teacher.firstName[0]}
            {course!.teacher.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-sm">
          <span className="text-[var(--addi-color-400)] font-semibold underline">
            {course!.teacher.firstName} {course!.teacher.lastName}
          </span>
          <span className="text-gray-500">
            {" "}
            has posted an announcement •{" "}
            {getRelativeTimeFromNow(announcement.dateOfCreation)}
          </span>
        </div>
      </div>

      {/* Simplified Announcement Text Content */}
      <p className="mt-4 text-gray-700 leading-relaxed">{announcement.text}</p>

      <div className="mt-4">
        {/* This is where the comment input and comments would go */}
        <CommentInput
          onPost={async (comment) => {
            // const announcementComment: AnnouncementComment = {
            //   id: -1,
            //   text: comment,
            //   dateOfCreation: new Date().toString(),
            //   user: {
            //     id: student!.id,
            //     firstName: student!.firstName,
            //     lastName: student!.lastName,
            //     hasProfilePic: student!.hasProfilePic,
            //     sasTokenForReadingProfilePic:
            //       student!.sasTokenForReadingProfilePic,
            //   },
            // };

            // const newAnnouncementComments = [
            //   ...announcementState.announcementComments,
            //   announcementComment,
            // ];
            // setAnnouncement({
            //   ...announcementState,
            //   announcementComments: newAnnouncementComments,
            // });
            await refetch();
          }}
          announcementId={announcement.id}
          courseId={course!.id}
        />
      </div>

      {/* Show Comments Link/Button (appears once) */}
      {announcement.announcementComments.length > 0 && (
        <button
          onClick={() => setShowComments(!showComments)}
          className="block w-fit text-lg font-bold text-black border-b-2 border-[var(--addi-color-400)] pb-1 cursor-pointer hover:border-[var(--addi-color-500)] transition-colors duration-200 mt-4"
        >
          {showComments ? "Hide" : "Show"} comments (
          {announcement.announcementComments.length})
        </button>
      )}

      <div
        className={`transition-all duration-700 ease-in-out transform ${
          showComments
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        {showComments && (
          <AnnouncementComments
            announcement={announcement}
            setShowDeleteComponent={setShowDeleteComponent}
            setCommentToBeDeleted={setCommentToBeDeleted}
            setShowUpdateComponent={setShowUpdateComponent}
            setCommentToBeUpdated={setCommentToBeUpdated}
          />
        )}
      </div>
      {showDeleteComponent && (
        <DeleteAnnouncementComment
          comment={commentToBeDeleted!}
          announcementId={announcement.id}
          courseId={course!.id}
          onClose={() => {
            if (isMounted) {
              setShowDeleteComponent(false);
              setCommentToBeDeleted(null);
            }
          }}
          onDelete={async () => {
            if (isMounted) {
              setShowDeleteComponent(false);
              setCommentToBeDeleted(null);
            }
            await refetch();
          }}
        />
      )}
      {showUpdateComponent && (
        <UpdateAnnouncementComment
          comment={commentToBeUpdated!}
          announcementId={announcement.id}
          courseId={course!.id}
          onClose={() => {
            if (isMounted) {
              setShowUpdateComponent(false);
              setCommentToBeUpdated(null);
            }
          }}
          onUpdate={async () => {
            if (isMounted) {
              setShowUpdateComponent(false);
              setCommentToBeUpdated(null);
            }
            await refetch();
          }}
        />
      )}
    </div>
  );
}

export default AnnouncementC;
