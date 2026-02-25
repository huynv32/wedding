<template>
  <div id="message" class="guestbook-root" data-aos="fade-up" data-aos-delay="200">
    <div class="guestbook-outer">
      <section id="sangtrong-message-id" class="relative bg-white rounded-2xl overflow-hidden">
        <img 
          src="/assets/decor.png" 
          class="absolute top-0 left-0 md:w-[429px] md:h-[363px] w-[179px] h-[151px]" 
          loading="lazy"
          alt="decoration"
        >
        <img 
          src="/assets/watercolor-boho-card-with-hand-painted-tropical-orchid-flowers-dried-palm-leaves-branches-pampas-flowers-illustration 2.png" 
          class="absolute bottom-0 right-0 md:w-[429px] md:mb-18 md:h-[363px] w-[179px] h-[151px]" 
          loading="lazy"
          alt="decoration"
        >
        
        <section ref="guestbookSection" class="guestbook-section z-1 relative w-full max-w-[720px] mx-auto overflow-hidden flex flex-col justify-center items-center pt-8 pb-10 px-4 md:pt-12 md:pb-14 md:px-6" :class="{ 'guestbook-visible': inView }">
            <h1 class="guestbook-title guestbook-title-in text-[42px] md:text-[64px] md:leading-[1.1] font-pinyonScript text-center mb-6 md:mb-8" style="color: var(--primary-color);">
              Sổ lưu bút
            </h1>
            
            <!-- Form -->
            <div class="guestbook-form-card guestbook-form-in w-full">
              <input 
                placeholder="Nhập tên của bạn*" 
                class="guestbook-input"
                v-model="form.name"
                name="name"
                required
              >
              <textarea 
                name="content" 
                placeholder="Nhập lời chúc của bạn*" 
                class="guestbook-textarea"
                v-model="form.message"
                required
              ></textarea>
              <div class="guestbook-form-footer">
                <button type="button" class="guestbook-hint guestbook-hint-btn" @click="openSuggestModal">✨ Tạo lời chúc</button>
                <button type="submit" class="guestbook-btn" @click.prevent="submitWish">
                  Gửi lời chúc
                </button>
              </div>
            </div>
            <br/>
            
            <!-- Danh sách -->
            <div class="guestbook-list guestbook-list-in w-full mt-5">
              <div v-if="messages.length === 0" class="guestbook-empty guestbook-empty-in">
                Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
              </div>
              <div 
                v-for="(message, index) in messages" 
                :key="index" 
                class="guestbook-entry message-item"
                :style="{ animationDelay: (index * 0.06) + 's' }"
              >
                <div class="guestbook-entry-header">
                  <span class="guestbook-entry-name">{{ message.name }} 😊</span>
                  <span class="guestbook-entry-date">{{ formatDate(message.date) }}</span>
                </div>
                <p class="guestbook-entry-message">{{ message.message }}</p>
              </div>
            </div>
        </section>
      </section>
    </div>

    <!-- Modal gợi ý lời chúc -->
    <Teleport to="body">
      <Transition name="suggest-modal">
        <div v-if="showSuggestModal" class="suggest-overlay" @click.self="closeSuggestModal">
          <div class="suggest-modal">
            <button type="button" class="suggest-modal-close" aria-label="Đóng" @click="closeSuggestModal">×</button>
            <h2 class="suggest-modal-title">✨ Lời chúc gợi ý cho bạn</h2>
            <p class="suggest-modal-instruction">Chọn một lời chúc bạn thích hoặc tạo lại để xem thêm gợi ý</p>
            <div class="suggest-list">
              <button
                v-for="(wish, index) in suggestedWishes"
                :key="index"
                type="button"
                class="suggest-card"
                @click="applyWish(wish)"
              >
                {{ wish }}
              </button>
            </div>
            <div class="suggest-modal-actions">
              <button type="button" class="suggest-btn suggest-btn-secondary" @click="generateMore">✨ Tạo thêm</button>
              <button type="button" class="suggest-btn suggest-btn-primary" @click="closeSuggestModal">Đóng</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'GuestbookSection',
  data() {
    return {
      form: {
        name: '',
        message: ''
      },
      messages: [],
      loading: false,
      inView: false,
      observer: null,
      showSuggestModal: false,
      suggestedWishes: [],
      wishPool: [
        'Mong hai bạn xây dựng một mái ấm tràn đầy tiếng cười và niềm vui.',
        'Chúc hai bạn luôn tràn ngập yêu thương và hạnh phúc trong suốt quãng đời còn lại.',
        'Chúc hôn nhân của hai bạn là câu chuyện cổ tích đẹp đẽ kéo dài mãi mãi.',
        'Chúc vợ chồng mới cưới luôn gặp may mắn, sức khỏe và thành công.',
        'Chúc hai bạn luôn biết trân trọng và yêu thương nhau như ngày đầu gặp gỡ.',
        'Chúc hai bạn trăm năm hạnh phúc, sớm có em bé khỏe mạnh.',
        'Chúc gia đình nhỏ của hai bạn luôn ấm áp và hạnh phúc.',
        'Chúc hai bạn luôn đồng lòng, cùng nhau vượt qua mọi thử thách.',
        'Chúc tình yêu của hai bạn ngày càng đơm hoa kết trái.',
        'Chúc hai bạn có một cuộc sống hôn nhân ngọt ngào và bền vững.',
        'Chúc hai bạn mãi mãi bên nhau như đôi chim uyên ương.',
        'Chúc hai bạn luôn giữ được nụ cười và sự lãng mạn như thuở mới yêu.',
        'Chúc hai bạn sớm có tổ ấm đầy ắp tiếng cười con trẻ.',
        'Chúc hôn lễ đánh dấu khởi đầu hạnh phúc trọn đời của hai bạn.',
        'Chúc hai bạn luôn là chỗ dựa vững chắc cho nhau trong mọi hoàn cảnh.'
      ]
    }
  },
  mounted() {
    this.loadMessages()
    this.$nextTick(() => this.setupInViewObserver())
  },
  beforeUnmount() {
    if (this.observer && this.$refs.guestbookSection) {
      this.observer.unobserve(this.$refs.guestbookSection)
    }
  },
  methods: {
    setupInViewObserver() {
      const el = this.$refs.guestbookSection
      if (!el || typeof IntersectionObserver === 'undefined') return
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !this.inView) this.inView = true
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
      )
      this.observer.observe(el)
    },
    loadMessages() {
      this.loading = true
      try {
        const saved = localStorage.getItem('weddingGuestbookMessages')
        if (saved) {
          this.messages = JSON.parse(saved)
          this.messages.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else {
          this.messages = []
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error)
        this.messages = []
      } finally {
        this.loading = false
      }
    },
    saveMessagesToLocalStorage() {
      try {
        localStorage.setItem('weddingGuestbookMessages', JSON.stringify(this.messages))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },
    submitWish() {
      if (!this.form.name || !this.form.name.trim()) {
        alert('Vui lòng nhập tên của bạn')
        return
      }
      if (!this.form.message || !this.form.message.trim()) {
        alert('Vui lòng nhập lời chúc')
        return
      }
      if (this.form.name.length > 160) {
        alert('Tên không được vượt quá 160 ký tự')
        return
      }
      if (this.form.message.length > 3000) {
        alert('Lời chúc không được vượt quá 3000 ký tự')
        return
      }

      const newMessage = {
        name: this.form.name.trim(),
        message: this.form.message.trim(),
        date: new Date().toISOString()
      }
      this.messages.unshift(newMessage)
      this.saveMessagesToLocalStorage()
      this.form = { name: '', message: '' }
      alert('Cảm ơn bạn đã gửi lời chúc! 💕')

      this.$nextTick(() => {
        const messagesContainer = this.$el.querySelector('.guestbook-list')
        if (messagesContainer) {
          messagesContainer.scrollTop = 0
        }
      })
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const time = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `lúc ${time} ${day} tháng ${month}, ${year}`
    },
    openSuggestModal() {
      this.showSuggestModal = true
      this.pickSuggestions()
    },
    closeSuggestModal() {
      this.showSuggestModal = false
    },
    pickSuggestions() {
      const pool = [...this.wishPool]
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]]
      }
      this.suggestedWishes = pool.slice(0, 5)
    },
    generateMore() {
      this.pickSuggestions()
    },
    applyWish(text) {
      this.form.message = text
      this.showSuggestModal = false
    }
  }
}
</script>

