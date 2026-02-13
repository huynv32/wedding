<template>
  <div id="event" class="events-root" data-aos="fade-up" data-aos-delay="100">
    <section class="events-section">
      <div class="events-inner">
        <!-- Tiêu đề chính -->
      

        <!-- Tiêu đề bản đồ -->
        <h3 class="events-map-title">BẢN ĐỒ</h3>

        <!-- Google Map nhúng -->
        <div class="events-map-wrap">
          <iframe
            class="events-map-iframe"
            :src="mapEmbedUrl"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Bản đồ địa điểm tiệc cưới"
          ></iframe>
          <a
            :href="receptionEvent.mapLink"
            target="_blank"
            rel="noopener noreferrer"
            class="events-map-directions"
          >
            Chỉ đường
          </a>
        </div>

        <!-- Các sự kiện khác (Ăn hỏi, Đón dâu) - gọn bên dưới -->
        <div v-if="otherEvents.length" class="events-other">
          <div v-for="(event, index) in otherEvents" :key="index" class="events-other-card">
            <span class="events-other-name">{{ event.name }}</span>
            <span class="events-other-detail">{{ event.time }} · {{ event.day }}/{{ event.month }}/{{ event.year }}</span>
            <span class="events-other-location">{{ event.location }}</span>
            <a :href="event.mapLink" target="_blank" rel="noopener noreferrer" class="events-other-link">Chỉ đường</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const OTHER_ADDRESS = 'Số 169, Đường Liên Thôn 2, xã Ô Diên, Hà Nội'
const OTHER_MAP_LINK = 'https://www.google.com/maps?q=' + encodeURIComponent(OTHER_ADDRESS)
const RECEPTION_ADDRESS = 'Nhà văn hoá cụm 1 Số 12, Đường Liên Thôn 2, xã Ô Diên, Hà Nội'
const RECEPTION_MAP_LINK = 'https://www.google.com/maps?q=' + encodeURIComponent(RECEPTION_ADDRESS)

export default {
  name: 'EventsSection',
  props: {
    isBrideVariant: { type: Boolean, default: false }
  },
  data() {
    return {
      events: [
        {
          name: 'Ăn hỏi',
          time: '09:00',
          day: '11',
          month: '3',
          year: '2026',
          location: OTHER_ADDRESS,
          mapLink: OTHER_MAP_LINK,
          isReception: false
        },
        {
          name: 'Đón dâu',
          time: '13:30',
          day: '12',
          month: '3',
          year: '2026',
          location: OTHER_ADDRESS,
          mapLink: OTHER_MAP_LINK,
          isReception: false
        },
        {
          time: '14:00',
          day: '12',
          month: '3',
          year: '2026',
          location: 'Số 1, Ngõ 161, đường Ô Diên, xã Ô Diên, Hà Nội',
          mapLink: 'https://maps.app.goo.gl/Qw9UosWsyVd9yfd87',
          isReception: true
        }
      ]
    }
  },
  computed: {
    receptionEvent() {
      const e = this.events.find(x => x.isReception)
      if (!e) return this.events[this.events.length - 1]
      if (this.isBrideVariant) {
        return { ...e, venueName: e.venueName || e.name, location: RECEPTION_ADDRESS, mapLink: RECEPTION_MAP_LINK }
      }
      return { ...e, venueName: e.venueName || e.name }
    },
    receptionWeekday() {
      const e = this.receptionEvent
      if (!e) return ''
      const d = new Date(parseInt(e.year), parseInt(e.month) - 1, parseInt(e.day))
      const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
      return days[d.getDay()]
    },
    otherEvents() {
      return this.events.filter(x => !x.isReception)
    },
    mapEmbedUrl() {
      const loc = this.receptionEvent?.location || ''
      const q = encodeURIComponent(loc)
      return `https://www.google.com/maps?q=${q}&output=embed`
    }
  }
}
</script>

