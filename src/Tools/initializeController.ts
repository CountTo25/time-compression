import type { Controller } from "../Controllers/Support/Controller";

export default function<T extends Controller>(c: typeof Controller): T 
{
    /** @ts-ignore */
    let controller: T = new c();
    /** @ts-ignore we need it */
    controller.____bindStorage();
    return controller;    
}