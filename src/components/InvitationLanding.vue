<template>
  <div class="invitation-landing" :style="bgStyle">
    <!-- Falling hearts -->
    <div class="hearts-layer">
      <span
        v-for="(h, i) in hearts"
        :key="i"
        class="heart"
        :style="heartStyle(h)"
      >❤</span>
    </div>

    <!-- Trái tim bay ra khi mở thiệp -->
    <div v-if="isOpening" class="burst-layer">
      <span
        v-for="(b, i) in burstHearts"
        :key="'b' + i"
        class="burst-heart"
        :style="burstHeartStyle(b)"
      >❤</span>
    </div>

    <!-- Card -->
    <div class="card-wrapper card-enter">
      <div class="card-inner">
        <!-- Envelope flap - mở lên khi ấn Mở thiệp -->
        <div class="flap" :class="{ opening: isOpening }">
          <svg viewBox="0 0 380 100" preserveAspectRatio="none" class="flap-svg">
            <defs>
              <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fafafa" />
                <stop offset="100%" stop-color="#ffffff" />
              </linearGradient>
            </defs>
            <path d="M 16 0 L 364 0 Q 380 0 380 16 L 380 20 L 190 100 L 0 20 L 0 16 Q 0 0 16 0 Z" fill="url(#flapGradient)" />
          </svg>
        </div>
        <!-- Seal - ẩn dần khi mở thiệp -->
        <div class="seal" :class="{ opening: isOpening }">
          <svg viewBox="0 0 24 24" class="seal-icon" fill="#ffffff">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <!-- Card body -->
        <div class="card-body">
          <div class="card-content">
            <h1 class="card-names">{{ coupleNames }}</h1>
            <div class="card-sep">
              <div class="sep-line sep-left"></div>
              <span class="sep-icon">❦</span>
              <div class="sep-line sep-right"></div>
            </div>
            <p class="card-date">{{ weddingDate }}</p>
            <div class="card-greeting">
              <p class="card-greeting-text">Thân Mời</p>
              <p v-if="guestName" class="card-guest-name">{{ guestName }}</p>
            </div>
            <button type="button" class="btn-open" :disabled="isOpening" @click="openInvitation">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="btn-icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
              Mở thiệp
              <span class="btn-shine"></span>
            </button>
            <div class="card-dots">
              <span class="dot" style="background-color:#E8A0A0"></span>
              <span class="dot" style="background-color:#F0A0A0"></span>
              <span class="dot" style="background-color:#9B2D30"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvitationLanding',
  props: {
    coupleNames: { type: String, default: 'Văn Huy & Ngọc Ánh' },
    weddingDate: { type: String, default: '12 tháng 3, 2026' },
    guestName: { type: String, default: '' }
  },
  data() {
    const colors = ['rgb(205, 189, 193)', 'rgb(139, 58, 58)', 'rgb(238, 180, 180)', 'rgb(251, 200, 200)']
    const hearts = []
    for (let i = 0; i < 24; i++) {
      hearts.push({
        left: Math.random() * 100,
        size: 14 + Math.random() * 18,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 10 + Math.random() * 6,
        delay: -Math.random() * 5,
        sway: (Math.random() - 0.5) * 40
      })
    }
    const burstHearts = []
    for (let i = 0; i < 28; i++) {
      const angle = (Math.random() * 360 * Math.PI) / 180
      const distance = 90 + Math.random() * 120
      burstHearts.push({
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        size: 16 + Math.random() * 20,
        delay: Math.random() * 0.25,
        color: Math.random() > 0.5 ? '#e74c3c' : '#c0392b'
      })
    }
    return {
      hearts,
      burstHearts,
      isOpening: false,
      bgStyle: {
        background: 'linear-gradient(to bottom right, #3E1E1E, #321919, #2b1515)'
      }
    }
  },
  methods: {
    openInvitation() {
      if (this.isOpening) return
      this.isOpening = true
      // Sau khi animation mở thiệp xong (~1.2s) mới chuyển sang trang chủ
      setTimeout(() => {
        this.$emit('open')
      }, 1400)
    },
    heartStyle(h) {
      return {
        left: h.left + '%',
        color: h.color,
        fontSize: h.size + 'px',
        '--heart-sway': h.sway + 'px',
        '--heart-duration': h.duration + 's',
        '--heart-delay': h.delay + 's'
      }
    },
    burstHeartStyle(b) {
      return {
        '--burst-dx': b.dx + 'px',
        '--burst-dy': b.dy + 'px',
        '--burst-delay': b.delay + 's',
        '--burst-size': b.size + 'px',
        color: b.color,
        fontSize: b.size + 'px'
      }
    }
  }
}
</script>

