import OrdersTable from "../../../components/admin/order/OrdersTable";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Orders
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your customer orders.
        </p>
      </div>

      <OrdersTable />
    </div>
  );
}