"use client";

import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  useCarriers,
  useConnections,
} from "../../../lib/shipping/hooks";
import type { Connection } from "../../../lib/shipping/types";
import { t } from "../../../lib/shipping/translations";
import CarrierList from "./CarrierList";
import ConnectCarrierSheet from "./ConnectCarrierSheet";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import ManageConnectionSheet from "./ManageConnectionSheet";
import SearchInput from "./SearchInput";
import SkeletonCard from "./SkeletonCard";

export default function ShippingIntegrationsPage() {
  const {
    carriers,
    loading: carriersLoading,
    error: carriersError,
    retry: retryCarriers,
  } = useCarriers();

  const {
    connections,
    connect,
    saveCredentials,
    test,
    disconnect,
  } = useConnections();

  const [query, setQuery] = useState("");
  const [connectOpen, setConnectOpen] = useState<{
    carrierId?: string;
  } | null>(null);
  const [manageId, setManageId] = useState<string | null>(null);

  const connectionsByCarrier = useMemo(() => {
    const map = new Map<string, Connection>();
    for (const connection of connections) {
      map.set(connection.carrierId, connection);
    }
    return map;
  }, [connections]);

  const visibleCarriers = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = carriers.filter(
      (carrier) =>
        !q ||
        carrier.name.toLowerCase().includes(q) ||
        carrier.nameAr.toLowerCase().includes(q)
    );
    filtered.sort((a, b) => a.sortedOrder - b.sortedOrder);
    const connected = filtered.filter((carrier) =>
      connectionsByCarrier.has(carrier.id)
    );
    const rest = filtered.filter(
      (carrier) => !connectionsByCarrier.has(carrier.id)
    );
    return [...connected, ...rest];
  }, [carriers, query, connectionsByCarrier]);

  const manageConnection = connections.find(
    (connection) => connection.id === manageId
  ) ?? null;
  const manageCarrier = carriers.find(
    (carrier) => carrier.id === manageConnection?.carrierId
  );

  let content;

  if (carriersLoading) {
    content = (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  } else if (carriersError) {
    content = <ErrorState onRetry={retryCarriers} />;
  } else if (carriers.length === 0) {
    content = (
      <EmptyState
        title={t("emptyTitle")}
        body={t("emptyBody")}
        actionLabel={t("connectFirst")}
        onAction={() => setConnectOpen({})}
      />
    );
  } else if (visibleCarriers.length === 0) {
    content = (
      <EmptyState
        title={t("noResultsTitle")}
        body={t("noResultsBody").replace("{q}", query)}
      />
    );
  } else {
    content = (
      <CarrierList
        carriers={visibleCarriers}
        connectionsByCarrier={connectionsByCarrier}
        onConnect={(carrierId) => setConnectOpen({ carrierId })}
        onManage={(connection) => setManageId(connection.id)}
      />
    );
  }

  return (
    <div dir="rtl" lang="ar" className="mx-auto w-full max-w-6xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t("subtitle")}</p>
        </div>
        <button
          onClick={() => setConnectOpen({})}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-indigo-600 px-4 font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          {t("connectCarrier")}
        </button>
      </div>

      <SearchInput value={query} onChange={setQuery} />

      {content}

      <ConnectCarrierSheet
        open={connectOpen !== null}
        initialCarrierId={connectOpen?.carrierId}
        carriers={carriers}
        connectedCarrierIds={Array.from(connectionsByCarrier.keys())}
        onClose={() => setConnectOpen(null)}
        connect={connect}
      />

      <ManageConnectionSheet
        open={manageId !== null && manageConnection !== null}
        connection={manageConnection}
        carrier={manageCarrier}
        onClose={() => setManageId(null)}
        test={test}
        saveCredentials={saveCredentials}
        disconnect={disconnect}
      />
    </div>
  );
}