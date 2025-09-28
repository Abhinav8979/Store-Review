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
    accessTo: ["System Administrator"],
  },
  {
    icon: AiOutlineLock,
    text: "Change Password",
    link: resetPassword,
    accessTo: ["Normal User", "System Administrator", "Store Owner"],
  },
  {
    icon: AiOutlineUsergroupAdd,
    text: "Management",
    link: management,
    accessTo: ["System Administrator", "Store Owner"],
  },
  {
    icon: AiOutlineStar,
    text: "Give Rating",
    link: giveRating,
    accessTo: ["Normal User"],
  },
  {
    icon: AiOutlineStar,
    text: "See Ratings",
    link: seeRatings,
    accessTo: ["Store Owner"],
  },
];
