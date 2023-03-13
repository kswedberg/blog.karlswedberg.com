import {readFile, writeFile} from 'node:fs/promises';
import {parse} from 'opml';
import {join} from 'node:path';
import axios from 'axios';
import {peach} from '../peach.mjs';

const opmlFile = join(process.cwd(), 'gitignore/Feedly.opml');
const jsonFile = join(process.cwd(), 'scripts/webdev.json');
const mdFile = join(process.cwd(), 'scripts/webdev.md');

const compareUrls = (res) => {
  const {protocol, host, path} = res.request;
  const original = res.config.url;
  let final = `${protocol}//${host}`;

  if (original !== final) {
    final += path;
  }

  return {
    matches: original === final,
    original,
    final,
  };
};

const outputMd = async(jsonArray) => {
  const json = jsonArray || [];

  if (!json.length) {
    const str = await readFile(jsonFile, {encoding: 'utf-8'});
    const arr = JSON.parse(str);

    json.push(...arr);
  }
  const feeds = json.map(({title, html, xml}) => {
    return `* [${title}](${html.final}) ([feed](${xml.final}))`;
  });

  const md = feeds.join('\n');

  await writeFile(mdFile, md);
  console.log('Done writing md file');
};

const getFeed = async() => {
  const feed = await readFile(opmlFile, {encoding: 'utf-8'});

  parse(feed, async(err, rss) => {
    if (err) {
      return console.log(err);
    }

    const webDev = rss.opml.body.subs.find(({title}) => title === 'Web Dev');

    const sorted = webDev.subs.map((value) => {
      return {
        value,
        sortBy: value.title.toLowerCase().replace(/^(an?|the) /, ''),
      };
    })
    .sort((a, b) => {
      if (a.sortBy === b.sortBy) {
        return 0;
      }

      return a.sortBy > b.sortBy ? 1 : -1;
    })
    .map(({value}) => value);

    const all = await peach(sorted, async(item) => {
      console.log('Checking', item.htmlUrl);
      const res = {title: item.title};

      try {
        const html = await axios.get(item.htmlUrl);

        res.html = compareUrls(html);
      } catch (err) {
        console.log('error fetching', item.htmlUrl);
        res.error = true;
        res.url = item.htmlUrl;
      }

      try {
        const xml = await axios.get(item.xmlUrl);

        res.xml = compareUrls(xml);
      } catch (err) {
        console.log('error fetching', item.xmlUrl);
        res.error = true;
        res.url = item.xmlUrl;
      }

      return res;
    });

    await writeFile(jsonFile, JSON.stringify(all, null, 2));

    await outputMd(all);
    console.log('done!');
    // console.log(JSON.stringify(sorted, null, 2));
  });
};

const feedburner = async() => {
  const str = await readFile(jsonFile, {encoding: 'utf-8'});
  const json = JSON.parse(str);

  const feeds = json.filter(({xml}) => {
    return xml.final.includes('feedburner');
  });

  const fbFile = join(process.cwd(), 'scripts/feedburner.json');


  await writeFile(fbFile, JSON.stringify(feeds, null, 2));
  console.log('Found', feeds.length, 'feedburner links');
  console.log('Done writing feedburner file');
};

const jsonToXml = async() => {
  const str = await readFile(jsonFile, {encoding: 'utf-8'});
  const json = JSON.parse(str);
  const feeds = json.map(({title, html, xml}) => {
    return `<outline title="${title}" text="${title}" type="rss" htmlUrl="${html.final}" xmlUrl="${xml.final}" />`;
  });

  const opml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <opml version="2.0">
    <head>
      <title>Feedly</title>
    </head>
    <body>
      ${feeds.join('\n    ')}
    </body>
  </opml>`;

  const webdevOpmlFile = join(process.cwd(), 'scripts/webdev.opml');

  await writeFile(webdevOpmlFile, opml);
};

jsonToXml();
// outputMd();
// feedburner();
