<script setup>
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

const props = defineProps({
  videoId: String,
})

const emit = defineEmits(['close'])
const modal = ref(null)
const closeBtn = ref(null)
const playerContainer = ref(null)
let player = null
let previouslyFocused = null

function destroyPlayer() {
  if (player) {
    player.destroy()
    player = null
  }
}

function lockScroll() {
  document.body.style.overflow = 'hidden'
}

function unlockScroll() {
  document.body.style.overflow = ''
}

function trapFocus(e) {
  if (!modal.value) return
  const focusable = modal.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), iframe'
  )
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    emit('close')
  } else if (e.key === 'Tab') {
    trapFocus(e)
  }
}

watch(() => props.videoId, async (id, oldId) => {
  destroyPlayer()

  if (!id) {
    unlockScroll()
    if (previouslyFocused) {
      previouslyFocused.focus()
      previouslyFocused = null
    }
    return
  }

  previouslyFocused = document.activeElement
  lockScroll()

  await nextTick()
  if (playerContainer.value) {
    player = new Plyr(playerContainer.value, {
      autoplay: true,
    })
  }
  // Focus the close button so focus is inside the modal
  await nextTick()
  closeBtn.value?.focus()
})

onBeforeUnmount(() => {
  destroyPlayer()
  unlockScroll()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="videoId"
        ref="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Trailer"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @keydown="onKeydown"
      >
        <div class="absolute inset-0 bg-black/85" @click="emit('close')" />
        <div class="relative w-full max-w-4xl">
          <button
            ref="closeBtn"
            @click="emit('close')"
            class="absolute -top-10 right-0 text-white hover:text-cream-dark text-xl cursor-pointer font-sans"
            aria-label="Close trailer"
          >
            &times; Close
          </button>
          <div
            ref="playerContainer"
            data-plyr-provider="youtube"
            :data-plyr-embed-id="videoId"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
