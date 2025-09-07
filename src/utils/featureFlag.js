import { getEnvVar } from './getEnvVar.js';
import { saveFileToClouds } from './saveFileToClouds.js';
import { saveFileToUploads } from './saveFileToUploads.js';

export const featureFlag = async (photo) => {
  const enableCloudStorage = getEnvVar('ENABLE_CLOUD');

  return enableCloudStorage
    ? await saveFileToClouds(photo)
    : await saveFileToUploads(photo);
};
