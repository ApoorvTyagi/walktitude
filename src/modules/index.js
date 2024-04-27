const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const isDirectory = (folder, source) => {
  const checkDir = fs.lstatSync(path.join(folder, source)).isDirectory();
  return checkDir;
};

const setupRoutes = () => {
  fs.readdirSync(__dirname)
    .filter((subDir) => isDirectory(__dirname, subDir))
    .forEach((version) => {
      const moduleRouter = express.Router();
      const currentDir = path.join(__dirname, version);
      fs.readdirSync(currentDir)
        .filter((subDir) => isDirectory(currentDir, subDir))
        .forEach((module) => {
          const routeFilePath = `./${version}/${module}/${module}.route`;
          moduleRouter.use(`/${module}`, require(routeFilePath));
          console.log(`Loaded API: ${version}/${module}`);
        });
      router.use(`/api/${version}`, moduleRouter);
    });
  return router;
};

module.exports = setupRoutes;
