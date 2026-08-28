"use client";

import {
  CheckCircle2,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  translateError,
  t,
} from "../../../lib/shipping/translations";
import type {
  Carrier,
  Connection,
  CredField,
} from "../../../lib/shipping/types";
import CredentialField from "./CredentialField";
import SheetShell from "./SheetShell";

type Props = {
  open: boolean;
  initialCarrierId?: string;
  carriers: Carrier[];
  connectedCarrierIds: string[];
  onClose: () => void;
  connect: (input: {
    carrierId: string;
    credentials: Record<string, string>;
  }) => Promise<Connection>;
};

type Step = "select" | "form";

function validateForm(
  schema: CredField[],
  values: Record<string, string>
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of schema) {
    const value = (values[field.key] ?? "").trim();
    if (field.required && !value) {
      errors[field.key] = t("requiredField");
    } else if (
      value &&
      field.type === "url" &&
      !/^https:\/\/.+/i.test(value)
    ) {
      errors[field.key] = t("urlMustHttps");
    }
  }
  return errors;
}

export default function ConnectCarrierSheet({
  open,
  initialCarrierId,
  carriers,
  connectedCarrierIds,
  onClose,
  connect,
}: Props) {
  const [step, setStep] = useState<Step>("select");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [connectError, setConnectError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [helpField, setHelpField] = useState<CredField | null>(null);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    setConnectError(null);
    setErrors({});
    setValues({});
    setBusy(false);
    setHelpField(null);
    if (initialCarrierId) {
      setSelectedId(initialCarrierId);
      setStep("form");
    } else {
      setSelectedId(null);
      setStep("select");
    }
  }, [open, initialCarrierId]);

  const selectedCarrier = useMemo(
    () => carriers.find((carrier) => carrier.id === selectedId) ?? null,
    [carriers, selectedId]
  );

  const handleSubmit = async () => {
    if (!selectedCarrier) return;
    const validation = validateForm(selectedCarrier.credentialSchema, values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setBusy(true);
    setConnectError(null);
    try {
      const connection = await connect({
        carrierId: selectedCarrier.id,
        credentials: values,
      });
      if (connection.status === "error") {
        setConnectError(translateError(connection.lastErrorCode));
      } else {
        setDone(true);
        setValues({});
      }
    } catch {
      setConnectError(translateError("network"));
    } finally {
      setBusy(false);
    }
  };

  const primaryButtonClass =
    "h-11 w-full rounded-xl bg-indigo-600 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <>
      <SheetShell
        open={open}
        title={
          step === "select" ? t("chooseCarrier") : t("credentialsStep")
        }
        onClose={onClose}
      >
        {step === "select" ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{t("chooseCarrierHint")}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {carriers.map((carrier) => {
                const connected = connectedCarrierIds.includes(carrier.id);
                return (
                  <button
                    key={carrier.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(carrier.id);
                      setStep("form");
                    }}
                    className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 p-3 text-start transition hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <span className="flex items-center gap-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base font-bold text-indigo-600">
                        {(carrier.nameAr || carrier.name).trim().charAt(0)}
                      </span>
                      <span className="font-medium text-gray-900">
                        {carrier.nameAr || carrier.name}
                      </span>
                    </span>
                    {connected ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                        {t("connected")}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : selectedCarrier ? (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => {
                      setStep("select");
                      setHelpField(null);
                    }}
              disabled={busy}
              className="text-sm font-medium text-gray-500 transition hover:text-gray-700"
            >
              ← {t("back")}
            </button>

            <div
              className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
              aria-live="polite"
            >
              {selectedCarrier.credentialSchema.map((field) => (
                <CredentialField
                  key={field.key}
                  field={field}
                  value={values[field.key] ?? ""}
                  error={errors[field.key]}
                  onChange={(value) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.key]: value,
                    }))
                  }
                  onHelp={setHelpField}
                />
              ))}
            </div>

            {connectError ? (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600"
              >
                {connectError}
              </p>
            ) : null}

            {done ? (
              <div
                className="flex flex-col items-center gap-3 py-4 text-center"
                aria-live="polite"
              >
                <CheckCircle2 size={40} className="text-emerald-500" />
                <p className="font-bold text-gray-900">
                  {t("connectedSuccess")}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 w-full rounded-xl bg-emerald-600 font-medium text-white transition hover:bg-emerald-700"
                >
                  {t("done")}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={busy}
                className={primaryButtonClass}
              >
                {busy ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    {t("testing")}
                  </span>
                ) : (
                  t("testAndConnect")
                )}
              </button>
            )}
          </div>
        ) : null}
      </SheetShell>

      {open && helpField && selectedCarrier ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setHelpField(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t("helpTitle")}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-gray-900">{t("helpTitle")}</h3>
              <button
                type="button"
                onClick={() => setHelpField(null)}
                aria-label={t("close")}
                className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <p className="mt-2 text-sm font-semibold text-indigo-600">
              {helpField.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {helpField.help}
            </p>
            {selectedCarrier.dashboardUrl ? (
              <a
                href={selectedCarrier.dashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <ExternalLink size={15} />
                {t("openDashboard")}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}