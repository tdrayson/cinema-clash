<script setup>
defineProps({
  label: String,
  score: Number,
  display: String,
  color: String,
})

const colorClasses = {
  bar: 'bg-bar',
  'bar-rt': 'bg-bar-rt',
}
</script>

<template>
  <div class="flex items-center gap-3 text-xs">
    <span class="w-16 shrink-0 text-ink-lighter uppercase tracking-wide">{{ label }}</span>
    <div class="flex-1 h-1.5 bg-bar-bg overflow-hidden">
      <div
        v-if="score !== null"
        class="h-full transition-all duration-500"
        :class="colorClasses[color] || 'bg-bar'"
        :style="{ width: score + '%' }"
      />
    </div>
    <span class="w-14 text-right font-medium tabular-nums" :class="score !== null ? 'text-ink' : 'text-ink-lighter'">{{ display }}</span>
  </div>
</template>
