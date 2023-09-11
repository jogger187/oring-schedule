import { Hono, HonoRequest } from 'hono';
import doTask from './task';
import { Bindings } from './bindings';

const app = new Hono<{ Bindings: Bindings }>();

// interface Environment {
//   BINDING: Fetcher;
// }

// export default <ExportedHandler<Bindings>>{
//   fetch: app.fetch,
//   scheduled: async () => {
//     const response = await fetch(
//       'https://oring_server_check_bot.oringapp.workers.dev/check/'
//     );
//     const { status } = response;
//     console.log({ status: `${status}` });
//     // return new Response(JSON.stringify({ status: status }));
//   },
// };

export default {
  // The scheduled handler is invoked at the interval set in our wrangler.toml's
  // [[triggers]] configuration.
  async scheduled(
    request: Request,
    event: ScheduledEvent,
    env: Bindings,
    ctx: ExecutionContext
  ): Promise<void> {
    // A Cron Trigger can make requests to other endpoints on the Internet,
    // publish to a Queue, query a D1 Database, and much more.
    //
    // We'll keep it simple and make an API call to a Cloudflare API:
    let resp = await fetch('https://oringnetcloud.oringnet.cloud/check');
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log('响应数据：', data);
    // })
    // .catch((error) => {
    //   console.error('发生错误：', error);
    // });

    let wasSuccessful = resp.ok ? 'success' : 'fail';

    console.log(`trigger fired at ${event.cron}: ${wasSuccessful}`);
  },
};
