const testEnv = {
    MONGODB_URL: 'mongodb://localhost:27017',
    MONGODB_DBNAME: 'libray-test',
};

process.env = { ...process.env, ...testEnv };
