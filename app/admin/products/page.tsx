import ProductsHeader from "../../../components/admin/ProductsHeader";
import ProductsView from "../../../components/admin/ProductsView";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <ProductsHeader />

      <ProductsView />
    </div>
  );
}