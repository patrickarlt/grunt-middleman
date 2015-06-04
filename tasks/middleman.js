/*

 * grunt-middleman
 * https://github.com/patrickarlt/grunt-middleman
 *
 * Copyright (c) 2013 Patrick Arlt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('middleman', 'A grunt plugin for running Middleman server.', function() {

    //     [--clean]                  # Remove orphaned files from build (--no-clean to disable)
    //                                # Default: true
    // -g, [--glob=GLOB]              # Build a subset of the project
    //     [--verbose]                # Print debug messages
    //     [--instrument=INSTRUMENT]  # Print instrument messages
    //     [--profile]                # Generate profiling report for the build

    // -e, [--environment=ENVIRONMENT]    # The environment Middleman will run under
    //                                    # Default: development
    // -h, [--host=HOST]                  # Bind to HOST address
    //                                    # Default: 0.0.0.0
    // -p, [--port=PORT]                  # The port Middleman will listen on
    //                                    # Default: 4567
    //     [--verbose]                    # Print debug messages
    //     [--instrument=INSTRUMENT]      # Print instrument messages
    //     [--disable-watcher]            # Disable the file change and delete watcher process
    //     [--profile]                    # Generate profiling report for server startup
    //     [--reload-paths=RELOAD_PATHS]  # Additional paths to auto-reload when files change
    //     [--force-polling]              # Force file watcher into polling mode
    // -l, [--latency=N]                  # Set file watcher latency, in seconds
    //                                    # Default: 0.25

    var options = this.options({
      command: "server",
      useBundle: false,
      environment: "development",
      port: 4567,
      glob: false,
      verbose: false,
      clean: false,
      env: {}
    });

    var args = [],
        done = this.async(),
        cmd = "middleman";

    // if we are using bundler bundle is the command with exec and middleman as the next args
    if(options.useBundle){
      cmd = "bundle";
      args.push("exec");
      args.push("middleman");
    }

    // push the middleman command onto the stack (server or build)
    args.push(options.command);

    options.server = (options.command === "server");

    // add the verbose option
    if(options.verbose){
      args.push("--verbose");
    }

    // add the glob option (build only)
    if(!options.server && options.glob){
      args.push("--glob=" + options.glob);
    }

    // add the clean option (build only)
    if(!options.server){
      if (options.clean){
        args.push("--clean");
      } else {
        args.push("--no-clean");
      }
    }

    // add the server options
    if(options.server){
      args.push("--environment=" + options.environment);
      args.push("--port=" + options.port);
    }

    // copy environment variables
    for (var variable in options.env) {
      if(options.env.hasOwnProperty){
        process.env[variable] = options.env[variable];
      }
    }

    var spawnOpts = {
      stdio: "inherit",
      env: process.env
    };

    // allow user to change current working directory
    if (options.cwd) {
      spawnOpts.cwd = options.cwd;
    }

    // spawn the middleman command
    var child = grunt.util.spawn({
      cmd: cmd,
      args: args,
      opts: spawnOpts
    }, function (error, result, code) {
      if(error){
        grunt.log.error("Error running middleman " + options.command + " " + error);
      } else {
        grunt.log.ok("Finished running middleman " + options.command);
      }
      done(error);
    });

    process.on("SIGINT", function(e){
      child.kill("SIGINT");
    });

  });

};
