---
date: Sun Feb 26 2023 14:40:04 GMT-0500 (Eastern Standard Time)
title: Making links big
excerpt: Back in the days before HTML5, wrapping a link around block-level elements wasn't semantically appropriate. Even now, some situations—like linking a table row—call for a more creative solution...
tags: [html, css]
---

Back in the days before HTML5, our pretty little doctype — `<!DOCTYPE html>` — looked more like `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`. If you were especially masochistic, you used `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">` with the `application/xhtml+xml` mime type.

<div class="grid grid-cols-2 gap-2">
<Image class="inline-block" alt="Valid HTML 4.0.1 badge" src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Valid_HTML_4.0.1.svg" />
<Image class="inline-block" alt="Valid XHTML 1.0 badge" src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Valid_XHTML_1.0.svg" />
</div>
Standards compliance was all the rage, and webmasters loved to show that their sites passed the <a href="https://validator.w3.org/">W3C markup validator</a>. But such compliance meant that you couldn't have some nice things, like block-level elements inside a link (aka "anchor" element). For example, this was not valid:

```html
<a href="https://example.com"><h3>heading</h3><div>excerpt</div></a>
```

With HTML 4.01, you could probably get away with it, though you might be shamed into removing your badge. With XHTML and the "proper" application/xhtml+xml mime type, however, a browser might stop rendering the page altogether.

At one point (many years ago) I resorted to writing a Big Link jQuery plugin to handle this scenario. If you assigned a class of `big-link` to a containing element, the plugin would find the first href attribute among its inner elements. Clicking anywhere in the container would trigger `location.href = [innerElement's href]`. All that was left was a splash of CSS to fake the link

```css
.big-link {cursor: pointer;}
.big-link:hover a {text-decoration: underline;}
```

Something about that felt dirty, though. I mean, sure, it was "progressive enhancement" in a way, but the idea of using JavaScript to do what an anchor element gives us for free was like paying extra for a knock-off brand. In my experience, JavaScript solutions get more complicated the more I think about them, and this one is no exception. To be consistent with browsers, I'd also have to account for <kbd>⇧</kbd>+click, <kbd>^</kbd>+click, and <kbd>⌘</kbd>+click behaviors—which I'm sure I didn't even consider back then.

Fortunately, this issue is moot with HTML5, because it does allow block-level elements inside anchors. As long as the `<a>` is given a `display` value of `block` (or `flex` or `grid` etc.), its contents should behave and render as expected.

## Linking a table row

And yet, even the more tolerant HTML5 doesn't account for every edge case. A table row, for example, can only have a `thead` or a `tbody` as its parent, and it can only have a `th` or `td` as its direct child. So, how can we link the entire row when we can neither wrap the `<tr>` nor wrap its children in a link?

One possibility that I've seen suggested is to wrap each table cell in a link with the same `href`, while giving all but the first link `tabindex="-1"`:

```html
<tr>
  <td><a href="https://example.com">one</a></td>
  <td><a tabindex="-1" href="https://example.com">two</a></td>
  <td><a tabindex="-1" href="https://example.com">three</a></td>
</tr>
```

<table class="ex-table">
<caption>Links have padding & display:block; tr:hover changes td background-color</caption>
<tbody class="not-prose">
<tr class="link-cells">
  <td><a href="https://example.com">one</a></td>
  <td><a tabindex="-1" href="https://example.com">two</a></td>
  <td><a tabindex="-1" href="https://example.com">three</a></td>
</tr>
</tbody>
</table>

Better than nothing, I suppose, but still not ideal.

The best solution I know of here is to only include one link and use the `::after` pseudo-element to stretch that link across the row. If we had a table in which the first cell of each row included a link we wanted to stretch across, the CSS might look something like this \[_Edit: I had to add a `transform` rule to the row to get it to work in Safari_]:

```css
tr.link-row {
  position: relative;
  transform: translateX(0);
}
tr.link-row td:first-child > a::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
```

And here is the result, with only one link per row:

<table class="ex-table">
<caption>One link per row, in the first column</caption>
<tbody class="not-prose">
<tr class="link-row">
  <td><a href="https://example.com/foo">one</a></td>
  <td>two</td>
  <td>three</td>
</tr>
  <tr class="link-row">
    <td><a href="https://example.com/bar">ayyyy</a></td>
    <td>beeeee</td>
    <td>seeeee</td>
  </tr>
</tbody>
</table>

My only concern is that the non-link text (in columns 2 and 3 here) is no longer selectable by the user. Is this a major accessibility blunder? I suppose there's a way to accommodate user selection by listening for `mousedown` and `mousemove` events. But then we'd also have to account for double-clicking to select as well. Again, JavaScript solutions get complicated. I can't think of an elegant way around this.

I ran into this situation a few days ago, except the last cell in each row had a button that needed to be clickable. Fortunately, the button had a fixed width, so I just needed to adjust the link's width like so:

```css
td:first-child > a::after {
  /* other stuff */
  width: calc(100% - 3.75rem);
}
