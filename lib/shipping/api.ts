import { CARRIERS_FIXTURE } from "./carriers.fixture";
import type {
  Carrier,
  Connection,
  ConnectionInput,
  CredField,
} from "./types";

const STORAGE_KEY = "shipping-connections:v1";
const LATENCY = 600;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readStored(): Connection[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeStored(list: Connection[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function validateCredentials(
  schema: CredField[],
  credentials: Record<string, string>
): string | undefined {
  for (const field of schema) {
    const value = (credentials[field.key] ?? "").trim();
    if (field.required && value.length < 4) {
      return "invalid_credentials";
    }
  }
  return undefined;
}

export function getCarrierById(id: string): Carrier | undefined {
  return CARRIERS_FIXTURE.find((carrier) => carrier.id === id);
}

export async function fetchCarriers(): Promise<Carrier[]> {
  await delay(300);
  return [...CARRIERS_FIXTURE].sort(
    (a, b) => a.sortedOrder - b.sortedOrder
  );
}

export async function fetchConnections(): Promise<Connection[]> {
  await delay(150);
  return readStored();
}

export async function createConnection(
  input: ConnectionInput
): Promise<Connection> {
  await delay(LATENCY);
  const carrier = getCarrierById(input.carrierId);
  const code = carrier
    ? validateCredentials(carrier.credentialSchema, input.credentials)
    : "invalid_credentials";

  const connection: Connection = {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now()),
    carrierId: input.carrierId,
    status: code ? "error" : "connected",
    lastErrorCode: code,
    credentialKeys: carrier ? carrier.credentialSchema.map((f) => f.key) : [],
  };

  const list = readStored().filter(
    (item) => item.carrierId !== input.carrierId
  );
  writeStored([...list, connection]);
  return connection;
}

export async function updateCredentials(
  id: string,
  credentials: Record<string, string>
): Promise<Connection> {
  await delay(LATENCY);
  const list = readStored();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("connection_not_found");
  }
  const current = list[index];
  const carrier = getCarrierById(current.carrierId);
  const code = carrier
    ? validateCredentials(carrier.credentialSchema, credentials)
    : "invalid_credentials";

  const updated: Connection = {
    ...current,
    status: code ? "error" : "connected",
    lastErrorCode: code,
    credentialKeys: carrier ? carrier.credentialSchema.map((f) => f.key) : [],
  };

  writeStored(
    list.map((item) => (item.id === id ? updated : item))
  );
  return updated;
}

export async function testConnection(id: string): Promise<Connection> {
  await delay(LATENCY);
  const list = readStored();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("connection_not_found");
  }
  const updated: Connection = {
    ...list[index],
    status: "connected",
    lastErrorCode: undefined,
  };
  writeStored(
    list.map((item) => (item.id === id ? updated : item))
  );
  return updated;
}

export async function disconnectConnection(id: string): Promise<void> {
  await delay(300);
  writeStored(readStored().filter((item) => item.id !== id));
}