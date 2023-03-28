import {Hono} from 'hono';
import {cors} from 'hono/cors';
import {Fzf} from 'fzf';
import {serveStatic} from 'hono/cloudflare-workers';
import posts from '../assets/static/search.json';

const fzf = new Fzf(posts, {
  limit: 10,
  selector: ({title, excerpt}) => `${title} ${excerpt}`,
});
const app = new Hono();

app.get('/static/*', serveStatic({root: './'}));
app.get('/favicon.ico', serveStatic({path: './favicon.ico'}));

const getEntries = (name) => {
  const entries = fzf.find(name);

  return entries.map(({item, positions}) => {
    return {
      item,
      positions: [...positions],
    }
  });
};

app.get('/', (ctx) => {
  const name = ctx.req.query('name');
  const data = getEntries(name) || [];
  const url = data[0] && data[0].item && data[0].item.url;
  if (url) {
    return ctx.redirect(url);
  }

  ctx.text(`hey there! Couldn't find ${name}`)
});


app.use('/search', cors());

app.get('/search', (ctx) => {
  const name = ctx.req.query('name');
  const data = getEntries(name);
  const response = {
    metadata: {
      success: true,
      name,
    },
    data,
  };

  return ctx.json(response);
});
export default app;
