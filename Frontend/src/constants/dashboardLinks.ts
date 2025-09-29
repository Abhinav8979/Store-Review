import {
  AiOutlineUserAdd,
  AiOutlineLock,
  AiOutlineStar,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";

import {
  addNew,
  giveRating,
  management,
  resetPassword,
  seeRatings,
} from "./path";

export const sidebarLinks = [
  {
    icon: AiOutlineUserAdd,
    text: "Add New",
    link: addNew,
    accessTo: ["SYSTEM_ADMINISTRATOR"],
  },

  {
    icon: AiOutlineUsergroupAdd,
    text: "Management",
    link: management,
    accessTo: ["SYSTEM_ADMINISTRATOR", "STORE_OWNER"],
  },
  {
    icon: AiOutlineStar,
    text: "Give Rating",
    link: giveRating,
    accessTo: ["USER"],
  },
  {
    icon: AiOutlineStar,
    text: "See Ratings",
    link: seeRatings,
    accessTo: ["STORE_OWNER"],
  },
  {
    icon: AiOutlineLock,
    text: "Change Password",
    link: resetPassword,
    accessTo: ["USER", "SYSTEM_ADMINISTRATOR", "STORE_OWNER"],
  },
];
