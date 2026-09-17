import OrdersTable from "../../../components/admin/order/OrdersTable";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">
          Orders
        </h1>

        <p className="page-subtitle">
          Manage your customer orders.
        </p>
      </div>

      <OrdersTable />
    </div>
  );
}