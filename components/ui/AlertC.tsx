import { Alert } from "@mui/material";
import toast from "react-hot-toast";

interface AlertCProps {
  severity: "success" | "error" | "info" | "warning";
  message: string;
}

const AlertC: React.FC<AlertCProps> = ({ severity, message }) => {
  return (
    <Alert severity={severity} variant="filled" className="whitespace-nowrap">
      {message}
    </Alert>
  );
};

export default function showAlert(
  severity: "success" | "error" | "info" | "warning",
  message: string
) {
  toast(<AlertC severity={severity} message={message} />, {
    style: {
      background: "transparent",
      boxShadow: "none",
      padding: 0,
      borderRadius: 0,
    },
    duration: 4000,
  });
}
