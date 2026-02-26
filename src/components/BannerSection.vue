<template>
  <section id="banner" class="banner-section" :class="{ 'banner-entrance': playEntrance }">
    <div class="relative">
      <section class="relative banner-bg">
        <img 
          class="absolute top-0 right-0 max-w-[188px] max-h-[174px] md:max-w-[327px] md:max-h-[303px] left-auto" 
          src="/assets/7.png" 
          loading="lazy"
          alt="decoration"
        >
        
        <div class="max-w-[1443px] mx-auto grid md:grid-cols-[1.5fr,1fr] md:pt-[60px] gap-[30px] px-[15px]">
          <!-- Left side - Images (đảo bố cục: ảnh trái, chữ phải) - hiệu ứng bay vào -->
          <div class="relative order-2 md:order-1" data-aos="fade-up" data-aos-duration="700" data-aos-delay="200">
            <div class="flex items-end justify-end md:justify-center pr-5 md:pr-0">
              <div class="relative w-[223px] h-[261px] md:w-[497px] md:h-[600px]">
                <div class="overflow-hidden cursor-pointer absolute w-full h-full z-20 p-0 rounded-t-full border-[1px] banner-border">
                  <img 
                    class="w-full h-full z-10 object-cover border-transparent" 
                    :src="imgCouple" 
                    loading="lazy" 
                    draggable="false"
                    alt="Wedding couple"
                  >
                </div>
                <div class="z-10 absolute bottom-0 rounded-t-full border-[1px] w-[223px] h-[261px] md:w-[497px] md:h-[600px] banner-border"></div>
                <div class="z-10 absolute bottom-0 -translate-x-5 md:-translate-x-10 rounded-t-full border-r-[1px] w-[223px] h-[261px] md:w-[497px] md:h-[600px] banner-border"></div>
              </div>
              <div class=" relative w-[134px] h-[158px] md:w-[297px] md:h-[349px] z-30 translate-x-5 md:translate-x-8">
                <div class="overflow-hidden cursor-pointer absolute w-full h-full z-20 rounded-t-full border-[2px] p-0 banner-border">
                  <img 
                    class="w-full h-full z-10 object-cover banner-img-secondary border-transparent" 
                    :src="imgCoupleSecondary" 
                    loading="lazy"
                    draggable="false"
                    alt="Wedding couple secondary"
                  >
                </div>
                <div class="z-10 absolute bottom-0 rounded-t-full border-[1px] w-[134px] h-[158px] md:w-[297px] md:h-[349px] banner-border"></div>
              </div>
            </div>
            <img 
              src="/assets/04.png" 
              class="absolute -bottom-10 md:-bottom-20 left-0 md:left-4 right-auto z-30 w-[115px] h-[96px] md:w-[256px] md:h-[213px]" 
              loading="lazy"
              alt="decoration"
            >
          </div>
          
          <!-- Right side - Text content (hiệu ứng khi vừa mở thiệp) -->
          <div class="flex flex-col items-center justify-center md:pt-[125px] order-1 md:order-2 md:pl-8 banner-text-block">
            <div class="relative banner-entrance-title">
              <div class="banner-title font-prata uppercase text-lg md:text-2xl theme-primary">
                {{ isBrideVariant ? 'Lễ Vu Quy' : 'Lễ Thành Hôn' }}
              </div>
            </div>
            <div class="mt-6 mb-[41px] md:mb-[93px] banner-entrance-names">
              <div class="relative">
                <div class="groom-name font-pinyonScript text-[56px] md:text-[72px] md:leading-[90px] text-center theme-primary">
                  Văn Huy
                </div>
              </div>
              <h1 class="text-[64px] md:leading-[60px] h-[60px] md:h-auto items-center flex justify-center font-pinyonScript text-center theme-primary banner-entrance-amp">&</h1>
              <div class="relative">
                <div class="bride-name font-pinyonScript text-[56px] md:text-[72px] md:leading-[90px] text-center theme-primary">
                  Ngọc Ánh
                </div>
              </div>
            </div>
            <div class="flex space-x-[15px] md:space-x-[30px] text-[32px] md:text-[80px] items-center h-auto theme-secondary banner-entrance-date">
              <div class="relative"><div class="leading-none">12</div></div>
              <div class="self-stretch w-[1.66px] theme-secondary-bg"></div>
              <div class="relative"><div class="leading-none">03</div></div>
              <div class="self-stretch w-[1.66px] theme-secondary-bg"></div>
              <div class="relative"><div class="leading-none">2026</div></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BannerSection',
  props: {
    openedAt: { type: Number, default: null },
    isBrideVariant: { type: Boolean, default: false }
  },
  data() {
    return {
      imgCouple: 'https://imagedelivery.net/Vqc0CGAmwkbNdOz96KFZgQ/39f05e57-3333-43ca-349b-5d73755ea500/full',
      imgCoupleSecondary: 'https://imagedelivery.net/Vqc0CGAmwkbNdOz96KFZgQ/b403e51d-8534-4f0f-ea80-b6bbe00c4e00/full',
      playEntrance: false
    }
  },
  watch: {
    openedAt(v) {
      if (v) this.playEntrance = true
    }
  }
}
</script>

