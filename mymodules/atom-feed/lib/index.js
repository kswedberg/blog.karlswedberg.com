/* eslint-ignore no-param-reassign */

module.exports = function(opts) {
  opts = opts || {};
  let contentType, contentProp;
  let Feed = require('feed');
  let url = require('url');
  let extend = require('extend');

  if (!opts.collection) {
    throw new Error('A collection is required');
  }

  opts = extend(true, {
    destination: 'atom.xml',
    content: {
      // type can be 'summary' or 'content' (or 'full', which is aliased to 'content')
      type: 'summary',
      // property is the file's data property to use.
      property: 'excerpt',
    },
  }, opts);
  contentType = opts.content.type === 'full' ? 'content' : opts.content.type;
  contentProp = opts.content.property;

  let feedKeys = {
    id: ['url', 'slug'],
    title: ['title', 'siteTitle'],
    description: ['subtitle', 'description'],
    link: ['link', 'url'],
    copyright: ['rights', 'copyright', 'license'],
    author: ['author'],
  };

  let merge = function merge(src, obj) {
    let props;

    obj = obj || {};

    for (let key in feedKeys) {
      props = feedKeys[key];

      for (let i = 0, len = props.length; i < len; i++) {
        if (obj[props[i]] !== undefined) {
          src[key] = obj[props[i]];
        }
      }
    }

    return src;
  };
  let convertToAuthor = function convertToAuthor(data) {
    if (!data) {
      return;
    }

    if (!Array.isArray(data)) {
      data = [data];
    }

    data.forEach((datum, i) => {
      if (typeof datum === 'string') {
        data[i] = {name: datum};
      }
    });

    return data;
  };

  let generateFeed = function generateFeed(files, metalsmith, done) {
    let feed, collection;
    let metadata = metalsmith.metadata();
    let feedData = merge({}, metadata);

    feedData.feed = url.resolve(feedData.link, opts.destination);
    feedData = merge(feedData, opts.feedData);

    feed = new Feed(feedData);

    collection = metadata.collections[opts.collection];

    if (opts.limit) {
      collection = collection.slice(0, opts.limit);
    }

    collection.forEach((file) => {
      file.author = file.author || file.authors;
      file.contributor = file.contributor || file.contributors;

      let itemData = {
        title: file.title,
        link: file.link || url.resolve(feedData.link, file.path || file.url),
        date: typeof file.date === 'string' ? new Date(file.date) : file.date,
        author: convertToAuthor(file.author) || convertToAuthor(feedData.author),
        contributor: convertToAuthor(file.contributor),
      };

      itemData[contentType] = file[contentProp];

      feed.addItem(itemData);
    });

    feed = feed.render('atom-1.0');
    files[opts.destination] = {
      contents: new Buffer(feed, 'utf8'),
    };
    done();
  };

  return generateFeed;
};
