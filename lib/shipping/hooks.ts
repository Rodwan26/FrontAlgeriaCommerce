import { useCallback, useEffect, useState } from "react";

import * as api from "./api";
import type {
  Carrier,
  Connection,
  ConnectionInput,
} from "./types";

export function useCarriers() {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setCarriers(await api.fetchCarriers());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { carriers, loading, error, retry: load };
}

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setConnections(await api.fetchConnections());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const connect = useCallback(
    async (input: ConnectionInput) => {
      const connection = await api.createConnection(input);
      setConnections(await api.fetchConnections());
      return connection;
    },
    []
  );

  const saveCredentials = useCallback(
    async (id: string, credentials: Record<string, string>) => {
      const connection = await api.updateCredentials(id, credentials);
      setConnections(await api.fetchConnections());
      return connection;
    },
    []
  );

  const test = useCallback(async (id: string) => {
    const connection = await api.testConnection(id);
    setConnections(await api.fetchConnections());
    return connection;
  }, []);

  const disconnect = useCallback(async (id: string) => {
    await api.disconnectConnection(id);
    setConnections(await api.fetchConnections());
  }, []);

  return {
    connections,
    loading,
    error,
    retry: load,
    connect,
    saveCredentials,
    test,
    disconnect,
  };
}