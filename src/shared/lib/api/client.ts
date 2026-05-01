const baseUrl = "http://localhost:3000";

export type ApiOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

const api = async (path: string, options: ApiOptions) => {
  const res = await fetch(`${baseUrl + path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!res.ok) {
    let error;

    try {
      error = await res.json();
    } catch {
      error = { message: res.statusText };
    }

    throw { status: res.status, ...error };
  }

  if (res.status === 204) return null;

  return res.json();
};

export const apiGet = <T>(path: string, options?: ApiOptions): Promise<T> => {
  const { params, ...fetchOptions } = options || {};

  const queryString = params
    ? "?" +
      new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [key, value]) => {
            if (value !== undefined) acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>,
        ),
      ).toString()
    : "";

  return api(path + queryString, {
    method: "GET",
    ...fetchOptions,
  });
};

export const apiPost = <T>(path: string, body: T, options?: ApiOptions) => {
  return api(path, { method: "POST", body: JSON.stringify(body), ...options });
};

export const apiPatch = <T>(path: string, body: T, options?: ApiOptions) => {
  return api(path, { method: "PATCH", body: JSON.stringify(body), ...options });
};

export const apiDelete = (path: string, options?: ApiOptions) => {
  return api(path, { method: "DELETE", ...options });
};