<style scoped>
.invitation-landing {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hearts-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.heart {
  position: absolute;
  top: -40px;
  will-change: transform;
  animation: heart-fall var(--heart-duration, 14s) ease-in-out var(--heart-delay, 0s) infinite;
  opacity: 0.95;
}

@keyframes heart-fall {
  0% {
    transform: translateX(var(--heart-sway, 0)) translateY(0);
    opacity: 0.9;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 0.7;
  }
  100% {
    transform: translateX(var(--heart-sway, 0)) translateY(100vh);
    opacity: 0.2;
  }
}

/* Trái tim bay ra khi mở thiệp */
.burst-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burst-heart {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: var(--burst-size, 20px);
  animation: burst-out 1.2s ease-out var(--burst-delay, 0s) forwards;
  opacity: 0;
  filter: drop-shadow(0 0 4px rgba(231, 76, 60, 0.5));
}

@keyframes burst-out {
  0% {
    transform: translate(-50%, -50%) translate(0, 0) scale(0.6);
    opacity: 1;
  }
  70% {
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) translate(var(--burst-dx, 0), var(--burst-dy, 0)) scale(1.1);
    opacity: 0;
  }
}

.card-wrapper {
  position: relative;
  z-index: 10;
}

.card-wrapper.card-enter {
  animation: card-enter 0.8s ease-out forwards;
}

@keyframes card-enter {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.card-inner {
  position: relative;
  width: 340px;
  perspective: 1000px;
  transform-style: preserve-3d;
}

@media (min-width: 640px) {
  .card-inner {
    width: 380px;
  }
}

.flap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100px;
  /* Hinge ở mép trên nắp: nắp gập lên từ dưới */
  transform-origin: 50% 0%;
  z-index: 20;
  overflow: visible;
  transition: transform 1.2s cubic-bezier(0.34, 1.2, 0.64, 1);
  transform-style: preserve-3d;
}

.flap.opening {
  /* Mé dưới nắp nâng lên ra phía sau (mở thiệp) */
  transform: rotateX(-165deg);
}

.flap-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.08));
}

.seal {
  position: absolute;
  left: 50%;
  top: 60px;
  width: 56px;
  height: 56px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at 30% 30%, #9B2D30, rgb(90, 45, 45));
  box-shadow: 0 4px 20px rgba(155, 45, 48, 0.5), inset 0 2px 4px rgba(255,255,255,0.3);
  z-index: 30;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: seal-pulse 2s ease-in-out infinite;
  transition: opacity 0.5s ease-out;
}

.seal.opening {
  opacity: 0;
  pointer-events: none;
}

.seal-icon {
  width: 1.75rem;
  height: 1.75rem;
  fill: #ffffff;
}

@keyframes seal-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
}

.card-body {
  margin-top: 20px;
  background: linear-gradient(to bottom, #fdf0f0, #fce8e8);
  border: 1px solid rgba(155, 45, 48, 0.25);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  /* Tránh mờ trên mobile do layer 3D của card-inner */
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-content {
  position: relative;
  text-align: center;
  padding: 6rem 1.5rem 2rem;
  transform: translateZ(0);
}

.card-names {
  color: #9B2D30;
  font-family: Baskerville, 'Times New Roman', serif;
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (min-width: 640px) {
  .card-names {
    font-size: 1.875rem;
  }
}

.card-sep {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.sep-line {
  width: 2.5rem;
  height: 1px;
}

.sep-left {
  background: linear-gradient(to right, transparent, #9B2D30);
}

.sep-right {
  background: linear-gradient(to left, transparent, #9B2D30);
}

.sep-icon {
  color: #9B2D30;
  opacity: 0.7;
  font-size: 0.875rem;
}

.card-date {
  color: rgba(155, 45, 48, 0.7);
  font-family: Baskerville, 'Times New Roman', serif;
  font-size: 1rem;
  margin: 0 0 1.25rem;
}

.card-greeting {
  margin-bottom: 1.5rem;
}

.card-greeting-text {
  color: rgba(155, 45, 48, 0.7);
  font-family: Baskerville, 'Times New Roman', serif;
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
}

.card-guest-name {
  margin-top: 0.35rem;
  color: #9B2D30;
  font-family: Baskerville, 'Times New Roman', serif;
  font-size: 1.5rem;
  font-weight: 500;
}

.btn-open {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0 auto;
  padding: 0.625rem 2rem;
  font-size: 1.125rem;
  font-weight: 500;
  font-family: Baskerville, 'Times New Roman', serif;
  color: #fff;
  background-color: #9B2D30;
  border: none;
  border-radius: 9999px;
  box-shadow: 0 4px 14px rgba(155, 45, 48, 0.35);
  cursor: pointer;
  transition: transform 0.2s;
  overflow: hidden;
}

.btn-open:hover:not(:disabled) {
  transform: scale(1.05);
}

.btn-open:active:not(:disabled) {
  transform: scale(0.95);
}

.btn-open:disabled {
  opacity: 0.85;
  cursor: not-allowed;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-shine {
  position: absolute;
  top: 0;
  height: 100%;
  width: 2rem;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  animation: shine 3s ease-in-out infinite;
  pointer-events: none;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.card-dots {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.375rem;
  opacity: 0.3;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>
