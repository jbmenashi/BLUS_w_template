# React & Redux Template

## Quick Start Guide:

1.  create an empty repo on Github and clone it to your local machine
2.  git remote add react_redux_template https://github.com/ZResnick/react_redux_template.git
3.  git fetch react_redux_template
4.  git merge react_redux_template/master
5.  Update project name and description in `package.json` and `.travis.yml` files
    5.1 Note that the name in package.json is what Sequelize will look for as your DB, so
    whatever you change the package.json.name to is what your DB's should be named as well
    at steps 7.1 and 7.2
6.  Update title on index.html in public
7.  Create two postgres databases (`MY_APP_NAME` should match the `name` parameter in `package.json`). Note that if you dont have the psql CLI set up, you may need to download Postgres and create a db manually. If you do have the psql cli set up, just follow the steps below.
    7.1 type into CLI: createdb $MY_APP_NAME
    7.2 type into CLI: createdb $MY_APP_NAME-test (make sure this matches travis.yml)
8.  Get OAuth credentials from google:
    8.1 visit https://support.google.com/cloud/answer/6158849?hl=en
    8.2 crete a new project
    8.3 navigate to APIs and Services
    8.4 Click Credentials, New Credentials, OAuth Client ID
    8.5 Authorized JavaScript Origins === http://localhost:7693
    8.6 Authorized Redirect URIs === http://localhost:769/auth/google/callback
    8.7 create the file secrets.js in your root directory and add the following:
    8.7.1 process.env.GOOGLE_CLIENT_ID = 'hush hush'
    8.7.2 process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    8.7.3 process.env.GOOGLE_CALLBACK = '/auth/google/callback'
9.  npm run start-dev

## Deployment with Heroku - Quick Start Guide

Heroku:

1.  Type into the CLI:
    1.1 heroku login
    1.2 heroku create my-apps-name
2.  Look at the remotes we currently have using => git remote -v
    2.1 if heroku links appear, continue...
3.  CLI: git push heroku master
4.  CLI: heroku logs --tail
5.  CLI: npm run delpoy (This script creates a deploy branch, runs webpack, adds these files to the branch, commits these changes, deploys them to Heroku by git push heroku deploy:master and finally deletes the deploy branch)
6.  In heroku, go to overview > configure add-ons:
    6.1 search for postgres and click Heroku Postgres > Hobby Dev-Free, click provision
7.  CLI: heroku run bash
8.  CLI: npm run seed
9.  At this point your app should be running on heroku.
10. Add the Oauth id and keys to the heroku settings > config vars

Travis:

1.  Enable repo in travis website: https://travis-ci.org/
2.  git checkout master && git pull && git checkout -b f/travis-deploy
3.  npm run heroku-token
4.  git add .travis.yml
5.  git commit -m “travis: activate deployment”
6.  git push -u origin f/travis-deploy
7.  git checkout master
8.  git pull
9.  git merge f/travis-deploy
10. npm run deploy
11. you can now check https://<your-app-name>.herokuapp.com

# React Redux Template Long Form Guide

## Setup

To use this as template, you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)
- Run the following commands:

```
git remote add react_redux_template https://github.com/ZResnick/react_redux_template.git
git fetch react_redux_template
git merge react_redux_template/master
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json` and
  `.travis.yml` files
- `npm install`
- Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):

```
export MY_APP_NAME=react_redux_template
createdb $MY_APP_NAME
createdb $MY_APP_NAME-test
```

- By default, running `npm test` will use `$MY_APP_NAME-test`, while
  regular development uses `$MY_APP_NAME`
- Create a file called `secrets.js` in the project root
  - This file is listed in `.gitignore`, and will _only_ be required
    in your _development_ environment
  - Its purpose is to attach the secret environment variables that you
    will use while developing
  - However, it's **very** important that you **not** push it to
    Github! Otherwise, _prying eyes_ will find your secret API keys!
  - It should look like this:

