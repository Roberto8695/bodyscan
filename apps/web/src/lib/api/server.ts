import "server-only";

const apiBaseUrl = process.env.API_URL?.trim() || "http://localhost:4000";

export async function serverApi<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  const response = await fetch(
    new URL(path.replace(/^\//, ""), `${apiBaseUrl.replace(/\/$/, "")}/`),
    {
      ...init,
      headers,
    },
  );

  if (!response.ok) {
    throw new Error(`La API respondió con estado ${response.status}`);
  }

  return (await response.json()) as T;
}