<style scoped>
.events-root {
  position: relative;
}

.events-section {
  background: var(--bg-color);
  color: var(--primary-color);
  padding: 2.25rem 1.5rem 2.75rem;
  text-align: center;
}

.events-inner {
  max-width: 720px;
  margin: 0 auto;
}

/* Tiêu đề "TIỆC CƯỚI SẼ TỔ CHỨC TẠI" - cùng style phần invitation */
.events-main-title {
  font-family: 'Prata', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary-color);
  background: rgba(0, 0, 0, 0.06);
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0 0 1rem;
  border-radius: 4px;
}

/* Hộp địa chỉ - style giống 17:30 Thứ 4 / 11 | 03 | 2026 / địa chỉ */
.events-address-box {
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem 1.5rem 1.75rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.events-venue-name {
  font-family: 'Prata', serif;
  font-size: 1.5rem;
  line-height: 2.75rem;
  color: var(--text-dark);
  margin: 0 0 0.25rem;
}

@media (min-width: 768px) {
  .events-venue-name {
    font-size: 32px;
    line-height: 44px;
  }
}

.events-venue-time {
  font-family: 'Prata', serif;
  font-size: 1.5rem;
  line-height: 2.75rem;
  color: var(--text-dark);
  margin: 0 0 0.5rem;
}

@media (min-width: 768px) {
  .events-venue-time {
    font-size: 32px;
    line-height: 44px;
  }
}

.events-date-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .events-date-row {
    gap: 2.1875rem;
  }
}

.events-date-num {
  font-family: 'Prata', serif;
  font-size: 2rem;
  line-height: 1;
  color: var(--text-dark);
}

@media (min-width: 768px) {
  .events-date-num {
    font-size: 3.5rem;
  }
}

.events-date-sep {
  display: inline-block;
  width: 1.66px;
  align-self: stretch;
  background: #F4DBCE;
}

.events-address {
  font-family: 'Prata', serif;
  font-size: 1.5rem;
  line-height: 2.75rem;
  color: var(--text-dark);
  margin: 0;
}

@media (min-width: 768px) {
  .events-address {
    font-size: 32px;
    line-height: 44px;
  }
}

/* Tiêu đề "BẢN ĐỒ" */
.events-map-title {
  font-family: 'Prata', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary-color);
  margin: 0 0 0.6rem;
}

/* Khung bản đồ */
.events-map-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  background: #f3f4f6;
}

.events-map-iframe {
  display: block;
  width: 100%;
  height: 320px;
  border: none;
}

.events-map-directions {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s;
}

.events-map-directions:hover {
  filter: brightness(0.92);
}

/* Các sự kiện khác (Ăn hỏi, Đón dâu) */
.events-other {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.events-other-card {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  text-align: left;
  min-width: 200px;
  max-width: 280px;
}

.events-other-name {
  display: block;
  font-family: 'Prata', serif;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--primary-color);
  margin-bottom: 0.35rem;
}

.events-other-detail {
  display: block;
  font-size: 0.8125rem;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.events-other-location {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.events-other-link {
  font-size: 0.75rem;
  color: var(--primary-color);
  text-decoration: underline;
}

.events-other-link:hover {
  color: var(--text-dark);
}

@media (min-width: 768px) {
  .events-section {
    padding: 2.75rem 2rem 3rem;
  }

  .events-main-title {
    font-size: 1.125rem;
    padding: 0.6rem 1.25rem;
    margin-bottom: 1.25rem;
  }

  .events-address-box {
    padding: 1.35rem 1.6rem;
    margin-bottom: 1.5rem;
  }

  .events-venue-name {
    font-size: 1.25rem;
  }

  .events-address {
    font-size: 1rem;
  }

  .events-map-title {
    font-size: 1.125rem;
    margin-bottom: 1.25rem;
  }

  .events-map-iframe {
    height: 400px;
  }
}
</style>
