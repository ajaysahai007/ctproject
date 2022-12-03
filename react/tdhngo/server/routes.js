import admin from './api/v1/controllers/admin/routes';
import user from './api/v1/controllers/users/routes';
import statics from "./api/v1/controllers/static/routes";
import category from "./api/v1/controllers/category/routes";
import resource from './api/v1/controllers/resource/routes';
import emergency from './api/v1/controllers/emergency/routes';
import periodTracker from './api/v1/controllers/periodTracker/routes'
import menstrualHygiene from './api/v1/controllers/ActivityMenstrualHygiene/routes'
import activityFaq from './api/v1/controllers/ActivityFaq/routes';
import activities from './api/v1/controllers/activities/routes';



/**
 *
 *
 * @export
 * @param {any} app
 */

export default function routes(app) {

  app.use('/api/v1/admin', admin)
  app.use('/api/v1/user', user)
  app.use('/api/v1/static', statics)
  app.use('/api/v1/category', category)
  app.use('/api/v1/resource',resource)
  app.use('/api/v1/emergency',emergency)
  app.use('/api/v1/periodTracker',periodTracker)
  app.use('/api/v1/menstrualHygiene',menstrualHygiene)
  app.use('/api/v1/activityFaq',activityFaq)
  app.use('/api/v1/activities',activities)



  return app;
}