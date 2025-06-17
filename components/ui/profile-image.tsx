import Image from "next/image";

interface ProfileImageProps {
  src: string;
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg" | "elg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  elg: "w-24 h-24",
};

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  elg: "text-2xl",
};

const sizePixels = {
  sm: 32,
  md: 40,
  lg: 48,
  elg: 100, // or whatever pixel size you want for 'elg'
};

const ProfileImage = ({
  src,
  firstName,
  lastName,
  size = "md",
  className = "",
}: ProfileImageProps) => {
  return (
    <div
      className={`relative ${sizeClasses[size]} overflow-hidden ${className}  shrink-0`}
    >
      <Image
        src={src}
        alt={`${firstName} ${lastName}`}
        width={sizePixels[size]}
        height={sizePixels[size]}
        className="rounded-full object-cover w-full h-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          target.nextElementSibling?.classList.remove("hidden");
        }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center bg-black text-white rounded-full hidden ${textSizeClasses[size]}`}
      >
        {firstName[0]}
        {lastName[0]}
      </div>
    </div>
  );
};

export default ProfileImage;
