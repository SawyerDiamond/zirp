export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center m-4 flex-row">
      {children}
    </div>
  );
}
