type NoDataProps = {
  message?: string;
};

export function NoData({ message = "No data available." }: NoDataProps) {
  return <div className="text-center text-gray-500">{message}</div>;
}
