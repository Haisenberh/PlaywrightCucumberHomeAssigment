export const config = {
    HOST: process.env.BASE_URL || "http://localhost:5173/",
    API: process.env.API_BASE_URL || "http://localhost:3000",
    DOWNLOAD_FOLDER: process.env.DOWNLOAD_FOLDER || "./tmp",
    SHARED_FOLDER: process.env.SHARED_FOLDER || "./sharedData",
    TEST_DATA_FOLDER: process.env.TEST_DATA_FOLDER || "./src/testData",
  };