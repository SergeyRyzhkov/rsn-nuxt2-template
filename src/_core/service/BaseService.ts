import { Context } from "@nuxt/types";
import { plainToClass } from "class-transformer";
import { Pagination } from "../models/Pagination";
import { DataWithPagination } from "../models/DataWithPagination";

export class BaseService {
  getFavorites() {
    throw new Error("Method not implemented.");
  }

  protected ctx: Context;

  public set nuxtContext(ctx: Context) {
    this.ctx = ctx;
  }

  public get nuxtContext() {
    return this.ctx;
  }

  public get apiRequest() {
    return this.ctx.$axios;
  }

  public async getAnyOrNull(url: string, config?: any) {
    return await this.getAnyOrNullOrFail(false, url, config);
  }

  public async getAnyOrFail(url: string, config?: any) {
    return await this.getAnyOrNullOrFail(true, url, config);
  }

  public async getOneOrDefault<T>(Ctor: { new (): T }, url: string, config?: any): Promise<T> {
    return await this.getOneOrFailOrDefault(false, Ctor, url, config);
  }

  public async getOneOrFail<T>(Ctor: { new (): T }, url: string, config?: any): Promise<T> {
    return await this.getOneOrFailOrDefault(true, Ctor, url, config);
  }

  public async getOneOrDefaultPost<T>(Ctor: { new (): T }, url: string, config?: any, postData?: any): Promise<T> {
    return await this.getOneOrEmptyOrThrowErrorPost(false, Ctor, url, config, postData);
  }

  public async getOneOrFailPost<T>(Ctor: { new (): T }, url: string, config?: any, postData?: any): Promise<T> {
    return await this.getOneOrEmptyOrThrowErrorPost(true, Ctor, url, config, postData);
  }

  public async getArrayOrEmpty<T>(ctor: { new (): T }, url: string, params?: any): Promise<T[]> {
    try {
      const response = await this.apiRequest.get(this.buildQueryWithPagination(url), params);
      const data = response?.data?.data || response?.data;
      return !!data ? plainToClass(ctor, Array.from(data)) : [];
    } catch {
      return [];
    }
  }

  public async getArrayOrEmptyPost<T>(ctor: { new (): T }, url: string, params?: any, postData?: any): Promise<T[]> {
    try {
      const response = await this.apiRequest.post(url, postData, params);
      const data = response?.data?.data || response?.data;
      return !!data ? plainToClass(ctor, Array.from(data)) : [];
    } catch {
      return [];
    }
  }

  // FIXME: тут еще с ошибкой
  public async getArrayOrEmptyWithPagination<T>(
    ctor: { new (): T },
    url: string,
    params?: any,
    pagination?: Pagination
  ): Promise<DataWithPagination<T>> {
    return await this.getArrayOrEmptyWithPaginationAny(ctor, url, params, pagination, false);
  }

  public async getArrayOrEmptyWithPaginationPost<T>(
    ctor: { new (): T },
    url: string,
    params?: any,
    postData?: any,
    pagination?: Pagination
  ): Promise<DataWithPagination<T>> {
    return await this.getArrayOrEmptyWithPaginationAny(ctor, url, params, pagination, true, postData);
  }

  // public postForm(url: string, config?: any, formData?: FormData): Promise<ApiResponse> {
  //   config.headers = {
  //     ...config.headers,
  //     ...{
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   return this.post(url, { ...config }, formData);
  // }

  private async getAnyOrNullOrFail(isSendError = false, url: string, config?: any) {
    try {
      const response = await this.apiRequest.get(url, config);
      return response?.data?.data || response?.data;
    } catch (err) {
      if (isSendError) {
        throw err;
      } else {
        return null;
      }
    }
  }

  private async getOneOrFailOrDefault<T>(isSendError = false, Ctor: { new (): T }, url: string, config?: any): Promise<T> {
    try {
      const response = await this.apiRequest.get(url, config);
      const data = response?.data?.data || response?.data;
      const result = !!data ? (Array.isArray(data) && data.length > 0 ? data[0] : data) : null;
      return !!result ? plainToClass(Ctor, result) : new Ctor();
    } catch (err) {
      if (isSendError) {
        throw err;
      } else {
        return new Ctor();
      }
    }
  }

  private async getOneOrEmptyOrThrowErrorPost<T>(
    isSendError = false,
    Ctor: { new (): T },
    url: string,
    config?: any,
    postData?: any
  ): Promise<T> {
    try {
      const response = await this.apiRequest.post(url, postData, config);
      const data = response?.data?.data || response?.data;
      const result = !!data ? (Array.isArray(data) && data.length > 0 ? data[0] : data) : null;
      return !!result ? plainToClass(Ctor, result) : new Ctor();
    } catch (err) {
      if (isSendError) {
        throw err;
      } else {
        return new Ctor();
      }
    }
  }

  private async getArrayOrEmptyWithPaginationAny<T>(
    ctor: { new (): T },
    url: string,
    config?: any,
    pagination?: Pagination,
    isPostMethod = false,
    postData?: any
  ): Promise<DataWithPagination<T>> {
    const paginCollection = new DataWithPagination<T>();

    try {
      let response: any;
      if (isPostMethod) {
        response = await this.apiRequest.post(this.buildQueryWithPagination(url, pagination), postData, config);
      } else {
        response = await this.apiRequest.get(this.buildQueryWithPagination(url, pagination), config);
      }

      const data = response?.data?.data || response?.data;
      paginCollection.data = !!data ? plainToClass(ctor, Array.from(data)) : [];
      // Разберемся с пагинацией. Везде по разному, обобщим.
      if (response?.data?.meta) {
        paginCollection.pagination = plainToClass(Pagination, response?.data?.meta);
      } else {
        paginCollection.pagination = pagination as Pagination;
        // paginCollection.pagination.currentPage = paginCollection.pagination.currentPage + 1;
      }
      if (response?.data?.count > -1 && !!paginCollection.pagination) {
        paginCollection.pagination = pagination as Pagination;
        paginCollection.pagination.total = response.data.count;
      }

      paginCollection.seo = response?.data?.seo || {};
    } catch (err) {
      return paginCollection;
    }
    return paginCollection;
  }

  public getIdBySlug(slug: string) {
    let result = 0;

    if (!!slug && slug.toString().includes("-")) {
      const tryGet = Number(slug.split("-").pop());
      result = Number.isNaN(tryGet) ? 0 : tryGet;
    }

    if (!!slug && result === 0) {
      result = Number(slug);
    }

    return result;
  }

  protected buildQueryWithPagination(query: string, pagination?: Pagination): string {
    if (!!pagination) {
      query = query.includes("?")
        ? query + `&page=${pagination.currentPage || 1}`
        : query + `?page=${pagination.currentPage || 1}`;
      if (pagination.perPage) {
        query = query + `&limit=${pagination.perPage}`;
      }
    }
    return query;
  }
}
