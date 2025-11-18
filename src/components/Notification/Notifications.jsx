import { useEffect, useState } from "react";
import Heading1 from "../Heading/Heading1";
import api from "../../api";
import LikeNotification from "./LikeNotification";
import { ContentWrapper } from "../Utilities/Utilities";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const notifications = await api.getNotifications();

      setNotifications(notifications);
    }
    fetchData();
  }, []);

  return (
    <>
      <Heading1 text="Notifications" />
      <p className="mt-3">Stay updated with your interactions</p>
      {notifications.length > 0 && (
        <>
          <ul>
            {notifications.map(
              (notification) =>
                notification.type === "like" && (
                  <ContentWrapper key={notification.id}>
                    <LikeNotification data={notification} />
                  </ContentWrapper>
                )
            )}
          </ul>
        </>
      )}
    </>
  );
}

export default Notifications;
