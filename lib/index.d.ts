import { CommandsModule } from '@zhangyunjie/cli';
import { Logger } from '@zhangyunjie/cli/lib/utils/logger';
import { IAsyncShellOptions, ISyncShellOptions } from '@zhangyunjie/shell';
export { help, rawArgs } from '@zhangyunjie/cli';
export { prefixTransform } from '@zhangyunjie/shell';
export declare function sh(command: string, options: IAsyncShellOptions, logger?: Logger): Promise<string | null>;
export declare function sh(command: string, options?: ISyncShellOptions, logger?: Logger): string | null;
export declare function cli(definition: CommandsModule): void;
