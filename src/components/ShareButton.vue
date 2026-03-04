<script setup>
import { ref, watch, nextTick } from 'vue'
import { useComparison } from '../composables/useComparison.js'

const { movies, getShareUrl, getShareMessage } = useComparison()
const showModal = ref(false)
const copied = ref(null)
const modal = ref(null)
const closeBtn = ref(null)
let previouslyFocused = null

function openModal() {
  copied.value = null
  previouslyFocused = document.activeElement
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  copied.value = null
  if (previouslyFocused) {
    previouslyFocused.focus()
    previouslyFocused = null
  }
}

function trapFocus(e) {
  if (!modal.value) return
  const focusable = modal.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    closeModal()
  } else if (e.key === 'Tab') {
    trapFocus(e)
  }
}

watch(showModal, async (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeBtn.value?.focus()
  } else {
    document.body.style.overflow = ''
  }
})

async function copyLink() {
  await navigator.clipboard.writeText(getShareUrl())
  copied.value = 'link'
  setTimeout(() => { copied.value = null }, 2000)
}

async function copyMessage() {
  await navigator.clipboard.writeText(getShareMessage())
  copied.value = 'message'
  setTimeout(() => { copied.value = null }, 2000)
}
</script>

<template>
  <button
    @click="openModal"
    :disabled="!movies.length"
    class="border border-border-dark px-3 py-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink flex items-center gap-1.5"
    aria-label="Share"
  >
    <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="3" r="2" />
      <circle cx="12" cy="13" r="2" />
      <circle cx="4" cy="8" r="2" />
      <path d="M6 7l4-3M6 9l4 3" />
    </svg>
    Share
  </button>

  <Teleport to="body">
    <div
      v-if="showModal"
      ref="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Share"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @keydown="onKeydown"
    >
      <div class="fixed inset-0 bg-ink/40" aria-hidden="true" @click="closeModal" />
      <div class="relative bg-cream border border-border-dark shadow-xl w-full max-w-md">
        <div class="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 class="text-sm font-medium uppercase tracking-widest text-ink">Share</h2>
          <button
            ref="closeBtn"
            @click="closeModal"
            class="text-ink/50 hover:text-ink transition-colors cursor-pointer"
            aria-label="Close"
          >
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        <div class="px-5 py-4 space-y-4">
          <div>
            <p class="text-[11px] uppercase tracking-widest text-ink/50 mb-2">Link</p>
            <div class="flex items-center gap-2">
              <p class="text-sm text-ink/80 truncate flex-1 min-w-0">{{ getShareUrl() }}</p>
              <button
                @click="copyLink"
                class="shrink-0 border border-border-dark px-3 py-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <template v-if="copied === 'link'">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 8.5l3.5 3.5L13 4" />
                  </svg>
                  Copied
                </template>
                <template v-else>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="5" y="5" width="8" height="8" rx="1" />
                    <path d="M3 11V3h8" />
                  </svg>
                  Copy
                </template>
              </button>
            </div>
          </div>

          <div class="border-t border-border pt-4">
            <p class="text-[11px] uppercase tracking-widest text-ink/50 mb-2">Message</p>
            <p class="text-sm text-ink/80 leading-relaxed break-words whitespace-pre-wrap mb-3">{{ getShareMessage() }}</p>
            <button
              @click="copyMessage"
              class="border border-border-dark px-3 py-1.5 text-xs uppercase tracking-widest font-medium text-ink hover:bg-ink hover:text-cream transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <template v-if="copied === 'message'">
                <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 8.5l3.5 3.5L13 4" />
                </svg>
                Copied
              </template>
              <template v-else>
                <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="5" y="5" width="8" height="8" rx="1" />
                  <path d="M3 11V3h8" />
                </svg>
                Copy
              </template>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
