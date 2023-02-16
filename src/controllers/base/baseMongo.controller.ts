

import { BaseMongoService } from '@/services';
import { BaseController, Request, Response } from './base.controller'

export class BaseMongoController<T extends BaseMongoService<any>> extends BaseController {
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
      '/:_id',
      this.route(this.getItem)
    );
    this.router.post('/', this.route(this.create));
    this.router.put('/:_id', this.route(this.update));
    this.router.delete(
      '/:_id',
      this.route(this.delete)
    );
  }
  customRouting() { }


  async getList(req: Request, res: Response) {
    const option = req.queryInfoMongo;
    const result = await this.service.getList(option);
    this.onSuccessAsList(res, result, undefined, req.queryInfoMongo);
  }
  async getItem(req: Request, res: Response) {
    const { _id } = req.params;
    req.queryInfoMongo = {
      ...req.queryInfoMongo
    }
    req.queryInfoMongo.filter._id = _id
    const result = await this.service.getItem(req.queryInfoMongo);
    this.onSuccess(res, result);
  }
  async create(req: Request, res: Response) {
    const { body, queryInfoMongo } = req
    const result = await this.service.create(body, queryInfoMongo);
    this.onSuccess(res, result);
  }
  async update(req: Request, res: Response) {
    const { body, queryInfoMongo } = req
    const { _id } = req.params;
    req.queryInfoMongo = {
      ...req.queryInfoMongo
    }
    req.queryInfoMongo.filter._id = _id;
    const result = await this.service.update(body, queryInfoMongo);
    this.onSuccess(res, result);
  }
  async delete(req: Request, res: Response) {
    const { _id } = req.params;
    req.queryInfoMongo = {
      ...req.queryInfoMongo
    }
    req.queryInfoMongo.filter._id = _id
    const result = await this.service.delete(req.queryInfoMongo);
    this.onSuccess(res, result);
  }


}