<style scoped>
.banner-section {
  width: 100%;
  position: relative;
}

/* Hiệu ứng xuất hiện khi vừa mở thiệp */
.banner-entrance .banner-entrance-title {
  animation: bannerFadeUp 0.9s ease-out forwards;
  opacity: 0;
}

.banner-entrance .banner-entrance-names .groom-name {
  animation: bannerFadeUp 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.banner-entrance .banner-entrance-names .banner-entrance-amp {
  animation: bannerFadeUp 0.8s ease-out 0.35s forwards;
  opacity: 0;
}

.banner-entrance .banner-entrance-names .bride-name {
  animation: bannerFadeUp 0.8s ease-out 0.5s forwards;
  opacity: 0;
}

.banner-entrance .banner-entrance-date {
  animation: bannerFadeUp 0.8s ease-out 0.7s forwards;
  opacity: 0;
}

@keyframes bannerFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.banner-bg {
  background: var(--bg-color);
}

.banner-border {
  border-color: var(--primary-color);
  border-style: solid;
}

.theme-primary {
  color: var(--primary-color);
}

.theme-secondary {
  color: var(--secondary-color);
}

.theme-secondary-bg {
  background: var(--secondary-color);
}

.font-pinyonScript {
  font-family: 'Pinyon Script', cursive !important;
}

.font-prata {
  font-family: 'Prata', serif !important;
}

.text-dark-200 {
  color: #333;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.z-10 {
  z-index: 10;
}

.z-20 {
  z-index: 20;
}

.z-30 {
  z-index: 30;
}

.rounded-t-full {
  border-radius: 50% 50% 0 0;
}

.overflow-hidden {
  overflow: hidden;
}

.object-cover {
  object-fit: cover;
}

/* Ảnh cặp đôi nhỏ: dịch xuống để không cắt mất đầu */
.banner-img-secondary {
  object-position: 50% 8%;
}

.cursor-pointer {
  cursor: pointer;
}

.space-x-\[15px\] > * + * {
  margin-left: 15px;
}

.md\:space-x-\[30px\] > * + * {
  @media (min-width: 768px) {
    margin-left: 30px;
  }
}

.self-stretch {
  align-self: stretch;
}

.translate-x-5 {
  transform: translateX(1.25rem);
}

.md\:translate-x-10 {
  @media (min-width: 768px) {
    transform: translateX(2.5rem);
  }
}

.-translate-x-20 {
  transform: translateX(-5rem);
}

.-bottom-10 {
  bottom: -2.5rem;
}

.md\:-bottom-20 {
  @media (min-width: 768px) {
    bottom: -5rem;
  }
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}

.bottom-0 {
  bottom: 0;
}

.right-0 {
  right: 0;
}

.max-w-\[188px\] {
  max-width: 188px;
}

.max-h-\[174px\] {
  max-height: 174px;
}

.md\:max-w-\[327px\] {
  @media (min-width: 768px) {
    max-width: 327px;
  }
}

.md\:max-h-\[303px\] {
  @media (min-width: 768px) {
    max-height: 303px;
  }
}

.text-lg {
  font-size: 1.125rem;
}

.md\:text-2xl {
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
}

.text-\[56px\] {
  font-size: 56px;
}

.md\:text-\[72px\] {
  @media (min-width: 768px) {
    font-size: 72px;
  }
}

.md\:leading-\[90px\] {
  @media (min-width: 768px) {
    line-height: 90px;
  }
}

.text-center {
  text-align: center;
}

.uppercase {
  text-transform: uppercase;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mb-\[41px\] {
  margin-bottom: 41px;
}

.md\:mb-\[93px\] {
  @media (min-width: 768px) {
    margin-bottom: 93px;
  }
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.grid {
  display: grid;
}

.md\:grid-cols-\[1\.5fr\,1fr\] {
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.5fr;
  }
}

.md\:pt-\[60px\] {
  @media (min-width: 768px) {
    padding-top: 60px;
  }
}

.gap-\[30px\] {
  gap: 30px;
}

.px-\[15px\] {
  padding-left: 15px;
  padding-right: 15px;
}

.md\:pt-\[125px\] {
  @media (min-width: 768px) {
    padding-top: 125px;
  }
}

.text-\[64px\] {
  font-size: 64px;
}

.md\:leading-\[60px\] {
  @media (min-width: 768px) {
    line-height: 60px;
  }
}

.h-\[60px\] {
  height: 60px;
}

.md\:h-auto {
  @media (min-width: 768px) {
    height: auto;
  }
}

.text-\[32px\] {
  font-size: 32px;
}

.md\:text-\[80px\] {
  @media (min-width: 768px) {
    font-size: 80px;
  }
}

.leading-none {
  line-height: 1;
}

.w-\[1\.66px\] {
  width: 1.66px;
}

.items-end {
  align-items: flex-end;
}

.justify-between {
  justify-content: space-between;
}

.md\:justify-center {
  @media (min-width: 768px) {
    justify-content: center;
  }
}

.pl-5 {
  padding-left: 1.25rem;
}

.w-\[223px\] {
  width: 223px;
}

.h-\[261px\] {
  height: 261px;
}

.md\:w-\[497px\] {
  @media (min-width: 768px) {
    width: 497px;
  }
}

.md\:h-\[600px\] {
  @media (min-width: 768px) {
    height: 600px;
  }
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.border-\[1px\] {
  border-width: 1px;
}

.border-\[2px\] {
  border-width: 2px;
}

.border-r-\[1px\] {
  border-right-width: 1px;
}

.p-0 {
  padding: 0;
}

.w-\[115px\] {
  width: 115px;
}

.h-\[96px\] {
  height: 96px;
}

.md\:w-\[256px\] {
  @media (min-width: 768px) {
    width: 256px;
  }
}

.md\:h-\[213px\] {
  @media (min-width: 768px) {
    height: 213px;
  }
}

.w-\[134px\] {
  width: 134px;
}

.h-\[158px\] {
  height: 158px;
}

.md\:w-\[297px\] {
  @media (min-width: 768px) {
    width: 297px;
  }
}

.md\:h-\[349px\] {
  @media (min-width: 768px) {
    height: 349px;
  }
}

.max-w-\[1443px\] {
  max-width: 1443px;
}

@media (max-width: 767px) {
  .md\:grid-cols-\[1\.5fr\,1fr\] {
    grid-template-columns: 1fr;
  }
  
  .md\:pt-\[125px\] {
    padding-top: 30px;
  }
  
  .md\:mb-\[93px\] {
    margin-bottom: 41px;
  }
  
  .-translate-x-20 {
    transform: translateX(-2rem);
  }
}
</style>
