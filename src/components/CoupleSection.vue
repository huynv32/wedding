<template>
  <div id="introduction" class="relative overflow-x-hidden" data-aos="fade-up" data-aos-delay="100">
    <div class="relative overflow-x-hidden">
      <section class="relative mx-auto overflow-x-hidden" style="background: var(--bg-color);">
        <div class="absolute left-0 top-0 w-full h-[574px]" style="background: var(--bg-color);">
          <h1 class="hidden md:block absolute top-1/3 text-[110px] font-prata rotate-90" style="color: var(--secondary-color);left: -9%;">GROOM</h1>
        </div>
        <div class="z-0 absolute right-0 bottom-0 w-[488px] h-[574px]" style="background: var(--bg-color);">
          <h1 class="hidden md:block absolute top-1/3 text-[110px] font-prata -rotate-90" style="right: -32% ;color: var(--secondary-color);">BRIDE</h1>
        </div>
        
        <div class="z-20 grid md:grid-cols-2 justify-center items-center lg:px-[300px] gap-8">
         
          
          <!-- Bride -->
          <div class="relative text-center" data-aos="fade-left" data-aos-delay="100" style="max-width: 80%;margin: auto;">
            <img 
              src="/assets/5.png" 
              class="md:block md:w-[206px] md:h-[209px] w-[150px] h-[150px] absolute bottom-20 md:-left-20 -left-12 z-10" 
              loading="lazy"
              alt="decoration"
            >
            <div class="bride-photo-wrap overflow-hidden cursor-pointer relative border-[1px] rounded-t-[300px] md:mt-0 mt-5 md:max-w-[500px] mx-auto block w-full h-[600px] md:h-[600px] z-1" style="border-color: var(--primary-color); padding: 0px;border-style: solid;" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="150">
              <img 
                class="w-full h-full z-10 object-cover border-transparent" 
                :src="imgBride" 
                loading="lazy" 
                draggable="false"
                alt="Cô dâu"
                style="transform: scale(1.2);"
              >
              <div class="groom-hover-overlay">
                <div class="groom-overlay-inner">
                  <div class="groom-overlay-name">{{ brideName }}</div>
                  <div class="groom-overlay-role">Cô dâu</div>
                  <p class="groom-overlay-desc">{{ brideDescShort }}</p>
                  <a href="javascript:void(0)" class="groom-overlay-more" @click.prevent="showBrideModal = true">Xem thêm ↓</a>
                </div>
              </div>
            </div>

            <!-- Popup cô dâu: ảnh to + mô tả đầy đủ -->
            <Teleport to="body">
              <Transition name="bride-modal">
                <div v-if="showBrideModal" class="bride-modal-backdrop" @click.self="showBrideModal = false">
                  <div class="bride-modal-box">
                    <button type="button" class="bride-modal-close" aria-label="Đóng" @click="showBrideModal = false">×</button>
                    <div class="bride-modal-photo-wrap">
                      <img :src="imgBride" alt="Cô dâu" class="bride-modal-photo" loading="lazy">
                    </div>
                    <h2 class="bride-modal-name">{{ brideName }}</h2>
                    <p class="bride-modal-role">Cô dâu</p>
                    <p class="bride-modal-desc">{{ brideDescFull }}</p>
                  </div>
                </div>
              </Transition>
            </Teleport>
            <p class="text-lg md:text-2xl text-dark-200 font-prata mt-8">Cô dâu</p>
            <div class="relative">
              <div class="name-bride text-[56px] md:text-[72px] mt-3 font-pinyonScript" style="font-family: 'Pinyon Script', cursive; color: var(--primary-color);">
                Ngọc Ánh
              </div>
            </div>
          </div>

           <!-- Groom -->
           <div class="relative text-center mt-4 md:mt-0" data-aos="fade-right" data-aos-delay="100" style="max-width: 90%;margin: auto;">
            <img 
              src="/assets/4.png" 
              
              class="md:block md:w-[206px] md:h-[209px] w-[150px] h-[150px] absolute bottom-20 md:-right-20 -right-12 z-10" 
              loading="lazy"
              alt="decoration"
            >
            <div class="groom-photo-wrap overflow-hidden cursor-pointer relative border-[1px] rounded-t-[300px] md:mt-0 md:max-w-[420px] mx-auto block w-full max-w-[85%] h-[600px] md:h-[600px] z-1" style="border-color: var(--primary-color); padding: 0px;border-style: solid;" data-aos="zoom-in" data-aos-duration="600" data-aos-delay="150">
              <img 
                class="w-full h-full z-10 object-cover border-transparent" 
                :src="imgGroom" 
                loading="lazy" 
                draggable="false"
                alt="Chú rể"
              >
              <div class="groom-hover-overlay">
                <div class="groom-overlay-inner">
                  <div class="groom-overlay-name">{{ groomName }}</div>
                  <div class="groom-overlay-role">Chú rể</div>
                  <p class="groom-overlay-desc">{{ groomDescShort }}</p>
                  <a href="javascript:void(0)" class="groom-overlay-more" @click.prevent="showGroomModal = true">Xem thêm ↓</a>
                </div>
              </div>
            </div>

            <!-- Popup chú rể: ảnh to + mô tả đầy đủ -->
            <Teleport to="body">
              <Transition name="groom-modal">
                <div v-if="showGroomModal" class="groom-modal-backdrop" @click.self="showGroomModal = false">
                  <div class="groom-modal-box">
                    <button type="button" class="groom-modal-close" aria-label="Đóng" @click="showGroomModal = false">×</button>
                    <div class="groom-modal-photo-wrap">
                      <img :src="imgGroom" alt="Chú rể" class="groom-modal-photo" loading="lazy">
                    </div>
                    <h2 class="groom-modal-name">{{ groomName }}</h2>
                    <p class="groom-modal-role">Chú rể</p>
                    <p class="groom-modal-desc">{{ groomDescFull }}</p>
                  </div>
                </div>
              </Transition>
            </Teleport>
            <p class="text-lg md:text-2xl text-dark-200 font-prata mt-8">Chú rể</p>
            <div class="relative">
              <div class="name-groom text-[56px] md:text-[72px] mt-3 font-pinyonScript" style="font-family: 'Pinyon Script', cursive; color: var(--primary-color);">
                Văn Huy
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoupleSection',
  data() {
    return {
      imgBride: '/assets/DSC01519.jpg',
      imgGroom: '/assets/DSC01582.jpg',
      showGroomModal: false,
      showBrideModal: false,
      groomName: 'VĂN HUY',
      groomDescShort: 'Là người hiền lành nhưng nói nhiều hơn người ta nghĩ, tôi luôn mang năng lượng tích cực và thích chia sẻ với mọi người xung quanh...',
      groomDescFull: 'Là người hiền lành nhưng nói nhiều hơn người ta nghĩ, tôi luôn mang năng lượng tích cực và thích chia sẻ với mọi người xung quanh. Tôi thích đi du lịch để mở rộng tầm nhìn, thích kiếm tiền để có sự tự do, và cũng không ngại tận hưởng thành quả sau những ngày làm việc cật lực.',
      brideName: 'NGỌC ÁNH',
      brideDescShort: 'Là một người đam mê xê dịch, chỉ cần có cơ hội là sẽ xách balo lên và khám phá những nơi mới, những góc nhỏ bình yên mà mình chưa từng đặt chân tới...',
      brideDescFull: 'Là một người đam mê xê dịch, chỉ cần có cơ hội là sẽ xách balo lên và khám phá những nơi mới, những góc nhỏ bình yên mà mình chưa từng đặt chân tới. Ngoài việc đi du lịch, mình còn rất thích cắm hoa. Với mình, việc tự tay lựa những bông hoa đẹp rồi sắp xếp chúng thành một bó hoa hài hòa là cách để thư giãn và nuôi dưỡng tâm hồn.'
    }
  }
}
</script>

