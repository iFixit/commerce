import type { Strapi } from '@strapi/strapi';
import z from 'zod';
import { ensureDirectoryExists } from '../../helpers/server-helpers';
import * as csv from 'fast-csv';
import fs from 'fs';
import { omit } from 'lodash';
import { getAddonsService } from '..';

const EXPORT_FOLDER_NAME = 'bulk-operations';

const EXPORT_FOLDER_PATH = `public/${EXPORT_FOLDER_NAME}`;

export type ExportCSVArgs = z.infer<typeof ExportCSVArgsSchema>;

export const ExportCSVArgsSchema = z.object({
   collectionTypeUid: z.string(),
});

export interface ExportCSVResult {
   url: string;
   count: number;
   collection: {
      singularName: string;
      pluralName: string;
   };
}

export const getExportCSV =
   (strapi: Strapi) =>
   async ({ collectionTypeUid }: ExportCSVArgs): Promise<ExportCSVResult> => {
      await ensureDirectoryExists(EXPORT_FOLDER_PATH);

      const contentTypeService = getAddonsService(strapi, 'contentTypes');
      const schema = contentTypeService.findOneContentType(collectionTypeUid);

      if (!schema)
         throw new Error(`Collection type "${collectionTypeUid}" not found`);

      let records = await strapi.entityService.findMany(collectionTypeUid);
      records = records.map(processRecord);

      const filename = `export-${schema.collectionName}-${Date.now()}.csv`;

      const writeStream = fs.createWriteStream(
         `${EXPORT_FOLDER_PATH}/${filename}`
      );
      const csvStream = csv.write(records, { headers: true }).pipe(writeStream);

      return new Promise((resolve, reject) => {
         csvStream.on('finish', function () {
            resolve({
               url: `/${EXPORT_FOLDER_NAME}/${filename}`,
               count: records.length,
               collection: {
                  singularName: schema.info.singularName,
                  pluralName: schema.info.pluralName,
               },
            });
         });

         csvStream.on('error', function (err) {
            reject(err);
         });
      });
   };

function processRecord(record: any) {
   let exportedRecord = omit(record, ['createdAt', 'updatedAt', 'publishedAt']);
   exportedRecord.published = record.publishedAt ? 'true' : 'false';
   return exportedRecord;
}
