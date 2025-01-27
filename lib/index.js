"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@yun-jie/cli");
const logger_1 = require("@yun-jie/cli/lib/utils/logger");
const shell_1 = require("@yun-jie/shell");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
var cli_2 = require("@yun-jie/cli");
exports.help = cli_2.help;
exports.rawArgs = cli_2.rawArgs;
var shell_2 = require("@yun-jie/shell");
exports.prefixTransform = shell_2.prefixTransform;
const commandNotFoundHandler = next => args => {
    const { command } = args;
    if (!command) {
        throw new cli_1.CLIError('Command not found. Type "npx task --help" for more information.');
    }
    next(args);
};
const shellErrorHandler = logger => next => args => {
    const { reject } = args;
    const nextReject = (error) => {
        if (error instanceof shell_1.ShellError) {
            logger.error(error.message);
            process.exit(1);
        }
        else {
            reject(error);
        }
    };
    try {
        next(Object.assign({}, args, { reject: nextReject }));
    }
    catch (error) {
        nextReject(error);
    }
};
function sh(command, options = {}, logger = new logger_1.Logger()) {
    const binPath = path_1.default.resolve('./node_modules/.bin');
    // Include in PATH node_modules bin path
    const nextPath = [
        binPath,
        (options.env && options.env.PATH) || process.env.PATH
    ].join(path_1.default.delimiter);
    const nextOptions = Object.assign({}, options, { env: Object.assign({}, (options.env || process.env), { PATH: nextPath }) });
    logger.log(chalk_1.default.bold(command));
    return shell_1.shell(command, nextOptions);
}
exports.sh = sh;
function cli(definition) {
    return cli_1.cli(definition, cli_1.useMiddlewares([commandNotFoundHandler, shellErrorHandler(new logger_1.Logger())]));
}
exports.cli = cli;
//# sourceMappingURL=index.js.map