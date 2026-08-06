import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard
      </h1>

      <div className="flex items-center gap-5">
        <Search className="h-5 w-5 text-gray-500" />

        <Bell className="h-5 w-5 text-gray-500" />

        <UserCircle2 className="h-8 w-8 text-indigo-600" />
      </div>
    </header>
  );
}