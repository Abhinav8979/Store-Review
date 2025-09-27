import {
  AiOutlineUserAdd,
  AiOutlineLock,
  AiOutlineStar,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { addNew, giveRating, management, resetPassword } from "./path";

export const sidebarLinks = [
  {
    icon: AiOutlineUserAdd,
    text: "Add New",
    link: addNew,
  },
  {
    icon: AiOutlineLock,
    text: "Change Password",
    link: resetPassword,
  },
  {
    icon: AiOutlineUsergroupAdd,
    text: "Management",
    link: management,
  },

  {
    icon: AiOutlineStar,
    text: "Give Rating",
    link: giveRating,
  },
];
