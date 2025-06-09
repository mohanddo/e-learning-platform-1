import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Announcement, AnnouncementComment } from "@/types/types";
import { getRelativeTimeFromNow } from "@/utils";
import { Button } from "../ui/button";
import { Trash2, Pencil } from "lucide-react";
import { useAppContext } from "@/context/context";

const profilePicsEndPoint =
  process.env.NEXT_PUBLIC_AZURE_STORAGE_PROFILE_PICS_CONTAINER_ENDPOINT;

interface AnnouncementCommentsProps {
  announcement: Announcement;
  setShowDeleteComponent: (boolean: boolean) => void;
  setCommentToBeDeleted: (comment: AnnouncementComment) => void;
  setShowUpdateComponent: (boolean: boolean) => void;
  setCommentToBeUpdated: (comment: AnnouncementComment) => void;
}

function AnnouncementComments({
  announcement,
  setShowDeleteComponent,
  setCommentToBeDeleted,
  setShowUpdateComponent,
  setCommentToBeUpdated,
}: AnnouncementCommentsProps) {
  const { student } = useAppContext();

  const isMounted = useRef<boolean | undefined>(undefined);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="mt-4 space-y-4 transition-all duration-700 ease-in-out transform translate-y-0 opacity-100">
      {announcement.announcementComments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-2">
          <Avatar className="w-7 h-7">
            <AvatarImage
              src={`${profilePicsEndPoint}/${comment.user.id}?${comment.user.sasTokenForReadingProfilePic}`}
            />
            <AvatarFallback className="bg-black text-white text-xs">
              {comment.user.firstName[0]}
              {comment.user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-sm bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <span className="text-black font-semibold">
                  {comment.user.firstName} {comment.user.lastName}
                </span>
                <span className="text-gray-500 text-xs">
                  {getRelativeTimeFromNow(comment.dateOfCreation)}
                </span>
              </div>
              {student?.id == comment.user.id && (
                <div>
                  <Button
                    className="p-0 shadow-none hover:bg-gray-300"
                    onClick={() => {
                      setCommentToBeUpdated(comment);
                      setShowUpdateComponent(true);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="p-0 shadow-none hover:bg-gray-300"
                    onClick={() => {
                      setCommentToBeDeleted(comment);
                      setShowDeleteComponent(true);
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              )}
            </div>
            <p className="mt-1 text-gray-700">{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnnouncementComments;
