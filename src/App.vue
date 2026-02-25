<template>
  <div class="app-wrap overflow-x-hidden">
    <!-- Trang thiệp: hiện trước, ấn "Mở thiệp" mới vào trang chủ -->
    <InvitationLanding
      v-if="!opened"
      couple-names="Văn Huy & Ngọc Ánh"
      wedding-date="12 tháng 3, 2026"
      :guest-name="guestName"
      @open="openInvitation"
    />
    <div v-show="opened" class="app">
      <BannerSection :opened-at="openedAt" :is-bride-variant="isBrideVariant" />
      <LoveStorySection :opened-at="openedAt" />
      <CoupleSection />
      <CeremonySection :is-bride-variant="isBrideVariant" />
      <EventsSection :is-bride-variant="isBrideVariant" />
      <PhotoAlbumSection />
      <GuestbookSection />
      <GiftSection />
      <FooterSection />
    </div>
  </div>
</template>

<script>
import InvitationLanding from './components/InvitationLanding.vue'
import BannerSection from './components/BannerSection.vue'
import CeremonySection from './components/CeremonySection.vue'
import CoupleSection from './components/CoupleSection.vue'
import PhotoAlbumSection from './components/PhotoAlbumSection.vue'
import LoveStorySection from './components/LoveStorySection.vue'
import MilestonesSection from './components/MilestonesSection.vue'
import EventsSection from './components/EventsSection.vue'
import GuestbookSection from './components/GuestbookSection.vue'
import GiftSection from './components/GiftSection.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    InvitationLanding,
    BannerSection,
    CeremonySection,
    CoupleSection,
    PhotoAlbumSection,
    LoveStorySection,
    MilestonesSection,
    EventsSection,
    GuestbookSection,
    GiftSection,
    FooterSection
  },
  computed: {
    isBrideVariant() {
      return this.$route && this.$route.path === '/wedding'
    }
  },
  data() {
    return {
      opened: false,
      openedAt: null,
      guestName: ''
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      this.guestName = this.getGuestNameFromUrl()
    }
  },
  methods: {
    /** Lấy tên khách mời chỉ từ ?name=... ; không dùng path (tránh hiển thị "Wedding" khi vào /wedding) */
    getGuestNameFromUrl() {
      const params = new URLSearchParams(window.location.search)
      const raw = params.get('name')
      if (raw != null && raw.trim() !== '') {
        return this.formatGuestName(raw.trim())
      }
      return ''
    },
    /** "anhNam" -> "Anh Nam", "emĐức" -> "Em Đức", "emNamVàGiaĐình" -> "Em Nam Và Gia Đình" */
    formatGuestName(str) {
      if (!str || typeof str !== 'string') return ''
      const s = decodeURIComponent(str.trim())
      if (!s) return ''

      // Nếu đã có khoảng trắng: chỉ viết hoa chữ cái đầu mỗi từ
      if (s.includes(' ')) {
        return s
          .split(/\s+/)
          .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
          .join(' ')
      }

      // Chèn dấu cách trước mỗi chữ in hoa (N, V, G, Đ, Ứ...) khi đứng ngay sau chữ thường (flag g = mọi vị trí)
      const withSpaces = s.replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2')
      return withSpaces
        .split(/\s+/)
        .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
        .join(' ')
    },
    openInvitation() {
      this.opened = true
      this.openedAt = Date.now()
      this.$nextTick(() => {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0)
          if (window.AOS) {
            window.AOS.refresh()
            setTimeout(() => window.AOS.refresh(), 200)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.app-wrap {
  width: 100%;
  min-height: 100vh;
}

.app {
  width: 100%;
}
</style>

