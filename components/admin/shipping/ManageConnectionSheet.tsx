"use client";

import {
  CheckCircle2,
  KeyRound,
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  connection: Connection | null;
  carrier?: Carrier;
  onClose: () => void;
  test: (id: string) => Promise<Connection>;
  saveCredentials: (
    id: string,
    credentials: Record<string, string>
  ) => Promise<Connection>;
  disconnect: (id: string) => Promise<void>;
};

type Busy = "test" | "save" | "disconnect" | null;

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

export default function ManageConnectionSheet({
  open,
  connection,
  carrier,
  onClose,
  test,
  saveCredentials,
  disconnect,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<Busy>(null);
  const [message, setMessage] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  useEffect(() => {
    if (!open) return;
    setEditMode(false);
    setValues({});
    setErrors({});
    setMessage(null);
    setBusy(null);
    setConfirmDisconnect(false);
  }, [open, connection?.id]);

  const schema = carrier?.credentialSchema ?? [];

  const handleTest = async () => {
    if (!connection) return;
    setBusy("test");
    setMessage(null);
    try {
      const updated = await test(connection.id);
      if (updated.status === "error") {
        setMessage({
          type: "error",
          text: translateError(updated.lastErrorCode),
        });
      } else {
        setMessage({ type: "ok", text: t("testOk") });
      }
    } catch (err) {
      const code = (err as { code?: string } | null)?.code ?? "network";
      setMessage({ type: "error", text: translateError(code) });
    } finally {
      setBusy(null);
    }
  };

  const handleSave = async () => {
    if (!connection) return;
    const validation = validateForm(schema, values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    setBusy("save");
    setMessage(null);
    try {
      const updated = await saveCredentials(connection.id, values);
      if (updated.status === "error") {
        setMessage({
          type: "error",
          text: translateError(updated.lastErrorCode),
        });
      } else {
        setMessage({ type: "ok", text: t("credentialsUpdated") });
        setEditMode(false);
        setValues({});
      }
    } catch (err) {
      const code = (err as { code?: string } | null)?.code ?? "network";
      setMessage({ type: "error", text: translateError(code) });
    } finally {
      setBusy(null);
    }
  };

  const handleDisconnect = async () => {
    if (!connection) return;
    setBusy("disconnect");
    try {
      await disconnect(connection.id);
      onClose();
    } catch {
      setMessage({ type: "error", text: translateError("network") });
      setBusy(null);
    }
  };

  const secondaryButtonClass =
    "h-11 w-full rounded-xl border border-gray-200 font-medium text-gray-700 transition hover:bg-gray-50";

  return (
    <SheetShell
      open={open}
      title={
        (carrier?.nameAr || carrier?.name) ?? (connection?.carrierId ?? "")
      }
      onClose={onClose}
    >
      {connection ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 p-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                connection.status === "error"
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor:
                    connection.status === "error" ? "#dc2626" : "#059669",
                }}
              />
              {connection.status === "error" ? t("error") : t("connected")}
            </span>
            <span className="text-sm text-gray-600">
              {connection.lastErrorCode
                ? translateError(connection.lastErrorCode)
                : null}
            </span>
          </div>

          <div className="space-y-2" aria-live="polite">
            {schema
              .filter((field) =>
                connection.credentialKeys.includes(field.key)
              )
              .map((field) => (
                <div
                  key={field.key}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="text-sm text-gray-600">{field.label}</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-sm text-gray-400">
                    <KeyRound size={13} />
                    {t("masked")}
                  </span>
                </div>
              ))}
          </div>

          {editMode ? (
            <div className="space-y-3">
              <div className="space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                {schema.map((field) => (
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
                    onHelp={() => {}}
                    showHelpLink={false}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditMode(false);
                    setValues({});
                    setErrors({});
                  }}
                  disabled={busy !== null}
                  className="h-11 flex-1 rounded-xl border border-gray-200 font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-60"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleSave}
                  disabled={busy !== null}
                  className="h-11 flex-1 rounded-xl bg-emerald-600 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy === "save" ? (
                    <Loader2 size={18} className="mx-auto animate-spin" />
                  ) : (
                    t("save")
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleTest}
                disabled={busy !== null}
                className={secondaryButtonClass}
              >
                {busy === "test" ? (
                  <Loader2 size={18} className="mx-auto animate-spin" />
                ) : (
                  t("testConnection")
                )}
              </button>
              <button
                onClick={() => setEditMode(true)}
                disabled={busy !== null}
                className={secondaryButtonClass}
              >
                {t("changeCredentials")}
              </button>
            </div>
          )}

          {message ? (
            <p
              role={message.type === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`flex items-start gap-2 rounded-xl border p-3 text-sm font-medium ${
                message.type === "error"
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {message.type === "ok" ? (
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
              ) : null}
              {message.text}
            </p>
          ) : null}

          {confirmDisconnect ? (
            <div
              className="rounded-xl border border-red-200 bg-red-50 p-4"
              aria-live="polite"
            >
              <p className="text-sm font-bold text-red-700">
                {t("disconnectTitle")}
              </p>
              <p className="mt-1 text-sm text-red-600">
                {t("disconnectBody")}
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setConfirmDisconnect(false)}
                  disabled={busy !== null}
                  className="h-10 flex-1 rounded-xl border border-red-200 font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={handleDisconnect}
                  disabled={busy !== null}
                  className="h-10 flex-1 rounded-xl bg-red-600 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy === "disconnect" ? (
                    <Loader2 size={16} className="mx-auto animate-spin" />
                  ) : (
                    t("confirm")
                  )}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDisconnect(true)}
              disabled={busy !== null}
              className="h-11 w-full rounded-xl border border-red-200 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              <span className="inline-flex items-center gap-2">
                <Trash2 size={16} />
                {t("disconnect")}
              </span>
            </button>
          )}
        </div>
      ) : null}
    </SheetShell>
  );
}