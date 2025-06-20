import React, { useEffect } from "react";
import ReactDOM from "react-dom";

interface NotificationProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  duration = 1000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return ReactDOM.createPortal(
    <span className="text-[#C10007]">
      {"    "}
      {message}
    </span>,
    document.getElementById("notEnoughMana")!,
  );
};

export const BACKEND_URL: string =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const urlOf = (endpoint: string): string => {
  return `${BACKEND_URL}${endpoint}`;
};
