export const PrimaryButton: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <button
      {...props}
      className="border-none bg-yellow-500 rounded-full px-6 py-2 space-x-4 flex align-center hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
    />
  );
};
