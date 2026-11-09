<template>
  <div class="mx-auto d-flex justify-center align-center" style="height: 90vh;" background: color="primary">
    <v-card>
      <v-card-text>
        <!-- Show QR Scanner -->
        <video ref="videoRef" class="qr-video"></video>

        <!-- Start Scanner -->
        <v-btn class="primary" @click="startScanner" block>Start Scanner</v-btn>
        <v-divider>or</v-divider>
        <!-- Stop Scanner -->
        <v-btn color="blue" class="mt" block>Stop Scanner</v-btn>
      </v-card-text>
    </v-card>

  </div>
</template>

<script lang="ts" setup>
//@ts-nocheck
import QrScanner from 'qr-scanner';

const videoRef = ref<HTMLVideoElement | null>(null)
let scanner: QrScanner | null = null

const startScanner = async () => {
  if (!videoRef.value) return

  scanner = new QrScanner(
    videoRef.value,
    (scanResult) => {
      //result.value = scanResult.data 
      //defineEmits('scanned', scanResult.data)

      //optional: stop after successful scan
      scanner?.stop()

    },
    {
      preferredcamer: 'environment',
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  )
  await scanner.start()
}
</script>

<style scoped>
.qr-video {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background: #000
}
</style>