import { createClient, Client } from "graphql-ws";
import StorageService from "../context/localStorage";

function readBrowserCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return undefined;
  return decodeURIComponent(match.slice(name.length + 1));
}

async function buildWsConnectionParams(): Promise<Record<string, string>> {
  const params: Record<string, string> = {};

  const accessToken = readBrowserCookie("access-token");
  const refreshToken = readBrowserCookie("refresh-token");
  if (accessToken) params.accessToken = accessToken;
  if (refreshToken) params.refreshToken = refreshToken;

  try {
    const storage = await StorageService.getInstance();
    const session = await storage.get("session");
    if (session?.deviceId && typeof session.deviceId === "string") {
      params.deviceId = session.deviceId;
    }
  } catch {
    // Storage may be unavailable during early boot; chat will retry on reconnect.
  }

  return params;
}

export const wsClient: Client = createClient({
  url: process.env.REACT_APP_API_WS_URL!,
  lazy: true,
  connectionParams: buildWsConnectionParams,
});

/** Re-run ConnectionInit with fresh cookies/deviceId after login, logout, or device ready. */
export function reconnectGraphqlWs(): void {
  try {
    wsClient.terminate();
  } catch {
    // ignore — may not be connected yet
  }
}
