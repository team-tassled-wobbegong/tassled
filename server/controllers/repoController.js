import { Octokit } from '@octokit/core';
const { User } = require('../models/schema-models.js');

const repoController = {};

repoContoller.createNewRepo = async (req, res, next) => {
  // HARD CODED ACCESS TOKEN, NEEDS TO BE FIXED
  const hardCodedToken = '5898b61addad0552529ed60dc0f0346c887757d0';

  // INITIALIZE GITHUB OCTOKIT
  const octokit = new Octokit({ auth: hardCodedToken });

  // CREATE REPO FROM TEMPLATE
  try {
    const response = await octokit.request(
      'POST /repos/{template_owner}/{template_repo}/generate',
      {
        template_owner: 'team-tassled-wobbegong',
        template_repo: 'best-of-the-best',
        name: 'The custom template name goes here',
        mediaType: {
          previews: ['baptiste'],
        },
      },
    );
    return next();
  } catch (e) {
    return next({
      log: `Error caught in repoController.createNewRepo. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

module.exports = repoController;