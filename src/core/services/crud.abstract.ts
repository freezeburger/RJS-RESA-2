import { axios } from "@/bridges/axios";
import { CrudService, ENDPOINTS } from "../types/crud-service.type";
import * as Generics from "../types/generic.types";



export abstract class CrudAbstract<T extends Generics.WithUniqueId> implements CrudService<T>{

    API!:  `/${ENDPOINTS}`;

    protected http = axios;

    constructor() {
        setTimeout(() => {
            if (!this.API) {
                throw new Error("API must be defined in subclass");
            }
        }, 0);
    }

    create(item: Omit<T, "id">): Promise<T> {
        return this.http.post<T>(this.API, item).then(res => res.data);
    }

    read(): Promise<T[]>;
    read(id: Generics.UniqueId): Promise<T | null>;
    read(id?: Generics.UniqueId): Promise<T | T[] | null>{
        if(!id) return this.http.get<T[]>(this.API).then(res => res.data);
        return this.http.get<T>(`${this.API}/${id}`).then(res => res.data);
    }
    update(target: T, update: Partial<Omit<T, "id">>): Promise<T> {
        return this.http.put<T>(`${this.API}/${target.id}`, update).then(res => res.data);
    }
    delete(target: T): Promise<T> {
        return this.http.delete<T>(`${this.API}/${target.id}`).then(res => res.data);
    }

    

}