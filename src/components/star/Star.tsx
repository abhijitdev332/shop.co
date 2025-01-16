import { AiFillStar } from "react-icons/ai";

interface StarProps {
  count: number; // Number of stars to display
  size?: number; // Size of each star (default: 24px)
  color?: string; // Color of the stars (default: gold)
}

const Star = ({ count, size = 24, color = "gold" }: StarProps) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: count }, (_, index) => (
        <AiFillStar key={index} size={size} color={color} />
      ))}
    </div>
  );
};

export default Star;
