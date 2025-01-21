/**
 * Place for configuration logic that is based on our environment.
 */

export const config = {
    HOST: process.env.BASE_URL || "http://localhost:5173/",
    API: process.env.API_BASE_URL || "http://localhost:3000",
    DOWNLOAD_FOLDER: process.env.DOWNLOAD_FOLDER || "./tmp",
  };