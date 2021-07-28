import * as path from 'path';
import { Command } from 'commander';
import { serve } from '@zelt/local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command('serve')
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '2626')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port, 10), path.basename(filename), dir, !isProduction);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file`
      );
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.log(
          'Error: 💥',
          `Port ${options.port} already in use, try running on a different port`
        );
      } else {
        console.log('Error: 💥', err.message);
      }
      process.exit(1);
    }
  });
