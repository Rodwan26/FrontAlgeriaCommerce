import type {
  Carrier,
  Connection,
  ConnectionInput,
} from "./types";

async function request<T>(
  path: string,
  method: string,
  body?: unknown
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    const e = new Error("NEXT_PUBLIC_API_URL is not set") as Error & {
      code?: string;
    };
    e.code = "network";
    throw e;
  }

  let res: Response;

  try {
    res = await fetch(`${baseUrl}${path}`, {
      method,
      headers:
        body !== undefined
          ? { "Content-Type": "application/json" }
          : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    const e = new Error("network") as Error & { code?: string };
    e.code = "network";
    throw e;
  }

  if (!res.ok) {
    let code = "unknown";
    try {
      const parsed = await res.json();
      if (parsed && typeof parsed.code === "string") {
        code = parsed.code;
      }
    } catch {
      // keep "unknown"
    }
    const e = new Error(code) as Error & { code?: string };
    e.code = code;
    throw e;
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return (await res.json()) as T;
}

export async function fetchCarriers(): Promise<Carrier[]> {
  return request<Carrier[]>("/shipping/carriers", "GET");
}

export async function fetchConnections(): Promise<Connection[]> {
  return request<Connection[]>("/shipping/connections", "GET");
}

export async function createConnection(
  input: ConnectionInput
): Promise<Connection> {
  return request<Connection>("/shipping/connections", "POST", input);
}

export async function updateCredentials(
  id: string,
  credentials: Record<string, string>
): Promise<Connection> {
  return request<Connection>(
    `/shipping/connections/${id}`,
    "PATCH",
    { credentials }
  );
}

export async function testConnection(id: string): Promise<Connection> {
  return request<Connection>(
    `/shipping/connections/${id}/test`,
    "POST"
  );
}

export async function disconnectConnection(id: string): Promise<void> {
  await request<null>(`/shipping/connections/${id}`, "DELETE");
}
