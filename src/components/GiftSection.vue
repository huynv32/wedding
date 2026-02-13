<template>
  <div id="bank" class="relative" data-aos="fade-up" data-aos-delay="100">
    <div class="relative">
      <div class="w-full relative bg-[#FBF7F5] md:bg-transparent">
        <div class="absolute w-screen left-0 top-0 md:h-80" style="background: var(--bg-color);"></div>
        
        <img 
          src="/assets/9.png" 
          class="absolute bottom-[35%] -left-2 md:w-[260px] md:h-[305px] w-[100%] h-[133px] hidden md:block" 
          loading="lazy"
          alt="decoration"
          style="opacity: 0; transform: translateX(-50px);"
        >
        <img 
          src="/assets/8.png" 
          class="absolute bottom-[35%] -right-2 md:w-[260px] md:h-[305px] w-[100%] h-[133px] hidden md:block" 
          loading="lazy"
          alt="decoration"
          style="opacity: 0; transform: translateX(50px);"
        >
        
        <div class="max-w-7xl mx-auto relative">
          <!-- Mobile Title -->
          <div class="py-8 text-center px-[15px] md:hidden">
            <h2 class="text-[40px] font-pinyonScript italic" style="color: var(--primary-color);">Mừng cưới</h2>
            <div class="mt-4 max-w-xl mx-auto text-center text-dark-200 text-sm">
              <div class="relative">
                <div class="w-full">Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!</div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-end pt-[40px] md:pt-[100px] h-auto md:gap-8 gap-6">
            <!-- Groom Bank Info - Phong bì lì xì -->
            <div class="flex flex-col items-center md:items-end text-center md:text-center pb-6 md:pb-16 px-[15px] order-1 md:order-1 ">
              <h3 class="z-20 text-lg md:text-2xl font-prata mb-3 md:mb-4 w-full md:text-center" style="color: var(--primary-color);">
                <div class="relative">
                  <div class="font-prata">Mừng cưới đến chú rể</div>
                </div>
              </h3>
              
              <button
                type="button"
                aria-label="Mở hộp mừng cưới"
                class="envelope-btn"
                @click="openGroomModal"
              >
                <div class="envelope-wrapper">
                  <!-- Đồng xu vàng -->
                  <div class="envelope-coin coin-1"></div>
                  <div class="envelope-coin coin-2"></div>
                  <div class="envelope-coin coin-3"></div>
                  <div class="envelope-coin coin-4"></div>
                  <div class="envelope-coin coin-5"></div>
                  <!-- Sparkle -->
                  <span class="envelope-sparkle sparkle-1">✦</span>
                  <span class="envelope-sparkle sparkle-2">✦</span>
                  <span class="envelope-sparkle sparkle-3">✦</span>
                  <!-- Phong bì -->
                  <div class="envelope-body">
                    <div class="envelope-shadow"></div>
                    <div class="envelope-side"></div>
                    <div class="envelope-front">
                      <div class="envelope-pattern"></div>
                      <div class="envelope-top-border"></div>
                      <div class="envelope-double-happiness">
                        <span>囍</span>
                      </div>
                      <svg class="envelope-corner corner-tl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                      <svg class="envelope-corner corner-tr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(90deg);"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                      <svg class="envelope-corner corner-bl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(-90deg);"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                      <svg class="envelope-corner corner-br" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(180deg);"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                    </div>
                  </div>
                </div>
                <p class="envelope-hint">Nhấn để mở</p>
              </button>
            </div>
            
            <!-- Center Image - hiệu ứng bay vào -->
            <div class="relative w-full md:w-[402px] mx-auto pt-0 md:pt-[72px] bg-[#FBF7F5] overflow-visible order-3 md:order-2" data-aos="fade-up" data-aos-duration="600" data-aos-delay="150">
              <div class="overflow-hidden cursor-pointer relative rounded-t-full border-2 w-[300px] md:w-[402px] h-[355px] md:h-[465px] object-cover mx-auto relative z-1" style="padding: 0px; border-color: var(--primary-color);max-width: 85%;margin: auto;">
                <img 
                  class="w-full h-full z-10 object-cover border-transparent" 
                  alt="image-bank-bridge" 
                  :src="imgBride" 
                  loading="lazy" 
                  draggable="false"
                >
              </div>
            </div>
            
            <!-- Bride Bank Info - Phong bì lì xì cô dâu -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left py-6 md:py-16 px-[15px] order-2 md:order-3">
              <h3 class="z-20 text-lg md:text-2xl font-prata mb-3 md:mb-4 w-full text-center md:text-center" style="color: var(--primary-color);">
                <div class="relative">
                  <div class="font-prata">Mừng cưới đến cô dâu</div>
                </div>
              </h3>
              
              <button
                type="button"
                aria-label="Mở hộp mừng cưới cô dâu"
                class="envelope-btn"
                @click="openBrideModal"
              >
                <div class="envelope-wrapper">
                  <div class="envelope-coin coin-1"></div>
                  <div class="envelope-coin coin-2"></div>
                  <div class="envelope-coin coin-3"></div>
                  <div class="envelope-coin coin-4"></div>
                  <div class="envelope-coin coin-5"></div>
                  <span class="envelope-sparkle sparkle-1">✦</span>
                  <span class="envelope-sparkle sparkle-2">✦</span>
                  <span class="envelope-sparkle sparkle-3">✦</span>
                  <div class="envelope-body">
                    <div class="envelope-shadow"></div>
                    <div class="envelope-side"></div>
                    <div class="envelope-front">
                      <div class="envelope-pattern"></div>
                      <div class="envelope-top-border"></div>
                      <div class="envelope-double-happiness">
                        <span>囍</span>
                      </div>
                      <svg class="envelope-corner corner-tl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                      <svg class="envelope-corner corner-tr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(90deg);"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                      <svg class="envelope-corner corner-bl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(-90deg);"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                      <svg class="envelope-corner corner-br" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(180deg);"><path d="M2 2 L2 16 L6 16 L6 6 L16 6 L16 2 Z" opacity="0.85" stroke-linecap="square" stroke-linejoin="miter"/><path d="M6 10 L10 10 L10 6" opacity="0.85" stroke-linecap="square"/></svg>
                    </div>
                  </div>
                </div>
                <p class="envelope-hint">Nhấn để mở</p>
              </button>
            </div>
            
          </div>
        </div>
        
        <!-- Desktop Title -->
        <div class="py-[75px] text-center px-[15px] hidden md:block" style="background: var(--bg-color);">
          <h2 class="text-[56px] md:text-[72px] font-pinyonScript italic" style="color: var(--primary-color);">Mừng cưới</h2>
          <div class="mt-6 max-w-xl mx-auto text-center text-dark-200">
            <div class="relative">
              <div class="w-full">Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nhé ^^. Cảm ơn bạn rất nhiều!</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup QR Mừng cưới chú rể -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showGroomModal" class="gift-modal-overlay" @click.self="closeGroomModal">
          <div class="gift-modal">
            <div class="gift-modal-header">
              <span class="gift-modal-title">HỘP MỪNG CƯỚI</span>
              <button type="button" class="gift-modal-close" aria-label="Đóng" @click="closeGroomModal">&times;</button>
            </div>
            <div class="gift-modal-body">
              <div class="gift-modal-subtitle">Mừng Cưới</div>
              <div class="gift-modal-qr-wrap">
                <img :src="qr1" alt="QR chuyển khoản chú rể" class="gift-modal-qr" loading="lazy">
              </div>
              <div class="gift-modal-bank">Ngân hàng Techcombank</div>
              <div class="gift-modal-bank">Chú rể</div>
              <div class="gift-modal-account">1903 7383 1750 13</div>
              <div class="gift-modal-account">Nguyen Van Huy</div>
              <div class="gift-modal-thanks">Cảm ơn bạn đã đồng hành cùng chúng mình trong ngày trọng đại!</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Popup QR Mừng cưới cô dâu -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showBrideModal" class="gift-modal-overlay" @click.self="closeBrideModal">
          <div class="gift-modal">
            <div class="gift-modal-header">
              <span class="gift-modal-title">HỘP MỪNG CƯỚI</span>
              <button type="button" class="gift-modal-close" aria-label="Đóng" @click="closeBrideModal">&times;</button>
            </div>
            <div class="gift-modal-body">
              <div class="gift-modal-subtitle">Mừng Cưới</div>
              <div class="gift-modal-qr-wrap">
                <img :src="qr2" alt="QR chuyển khoản cô dâu" class="gift-modal-qr" loading="lazy">
              </div>
              <div class="gift-modal-bank">Ngân hàng MbBank</div>
              <div class="gift-modal-bank">Cô dâu</div>
              <div class="gift-modal-account">6200160820000</div>
              <div class="gift-modal-account">Nguyen Thi Ngoc Anh</div>
              <div class="gift-modal-thanks">Cảm ơn bạn đã đồng hành cùng chúng mình trong ngày trọng đại!</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'GiftSection',
  data() {
    return {
      imgBride: '/assets/DSC00948.jpg',
      envelopeImg: '/assets/envelope-li-xi.png',
      qr1: '/assets/QR1.png',
      qr2: '/assets/qr2.jpeg',
      qr3: '/assets/qr3.png',
      showGroomModal: false,
      showBrideModal: false,
    }
  },
  methods: {
    openGroomModal() {
      this.showGroomModal = true
      document.body.style.overflow = 'hidden'
    },
    closeGroomModal() {
      this.showGroomModal = false
      document.body.style.overflow = ''
    },
    openBrideModal() {
      this.showBrideModal = true
      document.body.style.overflow = 'hidden'
    },
    closeBrideModal() {
      this.showBrideModal = false
      document.body.style.overflow = ''
    },
  }
}
</script>

