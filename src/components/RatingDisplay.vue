<script setup>
import RatingBar from './RatingBar.vue'

defineProps({
  ratings: Array,
  overall: Number,
})
</script>

<template>
  <div v-if="ratings">
    <div class="border-t border-border pt-4 mt-4">
      <p class="text-[10px] font-semibold text-ink-lighter uppercase tracking-widest mb-3">Ratings</p>
      <div class="space-y-2">
        <RatingBar
          v-for="r in ratings"
          :key="r.source"
          :label="r.label"
          :score="r.score"
          :display="r.display"
          :color="r.color"
        />
      </div>
    </div>
  </div>
</template>
