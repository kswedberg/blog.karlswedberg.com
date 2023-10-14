<template>
  <div class="relative flex items-center justify-end" aria-live="polite">
    <form
      v-if="showForm"
      @submit.prevent="onSubmit"
      id="searchWrapper"
      action="https://good-search.karl.workers.dev/"
      class="search-form absolute right-9 z-10"
    >
      <label
        :class="[
          'search-label block absolute p-1 bg-white rounded-md mt-0.5 ml-px',
          searchName.length && 'has-text',
        ]"
        for="search-name"
      >
        Search
      </label>
      <input
        v-model="searchName"
        @input="onInput"
        @keydown="moveSelection"
        @focus="blurred = false"
        @blur="clearResults"
        type="search"
        name="name"
        ref="searchField"
        id="search-name"
        class="p-1 border border-slate-600 rounded-md outline-none focus:ring focus:ring-blue-400"
      >
      <ul v-show="results.length && selectedIndex >= 0" class="absolute standard-color text-left bg-white dark:bg-slate-900 mt-2 p-1 rounded-md border border-slate-200 dark:border-slate-700">
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
    <div class="inline-flex items-center">
      <button @click="toggleForm" type="button" class="ml-1 p-1">
        <span class="sr-only">{{ showForm ? 'Close form' : 'Show search form' }}</span>
        <svg
          v-if="!showForm"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19.023 16.977c-.513-.488-1.004-.997-1.367-1.384-.372-.378-.596-.653-.596-.653l-2.8-1.337C15.34 12.37 16 10.763 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref, nextTick, onMounted, onBeforeUnmount} from 'vue';
import {debounce} from '@/assets/js/debounce.mjs';
import SearchResult from './search-result.vue';

const selectedIndex = ref(0);
const searchName = ref('');
const searchField = ref(null);
const results = ref([]);
const blurred = ref(false);
const showForm = ref(false);
const responses = {};
const baseUrl = 'https://good-search.karl.workers.dev/search';

const clearResults = (event) => {
  results.value = [];
  selectedIndex.value = -1;
  blurred.value = true;
};
const onSubmit = (event) => {
  const url = results.value?.[selectedIndex.value]?.item?.url;
  if (url) {
    location.href = url;
  }
};

const focusField = () => {
  const searchField = document.getElementById('search-name');

  if (!searchField) {
    return console.log('could not find search field');
  }
  searchField.focus();
};
const toggleForm = async() => {
  showForm.value = !showForm.value;

  await nextTick();

  if (showForm.value && searchField.value) {
    searchField.value.focus();
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
    moveUp();
  } else if (event.key === 'ArrowDown') {
    moveDown();
  }
};
const setIndex = (i) => {
  selectedIndex.value = i;
};
const fetchResults = async() => {
  selectedIndex.value = 0;

  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-Type': 'application/json'},
  };

  if (blurred.value) {
    return;
  }
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

  if (!blurred.value) {
    // eslint-disable-next-line require-atomic-updates
    responses[searchName.value] = data;
    results.value = data;
  }
};

const onInput = debounce(fetchResults, 200);

const onMetaK = (event) => {
  if (!event.metaKey && !event.ctrlKey) {
    return;
  }

  if (event.key === 'k') {
    event.stopPropagation();
    event.preventDefault();
    toggleForm();
  }
};

onMounted(() => {
  document.body.addEventListener('keydown', onMetaK, false);
});

onBeforeUnmount(() => {
  document.body.removeEventListener('keydown', onMetaK, false);
});
</script>

<style lang="postcss">
.search-label {
  @apply text-gray-500;
  line-height: 1.4;
  transition: transform 0.2s, color 0.2s;
}

/* .search-label:has(~ input:focus), */
.search-form:focus-within label,
.search-label.has-text {
  transform: scale(.8) translateY(-80%);
  transform-origin: left;
  color: #000;
  line-height: 1;
  padding-block: 0;
  padding-left: .15rem;
  margin-left: .1rem;
}
</style>
