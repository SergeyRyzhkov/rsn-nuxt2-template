import { Context } from "@nuxt/types";
import { BaseService } from "./BaseService";

export type ConstructorOf<T extends BaseService> = new (...args: any[]) => T;

export class ContextServiceRegistry {
  private ctx: Context;
  private servicesMap = new Map<ConstructorOf<BaseService>, any>();

  public updateNuxtContext(ctx: Context) {
    this.ctx = ctx;
    for (const iterServ of this.servicesMap.values()) {
      iterServ.nuxtContext = ctx;
    }
  }

  public register<T extends BaseService>(Ctor: ConstructorOf<T>, ...args: any[]) {
    const service = new Ctor(...args);
    service.nuxtContext = this.ctx;
    this.servicesMap.set(Ctor, service);
    return this;
  }

  public getService<T extends BaseService>(Ctor: ConstructorOf<T>): T {
    let service = this.servicesMap.get(Ctor);
    if (!service) {
      service = new Ctor();
      service.nuxtContext = this.ctx;
      this.servicesMap.set(Ctor, service);
    }
    return service;
  }

  public exists<T extends BaseService>(Ctor: new (...args: any[]) => T): boolean {
    return !!this.getService(Ctor);
  }

  public get nuxtContext() {
    return this.ctx;
  }
}

let instance: ContextServiceRegistry = new ContextServiceRegistry();

export class ServiceLocator {
  public static get instance() {
    return instance;
  }

  public static createFreshServiceLocator() {
    instance = new ContextServiceRegistry();
  }
}
