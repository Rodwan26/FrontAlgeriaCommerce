import ProductsHeader from "../../../../components/admin/ProductsHeader";
import ProductsToolbar from "../../../../components/admin/ProductsToolbar";
import DemoProductsTable from "../../../../components/admin/demo/DemoProductsTable";

export default function DemoProductsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-purple-100 bg-purple-50 px-5 py-4">
        <p className="text-sm font-semibold text-purple-700">
          Landing Page Feature Preview
        </p>

<p className="mt-1 text-sm text-purple-600">
          Frontend demonstration of the merchant product experience —
          view, edit, duplicate and landing page are all demo actions
          without a backend.
        </p>
      </div>

      <ProductsHeader />

      <ProductsToolbar />

      <DemoProductsTable />
    </div>
  );
}