<style scoped>
.groom-photo-wrap,
.bride-photo-wrap {
  position: relative;
}

.bride-photo-wrap img,
.groom-photo-wrap img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.groom-hover-overlay {
  position: absolute;
  inset: 0;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.92);
  border: 2px solid var(--primary-color);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.6);
  border-radius: inherit;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.groom-photo-wrap:hover .groom-hover-overlay,
.bride-photo-wrap:hover .groom-hover-overlay {
  opacity: 1;
  visibility: visible;
}
.groom-overlay-inner {
  text-align: center;
  max-width: 100%;
  max-height: 100%;
  overflow-y: auto;
}
.groom-overlay-name {
  font-family: 'Prata', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}
.groom-overlay-role {
  font-family: 'Prata', serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}
.groom-overlay-desc {
  font-size: 0.875rem;
  color: #555;
  text-align: left;
  line-height: 1.5;
  margin: 0 0 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.groom-overlay-desc-full {
  -webkit-line-clamp: unset;
  overflow: visible;
  margin-top: 0.5rem;
}
.groom-overlay-more {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary-color);
  text-decoration: none;
  margin-top: 0.5rem;
  cursor: pointer;
}
.groom-overlay-more:hover {
  text-decoration: underline;
}

/* Popup chú rể: ảnh to + mô tả */
.groom-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}
.groom-modal-box {
  position: relative;
  background: #fff;
  border-radius: 12px;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
.groom-modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  z-index: 2;
  width: 2rem;
  height: 2rem;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
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
.groom-modal-close:hover {
  background: #fff;
}
.groom-modal-photo-wrap {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f5f5;
}
.groom-modal-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.groom-modal-name {
  margin: 0;
  padding: 1rem 1.25rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 0.02em;
}
.groom-modal-role {
  margin: 0.25rem 1.25rem 0;
  font-size: 0.95rem;
  color: #666;
}
.groom-modal-desc {
  margin: 0;
  padding: 1rem 1.25rem 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
}
.groom-modal-enter-active,
.groom-modal-leave-active {
  transition: opacity 0.2s ease;
}
.groom-modal-enter-from,
.groom-modal-leave-to {
  opacity: 0;
}
.groom-modal-enter-active .groom-modal-box,
.groom-modal-leave-active .groom-modal-box {
  transition: transform 0.25s ease;
}
.groom-modal-enter-from .groom-modal-box,
.groom-modal-leave-to .groom-modal-box {
  transform: scale(0.95);
}

/* Popup cô dâu: ảnh to + mô tả (giống chú rể) */
.bride-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}
.bride-modal-box {
  position: relative;
  background: #fff;
  border-radius: 12px;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
.bride-modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  z-index: 2;
  width: 2rem;
  height: 2rem;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
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
.bride-modal-close:hover {
  background: #fff;
}
.bride-modal-photo-wrap {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f5f5;
}
.bride-modal-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.bride-modal-name {
  margin: 0;
  padding: 1rem 1.25rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 0.02em;
}
.bride-modal-role {
  margin: 0.25rem 1.25rem 0;
  font-size: 0.95rem;
  color: #666;
}
.bride-modal-desc {
  margin: 0;
  padding: 1rem 1.25rem 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
}
.bride-modal-enter-active,
.bride-modal-leave-active {
  transition: opacity 0.2s ease;
}
.bride-modal-enter-from,
.bride-modal-leave-to {
  opacity: 0;
}
.bride-modal-enter-active .bride-modal-box,
.bride-modal-leave-active .bride-modal-box {
  transition: transform 0.25s ease;
}
.bride-modal-enter-from .bride-modal-box,
.bride-modal-leave-to .bride-modal-box {
  transform: scale(0.95);
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

.z-1 {
  z-index: 1;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.hidden {
  display: none;
}

.md\:block {
  @media (min-width: 768px) {
    display: block;
  }
}

.top-1\/3 {
  top: 33.333333%;
}

.-left-\[12\%\] {
  left: -12%;
}

.-right-\[40\%\] {
  right: -40%;
}

.text-\[110px\] {
  font-size: 110px;
}

.font-prata {
  font-family: 'Prata', serif !important;
}

.rotate-90 {
  transform: rotate(90deg);
}

.-rotate-90 {
  transform: rotate(-90deg);
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.grid {
  display: grid;
}

.md\:grid-cols-2 {
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.lg\:px-\[300px\] {
  @media (min-width: 1024px) {
    padding-left: 300px;
    padding-right: 300px;
  }
}

.gap-8 {
  gap: 2rem;
}

.px-\[15px\] {
  padding-left: 15px;
  padding-right: 15px;
}

.pb-\[59px\] {
  padding-bottom: 59px;
}

.pt-\[50px\] {
  padding-top: 50px;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}

.md\:mt-0 {
  @media (min-width: 768px) {
    margin-top: 0;
  }
}

.md\:w-\[206px\] {
  @media (min-width: 768px) {
    width: 206px;
  }
}

.md\:h-\[209px\] {
  @media (min-width: 768px) {
    height: 209px;
  }
}

.w-\[150px\] {
  width: 150px;
}

.h-\[150px\] {
  height: 150px;
}

.bottom-20 {
  bottom: 5rem;
}

.md\:-left-20 {
  @media (min-width: 768px) {
    left: -5rem;
  }
}

.-left-12 {
  left: -3rem;
}

.overflow-hidden {
  overflow: hidden;
}

.cursor-pointer {
  cursor: pointer;
}

.border-\[1px\] {
  border-width: 1px;
}

.rounded-t-\[300px\] {
  border-radius: 300px 300px 0 0;
}

.md\:max-w-\[500px\] {
  @media (min-width: 768px) {
    max-width: 500px;
  }
}

.max-w-\[300px\] {
  max-width: 300px;
}

.h-\[400px\] {
  height: 400px;
}

.md\:h-\[600px\] {
  @media (min-width: 768px) {
    height: 600px;
  }
}

.block {
  display: block;
}

.object-cover {
  object-fit: cover;
}

.border-transparent {
  border-color: transparent;
}

.p-0 {
  padding: 0;
}

.text-lg {
  font-size: 1.125rem;
}

.md\:text-2xl {
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
}

.text-dark-200 {
  color: #333;
}

.mt-8 {
  margin-top: 2rem;
}

.text-\[56px\] {
  font-size: 56px;
}

.md\:text-\[72px\] {
  @media (min-width: 768px) {
    font-size: 72px;
  }
}

.mt-3 {
  margin-top: 0.75rem;
}

.font-pinyonScript {
  font-family: 'Pinyon Script', cursive !important;
}

.md\:mt-0 {
  @media (min-width: 768px) {
    margin-top: 0;
  }
}

.mt-5 {
  margin-top: 1.25rem;
}

.left-0 {
  left: 0;
}

.top-0 {
  top: 0;
}

.right-0 {
  right: 0;
}

.bottom-0 {
  bottom: 0;
}

.w-\[488px\] {
  width: 488px;
}

.h-\[574px\] {
  height: 574px;
}

.md\:-right-20 {
  @media (min-width: 768px) {
    right: -5rem;
  }
}

.-right-12 {
  right: -3rem;
}

@media (max-width: 767px) {
  .md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>

