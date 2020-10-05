const { Octokit } = require('@octokit/core');

// const { User } = require('../models/schema-models.js');

const repoController = {};

repoController.createNewRepo = async (req, res, next) => {
  // HARD CODED ACCESS TOKEN, NEEDS TO BE FIXED
  const hardCodedToken = process.env.TEST_OAUTH_TOKEN;

  // INITIALIZE GITHUB OCTOKIT
  const octokit = new Octokit({ auth: hardCodedToken });

  // CREATE REPO FROM TEMPLATE
  try {
    const response = await octokit.request(
      'POST /repos/{template_owner}/{template_repo}/generate',
      {
        template_owner: 'team-tassled-wobbegong',
        template_repo: 'best-of-the-best',
        name: 'Another custom template name goes here',
        mediaType: {
          previews: ['baptiste'],
        },
      },
    );
    console.log('REPOS RESPONSE');
    console.log({ response });
    res.locals.repo = response;

    return next();
  } catch (e) {
    return next({
      log: `Error caught in repoController.createNewRepo. \n Error Message: ${e.errmsg || e}`,
      message: { err: e.errmsg || e },
    });
  }
};

module.exports = repoController;
