import { AlertTriangle, RefreshCw } from "lucide-react";

import { t } from "../../../lib/shipping/translations";

type Props = {
  onRetry: () => void;
};

export default function ErrorState({ onRetry }: Props) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-2xl border border-red-200 bg-white p-8 text-center"
    >
      <AlertTriangle size={32} className="text-red-500" />
      <div>
        <h3 className="font-bold text-gray-900">
          {t("loadErrorTitle")}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{t("loadErrorBody")}</p>
      </div>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        <RefreshCw size={16} />
        {t("retry")}
      </button>
    </div>
  );
}