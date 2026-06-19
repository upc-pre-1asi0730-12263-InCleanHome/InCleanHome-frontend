<template>
  <div class="auth-wrapper auth-bg-upload">
    <div class="auth-container">
      <div class="auth-header">
        <div class="header-emoji">📋</div>
        <h1 class="header-title">{{ t('auth.uploadDocuments') }}</h1>
        <p class="header-subtitle">{{ t('auth.documentsInfo') }}</p>
      </div>

      <div class="card card-elevated">
        <div class="doc-section mb-6">
          <div class="doc-header">
            <div :class="['doc-icon', docs.backgroundCheck ? 'doc-done' : 'doc-pending']">
              <span>{{ docs.backgroundCheck ? '✓' : '1' }}</span>
            </div>
            <div>
              <div class="doc-title">{{ t('auth.backgroundCheck') }}</div>
              <div class="doc-hint">{{ t('auth.uploadPdf') }}</div>
            </div>
          </div>
          <div v-if="!docs.backgroundCheck" class="upload-area" @click="triggerUpload('background_check')" @dragover.prevent @drop.prevent="handleDrop($event, 'background_check')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A8FA6" stroke-width="2" class="upload-icon"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span class="upload-text">Haz clic o arrastra tu PDF aquí</span>
            <input ref="bgInput" type="file" accept=".pdf" class="hidden-input" @change="handleFileSelect($event, 'background_check')" />
          </div>
          <div v-else class="success-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009960" stroke-width="2.5"><path d="M9 11l3 3L22 4"/></svg>
            <span class="success-text">{{ t('auth.uploadSuccess') }}</span>
          </div>
        </div>

        <div class="doc-section mt-6">
          <div class="doc-header">
            <div :class="['doc-icon', docs.experience ? 'doc-done' : 'doc-pending']">
              <span>{{ docs.experience ? '✓' : '2' }}</span>
            </div>
            <div>
              <div class="doc-title">{{ t('auth.experienceDoc') }}</div>
              <div class="doc-hint">{{ t('auth.uploadPdf') }}</div>
            </div>
          </div>
          <div v-if="!docs.experience" class="upload-area" @click="triggerUpload('experience')" @dragover.prevent @drop.prevent="handleDrop($event, 'experience')">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A8FA6" stroke-width="2" class="upload-icon"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span class="upload-text">Haz clic o arrastra tu PDF aquí</span>
            <input ref="expInput" type="file" accept=".pdf" class="hidden-input" @change="handleFileSelect($event, 'experience')" />
          </div>
          <div v-else class="success-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#009960" stroke-width="2.5"><path d="M9 11l3 3L22 4"/></svg>
            <span class="success-text">{{ t('auth.uploadSuccess') }}</span>
          </div>
        </div>

        <div v-if="error" class="error-box">{{ error }}</div>

        <div v-if="docs.backgroundCheck && docs.experience" class="success-section mt-4">
          <div class="info-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A2E4A" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="info-text">{{ t('auth.verificationPending') }}</span>
          </div>
          <button @click="goToLogin" class="btn btn-primary btn-full btn-lg">{{ t('auth.login') }} →</button>
        </div>

        <div v-if="uploading" class="uploading-msg">
          <div class="spinner spinner-xs"></div>
          Subiendo...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "../../application/auth.store.js";
import { DocumentUploadService } from "../../application/document-upload.service.js";

const { t } = useI18n();
const router = useRouter();
const auth = useAuthStore();

const bgInput = ref(null);
const expInput = ref(null);
const uploading = ref(false);
const error = ref("");
const docs = ref({ backgroundCheck: false, experience: false });

function triggerUpload(type) {
  if (type === "background_check") bgInput.value?.click();
  else expInput.value?.click();
}

async function handleDrop(e, type) {
  const file = e.dataTransfer.files[0];
  if (file) await uploadFile(file, type);
}

async function handleFileSelect(e, type) {
  const file = e.target.files[0];
  if (file) await uploadFile(file, type);
}

async function uploadFile(file, type) {
  uploading.value = true;
  error.value = "";
  try {
    await DocumentUploadService.uploadDocument(file, type);
    if (type === "background_check") docs.value.backgroundCheck = true;
    else docs.value.experience = true;
  } catch (err) {
    error.value = err.response?.data?.error || err.message || t("common.error");
  } finally {
    uploading.value = false;
  }
}

function goToLogin() {
  auth.clearAuth();
  router.push("/login");
}
</script>

<style scoped>
.auth-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
.auth-bg-upload { background: linear-gradient(135deg,#E6F9F2 0%,#E6F9F2 100%); }
.auth-container { width: 100%; max-width: 512px; }
.auth-header { text-align: center; margin-bottom: 1.5rem; }
.header-emoji { font-size:3rem; margin-bottom:0.5rem; }
.header-title { font-size:1.5rem; font-weight:800; color:#1A2E4A; margin: 0; }
.header-subtitle { color:#3A4A5C; margin-top:0.5rem; font-size:0.9375rem; margin-bottom: 0; }
.card-elevated { box-shadow:0 20px 40px rgba(0,0,0,0.08); padding: 2rem; }
.mb-6 { margin-bottom:1.5rem; }
.mt-6 { margin-top:1.5rem; }
.mt-4 { margin-top:1rem; }
.doc-section { border-radius:0.75rem; padding:1.5rem; background:#E6F9F2; }
.doc-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
.doc-title { font-weight:600; color:#1A2E4A; }
.doc-hint { font-size:0.8125rem; color:#3A4A5C; }
.doc-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.875rem; flex-shrink: 0; }
.doc-pending { background: #c5e8d8; color: #3A4A5C; }
.doc-done { background: #00B272; color: white; }
.upload-area { border: 2px dashed #7A8FA6; border-radius: 0.75rem; padding: 1.5rem; text-align: center; cursor: pointer; transition: border-color 0.15s, background 0.15s; }
.upload-area:hover { border-color: #1A2E4A; background: #E6F9F2; }
.upload-icon { margin:0 auto 0.5rem; display:block; }
.upload-text { font-size:0.875rem; color:#3A4A5C; }
.hidden-input { display:none; }
.success-box { background:#E6F9F2; display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border-radius: 0.5rem; }
.success-text { font-size:0.875rem; color:#009960; font-weight:500; }
.error-box { background:#fee2e2; color:#991b1b; padding:0.75rem; border-radius:0.5rem; font-size:0.875rem; margin-top:1rem; }
.success-section { display: flex; flex-direction: column; gap: 0.75rem; }
.info-box { background:#E6F9F2; display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border-radius: 0.5rem; }
.info-text { font-size:0.875rem; color:#1A2E4A; font-weight: 500; }
.uploading-msg { text-align:center; margin-top:1rem; color:#3A4A5C; font-size:0.875rem; display:flex; align-items:center; justify-content:center; gap:0.5rem; }
.spinner { border: 3px solid rgba(0,0,0,0.08); border-top-color: #009960; border-radius:50%; width:28px; height:28px; animation: spin 1s linear infinite; }
.spinner-xs { width:16px; height:16px; border-width: 2px; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
