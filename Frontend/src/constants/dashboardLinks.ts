import { AiOutlineUserAdd, AiOutlineLock, AiOutlineStar } from "react-icons/ai";
import { dashboard } from "./path";

export const sidebarLinks = [
  {
    icon: AiOutlineUserAdd,
    text: "Add New",
    link: dashboard + "/add-new",
  },
  {
    icon: AiOutlineLock,
    text: "Change Password",
    link: dashboard + "/reset-password",
  },
  {
    icon: AiOutlineStar,
    text: "Give Rating",
    link: dashboard + "/give-rating",
  },
];
