import { AiOutlineUserAdd, AiOutlineLock, AiOutlineStar } from "react-icons/ai";
import { addNew, giveRating, resetPassword } from "./path";

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
    icon: AiOutlineStar,
    text: "Give Rating",
    link: giveRating,
  },
];
