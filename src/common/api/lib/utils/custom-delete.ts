export interface CustomDelete<T> {
  path: string;
  dto: T;
  method?: "DELETE" | "POST" | "PUT" | "GET";
}

// note потому что axios не принимает body в delete
export async function customDelete<R, T>({
  path,
  dto,
  method = "DELETE",
}: CustomDelete<T>) {
  const res = await fetch(path, {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to delete: ${res.status} ${errorText}`);
  }

  return (await res.json()) as R;
}
