import type { Side, DriveStep } from "driver.js";

export const adminPageTourSteps: DriveStep[] = [
  {
    element: ".side-menu",
    popover: {
      title: "Control Section",
      description:
        "Edit User Roles, Manage Rifles, and Log Out from the system.",
      side: "left" as Side,
    },
  },
  {
    element: ".calender",
    popover: {
      title: "Incident Calendar",
      description:
        "Track incidents history and navigate to the incidents timeLine when clicking on the day.",
      side: "bottom" as Side,
    },
  },
  {
    element: ".content-panel",
    popover: {
      title: "Real time positioning map",
      description:
        "Track soldiers movement in real time and navigate to the map page.",
      side: "left" as Side,
    },
  },
];

export const timeLinePageTourSteps: DriveStep[] = [
  {
    element: "#back-to-calendar",
    popover: {
      title: "Back to Calendar",
      description:
        "Click this button to go back to the calendar and choose a different day to view incidents.",
      side: "left" as Side,
    },
  },
  {
    element: ".timeline-section",
    popover: {
      title: "Incident Timeline",
      description:
        "Click on any incident dot to get detailed information. You can also view and edit the report for each incident.",
      side: "top" as Side,
    },
  },
  {
    element: ".video-section",
    popover: {
      title: "Incident Video",
      description:
        "Investigate the incident by watching the video showing positions, movements, and the incident details. You can also navigate backward and forward through the video.",
      side: "right" as Side,
    },
  },
];

export const AdminMapPageTourSteps: DriveStep[] = [
  {
    element: ".manage-map",
    popover: {
      title: "Map Controls",
      description:
        "Here you can adjust the map scale, triangle length, and manage map items.",
      side: "right" as Side,
    },
  },
  {
    element: ".ratio-slider-wrapper",
    popover: {
      title: "Adjust Scale",
      description: "Use this slider to zoom in or out on the map.",
      side: "right" as Side,
    },
  },
  {
    element: ".triangle-length-wrapper",
    popover: {
      title: "Set Triangle Length",
      description: "Modify the triangle length for positioning accuracy.",
      side: "right" as Side,
    },
  },
  {
    element: ".map-items-wrapper",
    popover: {
      title: "Map Items",
      description: "Drag and drop items onto the map for better planning.",
      side: "right" as Side,
    },
  },
  {
    element: ".pick-soldier-color-wrapper",
    popover: {
      title: "Soldier Colors",
      description: "Pick colors for soldiers to differentiate them on the map.",
      side: "right" as Side,
    },
  },
  {
    element: ".reset-button",
    popover: {
      title: "Reset Map",
      description:
        "Reset the soldiers positions to the default to start the mission again.",
      side: "right" as Side,
    },
  },
  {
    element: ".paper",
    popover: {
      title: "Map Area",
      description:
        "This is where you can place items and watch the real time map.",
      side: "right" as Side,
    },
  },
  {
    element: ".icon-bright-button",
    popover: {
      title: "Back to Admin",
      description: "Click here to go back to admin page.",
      side: "right" as Side,
    },
  },
];
export const mapPageTourSteps: DriveStep[] = [
  {
    element: ".manage-map",
    popover: {
      title: "Map Controls",
      description:
        "Here you can adjust the map scale, triangle length, and manage map items.",
      side: "right" as Side,
    },
  },
  {
    element: ".ratio-slider-wrapper",
    popover: {
      title: "Adjust Scale",
      description: "Use this slider to zoom in or out on the map.",
      side: "right" as Side,
    },
  },
  {
    element: ".triangle-length-wrapper",
    popover: {
      title: "Set Triangle Length",
      description: "Modify the triangle length for positioning accuracy.",
      side: "right" as Side,
    },
  },
  {
    element: ".map-items-wrapper",
    popover: {
      title: "Map Items",
      description: "Drag and drop items onto the map for better planning.",
      side: "right" as Side,
    },
  },
  {
    element: ".pick-soldier-color-wrapper",
    popover: {
      title: "Soldier Colors",
      description: "Pick colors for soldiers to differentiate them on the map.",
      side: "right" as Side,
    },
  },
  {
    element: ".reset-button",
    popover: {
      title: "Reset Map",
      description:
        "Reset the soldiers positions to the default to start the mission again.",
      side: "right" as Side,
    },
  },
  {
    element: ".paper",
    popover: {
      title: "Map Area",
      description:
        "This is where you can place items and watch the real time map.",
      side: "right" as Side,
    },
  },
  {
    element: ".side-menu-content",
    popover: {
      title: "Log Out",
      description: "Click here to log out from the session.",
      side: "left" as Side,
    },
  },
];
export const calendarPageTourSteps: DriveStep[] = [
  {
    element: ".calendar",
    popover: {
      title: "incidents Calendar",
      description:
        "view events calendar and the. \n you can scrawl and see how many events there are in each day",
      side: "left" as Side,
      align: "center",
    },
  },
  {
    element: ".side-menu",
    popover: {
      title: "Log Out",
      description: "Click here to log out from the session.",
      side: "left" as Side,
    },
  },
];
