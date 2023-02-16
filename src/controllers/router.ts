import * as fs from 'fs'
import * as path from 'path'
import * as express from 'express'
import * as _ from 'lodash'
const route = express.Router()
function mapRouter(pathName: string, currentPathApi = '') {
  const mainPathNames = fs.readdirSync(pathName);
  for (const mainPathName of mainPathNames) {
    const mainPath = path.join(pathName, mainPathName);
    if (fs.lstatSync(mainPath).isDirectory()) {
      mapRouter(mainPath, `${currentPathApi}/${mainPathName}`)

    } else {
      try {
        const subRoute = express.Router();
        Object.values(require(mainPath)).forEach((Controller: any) => {
          const controller = new Controller();

          if (controller.path) {
            subRoute.use(`/${controller.path}`, controller.router)
            route.use(currentPathApi, subRoute)
          }
        })


      } catch (_err: any) {

      }
    }
  }
}
mapRouter(__dirname)

export default route