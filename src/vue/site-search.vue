<template>
  <form id="searchWrapper" action="https://good-search.karl.workers.dev/" class="relative z-10" @submit.prevent="onSubmit">
    <label class="block" for="search-name">Search</label>
    <input
      v-model="searchName"
      @input="onInput"
      @keydown="moveSelection"
      type="search"
      name="name"
      id="search-name"
      class="p-1 border border-slate-600 rounded-md outline-none focus:ring focus:ring-blue-400"
    >
    <ul v-show="results.length && selectedIndex >= 0" class="absolute standard-color bg-white dark:bg-slate-900 mt-2 p-1 rounded-md border border-slate-200 dark:border-slate-700">
      <SearchResult
        v-for="(result, i) in results"
        @activate="setIndex(i)"
        :key="result.item.title + ' ' + (result.positions && result.positions.join())"
        :item="result.item"
        :positions="result.positions"
        :selected="selectedIndex === i"
      />
    </ul>
  </form>
</template>

<script setup>
import {ref} from 'vue';
import {debounce} from '@/assets/js/debounce.mjs';
import SearchResult from './search-result.vue';
const selectedIndex = ref(0);
const searchName = ref('');
const results = ref([]);
const responses = {};
const baseUrl = 'https://good-search.karl.workers.dev/search';

const clearResults = (event) => {
  console.log(event.relatedTarget);
  // results.value = [];
};
const onSubmit = (event) => {
  const url = results.value?.[selectedIndex.value]?.item?.url;
  if (url) {
    location.href = url;
  }
};

const moveUp = () => {
  if (selectedIndex.value < 0) {
    return;
  }
  selectedIndex.value--;

};
const moveDown = () => {
  selectedIndex.value++;
  if (selectedIndex.value >= results.value?.length) {
    selectedIndex.value = 0;
  }
};
const moveSelection = (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveUp()
  } else if (event.key === 'ArrowDown') {
    moveDown();
  }
}
const setIndex = (i) => {
  selectedIndex.value = i;
}
const fetchResults = async() => {
  selectedIndex.value = 0;

  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'}
  };

  if (searchName.value.length < 2) {
    results.value = [{item: {title: 'Type 2 or more characters to search…'}}];
    return;
  }

  if (responses[searchName.value]) {
    results.value = responses[searchName.value];
    return console.log('returning cached copy');
  }

  const response = await fetch(`${baseUrl}?name=${searchName.value}&limit=10`, options);

  if (!response.ok) {
    console.log('Response not ok');
  }
  const {data, metadata} = await response.json();
  responses[searchName.value] = data;
  results.value = data;
};

const onInput = debounce(fetchResults, 200);
</script>
