import { jwtDecode } from "jwt-decode";
import { FaStar } from "react-icons/fa";

export const StarRating = ({
  rating,
  onChange,
  editable = false,
}: {
  rating: number;
  onChange?: (val: number) => void;
  editable?: boolean;
}) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        size={20}
        className={` ${editable && "cursor-pointer"} ${
          star <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => onChange && onChange(star)}
      />
    ))}
  </div>
);

export const getRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: any = jwtDecode(token);
    return decoded.role;
  }
  return null;
};

export const getUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded: any = jwtDecode(token);
    return decoded.userId;
  }
  return null;
};
