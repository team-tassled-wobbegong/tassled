const { Octokit } = require('@octokit/core');

const Config = require('../models/configModels.js');

const repoController = {};

repoController.createNewRepo = async (req, res, next) => {
  // HARD CODED ACCESS TOKEN, NEEDS TO BE FIXED
  console.log('repoController.createNewRepo');
  const { repoName } = req.query;
  // INITIALIZE GITHUB OCTOKIT
  const octokit = new Octokit({ auth: req.query.access_token });
  console.log(req.query);
  // CREATE REPO FROM TEMPLATE
  try {
    console.log('sending request');
    console.log({ octokit });
    const response = await octokit.request(
      'POST /repos/{template_owner}/{template_repo}/generate',
      {
        template_owner: 'team-tassled-wobbegong',
        template_repo: 'react-node-express-starter',
        name: repoName,
        mediaType: {
          previews: ['baptiste'],
        },
      },
    );
    console.log({ response });
    // res.locals.repo = response.data;
    res.status(200).json(response.data);
    return next();
  } catch (e) {
    console.log(e);
    return next({
      log: `Error caught in repoController.createNewRepo. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

repoController.saveRepoToDb = async (req, res, next) => {
  // creates new repo document and saves it to database

  try {
    const repo = res.locals.repo;
    const configItem = {
      name: repo.name,
      description: repo.description,
      gh_repo: repo.url,
      generated_repo_object: repo,
    };
    const configuredItem = await Config.create(configItem);
    return next();
  } catch (e) {
    return next({
      log: `Error caught in repoController.saveRepoToDb. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

module.exports = repoController;
