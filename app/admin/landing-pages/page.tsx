import LandingPagesTable from "../../../components/admin/landing/LandingPagesTable";

export default function LandingPagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Landing Pages
        </h1>

        <p className="mt-1 text-gray-500">
          إدارة كل صفحات الهبوط — فتحها وتعديلها وحذفها.
        </p>
      </div>

      <LandingPagesTable />
    </div>
  );
}