```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

One thing to note is that if you build a bunch of models and then want to change them, you will need to comment IN line 15 of server/index.js.  That {force: true} will overwrite whats currently in the DB, but note that doing this will destroy all your data.  You the need to turn it off again after your tables are re-written so that the next time you launch the app, it doesn't we-write them again.  You can seed data to your DB using npm run seed which will run the file in script/seed.js.

### OAuth

- To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
  - You can get them from the [Google APIs dashboard][google-apis].

[google-apis]: https://console.developers.google.com/apis/credentials

## Linting

Linters are fundamental to any project. They ensure that your code
has a consistent style, which is critical to writing readable code.

This template comes with a working linter (ESLint, with
`eslint-config-fullstack`) "out of the box."

## Start

Running `npm run start-dev` will launch your app!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment

There are two supported ways to deploy this app:

- automatically, via continuous deployment with Travis.
- "manually", from your local machine via the `deploy` script (RECOMMENDED IF
  YOU DON'T HAVE ANY TESTS)

Either way, you'll need to set up your deployment server to start.
The steps below are also covered in the CI/CD workshop.

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

- **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno

- **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.

### Travis

_**NOTE**_ that this step assumes that Travis-CI is already testing your code.
Continuous Integration is not about testing per se – it's about _continuously
integrating_ your changes into the live application, instead of periodically
_releasing_ new versions. CI tools can not only test your code, but then
automatically deploy your app. This is known as Continuous Deployment.
This template comes with a `.travis.yml` configuration almost ready for
continuous deployment; follow these steps to the job.

1.  Run the following commands to create a new branch:

```
git checkout master
git pull
git checkout -b f/travis-deploy
```

2.  Run the following script to finish configuring `travis.yml` :
    `npm run heroku-token`
    This will use your `heroku` CLI (that you configured previously, if
    not then see [above](#Heroku)) to generate an authentication token. It
    will then use `openssl` to encrypt this token using a public key that
    Travis has generated for you. It will then update your `.travis.yml`
    file with the encrypted value to be sent with the `secure` key under
    the `api_key`.
3.  Run the following commands to commit these changes

```
git add .travis.yml
git commit -m 'travis: activate deployment'
git push -u origin f/travis-deploy
```

4.  Make a Pull Request for the new branch, get it approved, and merge it into
    the master branch.

_**NOTE**_ that this script depends on your local `origin` Git remote matching
your GitHub URL, and your local `heroku` remote matching the name of your
Heroku app. This is only an issue if you rename your GitHub organization,
repository name or Heroku app name. You can update these values using
`git remote` and its related commands.

#### Travis CLI

There is a procedure to complete the above steps by installing the official
[Travis CLI tools][travis-cli]. This requires a recent Ruby, but this step
should not be, strictly speaking, necessary. Only explore this option when the
above has failed.

[travis-cli]: https://github.com/travis-ci/travis.rb#installation

That's it! From now on, whenever `master` is updated on GitHub, Travis
will automatically push the app to Heroku for you.

### Your own deploy script

Your local copy of the application can be pushed up to Heroku at will,
using this templates deployment script:

1.  Make sure that all your work is fully committed and merged into your
    master branch on Github.
2.  If you currently have an existing branch called "deploy", delete
    it now (`git branch -d deploy`). We will use a dummy branch
    with the name `deploy` (see below), so and the script below will error if a
    branch with that name already exists.
3.  `npm run deploy`
    _ this will cause the following commands to happen in order:
    _ `git checkout -b deploy`: checks out a new branch called
    `deploy`. Note that the name `deploy` here is not magical, but it needs
    to match the name of the branch we specify when we push to our `heroku`
    remote.
    _ `webpack -p`: webpack will run in "production mode"
    _ `git add -f public/bundle.js public/bundle.js.map`: "force" add
    these files which are listed in `.gitignore`.
    _ `git commit --allow-empty -m 'Deploying'`: create a commit, even
    if nothing changed
    _ `git push --force heroku deploy:master`: push your local
    `deploy` branch to the `master` branch on `heroku`
    _ `git checkout master`: return to your master branch
    _ `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our
production server to be cluttered up with dev dependencies like
`webpack`, but at the same time we don't want our development
git-tracking to be cluttered with production build files like
`bundle.js`! By doing these steps, we make sure our development and
production environments both stay nice and clean!
