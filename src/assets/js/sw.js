/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/404.html","9372f19c2c77ced84c4a9e2880899b09"],["/about/index.html","5d56017f3dcdecea2b877358113cb0fa"],["/another-media-query-detection-script/index.html","cce7b49f34a2685c347dde73fa0185ed"],["/assets/css/app-a6922968c4.css","a6922968c4054878464ba65eda38861e"],["/assets/css/app.css","a6922968c4054878464ba65eda38861e"],["/assets/fonts/lmsans10-bold-webfont.eot","5909b0bb174fb1238da0dfd9f5d1185d"],["/assets/fonts/lmsans10-bold-webfont.svg","e287ba4db551ab0915ca2191f2b53161"],["/assets/fonts/lmsans10-bold-webfont.ttf","62dfd7c2ac65c19fe6f2c478a1836fe4"],["/assets/fonts/lmsans10-bold-webfont.woff","62d7ab84b28c135c9e6013e44179b71a"],["/assets/fonts/lmsans10-boldoblique-webfont.eot","69c584e6496d8d4bc0b90f87a7d717a6"],["/assets/fonts/lmsans10-boldoblique-webfont.svg","b3b108276ad5c7a7454ccc3d30cf9902"],["/assets/fonts/lmsans10-boldoblique-webfont.ttf","e264d65d406b5b874351c5d1aa4d45c2"],["/assets/fonts/lmsans10-boldoblique-webfont.woff","a3089206ebb41c1d9c0a35a0bcf74841"],["/assets/fonts/lmsans10-oblique-webfont.eot","f5ee9b8b8b63cb708aed8a419d172f97"],["/assets/fonts/lmsans10-oblique-webfont.svg","7fcc363e73918a9497e5c276a8f25b27"],["/assets/fonts/lmsans10-oblique-webfont.ttf","1764d351b409b62717a213a9039bf48c"],["/assets/fonts/lmsans10-oblique-webfont.woff","6a95cdd9f9ab9b53075b19621fa77b37"],["/assets/fonts/lmsans10-regular-webfont.eot","944fa7a4551d3f73fa9c1fd2c6f29013"],["/assets/fonts/lmsans10-regular-webfont.svg","31ce9df1fe6df64cedc026f8274f1d60"],["/assets/fonts/lmsans10-regular-webfont.ttf","7e59ac7ff98b10e10ec7c46e1293c178"],["/assets/fonts/lmsans10-regular-webfont.woff","2be10254976d461592545a8a2d83cd5f"],["/assets/fonts/lmsansdemicond10-oblique-webfont.eot","49a1798cc7acfc32010714c4af9d2e21"],["/assets/fonts/lmsansdemicond10-oblique-webfont.svg","f2a74740e6836c838a6b31332b50b549"],["/assets/fonts/lmsansdemicond10-oblique-webfont.ttf","d5a88ff33c60b42e9ea2391d575943f8"],["/assets/fonts/lmsansdemicond10-oblique-webfont.woff","802ba93bbd54cba830054d8f29328977"],["/assets/fonts/lmsansdemicond10-regular-webfont.eot","6daa18cc3fe489368ed0e75427dc429a"],["/assets/fonts/lmsansdemicond10-regular-webfont.svg","c7f61d50bde33bb811f1785f75f55013"],["/assets/fonts/lmsansdemicond10-regular-webfont.ttf","05b8411e135d02da2b156e45cbc74986"],["/assets/fonts/lmsansdemicond10-regular-webfont.woff","dc4625d8249a5634fe06ec34f0272939"],["/assets/js/head-7c0338a529.js","7c0338a529d16132bfa35de52ee503dd"],["/assets/js/head.js","7c0338a529d16132bfa35de52ee503dd"],["/assets/js/tail-bab41ed509.js","bab41ed509284ce2f8750fe0a94130e6"],["/assets/js/tail.js","bab41ed509284ce2f8750fe0a94130e6"],["/bash-it/index.html","96e4ed4a75147b679042f00a7890c3c0"],["/cleaning-up-dead-git-branches/index.html","85503e928a919d0a8b9dcdd910eb0da8"],["/creating-a-new-remote-git-repo/index.html","c4c307f53b1f606c361335ae8abb34e4"],["/forcing-ms-office-files-to-download/index.html","7e76d3d5fa696046864921004989b6d4"],["/google42d7bde74df6ceb1.html","fca6147da96da4723e069120bdab14e0"],["/html5-web-asterisk-features/index.html","9015cdb1c54e63bf49bf0a76bd6dbef3"],["/index.html/index.html","93b7cd2841a6b56db9311b8638caa402"],["/javascript-garden/index.html","a18551dbe5027a16c5cd5511067c220f"],["/jsmake/index.html","60a8d3d87d4faef728ff0b3f08497c7d"],["/media-query-detection/index.html","285e307be74dcadb184f4fd97bf719df"],["/mobile-safari-debug-console/index.html","e2cc3d5a0603468a002ff70d2e6c2c22"],["/my-mis-adventures-with-web-video/index.html","e9e60500cc541aa1f92d50a489647865"],["/pushing-an-existing-local-repo-to-new-github-repo/index.html","7b2b2f08b58a5be09788ea188f3a1321"],["/quick-object-merge/index.html","4474bd6f656fa2900ef2330913529808"],["/rakefile/index.html","0022f46af1e6339df4f516f05414db99"],["/recent-reads/index.html","46aa21439aac8236aaab37f105d7bf2c"],["/rewriterule-always-considered-first/index.html","43d29e673ff54a80316968daace98835"],["/rsync-shortcut/index.html","c940dad1ced82b5245db03af89e6e659"],["/search/index.html","916213155f3121157fce2c6c55360de3"],["/topic/apache/index.html","ded60b7f74ad032d4d9735ce390226be"],["/topic/bash/index.html","adac022afe2ee965791724bd159a699c"],["/topic/css/index.html","c729e0b9e1216c0c7f175240f7287f34"],["/topic/git/index.html","0ac3108287f70fb29205335c80d7c55e"],["/topic/html/index.html","8f5ed57e204d9df1aa721e070754b1e4"],["/topic/index.html","869d4cc358b738b60b83599d8519705e"],["/topic/js/index.html","faf06328c4f5b36958b1f775eb585a95"],["/topic/links/index.html","f76bd43c64b318fb0409294abc4d1850"],["/topic/make/index.html","23a1b17ace26f6246abc8e62f4c8041a"],["/topic/mobile/index.html","9a843b0c72ea64b1755535f0db341e39"],["/topic/rake/index.html","c7d1459ebf0635be5115d821bcd81c0d"],["/topic/video/index.html","8dba4323a03a7baff7d40313ee2a270b"],["/yeoman-ulimit-and-unmet-dependency/index.html","b4e0535ea8661c6bc8295c34ec982442"]];
var cacheName = 'sw-precache-v2-blog.karlswedberg.com-' + (self.registration ? self.registration.scope : '');




var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function(originalUrl, paramName, paramValue, dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /((\w+\-\w+\.(css|js))|\.(svg|ttf|eot|woff))$/);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {

      // Force the SW to transition from installing -> active state
      return self.skipWaiting();

    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {

      return self.clients.claim();

    })
  );
});
