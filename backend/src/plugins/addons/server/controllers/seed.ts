import type { Strapi } from '@strapi/strapi';
import { parseValidUrl } from '../../helpers/generic-helpers';
import { getAddonsService } from '../services';

export default ({ strapi }: { strapi: Strapi }) => ({
   async backup(ctx: any) {
      const seedService = getAddonsService(strapi, 'seed');
      try {
         const result = await seedService.exportBackup();
         ctx.body = result;
      } catch (error: any) {
         ctx.status = 500;
         ctx.body = error.message;
      }
   },
   async import(ctx: any) {
      const seedService = getAddonsService(strapi, 'seed');
      let url = parseValidUrl(ctx.request.body?.strapiOrigin);
      if (url == null) {
         ctx.status = 400;
         ctx.body = 'invalid strapi origin';
         return;
      }
      try {
         const backup = await seedService.downloadBackup({
            strapiOrigin: url.origin,
         });
         await seedService.importBackup(backup);
         ctx.body = 'ok';
      } catch (error: any) {
         ctx.status = 500;
         ctx.body = error.message;
      }
   },
});
