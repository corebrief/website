export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full py-6 px-6 flex items-center justify-between">
      {children}
    </div>
  );
}
