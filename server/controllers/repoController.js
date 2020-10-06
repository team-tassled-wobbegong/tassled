const { Octokit } = require('@octokit/core');

const Config = require('../models/configModels.js');

const repoController = {};

repoController.createNewRepo = async (req, res, next) => {
  const { repoName } = req.query;
  // INSTANTIATE GITHUB OCTOKIT API
  const octokit = new Octokit({ auth: req.query.access_token });
  // CREATE REPO FROM TEMPLATE
  try {
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
    res.status(200).json(response.data);
    return next();
  } catch (e) {
    return next({
      log: `Error caught in repoController.createNewRepo. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

// SAVES CREATE REPO RESPONSE AS DOCUMENT TO DB
repoController.saveRepoToDb = async (req, res, next) => {
  try {
    const repo = res.locals.repo;
    const configItem = {
      name: repo.name,
      description: repo.description,
      gh_repo: repo.url,
      generated_repo_object: repo,
    };

    await Config.create(configItem);

    return next();
  } catch (e) {
    return next({
      log: `Error caught in repoController.saveRepoToDb. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

module.exports = repoController;
