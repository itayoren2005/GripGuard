import { FC, useEffect, useState } from "react";
import { driver } from "driver.js";
import type { DriveStep } from "driver.js";
import "./tour.css";
import "driver.js/dist/driver.css";
import IconButton from "../components/general/IconButton";
import { Info } from "lucide-react";

interface PageTourProps {
  PageTourSteps: DriveStep[];
  className?: string;
}

const PageTour: FC<PageTourProps> = ({
  PageTourSteps,
  className = "tour-icon",
}) => {
  const [driverObj] = useState(
    driver({
      showProgress: true,
      animate: true,
      stagePadding: 12,
      steps: PageTourSteps,
    })
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const popoverButtons =
        target.closest(".driver-next-btn") ||
        target.closest(".driver-prev-btn") ||
        target.closest(".driver-close-btn");

      if (popoverButtons) {
        return;
      }

      if (driverObj.isActive()) {
        driverObj.destroy();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [driverObj]);

  const startTour = () => {
    driverObj.drive();
  };

  return (
    <div className={className}>
      <IconButton
        onClick={startTour}
        className="help-icon"
        title=""
        icon={Info}
      />
    </div>
  );
};

export default PageTour;
