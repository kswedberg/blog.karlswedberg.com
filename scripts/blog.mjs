import path from 'path';
import {readdirSync} from 'fs';
import inquirer from 'inquirer';
import {outputFile} from 'fs-extra/esm';
import dpPrompt from 'inquirer-datepicker-prompt';
import {slugify, dateToYMD} from '../src/utils/misc.mjs';

const cwd = process.cwd();
const collections = readdirSync(path.join((cwd, 'src/content')));

collections.push('other');

const buildFileName = (title, date) => {
  const ymd = dateToYMD(date);

  return slugify(`${ymd} ${title}`);
};
const buildFrontMatter = ({date, title, tags, draft}) => {
  const t = (tags || []).join(', ');
  const draftLine = draft ? `draft: true
` : '';

  return `---
date: ${date}
title: ${title}
tags: [${tags}]
${draftLine}---

  `;
};

inquirer.registerPrompt('datetime', dpPrompt);
inquirer.prompt([
  {
    type: 'text',
    name: 'title',
    message: 'Title of the blog post',
    validate(input) {
      return !!input || 'A title is required';
    },
  },
  {
    type: 'datetime',
    name: 'date',
    message: 'Date of the blog post?',
    format: ['yyyy', '-', 'mm', '-', 'dd'],
  },
  {
    type: 'text',
    name: 'tags',
    message: 'List one or more tags for the post (separate them with a comma)',
    filter(input) {
      return input.split(/\s*,\s*/);
    },
  },
  {
    type: 'confirm',
    name: 'draft',
    message: 'Mark this as a draft (at least for now)?',
  },
  {
    type: 'list',
    name: 'collection',
    message: 'In which content collection does this belong?',
    choices: collections,
  },
  {
    type: 'text',
    name: 'newCollection',
    message: 'Ok, what is the name of the new collection?',
    when(answers) {
      return answers.collection === 'other';
    },
  },
])
.then(({date, title, tags, draft, ...answers}) => {
  console.log(answers);
  const collection = answers.newCollection || answers.collection;
  const dir = path.join(cwd, 'src', 'content', collection);
  const fileName = buildFileName(title, date);
  const frontMatter = buildFrontMatter({date, title, tags, draft});
  const filePath = path.join(dir, `${fileName}.md`);

  console.log('Creating a file at', filePath);

  return outputFile(path.join(dir, fileName), frontMatter);
});
