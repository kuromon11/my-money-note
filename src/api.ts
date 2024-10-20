import { Data, ReqAndRes } from './types/api.ts';

export const ENDPOINT = import.meta.env.VITE_BASE_URL;

export const getOption = (method: string, path: string, payload: Data) => {
  const { id } = payload;
  const resource = id ? `${path}/${id}` : `${path}`;
  switch (method) {
    case 'GET':
      return { resource };
    case 'POST':
      return {
        resource,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };
    case 'PUT':
      return {
        resource,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      };
    case 'DELETE':
      return { resource };
    default:
      return {};
  }
};

export async function api<K extends keyof ReqAndRes>(
  key: K,
  payload: Data = {} as Data
): Promise<ReqAndRes[K]['response']> {
  const [method, path] = key.split(' ');
  if (!method || !path) {
    throw new Error(`Unrecognized api: ${key}`);
  }

  const { resource, ...option } = getOption(method, path, payload);
  if (!resource) {
    throw new Error(`Unrecognized resource: ${key}`);
  }

  const response = await fetch(`${ENDPOINT}${resource}`, option);
  if (!response) {
    throw new Error(`No response for ${ENDPOINT}${resource}`);
  }

  const data = response.ok ? await response.json() : [];
  return { data, status: response.status } as ReqAndRes[K]['response'];
}
