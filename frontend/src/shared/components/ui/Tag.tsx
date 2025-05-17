interface TagProps {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
}

export function Tag({ children, className = "", color = "primary" }: TagProps) {
  const colorClasses = {
    primary: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-cyan-100 text-cyan-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}
