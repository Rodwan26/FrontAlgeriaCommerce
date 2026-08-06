import ProductsHeader from "../../../components/admin/ProductsHeader";
import ProductsToolbar from "../../../components/admin/ProductsToolbar";
import ProductsTable from "../../../components/admin/ProductsTable";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <ProductsHeader />

      <ProductsToolbar />

      <ProductsTable />
    </div>
  );
}