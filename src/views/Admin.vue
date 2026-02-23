<template>
  <div class="admin-page">
    <div class="admin-card">
      <h1 class="admin-title">Tạo link thiệp mời</h1>
      <p class="admin-desc">Nhập tên khách mời, link tạo ra sẽ hiển thị "Thân Mời" và tên khách trên thiệp.</p>

      <form class="admin-form" @submit.prevent="editingId ? saveEditFromForm() : generateUrl()">
        <div class="form-row">
          <div class="form-group form-group-name">
            <label for="guest-name">Tên khách mời</label>
            <input
              id="guest-name"
              v-model="guestNameInput"
              type="text"
              class="form-input"
              placeholder="VD: Anh Nam, Bạn Nguyên, Chị Hương"
              autocomplete="off"
            />
          </div>
          <div class="form-group form-group-category">
            <label for="guest-category">Loại khách mời</label>
            <select id="guest-category" v-model="categoryInput" class="form-select">
              <option v-for="cat in guestCategories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button v-if="editingId" type="button" class="form-btn form-btn-secondary" @click="cancelEdit">Hủy</button>
          <button type="submit" class="form-btn">{{ editingId ? 'Cập nhật' : 'Tạo link' }}</button>
        </div>
      </form>

      <div v-if="generatedUrl || editingId" class="result-box">
        <p class="result-label">Link thiệp mời:</p>
        <div class="result-url-wrap">
          <input
            :value="currentDisplayUrl"
            type="text"
            readonly
            class="result-input"
            @focus="$event.target.select()"
          />
          <button type="button" class="copy-btn" @click="copyUrl">
            {{ copied ? 'Đã copy!' : 'Copy' }}
          </button>
        </div>
        <p class="result-preview">
          Khi khách mở link → thiệp hiển thị: <strong>Thân Mời</strong><br />
          <strong>{{ displayName }}</strong>
        </p>
      </div>

      <div v-if="savedList.length" class="table-section">
        <div class="table-header">
          <h2 class="table-title">Danh sách link đã tạo (lưu 30 ngày)</h2>
          <div class="filter-wrap">
            <label for="filter-category">Lọc theo loại:</label>
            <select id="filter-category" v-model="categoryFilter" class="form-select filter-select">
              <option value="">Tất cả</option>
              <option v-for="cat in guestCategories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>
        <div class="table-wrap">
          <table class="links-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên khách mời</th>
                <th>Loại khách</th>
                <th>Link</th>
                <th>Ngày tạo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredList" :key="item.createdAt + (item.guestName || '')" :class="{ 'row-editing': editingId === item.createdAt }">
                <td>{{ index + 1 }}</td>
                <td>{{ item.guestName }}</td>
                <td>{{ item.category || '—' }}</td>
                <td class="cell-url">
                  <a :href="item.url" target="_blank" rel="noopener noreferrer" class="link-preview">{{ item.url }}</a>
                </td>
                <td>{{ formatDate(item.createdAt) }}</td>
                <td class="cell-actions">
                  <button type="button" class="copy-cell-btn" @click="copyItemUrl(item.url)">Copy</button>
                  <button type="button" class="action-btn edit-btn" @click="loadToForm(item)">Sửa</button>
                  <button type="button" class="action-btn delete-btn" @click="deleteItem(item)">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const BASE_URL = 'https://wedding.huyyy.io.vn'
const STORAGE_KEY = 'wedding-invite-links'
const KEEP_DAYS = 30
const GUEST_CATEGORIES = ['bạn làng', 'Cấp 2', 'Cấp 3', 'Đại học', 'Quen biết', 'Cty']

