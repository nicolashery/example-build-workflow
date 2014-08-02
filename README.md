# Example web app development workflow and build tools

> This repo contains my current preferred web app development workflow and build tools.

**NOTES**:

- Development and build workflows are really a matter of personal taste & project conditions. What follows works for me on most of my projects, but I don't expect it to work for everyone or every project. :)
- Development and build tools for web apps change all the time, and there is a risk of spending too much time tweaking your workflow (I know I have!). What matters I think is to just pick a set of tools, what you think works best today, use it, and be open to switch out parts of it when it becomes obvious something better has come along.

In this workflow I tried to focus on three things:

- **Developer happiness**: people are more likely to contribute to your project if it's easy to get up and running and if things "just work"
- **Performance**: a fast feedback loop is important to be effective, so you shouldn't have to wait a few seconds before hitting the browser refresh and seeing your changes
- **Simplicity**: it's easy to over-engineer things, so I tried to stay simple wherever I could (might not always be the case, so do tell me if some things seem overly-complicated); this also helps in maintaining the workflow and build step (add vendor libraries, etc.)

Tech stack overview:

- [Webpack](http://webpack.github.io/)
- [ShellJS](http://documentup.com/arturadib/shelljs)
- [Gulp](http://gulpjs.com/) (only used for JSHint, might be removed)

## Quick start

**NOTE**: I'm able to add this "quick start" in each of my projects, and it shows you the workflow. I like the fact that I can keep it relatively short.

Clone this repository and install dependencies:

```bash
$ npm install
```

Source a config file (you can copy and edit `config/sample.sh`) and run the development server:

```bash
$ source config/sample.sh
$ npm start
```

To build a static version of the app in the `dist/` directory, ready for deployment, run:

```bash
$ source config/sample.sh
$ npm run build
```

You can test the build with:

```bash
$ npm run server
```

Run JSHint with:

```bash
$ npm run jshint
# or you can watch files and re-run on changes with:
$ npm run jshint-watch
```

## Webpack bundler

In terms of bundling things together for the browser, I started by using the popular [Browserify](http://browserify.org/) but at some point switched to using [Webpack](http://webpack.github.io/).

Browserify is really good and a lot of great work is put into it, but I found it to be a bit too "node-centric" to my taste. The world of front-end web development contains a lot more than JavaScript files and CommonJS modules, and I feel that Webpack really embraces that. It gives this "it just works" feeling with all the things needed in the browser: CSS (& preprocessors like Less, Sass), images, fonts, etc.

## npm scripts

As you saw in the "quick start", I use the `scripts` attribute in `package.json` to use `$ npm run <script>` on the command-line.

It's nice to have a single place to run commands. It also means that I can change the underlying script or command without needing to remember a new thing to type into the terminal.

## Start developing with a single command

For development, one thing that's important to me is that you can start coding by having just one command to type in a terminal: `npm start`.

Some workflows require you to have one terminal running a "watch & rebuild" task, and another terminal running a server, I prefer having just one command and one terminal if I can. I also like the idea of not having any temporary files being saved in my project folder, i.e. having everything built in-memory.

With Webpack I can use the [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html), which does all of that for me.

The Webpack dev server also has caching and incremental builds, which is important for performance: after the first build, it's only rebuilding the files that changed, making the requests to the server faster. (Browserify also has incremental builds with [watchify](https://github.com/substack/watchify), but that will only work on JS files).

## Cross-platform Bash scripts

As I said before, there are a lot of build tools out there ([Grunt](http://gruntjs.com/), [Gulp](http://gulpjs.com/), [Broccoli](https://github.com/broccolijs/broccoli) to state some popular ones).

Lately I found that if the build is simple enough (note that Webpack takes care of most of the build anyway), I like to use [ShellJS](http://documentup.com/arturadib/shelljs). A lot of developers are used to working with UNIX commands like `cat`, `rm`, `mkdir`, etc., so there's nothing really new to learn. It's like a `bash` script, except it's cross-platform. You can even create a script that has the structure of a `Makefile` if you want to.

In terms of speed (Gulp aims to be fast, thanks to its use of streams), I haven't had any problems with it. I find that for a fresh build, the `npm install` part is usually what takes the longest.

## Static server

I include [http-server](https://github.com/nodeapps/http-server) to test the static production build. Don't expect people to have static servers ready, or to remember the command `python -m SimpleHTTPServer`. It's nice to have it all available for them. :)

## Embracing CommonJS and npm

On the front-end, there are all kinds of module systems (AMD, CommonJS, ES6 modules, etc.), and "package managers" (Bower, Component, npm, etc.).

Recently I've tried to just stick with CommonJS (`var foo = require('foo')`), and npm. It's really just a matter of taste and trying to keep it simple. What's nice about Webpack is that it can support a lot of different systems, so one could adapt it easily to a different convention.

## Config with environment variables

Webpack has support for [envify](https://github.com/hughsk/envify), which replaces `process.env.ENV_VAR` with the value of the environment variable `ENV_VAR`. I use this to pass configuration values to the web app when building it (ex: `export API_URL='http://staging-api.example.com'`), somewhat mimicking the process of configuring a server-side Node.js app. (Of course, don't store anything secret in that config object, since unlike the server-side case, it is available for anyone to see.)

## JSHint

I use [Gulp](http://gulpjs.com/) only to run JSHint (allows me to easily run the [React](http://facebook.github.io/react/) transform first, for example).

If I have some time, I might switch to a custom script using [Gaze](https://github.com/shama/gaze) and the JSHint node API directly. That would allow me to get rid of the Gulp dependency.

## No scaffolding

Although I'm sure some people find it really helpful, I've never gotten around to using scaffolding tools like [Yeoman](http://yeoman.io/).

I guess the first reason is that it doesn't really take me that much time (under an hour to be generous) to copy-paste all the development and build stuff from an old project to a new one. That's nothing compared to the many hours I'll spend developping the app.

The second reason would be that tools change all the time, so I'm likely to have a slightly different set of tools from one project to the next. I don't necessarily want to keep a generator or scaffolding tool "up-to-date" in parallel.

## No live reload

Some people like it, but I've also never gotten around to using [LiveReload](http://livereload.com/).

I've used it once, but I found that I was not hitting "Save" after making some changes, because I knew things wouldn't work yet and I didn't want to trigger the reload.

I'd much rather do some coding, save files often, and choose when I want the browser to refresh and show me my changes. I haven't yet felt the feedback loop to be too slow that way.

LiveReload is nice when you're working on the CSS though.
