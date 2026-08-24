import { ReactNode } from "react";

type ProductEditorLayoutProps = {
  main: ReactNode;
  sidebar: ReactNode;
};

export default function ProductEditorLayout({
  main,
  sidebar,
}: ProductEditorLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="min-w-0 space-y-6">
          {main}
        </main>

        <aside className="min-w-0 space-y-6">
          {sidebar}
        </aside>
      </div>
    </div>
  );
}
