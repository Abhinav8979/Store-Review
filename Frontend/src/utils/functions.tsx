import { FaStar } from "react-icons/fa";

export const StarRating = ({
  rating,
  onChange,
}: {
  rating: number;
  onChange?: (val: number) => void;
}) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        size={20}
        className={`cursor-pointer ${
          star <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => onChange && onChange(star)}
      />
    ))}
  </div>
);
