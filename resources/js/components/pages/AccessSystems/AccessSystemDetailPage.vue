<template>
    <div class="main-block">
        <div class="camera-detail-page">
            <video id="videoElement" autoplay playsinline></video>
            <div v-if="isRecognizing">Идет распознавание...</div>
            <button @click="startRecognition">Начать сканирование</button>
        </div>
        <div>
            <div>

            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>
import * as faceapi from 'face-api.js';
import jsQR from 'jsqr';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isRecognizing: false,
      videoElement: null,
      qrCodeFound: false,
      labeledDescriptors: [], // Здесь будут загруженные данные с сервера
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  async mounted() {
    document.title = 'Вывод инофрмации - beStudy';
    this.videoElement = document.getElementById('videoElement');
    await this.loadModels(); // Загрузим модели для распознавания лиц
  },
  methods: {
    ...mapActions(['addNotification']),
    
    async loadModels() {
      // Загрузка моделей для face-api.js
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models'); // Более быстрая модель
      this.labeledDescriptors = await this.loadFaceDescriptors(); // Загрузим дескрипторы пользователей
    },
    
    async loadFaceDescriptors() {
      // Загрузка дескрипторов лиц с сервера (примерный метод)
      const response = await fetch('/api/faces');
      const faces = await response.json();
      
      return faces.map(face => {
        const descriptors = face.descriptors.map(d => new Float32Array(d));
        return new faceapi.LabeledFaceDescriptors(face.label, descriptors);
      });
    },

    async startRecognition() {
      this.isRecognizing = true;
      this.scanQRCode();

      setTimeout(async () => {
        if (!this.qrCodeFound) {
          await this.recognizeFace();
        }
        this.isRecognizing = false;
      }, 3000); // После 3 секунд переключаемся на распознавание лиц
    },

    scanQRCode() {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = this.videoElement.videoWidth;
      canvas.height = this.videoElement.videoHeight;

      context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, canvas.width, canvas.height);
      if (code) {
        this.qrCodeFound = true;
        this.sendToServer({ type: 'qr', data: code.data });
        this.addNotification({
          title: 'Успех',
          message: 'QR-код распознан!',
          icon: 'fas fa-check-circle',
          type: 'success'
        });
      }
    },

    async recognizeFace() {
      const fullFaceDescriptions = await faceapi.detectAllFaces(this.videoElement)
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (fullFaceDescriptions.length > 0) {
        const faceMatcher = new faceapi.FaceMatcher(this.labeledDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(fullFaceDescriptions[0].descriptor);

        if (bestMatch.label !== "unknown") {
          this.sendToServer({ type: 'face', data: bestMatch.label });
          this.addNotification({
            title: 'Успех',
            message: `Лицо распознано: ${bestMatch.label}`,
            icon: 'fas fa-check-circle',
            type: 'success'
          });
        } else {
          this.addNotification({
            title: 'Ошибка',
            message: 'Лицо не распознано!',
            icon: 'fas fa-exclamation-triangle',
            type: 'error'
          });
        }
      }
    },

    sendToServer(data) {
      fetch('/api/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => {
        if (response.ok) {
          console.log("Access granted");
          // Здесь можно отправить сигнал на турникет для пропуска
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main-block {
    /* margin: 20vh auto 0 auto; */
    padding: 0px 0 0 0;
    width: fit-content;
    display: grid;
    position: relative;

    .camera-detail-page {
        height: 500px;
        width: 300px;
        background-color: white;
    }
}

@media (max-width: 480px) {
    .main-block {
        padding: 0px !important;
    }
    .more-info {
        width: auto;
    }

    .home-block {
        height: 180px;

        h1 {
            font-size: 35px;
        }

        .home-block-background {
            p {
                font-size: 20px;               /* Размер текста */
                line-height: 0.85;
            }
            
        }
    }
}
</style>