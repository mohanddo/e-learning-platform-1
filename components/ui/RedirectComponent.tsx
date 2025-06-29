"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface RedirectComponentProps {
  message?: string;
  redirectTo?: string;
  delay?: number;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  onRedirect?: () => void;
  variant?: "default" | "warning" | "error";
}

const RedirectComponent: React.FC<RedirectComponentProps> = ({
  message = "You don't have access to this page",
  redirectTo = "/",
  delay = 3000,
  showBackButton = true,
  showHomeButton = true,
  onRedirect,
  variant = "warning",
}) => {
  const router = useRouter();

  const [delayState, setDelayState] = useState<number>(delay);

  useEffect(() => {
    if (delayState > 0) {
      const timer = setTimeout(
        () => setDelayState((prev) => prev - 1000),
        1000
      );

      return () => clearTimeout(timer);
    } else {
      if (onRedirect) {
        onRedirect();
      } else {
        router.push(redirectTo);
      }
    }
  }, [redirectTo, delay, router, onRedirect, delayState]);

  const getVariantStyles = () => {
    switch (variant) {
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "error":
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-blue-600" />;
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className={`max-w-md w-full mx-4 p-6 rounded-lg border ${getVariantStyles()}`}
      >
        <div className="flex items-center justify-center mb-4">{getIcon()}</div>

        <h2 className="text-xl font-semibold text-center mb-2">
          Access Denied
        </h2>

        <p className="text-center mb-6">{message}</p>

        <div className="text-center text-sm mb-6">
          Redirecting in {Math.ceil(delayState / 1000)} seconds...
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showBackButton && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}

          {showHomeButton && (
            <Button onClick={handleHome} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RedirectComponent;
