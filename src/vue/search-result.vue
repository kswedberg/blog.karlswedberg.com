<template>
  <li>
    <a
      v-if="props.item.url"
      @focus="emit('activate')"
      :class="[
        'link block p-2 mb-1 last:mb-0 rounded',
        'border border-transparent hover:border-gray-400 dark:hover:border-slate-500',
        selected && 'bg-slate-200 dark:bg-slate-700',
      ]"
      :href="props.item.url"
    >
      <span v-html="html" />
    </a>
    <span v-else>
      {{ props.item.title }}
    </span>
  </li>
</template>

<script setup>
const emit = defineEmits(['activate']);
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {title: ''};
    },
  },
  positions: {
    type: [Object, Set],
    default: null,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

const chars = props.item.title.split('');

const nodes = chars.map((char, i) => {
  if (!props.positions) {
    return char;
  }
  if (props.positions.some((p) => p === i)) {
    return `<b>${char}</b>`;
  }

  return char;
});
const html = `<span>${nodes.join('')}</span>`;
</script>
