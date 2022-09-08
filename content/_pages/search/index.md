---
title: Search
url: search
template: page.html
---

<form action="/search/">
<div class="text placeholder">
  <label for="email">Search:</label>
  <input placeholder="Search terms..." id="q" type="search" name="q">
</div>
  <div class="actions">
    <button class="btn" type="submit">Search</button>
  </div>
</form>
<h2>Results for {{.Query}}:</h2>
<ul class="js-search-results">
<!-- The following is a Caddy server search thing: -->
{{range .Results}}
  <li class="result">
    <a href="{{.Path}}">{{.Title}}</a>
  </li>
{{end}}
</ul>
