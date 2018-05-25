export async function get(endpoint: string): Promise<Response> {
  return call(endpoint);
}

// tslint:disable-next-line
export async function post(endpoint: string, data: any): Promise<Response> {
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return call(endpoint, data, 'POST');
}

// tslint:disable-next-line
export async function call(endpoint: string, data: any = null, method: string = 'GET'): Promise<Response> {
  // POST the token to your backend server from where you can retrieve it to send push notifications.

  const url = `${endpoint}`;

  const fetcher = {
    body: method === 'POST' && data && JSON.stringify(data) || null,
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    method,
  } as Partial<RequestInit>;

  const result = await fetch(url, fetcher);
  return result;
}
