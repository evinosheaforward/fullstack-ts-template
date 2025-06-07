import React, { useState, useCallback } from "react";
import { useObservable } from "mst-use-observable";

import connectionModel from "../models/ConnectionModel";
import { Notification } from "../Utilities";

export const ROUND_DURATION = 30; // seconds

const ConnectionComponent: React.FC = () => {
  const connectionData = useObservable(connectionModel);
  const [data, setData] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const triggerNotification = (notification: string) => {
    setNotificationText(notification);
    setShowNotification(true);
  };

  const handleCloseNotification = useCallback(
    () => setShowNotification(false),
    [],
  );

  return (
    <>
      <div className="text-center text-white grid grid-rows-1 m-1">
        {connectionData.id ? (
          <>
            <div>
              Connection Id: {connectionData.id}
            </div>
          </>
        ) : (
          <>
            <div>
              <p>Not connected</p>
            </div>
          </>
        )}
        <div>
          <button
          onSubmit={() => setShowNotification(true)}>
            Show Notification
          </button>
        </div>
        <div id="notification">
          {showNotification && (
            <Notification
              message={notificationText}
              onClose={handleCloseNotification}
              duration={2000}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ConnectionComponent;
