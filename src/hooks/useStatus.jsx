import { useState, useEffect } from "react";
import { useIntl } from "react-intl";

const useStatus = (lastVisit) => {
  const intl = useIntl();
  const [status, setStatus] = useState(intl.formatMessage({ id: "offline" }));

  useEffect(() => {
    const checkStatus = () => {
      if (lastVisit) {
        const now = new Date();
        const lastVisitTime = new Date(lastVisit);
        const diff = now - lastVisitTime;
        const minutesDiff = diff / (1000 * 60);

        setStatus(
          minutesDiff < 10
            ? intl.formatMessage({ id: "online" })
            : intl.formatMessage({ id: "offline" })
        );
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, [lastVisit, intl]);

  return status;
};

export default useStatus;
