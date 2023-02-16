import { BaseSequelizeService } from "@/services"
import { BaseController, Request, Response } from "./base.controller"

export class BaseSequelizeController<T extends BaseSequelizeService<any>> extends BaseController {
    constructor(service: T) {
        super()
        this.service = service;
        this.customRouting();
        this.defaultRouting();
    }
    service: T
    defaultRouting() {
        this.router.get('/', this.route(this.getList));
        this.router.get(
            '/:id',
            this.route(this.getItem)
        );
        this.router.post('/', this.route(this.create));
        this.router.put('/', this.route(this.bulkUpdate));
        this.router.put('/:id', this.route(this.updateById));

        this.router.delete(
            '/:id',
            this.route(this.deleteById)
        );
    }
    customRouting() { }


    async getList(req: Request, res: Response) {
        const option = req.queryInfoPg;
        const result = await this.service.getList(option);
        this.onSuccessAsList(res, result, undefined, req.queryInfoPg);
    }

    async getItem(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoPg = {
            ...req.queryInfoPg
        }
        req.queryInfoPg.where.id = id
        const result = await this.service.getItem(req.queryInfoPg);
        this.onSuccess(res, result);
    }

    async create(req: Request, res: Response) {
        const { body, queryInfoPg } = req;
        const result = await this.service.create(body, queryInfoPg);
        this.onSuccess(res, result);
    }

    async updateById(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoPg = {
            ...req.queryInfoPg
        }
        req.queryInfoPg.where.id = id
        const result = await this.service.update(req.body, req.queryInfoPg);
        this.onSuccess(res, result);
    }


    async bulkUpdate(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoPg = {
            ...req.queryInfoPg
        }
        req.queryInfoPg.where.id = id
        const result = await this.service.bulkUpdate(req.body, req.queryInfoPg)
        this.onSuccess(res, result);
    }

    async deleteById(req: Request, res: Response) {
        const { id } = req.params;
        req.queryInfoPg = {
            ...req.queryInfoPg
        }
        req.queryInfoPg.where.id = id
        const result = await this.service.delete(req.queryInfoPg);
        this.onSuccess(res, result);
    }


}
