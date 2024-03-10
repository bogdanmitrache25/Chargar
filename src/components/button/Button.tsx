type Props = {
  value: string;
  type: "submit" | "button";
};
const Button = ({ value, type }: Props) => {
  return (
    <button
      type={type ?? "button"}
      className="w-full text-white bg-indigo-600 hover:bg-indigo-300 focus:ring-4 focus:outline-none focus:ring-indigo-700"
    >
      {value}
    </button>
  );
};

export default Button;
