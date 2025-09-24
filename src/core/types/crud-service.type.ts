/**
 * crud-service.type.ts
 * @description Type générique pour un service CRUD (Create, Read, Update, Delete).
 */
import * as Generics from "./generic.types";

export type ENDPOINTS = 'notifications' | 'products' | 'flights' | 'orders';

export interface CrudService<T extends Generics.WithUniqueId> {

  API: `/${ENDPOINTS}`;

  create(item: Omit<T, 'id'>): Promise<T>;

  read(): Promise<T[]>;
  read(id: Generics.UniqueId): Promise<T | null>;
  read(id?: Generics.UniqueId): Promise<T | T[] | null>;

  update(target: T, update: Partial<Omit<T, 'id'>>): Promise<T>;

  delete(target: T): Promise<T>;

}