type RecordState<T> =
  | { status: 'pending'; promise: Promise<T>; value?: T; error?: any }
  | { status: 'success'; value: T; promise?: Promise<T>; error?: any }
  | { status: 'error'; error: any; promise?: Promise<T>; value?: T };

const cache = new Map<string, RecordState<any>>();

function load<T>(key: string, fetcher: () => Promise<T>) {
  let record = cache.get(key) as RecordState<T> | undefined;
  if (!record) {
    const promise = fetcher()
      .then((value) => {
        cache.set(key, { status: 'success', value });
        return value;
      })
      .catch((error) => {
        cache.set(key, { status: 'error', error });
        throw error;
      });
    record = { status: 'pending', promise };
    cache.set(key, record);
  }
  return record as RecordState<T>;
}

export function prefetch<T>(key: string, fetcher: () => Promise<T>) {
  load(key, fetcher);
}

export function invalidate(key: string) {
  cache.delete(key);
}

export function createResource<T>(key: string, fetcher: () => Promise<T>) {
  return {
    read(): T {
      const record = load<T>(key, fetcher);
      if (record.status === 'pending') {
        throw record.promise;
      } else if (record.status === 'error') {
        throw record.error;
      } else {
        return record.value as T;
      }
    },
  };
}

// Exemple d’utilisation avec React 18
// ----------------------------------
/*
import React, { Suspense, useState } from 'react';

const fakeApi = (id: number) =>
  new Promise<{ id: number; name: string }>((resolve) =>
    setTimeout(() => resolve({ id, name: 'Item ' + id }), 600)
  );

export function UserCard({ id }: { id: number }) {
  const resource = createResource(`user:${id}`, () => fakeApi(id));
  const data = resource.read();
  return <div>#{data.id} — {data.name}</div>;
}

export function DemoSuspense() {
  const [id, setId] = useState(1);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <button onClick={() => setId((x) => x + 1)}>Next</button>
      <button onClick={() => invalidate(`user:${id}`)}>Invalidate</button>
      <Suspense fallback={<div>Chargement…</div>}>
        <UserCard id={id} />
      </Suspense>
    </div>
  );
}
*/