export default {
  name: 'Admin',
  data() {
    return {
      guestNameInput: '',
      categoryInput: GUEST_CATEGORIES[0],
      generatedUrl: '',
      copied: false,
      savedList: [],
      categoryFilter: '',
      editingId: null
    }
  },
  computed: {
    currentDisplayUrl() {
      if (this.editingId && this.guestNameInput.trim()) {
        return `${BASE_URL}/?name=${encodeURIComponent(this.guestNameInput.trim())}`
      }
      return this.generatedUrl
    },
    guestCategories: () => GUEST_CATEGORIES,
    displayName() {
      if (!this.guestNameInput.trim()) return '—'
      return this.formatName(this.guestNameInput.trim())
    },
    filteredList() {
      if (!this.categoryFilter) return this.savedList
      return this.savedList.filter(item => (item.category || '') === this.categoryFilter)
    }
  },
  mounted() {
    this.loadSavedList()
  },
  methods: {
    loadSavedList() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const list = raw ? JSON.parse(raw) : []
        const cutoff = Date.now() - KEEP_DAYS * 24 * 60 * 60 * 1000
        this.savedList = list.filter(item => (item.createdAt || 0) >= cutoff)
        this.persistList(this.savedList)
      } catch (e) {
        this.savedList = []
      }
    },
    persistList(list) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
      } catch (e) {}
    },
    formatDate(ts) {
      if (!ts) return '—'
      const d = new Date(ts)
      return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    },
    /** Giống App.vue: chèn khoảng trước chữ in hoa, viết hoa đầu từ */
    formatName(str) {
      if (!str || typeof str !== 'string') return ''
      const s = decodeURIComponent(str.trim())
      if (!s) return ''
      if (s.includes(' ')) {
        return s
          .split(/\s+/)
          .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
          .join(' ')
      }
      const withSpaces = s.replace(/(\p{Ll})(\p{Lu})/gu, '$1 $2')
      return withSpaces
        .split(/\s+/)
        .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : ''))
        .join(' ')
    },
    generateUrl() {
      const name = this.guestNameInput.trim()
      if (!name) {
        this.generatedUrl = ''
        return
      }
      const encoded = encodeURIComponent(name)
      this.generatedUrl = `${BASE_URL}/?name=${encoded}`
      this.copied = false

      const guestName = this.formatName(name)
      const item = { guestName, url: this.generatedUrl, createdAt: Date.now(), category: this.categoryInput }
      const cutoff = Date.now() - KEEP_DAYS * 24 * 60 * 60 * 1000
      const list = [...this.savedList.filter(i => (i.createdAt || 0) >= cutoff), item]
      this.savedList = list
      this.persistList(list)
    },
    copyUrl() {
      const url = this.currentDisplayUrl
      if (!url) return
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          this.copied = true
          setTimeout(() => { this.copied = false }, 2000)
        }).catch(() => this.fallbackCopy(url))
      } else {
        this.fallbackCopy(url)
      }
    },
    fallbackCopy(url) {
      const el = document.createElement('input')
      el.value = url || this.generatedUrl
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      try {
        document.execCommand('copy')
        this.copied = true
        setTimeout(() => { this.copied = false }, 2000)
      } catch (e) {}
      document.body.removeChild(el)
    },
    copyItemUrl(url) {
      if (!url) return
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => this.fallbackCopyUrl(url))
      } else {
        this.fallbackCopyUrl(url)
      }
    },
    loadToForm(item) {
      this.editingId = item.createdAt
      this.guestNameInput = item.guestName || ''
      this.categoryInput = item.category || GUEST_CATEGORIES[0]
      this.generatedUrl = item.url || ''
    },
    cancelEdit() {
      this.editingId = null
      this.guestNameInput = ''
      this.generatedUrl = ''
    },
    saveEditFromForm() {
      const name = this.guestNameInput.trim()
      if (!name) return
      const guestName = this.formatName(name)
      const url = `${BASE_URL}/?name=${encodeURIComponent(name)}`
      const idx = this.savedList.findIndex(i => i.createdAt === this.editingId)
      if (idx !== -1) {
        this.savedList[idx] = { ...this.savedList[idx], guestName, url, category: this.categoryInput }
        this.persistList(this.savedList)
      }
      this.editingId = null
      this.guestNameInput = ''
      this.generatedUrl = ''
    },
    deleteItem(item) {
      if (typeof window !== 'undefined' && !window.confirm('Xóa link mời của "' + (item.guestName || '') + '"?')) return
      this.savedList = this.savedList.filter(i => i.createdAt !== item.createdAt)
      this.persistList(this.savedList)
    },
    fallbackCopyUrl(url) {
      const el = document.createElement('input')
      el.value = url
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      try {
        document.execCommand('copy')
      } catch (e) {}
      document.body.removeChild(el)
    }
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: var(--bg-color, #faf9f6);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-card {
  max-width: 960px;
  width: 100%;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.admin-title {
  font-family: 'Prata', serif;
  font-size: 1.5rem;
  color: var(--primary-color, #9B2D30);
  margin-bottom: 0.5rem;
}

.admin-desc {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.admin-form {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row .form-group {
  margin-bottom: 0;
}

.form-group-name {
  flex: 1;
  min-width: 0;
}

.form-group-category {
  flex: 0 0 160px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-select:focus {
  outline: none;
  border-color: var(--primary-color, #9B2D30);
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.35rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color, #9B2D30);
}

.form-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background: var(--primary-color, #9B2D30);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}

.form-btn:hover {
  background: var(--primary-dark, #c45c5c);
}

.form-btn:active {
  opacity: 0.9;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.form-btn-secondary {
  background: #fff;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.form-btn-secondary:hover {
  background: #f3f4f6;
  color: #374151;
}

.result-box {
  padding-top: 1.25rem;
  border-top: 1px solid #e5e7eb;
}

.result-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.result-url-wrap {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.result-input {
  flex: 1;
  padding: 0.6rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.copy-btn {
  padding: 0.6rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-color, #9B2D30);
  background: #fff;
  border: 1px solid var(--primary-color, #9B2D30);
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}

.copy-btn:hover {
  background: var(--primary-color, #9B2D30);
  color: #fff;
}

.copy-btn:active {
  opacity: 0.9;
}

.result-preview {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.6;
}

.result-preview strong {
  color: #374151;
}

.table-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.table-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}

.table-title {
  font-family: 'Prata', serif;
  font-size: 1.125rem;
  color: var(--primary-color, #9B2D30);
  margin: 0;
}

.filter-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-wrap label {
  font-size: 0.875rem;
  color: #6b7280;
  white-space: nowrap;
}

.filter-select {
  width: auto;
  min-width: 140px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.table-wrap {
  overflow-x: auto;
}

.links-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

.links-table th,
.links-table td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.links-table th {
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
}

.links-table tbody tr:hover {
  background: #fafafa;
}

.links-table tbody tr.row-editing {
  background: rgba(155, 45, 48, 0.06);
  outline: 1px solid rgba(155, 45, 48, 0.2);
  outline-offset: -1px;
}

.cell-url {
  max-width: 320px;
  min-width: 200px;
}

.link-preview {
  color: var(--primary-color, #9B2D30);
  text-decoration: none;
  word-break: break-all;
}

.link-preview:hover {
  text-decoration: underline;
}

.cell-actions {
  white-space: nowrap;
}

.cell-actions .copy-cell-btn,
.cell-actions .action-btn {
  margin-right: 0.35rem;
  margin-bottom: 0.2rem;
}

.copy-cell-btn {
  padding: 0.5rem 0.85rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--primary-color, #9B2D30);
  background: #fff;
  border: 1px solid var(--primary-color, #9B2D30);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.copy-cell-btn:hover {
  background: var(--primary-color, #9B2D30);
  color: #fff;
}

.action-btn {
  padding: 0.4rem 0.65rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.edit-btn {
  color: #0d9488;
  background: #fff;
  border-color: #0d9488;
}

.edit-btn:hover {
  background: #0d9488;
  color: #fff;
}

.delete-btn {
  color: #dc2626;
  background: #fff;
  border-color: #dc2626;
}

.delete-btn:hover {
  background: #dc2626;
  color: #fff;
}

.save-btn {
  color: #fff;
  background: var(--primary-color, #9B2D30);
  border-color: var(--primary-color, #9B2D30);
}

.save-btn:hover {
  background: var(--primary-dark, #c45c5c);
  border-color: var(--primary-dark, #c45c5c);
}

.cancel-btn {
  color: #6b7280;
  background: #fff;
  border-color: #d1d5db;
}

.cancel-btn:hover {
  background: #f3f4f6;
}

.table-edit-input,
.table-edit-select {
  width: 100%;
  max-width: 200px;
  padding: 0.4rem 0.6rem;
  font-size: 0.9375rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-sizing: border-box;
}

.table-edit-input:focus,
.table-edit-select:focus {
  outline: none;
  border-color: var(--primary-color, #9B2D30);
}

.edit-url-preview {
  font-size: 0.875rem;
  color: #6b7280;
  word-break: break-all;
}
</style>
