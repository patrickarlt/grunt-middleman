# grunt-middleman

> A grunt plugin for running Middleman.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-middleman --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-middleman');
```

## The "middleman" task

### Overview
In your project's Gruntfile, add a section named `middleman` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  middleman: {
    options: {
      useBundle: true
    },
    server: {},
    build: {
      options: {
        command: "build"
      }
    }
  }
})
```

### Options

#### options.command
Type: `String`
Default value: `'server'`

This is the command that Middleman will execute. It should be `'server'` or `'build'`. Certain properties can only be used with `'server'` or `'build'`

#### options.useBundle
Type: `Boolean`
Default value: `false`

If you are using Bundler set this to true to prefix your command with `bundle exec`.

#### options.environment
Type: `String`
Default value: `'development'`

Set the Ruby environment that your command will run in. Generally you should let Middleman handle this.

#### options.port
Type: `Integer`
Default value: `4567`

The port the Middleman server will run on. **Server only**

#### options.glob
Type: `String`
Default value: `false`

Builds a subset of the Middleman site. **Build only**

#### options.verbose
Type: `Boolean`
Default value: `false`

Enable verbose output.

#### options.clean
Type: `Boolean`
Default value: `false`

Remove orphaned files from build. **Build only**

#### options.env
Type: `Object`
Default value: `{}`

Additional environment variables to set. This is useful for passing options into your `config.rb` file

#### options.cwd
Type: `String`
Default value: none

Set this to change the directory where the Middleman `config.rb` and `source` are located. Defaults to same directory Gruntfile is in.

### Usage Examples

#### Default Options
In this example the default options will start the Middleman server on port 4567 when you run `grunt middleman`.

```js
grunt.initConfig({
  middleman: {
    options: {
      command: "server",
      useBundle: false,
      environment: "development",
      port: 4567,
      glob: false,
      verbose: false,
      clean: false,
      env: {}
    }
  }
});
```

#### Custom Options
This configuration will use bundler to execute `middleman build` or `middleman server` when you run `grunt middleman:build` or `grunt middleman:server`.

```js
grunt.initConfig({
  middleman: {
    options: {
      useBundle: true
    },
    server: {},
    build: {
      options: {
        command: "build"
      }
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
