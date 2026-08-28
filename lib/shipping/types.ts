export type CredFieldType = "text" | "password" | "url" | "select";

export type CredField = {
  key: string;
  label: string;
  type: CredFieldType;
  required: boolean;
  placeholder?: string;
  hint?: string;
  help?: string;
  options?: Array<{ value: string; label: string }>;
  dir?: "ltr";
};

export type Carrier = {
  id: string;
  name: string;
  nameAr: string;
  logoUrl?: string;
  dashboardUrl?: string;
  credentialSchema: CredField[];
  sortedOrder: number;
};

export type ConnectionStatus = "connected" | "error";

export type Connection = {
  id: string;
  carrierId: string;
  status: ConnectionStatus;
  lastErrorCode?: string;
  credentialKeys: string[];
};

export type ConnectionInput = {
  carrierId: string;
  credentials: Record<string, string>;
};