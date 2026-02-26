<template>
  <div id="story" class="relative story-section" :class="{ 'story-entrance': playEntrance }" data-aos="fade-up" data-aos-delay="100">
    <div class="relative">
      <section class="relative grid text-center" style="background-color: var(--bg-color);">
        <div class="hidden md:block uppercase absolute top-1/3 -left-[335px] font-prata rotate-90 text-[110px]" style="color: var(--secondary-color);">Love story</div>
        
        <div class="max-w-9xl mx-auto pt-[55px] md:pt-[95px]">
          <div class="relative story-entrance-title-wrap">
            <div class="story-title text-center text-[40px] md:text-[72px] leading-[50px] md:leading-[90px] font-pinyonScript md:mb-10 px-4" style="font-family: 'Pinyon Script', cursive; color: var(--primary-color);" data-aos="fade-down">
              Chuyện chúng mình
            </div>
          </div>
        
          
          <div class="story-photo-container relative mt-[41px] md:mt-14 max-w-[1054px] px-[12px] mx-auto mb-16 md:mb-0">
            <div class="overflow-hidden cursor-pointer z-30 absolute left-1/2 -translate-x-1/2 top-0 w-full h-full max-w-[350px] md:max-w-[560px] border-[1px] rounded-tl-[100px] rounded-tr-[100px] md:rounded-tl-[240px] md:rounded-tr-[240px] border-red-800 z-1 story-photo-wrap" style="padding: 0; background: var(--bg-color);">
              <img 
                class="w-full h-full z-10 object-contain border-transparent story-photo-img" 
                :src="imgStory" 
                loading="lazy" 
                draggable="false"
                alt="Love story"
              >
            </div>
            <div class="absolute bg-transparent left-1/2 -translate-x-1/2 top-0 z-20 w-full h-full max-w-[350px] md:max-w-[560px] border-r-[1px] rounded-tl-[100px] rounded-tr-[100px] md:rounded-tl-[240px] md:rounded-tr-[240px] border-red-800 pointer-events-none" style="border-color: var(--primary-color);"></div>
            <img 
              src="/assets/6.png" 
              class="z-30 absolute -bottom-8 right-0 md:-bottom-12 md:-right-[80px] w-[120px] h-[105px] md:w-[361px] md:h-[269px]" 
              loading="lazy"
              alt="decoration"
            >
          </div>
            
          <div class="w-full max-w-[836px] mx-auto px-4 story-entrance-content-wrap mt-10 md:mt-[100px]">
            <div class="relative">
              <div class="story-content text-base mt-5 text-dark-200" data-aos="fade-up" data-aos-delay="100">
                Chúng tôi rất vui mừng được chia sẻ khoảnh khắc quan trọng nhất của cuộc đời mình với gia đình, bạn bè và những người thân yêu. Ngày cưới không chỉ là sự khởi đầu của hành trình mới mà còn là dịp để chúng tôi cùng các bạn tạo nên những kỷ niệm đáng nhớ.
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
  name: 'LoveStorySection',
  props: {
    openedAt: { type: Number, default: null }
  },
  data() {
    return {
      imgStory: 'https://imagedelivery.net/Vqc0CGAmwkbNdOz96KFZgQ/4e640426-625f-4658-99ee-e2d255365700/full',
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
/* Hiệu ứng xuất hiện khi vừa mở thiệp (giống Lễ Thành Hôn) */
.story-entrance .story-entrance-title-wrap .story-title {
  animation: storyFadeUp 0.9s ease-out forwards;
  opacity: 0;
}

.story-entrance .story-entrance-content-wrap .story-content {
  animation: storyFadeUp 0.8s ease-out 0.25s forwards;
  opacity: 0;
}

@keyframes storyFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Trên desktop: margin-top 80px cho khối nội dung "Chúng tôi rất vui mừng..." */
@media (min-width: 768px) {
  .story-entrance-content-wrap {
    margin-top: 80px;
  }
}

/* Khung ảnh Chuyện chúng mình: mobile nhỏ, desktop to và rộng */
.story-photo-container {
  min-height: 380px;
}
@media (min-width: 768px) {
  .story-photo-container {
    min-height: 680px;
    min-width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .story-photo-wrap {
    left: -250px;
    transform: translateX(0);
    max-width: 720px !important;
  }
  .story-photo-wrap + .absolute {
    left: -250px;
    transform: translateX(0);
    max-width: 720px !important;
  }
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.grid {
  display: grid;
}

.text-center {
  text-align: center;
}

.hidden {
  display: none;
}

.md\:block {
  @media (min-width: 768px) {
    display: block;
  }
}

.uppercase {
  text-transform: uppercase;
}

.top-1\/3 {
  top: 33.333333%;
}

.-left-\[335px\] {
  left: -335px;
}

.font-prata {
  font-family: 'Prata', serif !important;
}

.rotate-90 {
  transform: rotate(90deg);
}

.text-\[110px\] {
  font-size: 110px;
}

.max-w-9xl {
  max-width: 90rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.pt-\[55px\] {
  padding-top: 55px;
}

.md\:pt-\[95px\] {
  @media (min-width: 768px) {
    padding-top: 95px;
  }
}

.text-\[40px\] {
  font-size: 40px;
}

.md\:text-\[72px\] {
  @media (min-width: 768px) {
    font-size: 72px;
  }
}

.leading-\[50px\] {
  line-height: 50px;
}

.md\:leading-\[90px\] {
  @media (min-width: 768px) {
    line-height: 90px;
  }
}

.font-pinyonScript {
  font-family: 'Pinyon Script', cursive !important;
}

.md\:mb-10 {
  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.w-full {
  width: 100%;
}

.max-w-\[836px\] {
  max-width: 836px;
}

.text-base {
  font-size: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.text-dark-200 {
  color: #333;
}

.mt-\[41px\] {
  margin-top: 41px;
}

.md\:mt-14 {
  @media (min-width: 768px) {
    margin-top: 3.5rem;
  }
}

.max-w-\[1054px\] {
  max-width: 1054px;
}

.h-\[220px\] {
  height: 220px;
}

.md\:h-\[500px\] {
  @media (min-width: 768px) {
    height: 500px;
  }
}

.px-\[12px\] {
  padding-left: 12px;
  padding-right: 12px;
}

.mb-16 {
  margin-bottom: 4rem;
}

.md\:mb-0 {
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
}

.overflow-hidden {
  overflow: hidden;
}

.cursor-pointer {
  cursor: pointer;
}

.z-30 {
  z-index: 30;
}

.z-20 {
  z-index: 20;
}

.z-10 {
  z-index: 10;
}

.z-1 {
  z-index: 1;
}

.left-1\/2 {
  left: 50%;
}

.-translate-x-1\/2 {
  transform: translateX(-50%);
}

.md\:left-auto {
  @media (min-width: 768px) {
    left: auto;
  }
}

.md\:translate-x-0 {
  @media (min-width: 768px) {
    transform: translateX(0);
  }
}

.md\:right-4 {
  @media (min-width: 768px) {
    right: 1rem;
  }
}

.h-full {
  height: 100%;
}

.max-w-\[350px\] {
  max-width: 350px;
}

.md\:max-w-none {
  @media (min-width: 768px) {
    max-width: none;
  }
}

.border-\[1px\] {
  border-width: 1px;
}

.rounded-tl-\[100px\] {
  border-top-left-radius: 100px;
}

.rounded-tr-\[100px\] {
  border-top-right-radius: 100px;
}

.md\:rounded-tl-\[263px\] {
  @media (min-width: 768px) {
    border-top-left-radius: 263px;
  }
}

.md\:rounded-tr-\[263px\] {
  @media (min-width: 768px) {
    border-top-right-radius: 263px;
  }
}

.border-red-800 {
  border-color: rgb(153, 27, 27);
}

.p-0 {
  padding: 0;
}

.object-cover {
  object-fit: cover;
}

.story-photo-img {
  object-fit: contain;
  object-position: center;
}

.border-transparent {
  border-color: transparent;
}

.bg-transparent {
  background-color: transparent;
}

.md\:left-\[14px\] {
  @media (min-width: 768px) {
    left: 14px;
  }
}

.top-0 {
  top: 0;
}

.border-r-\[1px\] {
  border-right-width: 1px;
}

.-bottom-8 {
  bottom: -2rem;
}

.md\:-bottom-12 {
  @media (min-width: 768px) {
    bottom: -3rem;
  }
}

.right-0 {
  right: 0;
}

.md\:-right-\[80px\] {
  @media (min-width: 768px) {
    right: -80px;
  }
}

.w-\[120px\] {
  width: 120px;
}

.h-\[105px\] {
  height: 105px;
}

.md\:w-\[361px\] {
  @media (min-width: 768px) {
    width: 361px;
  }
}

.md\:h-\[269px\] {
  @media (min-width: 768px) {
    height: 269px;
  }
}
</style>


