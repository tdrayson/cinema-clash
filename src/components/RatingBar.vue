<script setup>
defineProps({
  label: String,
  score: Number,
  display: String,
  filled: Number,
  color: String,
})

const TOTAL = 5

const colorClasses = {
  bar: 'bg-ink-lighter',
  'bar-rt': 'bg-ink-lighter',
}
</script>

<template>
  <div class="flex items-center text-xs gap-2">
    <span class="text-ink-lighter shrink-0 w-24">{{ label }}</span>
    <div class="flex gap-1 items-center">
      <span
        v-for="i in TOTAL"
        :key="i"
        class="w-2.5 h-2.5 border"
        :class="i <= filled
          ? `${colorClasses[color] || 'bg-bar'} border-transparent`
          : 'bg-transparent border-border'"
      />
    </div>
    <span class="font-medium tabular-nums ml-auto shrink-0" :class="score !== null ? 'text-ink' : 'text-ink-lighter'">{{ display }}</span>
  </div>
</template>
