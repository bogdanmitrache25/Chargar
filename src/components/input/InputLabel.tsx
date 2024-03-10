type Props = {
  label: string;
  name: string;
  placeholder: string;
  id?: string;
  error?: string;
  type?: "text" | "email" | "password" | "date";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
};

const InputLabel = ({
  label,
  name,
  placeholder,
  id,
  error,
  type,
  onChange,
  value,
}: Props) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type ?? "text"}
        name={name}
        id={id}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
};

export default InputLabel;