<style scoped>
.relative {
  position: relative;
}

.w-full {
  width: 100%;
}

.bg-\[#FBF7F5\] {
  background-color: #FBF7F5;
}

.md\:bg-transparent {
  @media (min-width: 768px) {
    background-color: transparent;
  }
}

.absolute {
  position: absolute;
}

.w-screen {
  width: 100vw;
}

.left-0 {
  left: 0;
}

.top-0 {
  top: 0;
}

.md\:h-80 {
  @media (min-width: 768px) {
    height: 20rem;
  }
}

.bottom-\[35\%\] {
  bottom: 35%;
}

.-left-2 {
  left: -0.5rem;
}

.-right-2 {
  right: -0.5rem;
}

.md\:w-\[260px\] {
  @media (min-width: 768px) {
    width: 260px;
  }
}

.md\:h-\[305px\] {
  @media (min-width: 768px) {
    height: 305px;
  }
}

.w-\[100\%\] {
  width: 100%;
}

.h-\[133px\] {
  height: 133px;
}

.hidden {
  display: none;
}

.md\:block {
  @media (min-width: 768px) {
    display: block;
  }
}

.max-w-9xl {
  max-width: 90rem;
}

.max-w-7xl {
  max-width: 70rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.md\:grid-cols-2 {
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.xl\:grid-cols-3 {
  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}


.justify-center {
  justify-content: center;
}

.items-end {
  align-items: flex-end;
}

.pt-\[72px\] {
  padding-top: 72px;
}

.md\:pt-\[100px\] {
  @media (min-width: 768px) {
    padding-top: 100px;
  }
}

.h-auto {
  height: auto;
}

.md\:gap-8 {
  @media (min-width: 768px) {
    gap: 2rem;
  }
}

.block {
  display: block;
}

.text-center {
  text-align: center;
}

.pb-8 {
  padding-bottom: 2rem;
}

.px-\[15px\] {
  padding-left: 15px;
  padding-right: 15px;
}

.text-\[48px\] {
  font-size: 48px;
}

.md\:text-\[72px\] {
  @media (min-width: 768px) {
    font-size: 72px;
  }
}

.font-pinyonScript {
  font-family: 'Pinyon Script', cursive !important;
}

.italic {
  font-style: italic;
}

.mt-4 {
  margin-top: 1rem;
}

.max-w-xl {
  max-width: 36rem;
}

.text-dark-200 {
  color: #333;
}

.md\:flex {
  @media (min-width: 768px) {
    display: flex;
  }
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.md\:items-end {
  @media (min-width: 768px) {
    align-items: flex-end;
  }
}

.md\:text-right {
  @media (min-width: 768px) {
    text-align: right;
  }
}

.md\:pb-16 {
  @media (min-width: 768px) {
    padding-bottom: 4rem;
  }
}

.z-20 {
  z-index: 20;
}

.text-xl {
  font-size: 1.25rem;
}

.md\:text-2xl {
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
}

.font-prata {
  font-family: 'Prata', serif !important;
}

.mb-4 {
  margin-bottom: 1rem;
}

.flex-row {
  flex-direction: row;
}

.justify-end {
  justify-content: flex-end;
}

.gap-6 {
  gap: 1.5rem;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.overflow-hidden {
  overflow: hidden;
}

.cursor-pointer {
  cursor: pointer;
}

.w-\[100px\] {
  width: 100px;
}

.h-\[100px\] {
  height: 100px;
}

.object-cover {
  object-fit: cover;
}

.z-1 {
  z-index: 1;
}

.z-10 {
  z-index: 10;
}

.border-transparent {
  border-color: transparent;
}

.p-0 {
  padding: 0;
}

.items-start {
  align-items: flex-start;
}

.text-left {
  text-align: left;
}

.gap-1 {
  gap: 0.25rem;
}

.md\:w-\[402px\] {
  @media (min-width: 768px) {
    width: 402px;
  }
}

.pt-0 {
  padding-top: 0;
}

.overflow-visible {
  overflow: visible;
}

.rounded-t-full {
  border-radius: 50% 50% 0 0;
}

.border-2 {
  border-style: solid;
  border-width: 2px;
}

.w-\[342px\] {
  width: 342px;
}

.h-\[390px\] {
  height: 390px;
}

.md\:h-\[465px\] {
  @media (min-width: 768px) {
    height: 465px;
  }
}

.h-full {
  height: 100%;
}

.md\:items-start {
  @media (min-width: 768px) {
    align-items: flex-start;
  }
}

.md\:text-left {
  @media (min-width: 768px) {
    text-align: left;
  }
}

.py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.md\:py-16 {
  @media (min-width: 768px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

.justify-center {
  justify-content: center;
}

.md\:justify-start {
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}

.items-end {
  align-items: flex-end;
}

.text-right {
  text-align: right;
}

.py-\[75px\] {
  padding-top: 75px;
  padding-bottom: 75px;
}

.text-\[56px\] {
  font-size: 56px;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mb-3 {
  margin-bottom: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.pb-6 {
  padding-bottom: 1.5rem;
}

.py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.pt-\[40px\] {
  padding-top: 40px;
}

.text-sm {
  font-size: 0.875rem;
}

.text-xs {
  font-size: 0.75rem;
}

.text-base {
  font-size: 1rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-\[40px\] {
  font-size: 40px;
}

.w-\[100px\] {
  width: 100px;
}

.h-\[100px\] {
  height: 100px;
}

.md\:w-\[130px\] {
  @media (min-width: 768px) {
    width: 130px;
  }
}

.md\:h-\[130px\] {
  @media (min-width: 768px) {
    height: 130px;
  }
}


.w-\[280px\] {
  width: 280px;
}

.h-\[280px\] {
  height: 280px;
}

.w-\[90px\] {
  width: 90px;
}

.h-\[90px\] {
  height: 90px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.break-all {
  word-break: break-all;
}

.order-1 {
  order: 1;
}

.order-2 {
  order: 2;
}

.order-3 {
  order: 3;
}

.md\:order-1 {
  @media (min-width: 768px) {
    order: 1;
  }
}

.md\:order-2 {
  @media (min-width: 768px) {
    order: 2;
  }
}

.md\:hidden {
  @media (min-width: 768px) {
    display: none;
  }
}

/* Phong bì lì xì - component */
.envelope-btn {
  position: relative;
  width: 200px;
  height: 256px;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  display: block;
  margin: 0 auto;
  overflow: visible;
  transition: transform 0.2s ease;
}
.envelope-btn:hover {
  transform: scale(1.05);
}
.envelope-btn:hover .envelope-body {
  animation: envelopeShake 0.4s ease-in-out infinite;
}
.envelope-btn:hover .envelope-coin {
  animation: coinMove 0.4s ease-in-out infinite;
}
/* Lắc nhẹ liên tục khi không hover */
.envelope-body {
  transform-origin: center center;
  animation: envelopeShakeSlow 4s ease-in-out infinite;
}
.envelope-coin {
  transform-origin: center center;
  animation: coinMoveSlow 4s ease-in-out infinite;
}
@keyframes envelopeShake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
  75% { transform: rotate(-3deg); }
}
@keyframes envelopeShakeSlow {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
  75% { transform: rotate(-1deg); }
}
@keyframes coinMove {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(4px, -4px); }
  50% { transform: translate(-4px, 3px); }
  75% { transform: translate(3px, 3px); }
}
@keyframes coinMoveSlow {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(2px, -2px); }
  50% { transform: translate(-2px, 2px); }
  75% { transform: translate(1px, 1px); }
}
.envelope-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.envelope-coin {
  position: absolute;
  border-radius: 50%;
  background: rgb(251, 191, 36);
  border: 2px solid rgb(245, 158, 11);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.envelope-coin::before {
  content: '';
  position: absolute;
  inset: 2px;
  border: 2px solid rgb(253, 224, 71);
  border-radius: 50%;
  pointer-events: none;
}
.envelope-coin::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  background: transparent;
  border: 2px solid rgb(217, 119, 6);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2) inset;
  border-radius: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}
.coin-1 { width: 30.8px; height: 30.8px; top: 5%; right: 5%; }
.coin-1::after { width: 8.624px; height: 8.624px; }
.coin-2 { width: 25.2px; height: 25.2px; top: 20%; left: 0%; }
.coin-2::after { width: 7.056px; height: 7.056px; }
.coin-3 { width: 28px; height: 28px; bottom: 20%; right: 0%; }
.coin-3::after { width: 7.84px; height: 7.84px; }
.coin-4 { width: 22.4px; height: 22.4px; bottom: 8%; left: 8%; }
.coin-4::after { width: 6.272px; height: 6.272px; }
.coin-5 { width: 21px; height: 21px; top: 45%; right: -5%; }
.coin-5::after { width: 5.88px; height: 5.88px; }
.envelope-sparkle {
  position: absolute;
  color: #fff;
  text-shadow: 0 0 4px rgba(251, 191, 36, 0.8);
}
.sparkle-1 { top: 8%; left: 20%; font-size: 14px; }
.sparkle-2 { bottom: 35%; right: 8%; font-size: 11.2px; }
.sparkle-3 { top: 40%; left: 3%; font-size: 8.4px; }
.envelope-body {
  position: relative;
  width: 140px;
  height: 196px;
}
.envelope-shadow {
  position: absolute;
  left: 2px;
  right: -2px;
  bottom: -3px;
  height: 196px;
  background: rgb(92, 22, 18);
  border-radius: 0 0 0.5rem 0.5rem;
}
.envelope-side {
  position: absolute;
  top: 2px;
  bottom: -2px;
  right: -3px;
  width: 140px;
  background: rgb(107, 29, 24);
  border-radius: 0 0.5rem 0.5rem 0;
}
.envelope-front {
  position: absolute;
  inset: 0;
  background: rgb(185, 28, 28);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}
.envelope-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image: repeating-radial-gradient(
    circle at 0 0,
    transparent 0,
    transparent 11.2px,
    rgb(127, 29, 29) 11.2px,
    rgb(127, 29, 29) 11.9px
  );
  background-size: 21px 21px;
  background-position: 10.5px 10.5px;
}
.envelope-top-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgb(251, 191, 36);
}
.envelope-double-happiness {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 63px;
  height: 63px;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(251, 191, 36) 0%, rgb(217, 119, 6) 100%);
  border: 3px solid rgb(254, 243, 199);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.envelope-double-happiness span {
  font-size: 30.8px;
  font-weight: bold;
  color: rgb(185, 28, 28);
  line-height: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.envelope-corner {
  position: absolute;
  width: 28px;
  height: 28px;
  stroke: rgb(251, 191, 36);
  opacity: 0.85;
}
.envelope-corner.corner-tl { top: 8px; left: 8px; }
.envelope-corner.corner-tr { top: 8px; right: 8px; }
.envelope-corner.corner-bl { bottom: 8px; left: 8px; }
.envelope-corner.corner-br { bottom: 8px; right: 8px; }
.envelope-hint {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 500;
  color: rgb(93, 106, 87);
  white-space: nowrap;
  margin: 0;
  padding: 0;
  z-index: 2;
  pointer-events: none;
  width: max-content;
}

/* Popup Hộp mừng cưới */
.gift-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}
.gift-modal {
  background: #fff;
  border-radius: 12px;
  max-width: 360px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.gift-modal-header {
  background: #4a6657;
  color: #fff;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Prata', serif;
  font-size: 1rem;
  letter-spacing: 0.05em;
}
.gift-modal-title {
  text-transform: uppercase;
}
.gift-modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.2s;
}
.gift-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}
.gift-modal-body {
  padding: 1.5rem;
  text-align: center;
}
.gift-modal-subtitle {
  font-family: 'Prata', serif;
  color: #3d3d3d;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.gift-modal-qr-wrap {
  background: #fff;
  padding: 0.75rem;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.gift-modal-qr {
  width: 180px;
  height: 180px;
  display: block;
}
.gift-modal-bank,
.gift-modal-account {
  font-family: 'Prata', serif;
  color: #3d3d3d;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}
.gift-modal-account {
  font-size: 1rem;
  margin-bottom: 1rem;
  word-break: break-all;
}
.gift-modal-thanks {
  font-size: 0.85rem;
  color: #888;
  font-style: italic;
  line-height: 1.5;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .gift-modal,
.modal-leave-active .gift-modal {
  transition: transform 0.2s ease;
}
.modal-enter-from .gift-modal,
.modal-leave-to .gift-modal {
  transform: scale(0.95);
}
</style>