<style scoped>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.bg-white {
  background-color: white;
}

.z-1 {
  z-index: 1;
}

.z-10 {
  z-index: 10;
}

.z-0 {
  z-index: 0;
}

.max-w-\[1443px\] {
  max-width: 1443px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.overflow-hidden {
  overflow: hidden;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.text-center {
  text-align: center;
}

.pt-\[56px\] {
  padding-top: 56px;
}

.lg\:pt-\[164px\] {
  @media (min-width: 1024px) {
    padding-top: 164px;
  }
}

.pl-\[18px\] {
  padding-left: 18px;
}

.pr-\[24px\] {
  padding-right: 24px;
}

.lg\:pl-\[304px\] {
  @media (min-width: 1024px) {
    padding-left: 304px;
  }
}

.lg\:pr-\[302px\] {
  @media (min-width: 1024px) {
    padding-right: 302px;
  }
}

.max-w-\[837px\] {
  max-width: 837px;
}

.max-h-\[1059px\] {
  max-height: 1059px;
}

.w-full {
  width: 100%;
}

.md\:min-w-\[335px\] {
  @media (min-width: 768px) {
    min-width: 335px;
  }
}

.min-h-\[912px\] {
  min-height: 912px;
  @media (max-width: 768px) {
    min-height: initial;
    margin-bottom: 30px;
  }
}

.grid {
  display: grid;
}

.h-full {
  height: 100%;
}

.text-\[48px\] {
  font-size: 48px;
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

.font-pinyonScript {
  font-family: 'Pinyon Script', cursive !important;
}

.mt-\[55px\] {
  margin-top: 55px;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.w-full {
  width: 100%;
}

.h-12 {
  height: 3rem;
}

.ps-4 {
  padding-left: 1rem;
}

.border-\[1px\] {
  border-width: 1px;
}

.border-dark-300 {
  border-color: #d1d5db;
}

.placeholder-\[#555\]::placeholder {
  color: #555;
}

.h-\[140px\] {
  height: 140px;
}

.pt-3 {
  padding-top: 0.75rem;
}

.pt-8 {
  padding-top: 2rem;
}

.pb-10 {
  padding-bottom: 2.5rem;
}

.md\:pt-12 {
  @media (min-width: 768px) {
    padding-top: 3rem;
  }
}

.md\:pb-14 {
  @media (min-width: 768px) {
    padding-bottom: 3.5rem;
  }
}

.md\:px-6 {
  @media (min-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.md\:mb-8 {
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
}

.mt-5 {
  margin-top: 1.25rem;
}

.resize-none {
  resize: none;
}

.bottom-2 {
  bottom: 0.5rem;
}

.right-2 {
  right: 0.5rem;
}

.uppercase {
  text-transform: uppercase;
}

.rounded-full {
  border-radius: 9999px;
}

.text-white {
  color: white;
}

.font-prata {
  font-family: 'Prata', serif !important;
}

.text-sm {
  font-size: 0.875rem;
}

.md\:text-\[18px\] {
  @media (min-width: 768px) {
    font-size: 18px;
  }
}

.min-w-\[180px\] {
  min-width: 180px;
}

.md\:min-w-\[250px\] {
  @media (min-width: 768px) {
    min-width: 250px;
  }
}

.p-3 {
  padding: 0.75rem;
}

.md\:p-6 {
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
}

.mt-10 {
  margin-top: 2.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.h-\[2px\] {
  height: 2px;
}

.bg-dark-300 {
  background-color: #d1d5db;
}

.max-h-\[360px\] {
  max-height: 360px;
}

.overflow-y-auto {
  overflow-y: auto;
}

.text-base {
  font-size: 1rem;
}

.text-start {
  text-align: start;
}

.gap-6 {
  gap: 1.5rem;
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

.md\:w-\[429px\] {
  @media (min-width: 768px) {
    width: 429px;
  }
}

.md\:h-\[363px\] {
  @media (min-width: 768px) {
    height: 363px;
  }
}

.w-\[179px\] {
  width: 179px;
}

.h-\[151px\] {
  height: 151px;
}

input, textarea {
  border: 1px solid #d1d5db;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

button {
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ---- Sổ lưu bút: bề rộng 60%, căn giữa ---- */
.guestbook-root {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.guestbook-outer {
  display: block;
  width: 90%;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .guestbook-outer {
    width: 60%;
  }
}

/* ---- Nội dung ---- */
.guestbook-section {
  font-family: inherit;
  background: var(--bg-color);
  border-radius: 0;
}

.guestbook-title {
  letter-spacing: 0.02em;
}

/* ---- Animation chỉ chạy khi lăn chuột tới section ---- */
.guestbook-title-in {
  opacity: 0;
}

.guestbook-form-in {
  opacity: 0;
}

.guestbook-list-in .guestbook-empty-in {
  opacity: 0;
}

.guestbook-visible .guestbook-title-in {
  animation: guestbookTitleIn 0.7s ease-out forwards;
}

.guestbook-visible .guestbook-form-in {
  animation: guestbookFormIn 0.6s ease-out 0.2s forwards;
}

.guestbook-visible .guestbook-list-in .guestbook-empty-in {
  animation: guestbookFormIn 0.5s ease-out 0.35s forwards;
}

.guestbook-visible .message-item {
  animation: guestbookFadeIn 0.5s ease-out forwards;
}

/* Mặc định ẩn cho đến khi section vào view */
.message-item {
  opacity: 0;
}

@keyframes guestbookTitleIn {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes guestbookFormIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---- Form card ---- */
.guestbook-form-card {
  background: #fff;
  border-radius: 16px;
  padding: 1.75rem 1.5rem;
  box-shadow: 0 4px 24px rgba(92, 124, 107, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(92, 124, 107, 0.12);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.guestbook-form-card:hover {
  box-shadow: 0 8px 32px rgba(92, 124, 107, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.guestbook-input,
.guestbook-textarea {
  width: 100%;
  display: block;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  font-size: 0.9375rem;
  color: var(--text-dark);
  background: #fafafa;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}

.guestbook-input::placeholder,
.guestbook-textarea::placeholder {
  color: #9ca3af;
}

.guestbook-input:focus,
.guestbook-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(92, 124, 107, 0.12);
}

.guestbook-input {
  height: 2.75rem;
  margin-bottom: 1rem;
}

.guestbook-textarea {
  min-height: 120px;
  resize: vertical;
  padding-top: 0.75rem;
  margin-bottom: 1rem;
}

.guestbook-form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.guestbook-hint {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 400;
}

.guestbook-hint-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
}

.guestbook-hint-btn:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.guestbook-btn {
  font-family: 'Prata', serif;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
  background: var(--primary-color);
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.guestbook-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

/* ---- Modal gợi ý lời chúc ---- */
.suggest-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.suggest-modal {
  background: #fff;
  border-radius: 16px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem 1.5rem 1.25rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  position: relative;
}

.suggest-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.suggest-modal-close:hover {
  background: #e5e7eb;
  color: #374151;
}

.suggest-modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-dark);
  margin: 0 0 0.5rem;
  padding-right: 2rem;
}

.suggest-modal-instruction {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1.25rem;
  line-height: 1.5;
}

.suggest-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.suggest-card {
  display: block;
  width: 100%;
  text-align: left;
  padding: 1rem 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--text-dark);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}

.suggest-card:hover {
  background: #f3f4f6;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(92, 124, 107, 0.15);
}

.suggest-modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.suggest-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.suggest-btn-secondary {
  background: #fff;
  border: 1px solid #d1d5db;
  color: #374151;
}

.suggest-btn-secondary:hover {
  background: #f9fafb;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.suggest-btn-primary {
  background: #6b7280;
  border: none;
  color: #fff;
}

.suggest-btn-primary:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.suggest-modal-enter-active,
.suggest-modal-leave-active {
  transition: opacity 0.2s ease;
}

.suggest-modal-enter-active .suggest-modal,
.suggest-modal-leave-active .suggest-modal {
  transition: transform 0.2s ease;
}

.suggest-modal-enter-from,
.suggest-modal-leave-to {
  opacity: 0;
}

.suggest-modal-enter-from .suggest-modal,
.suggest-modal-leave-to .suggest-modal {
  transform: scale(0.95);
}

/* ---- Danh sách lời chúc ---- */
.guestbook-list {
  max-height: 420px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 6px;
}

.guestbook-empty {
  text-align: center;
  color: #9ca3af;
  font-size: 0.9375rem;
  padding: 2.5rem 1rem;
  background: #fff;
  border-radius: 16px;
  border: 1px dashed rgba(92, 124, 107, 0.2);
}

.guestbook-entry {
  background: #fff;
  border-radius: 14px;
  padding: 1.25rem 1.25rem;
  box-shadow: 0 2px 16px rgba(92, 124, 107, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(92, 124, 107, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.guestbook-entry:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 24px rgba(92, 124, 107, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06);
}

.guestbook-entry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.guestbook-entry-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--primary-color);
}

.guestbook-entry-date {
  font-size: 0.75rem;
  color: #9ca3af;
  flex-shrink: 0;
}

.guestbook-entry-message {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #374151;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

@keyframes guestbookFadeIn {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar cho danh sách */
.guestbook-list::-webkit-scrollbar {
  width: 6px;
}

.guestbook-list::-webkit-scrollbar-track {
  background: rgba(92, 124, 107, 0.06);
  border-radius: 3px;
}

.guestbook-list::-webkit-scrollbar-thumb {
  background: rgba(92, 124, 107, 0.25);
  border-radius: 3px;
}

.guestbook-list::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

.font-semibold {
  font-weight: 600;
}

.whitespace-pre-wrap {
  white-space: pre-wrap;
}

.last\:border-b-0:last-child {
  border-bottom: 0;
}
</style>
