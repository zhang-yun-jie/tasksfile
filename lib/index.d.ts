import { CommandsModule } from '@yun-jie/cli';
import { Logger } from '@yun-jie/cli/lib/utils/logger';
import { IAsyncShellOptions, ISyncShellOptions } from '@yun-jie/shell';
export { help, rawArgs } from '@yun-jie/cli';
export { prefixTransform } from '@yun-jie/shell';
export declare function sh(command: string, options: IAsyncShellOptions, logger?: Logger): Promise<string | null>;
export declare function sh(command: string, options?: ISyncShellOptions, logger?: Logger): string | null;
export declare function cli(definition: CommandsModule): void;
