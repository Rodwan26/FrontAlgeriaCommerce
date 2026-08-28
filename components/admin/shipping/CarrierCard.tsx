import type {
  Carrier,
  Connection,
} from "../../../lib/shipping/types";
import { translateError, t } from "../../../lib/shipping/translations";

type Props = {
  carrier: Carrier;
  connection?: Connection;
  onConnect: (carrierId: string) => void;
  onManage: (connection: Connection) => void;
};

function CarrierAvatar({ carrier }: { carrier: Carrier }) {
  const initial = (carrier.nameAr || carrier.name).trim().charAt(0);
  return (
    <div
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600"
    >
      {initial}
    </div>
  );
}

export default function CarrierCard({
  carrier,
  connection,
  onConnect,
  onManage,
}: Props) {
  const hasConnection = connection !== undefined;
  const hasError = connection?.status === "error";

  const borderClass = hasError
    ? "border-red-200"
    : hasConnection
      ? "border-emerald-200"
      : "border-gray-200";

  const statusBadge = hasConnection ? (
    getStatusBadge(connection)
  ) : null;

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm transition ${borderClass}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <CarrierAvatar carrier={carrier} />
          <div>
            <h3 className="font-bold text-gray-900">
              {carrier.nameAr || carrier.name}
            </h3>
            <p className="text-xs text-gray-500" dir="ltr">
              {carrier.name}
            </p>
          </div>
        </div>
        {statusBadge}
      </div>

      {hasError && connection ? (
        <p
          className="flex items-start gap-1.5 text-xs font-medium text-red-600"
          aria-live="polite"
        >
          <span aria-hidden>•</span>
          {translateError(connection.lastErrorCode)}
        </p>
      ) : null}

      {hasConnection && connection ? (
        <button
          onClick={() => onManage(connection)}
          className="h-11 w-full rounded-xl border border-gray-200 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          {t("manage")}
        </button>
      ) : (
        <button
          onClick={() => onConnect(carrier.id)}
          className="h-11 w-full rounded-xl bg-indigo-600 font-medium text-white transition hover:bg-indigo-700"
        >
          {t("connect")}
        </button>
      )}
    </div>
  );
}

function getStatusBadge(connection: Connection) {
  const isError = connection.status === "error";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isError
          ? "bg-red-50 text-red-600"
          : "bg-emerald-50 text-emerald-600"
      }`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: isError ? "#dc2626" : "#059669",
        }}
      />
      {isError ? "خطأ" : t("connected")}
    </span>
  );
}