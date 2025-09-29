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
    text: "Add New User",
    link: addNew,
    accessTo: ["SYSTEM_ADMINISTRATOR"],
  },

  {
    icon: AiOutlineUsergroupAdd,
    text: "Management",
    link: management,
    accessTo: ["SYSTEM_ADMINISTRATOR"],
  },
  {
    icon: AiOutlineStar,
    text: "Rate Store",
    link: giveRating,
    accessTo: ["USER", "STORE_OWNER"],
  },
  {
    icon: AiOutlineStar,
    text: "Your Store Ratings",
    link: seeRatings,
    accessTo: ["STORE_OWNER"],
  },
  {
    icon: AiOutlineLock,
    text: "Change Your Password",
    link: resetPassword,
    accessTo: ["USER", "SYSTEM_ADMINISTRATOR", "STORE_OWNER"],
  },
];
