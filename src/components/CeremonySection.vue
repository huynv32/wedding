<template>
  <div id="invitation" class="ceremony-root" data-aos="fade-up">
    <section class="ceremony-section">
      <div class="ceremony-inner">
        <!-- Tiêu đề chính -->
        <h2 class="ceremony-main-title">Sự Kiện Cưới</h2>

        <!-- Mô tả + trang trí kim cương -->
        <div class="ceremony-subtitle-wrap">
          <div class="ceremony-diamonds" aria-hidden="true">
            <span class="ceremony-diamond"></span>
            <span class="ceremony-diamond"></span>
          </div>
          <p class="ceremony-subtitle">
            Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ.
          </p>
        </div>

        <!-- Hai thẻ sự kiện -->
        <div class="ceremony-cards">
          <article
            v-for="(event, index) in events"
            :key="index"
            class="ceremony-card"
          >
            <div class="ceremony-card-photo-wrap">
              <img
                :src="event.image"
                :alt="event.name"
                class="ceremony-card-photo"
                loading="lazy"
              >
            </div>
            <div class="ceremony-card-body">
              <h3 class="ceremony-card-title">{{ event.name }}</h3>
              <p class="ceremony-card-time">
                <span class="ceremony-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </span>
                {{ event.time }} {{ event.date }}
              </p>
              <p class="ceremony-card-location">
                <span class="ceremony-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                {{ event.location }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/** Thiệp chú rể (lễ thành hôn): tiệc và lễ thành hôn đều ở Số 1, Ngõ 161 */
const GROOM_ADDRESS = 'Số 1, Ngõ 161, Đường Ô Diên, Xã Ô Diên, Hà Nội'
/** Thiệp cô dâu: Lễ vu quy và Ăn hỏi, Đón dâu ở Số 69 */
const OTHER_ADDRESS = 'Số 69, Đường Liên Thôn 2, Liên Trung, Xã Ô Diên, Hà Nội'
/** Thiệp cô dâu: chỉ tiệc chiều ở Nhà văn hoá */
const RECEPTION_ADDRESS = 'Nhà văn hoá cụm 2, Liên Trung, Xã Ô Diên, Hà Nội'

export default {
  name: 'CeremonySection',
  props: {
    isBrideVariant: { type: Boolean, default: false }
  },
  data() {
    return {
      baseEvents: [
        {
          name: 'TIỆC CHIỀU',
          time: '16:00',
          date: '11/03/2026',
          location: GROOM_ADDRESS,
          image: 'https://imagedelivery.net/Vqc0CGAmwkbNdOz96KFZgQ/1448aefe-7b97-4619-0a86-449057d9bc00/full'
        },
        {
          name: 'LỄ THÀNH HÔN',
          time: '13:00',
          date: '12/03/2026',
          location: GROOM_ADDRESS,
          image: 'https://imagedelivery.net/Vqc0CGAmwkbNdOz96KFZgQ/02acc5f2-3e6e-4d34-18dc-4f7cd964dc00/full'
        }
      ]
    }
  },
  computed: {
    events() {
      if (!this.isBrideVariant) return this.baseEvents
      return this.baseEvents.map(e => ({
        ...e,
        name: e.name === 'LỄ THÀNH HÔN' ? 'LỄ VU QUY' : e.name,
        location: e.name === 'LỄ THÀNH HÔN' ? OTHER_ADDRESS : RECEPTION_ADDRESS
      }))
    }
  }
}
</script>

<style scoped>
.ceremony-root {
  position: relative;
}

.ceremony-section {
  background: var(--bg-color);
  padding: 72px 20px 56px;
}

.ceremony-inner {
  max-width: 640px;
  margin: 0 auto;
}

/* Tiêu đề */
.ceremony-main-title {
  margin: 0 0 12px;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
  letter-spacing: 0.02em;
}

/* Mô tả + kim cương */
.ceremony-subtitle-wrap {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  padding: 0 24px;
}

.ceremony-diamonds {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.ceremony-diamond {
  width: 12px;
  height: 12px;
  border: 2px solid var(--primary-color);
  transform: rotate(45deg);
}

.ceremony-subtitle {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-dark);
  text-align: center;
  max-width: 420px;
}

/* Thẻ sự kiện */
.ceremony-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ceremony-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  border: 2px solid var(--primary-color);
  box-shadow: inset 0 0 0 1px var(--primary-color), 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 100px;
}

.ceremony-card-photo-wrap {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  background: #f5f5f5;
}

.ceremony-card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 18%;
  display: block;
}

.ceremony-card-body {
  flex: 1;
  min-width: 0;
}

.ceremony-card-title {
  margin: 0 0 6px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.ceremony-card-time,
.ceremony-card-location {
  margin: 0 0 4px;
  font-size: 0.8rem;
  line-height: 1.4;
  color: #555;
  text-transform: uppercase;
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.ceremony-card-location {
  margin-bottom: 0;
}

.ceremony-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ceremony-icon svg {
  display: block;
}

@media (min-width: 768px) {
  .ceremony-section {
    padding: 90px 24px 72px;
  }

  .ceremony-main-title {
    font-size: 2.5rem;
    margin-bottom: 16px;
  }

  .ceremony-subtitle-wrap {
    margin-bottom: 40px;
  }

  .ceremony-subtitle {
    font-size: 1rem;
  }

  .ceremony-diamond {
    width: 14px;
    height: 14px;
  }

  .ceremony-card {
    padding: 20px 24px;
    gap: 20px;
  }

  .ceremony-card-photo-wrap {
    width: 88px;
    height: 88px;
  }

  .ceremony-card-title {
    font-size: 1.25rem;
  }

  .ceremony-card-time,
  .ceremony-card-location {
    font-size: 0.875rem;
  }
}
</style>
