<template>
    <div class="main-block">
        <div class="camera-detail-page">
            <div class="video-text-block">
              <p>Сканирование...</p>
            </div>
            <video id="videoElement" autoplay playsinline></video>
            <div class="video-inner-block">
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 64 64"><path d="M32,31.17969a7.30576,7.30576,0,1,0-7.05664-7.30176A7.19033,7.19033,0,0,0,32,31.17969Zm0-11.603a4.30891,4.30891,0,1,1-4.05664,4.30127A4.18918,4.18918,0,0,1,32,19.57666Z"></path><path d="M23.45264,30.21582A17.81727,17.81727,0,0,0,14.55127,42.959a3.86159,3.86159,0,0,0,.86621,3.1294,3.76816,3.76816,0,0,0,2.874,1.335h27.417a3.76816,3.76816,0,0,0,2.874-1.335,3.86159,3.86159,0,0,0,.86621-3.1294,17.81727,17.81727,0,0,0-8.90137-12.74316,1.50109,1.50109,0,0,0-1.82226.27783,9.232,9.232,0,0,1-13.4502,0A1.50057,1.50057,0,0,0,23.45264,30.21582ZM32,36.40088a12.3095,12.3095,0,0,0,8.01709-2.998,14.83779,14.83779,0,0,1,6.4707,10.04151.86436.86436,0,0,1-.1914.70166.76692.76692,0,0,1-.58789.27734H18.2915a.76692.76692,0,0,1-.58789-.27734.86436.86436,0,0,1-.1914-.70166,14.83779,14.83779,0,0,1,6.4707-10.04151A12.3095,12.3095,0,0,0,32,36.40088Z"></path><path d="M7,15.75293a8.3602,8.3602,0,0,1,8.355-8.34668h6.29736v-3H15.355A11.36379,11.36379,0,0,0,4,15.75293v5.9082H7Z"></path><path d="M57,48.24707a8.3602,8.3602,0,0,1-8.355,8.34668H42.34766v3H48.645A11.36379,11.36379,0,0,0,60,48.24707v-5.9082H57Z"></path><path d="M15.355,59.59375h6.29736v-3H15.355A8.3602,8.3602,0,0,1,7,48.24707v-5.9082H4v5.9082A11.36379,11.36379,0,0,0,15.355,59.59375Z"></path><path d="M48.645,4.40625H42.34766v3H48.645A8.3602,8.3602,0,0,1,57,15.75293v5.9082h3v-5.9082A11.36379,11.36379,0,0,0,48.645,4.40625Z"></path></svg>
              <h3>Устройство сканирования</h3>
            </div>  
            <div v-if="isRecognizing">Идет распознавание...</div>
            <!-- <button @click="startRecognition">Начать сканирование</button> -->
        </div>

        <div class="grid-container">
            <div class="name-college">
              <h3>Учреждение образования</h3>
              <p>Новопольский государственный аграрно-экономический колледж</p>
            </div>
            <div class="some-btns">
                <big-block-button-2 :options="valueButtons" :columns="1" :maxWidth="maxWidthValue" :maxWidthText="'320px'"/>
            </div>
            <div class="second-row">
              <div class="left-menu">
                <small-block-button :options="valueButtonsSmall" :columns="1" :maxWidth="maxWidthValue" style="padding: 20px"/>
              </div>
              <input class="btn-toggle" type="button" value="Отключить систему">
              <div class="curent-date">
                <div>
                  <h3>{{ formattedDate }}</h3>
                  <p>{{ formattedTime }}</p>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as faceapi from 'face-api.js';
import jsQR from 'jsqr';
import BigBlockButton2 from "@/components/ui/BigBlockButton2.vue";
import { mapGetters, mapActions } from 'vuex';
import SmallBlockButton from '../../UI/SmallBlockButton.vue';

export default {
    components: {
        BigBlockButton2,
        SmallBlockButton
    },
    data() {
        return {
            isRecognizing: false,
            videoElement: null,
            qrCodeFound: false,
            maxWidthValue: 'auto',
            currentDate: new Date(),
            labeledDescriptors: [], // Здесь будут загруженные данные с сервера

            valueButtons: [
              { 
                  header: 'Вход 1',
                  description: 'Устройство работает нормально',
                  path: '/login',
                  icon: '<svg viewBox="0 0 97 85" xmlns="http://www.w3.org/2000/svg"><path d="M0.382812 39.993C0.382812 42.0343 1.95348 43.8009 4.46654 43.8009C5.68381 43.8009 6.78327 43.1336 7.76494 42.3484L46.7174 9.64694C47.8169 8.70476 49.0734 8.70476 50.1729 9.64694L89.0861 42.3484C90.0285 43.1336 91.128 43.8009 92.3453 43.8009C94.662 43.8009 96.429 42.3484 96.429 40.0715C96.429 38.7367 95.9185 37.6768 94.8976 36.8131L83.8637 27.5483V11.2172C83.8637 9.45065 82.7249 8.35144 80.9579 8.35144H75.5391C73.8114 8.35144 72.6334 9.45065 72.6334 11.2172V18.0873L54.021 2.46282C50.6048 -0.402972 46.2855 -0.402972 42.8693 2.46282L1.95348 36.8131C0.893279 37.6768 0.382812 38.8545 0.382812 39.993ZM13.1445 75.2854C13.1445 80.9385 16.6785 84.3539 22.5292 84.3539H74.3219C80.1333 84.3539 83.7066 80.9385 83.7066 75.2854V45.4497L50.8404 17.9303C49.309 16.5955 47.4635 16.6348 45.9714 17.9303L13.1445 45.4497V75.2854ZM58.733 76.9735H38.118V51.8487C38.118 50.0036 39.3353 48.8259 41.1808 48.8259H55.7095C57.555 48.8259 58.733 50.0036 58.733 51.8487V76.9735Z"/></svg>',
                  spanButton: '1'
              },
              { 
                  header: 'Разблокировать',
                  description: 'Раблокировать турникет для разового прохода в любую сторону',
                  path: '/institutions',
                  icon: '<svg viewBox="0 0 84 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 22.0168C0 9.7479 9.80395 0 22.0336 0C31.0964 0 39.1147 5.31092 42.4838 13.7143L75.13 13.7143C76.107 13.7143 76.9829 14.0168 77.7241 14.7563L83.3841 20.605C84.1253 21.3445 84.2938 22.7563 83.3504 23.6975L72.7379 34.2857C71.7609 35.2605 70.3459 35.2269 69.4026 34.2857L63.3719 28.2017L54.8145 36.7395C53.9049 37.6134 52.4899 37.6471 51.5129 36.6723L43.1576 28.3697C38.8789 38.4202 31.1638 44 22.0336 44C9.83764 44 0 34.2185 0 22.0168ZM20.4839 22.0168C20.4839 18.7563 17.8223 16.1008 14.5543 16.1008C11.2526 16.1008 8.62478 18.7227 8.62478 22.0168C8.62478 25.2773 11.2863 27.9328 14.5543 27.9328C17.8223 27.9328 20.4839 25.2773 20.4839 22.0168Z"/></svg>'
              },
              { 
                  header: 'История',
                  description: 'Просмотр зафиксированных выходов и входов',
                  path: '/access-systems',
                  icon: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M31.9845 64C49.5234 64 64 49.5164 64 32C64 14.4836 49.4925 0 31.9536 0C14.4456 0 0 14.4836 0 32C0 49.5164 14.4766 64 31.9845 64ZM16.3944 35.8994C15.0024 35.8994 13.9198 34.8162 13.9198 33.4236C13.9198 32.0309 15.0024 30.9478 16.3944 30.9478H29.5099V13.1838C29.5099 11.7911 30.5926 10.7079 31.9536 10.7079C33.3765 10.7079 34.4592 11.7911 34.4592 13.1838V33.4236C34.4592 34.8162 33.3765 35.8994 31.9536 35.8994H16.3944Z"/></svg>',            
              },
            ],

            valueButtonsSmall: [
              {
                  header: 'Вывод дисплея',
                  // description: 'Узнать подробнее об системе',
                  path: '/access-systems/:id/display',
                  image: new URL('/resources/assets/images/qr_kode_scan.jpg', import.meta.url).href,
              },
              {
                  header: 'Камера 2',
                  // description: 'Прочитать подробнее',
                  path: '/institutions',
                  image: new URL('/resources/assets/images/face_system.jpg', import.meta.url).href
              }
            ],
        };
    },
  computed: {
    ...mapGetters(['isAuthenticated']),

    formattedDate() {
      const options = {day:'numeric', month: 'long', year: 'numeric'};
      return this.currentDate.toLocaleDateString('ru-Ru', options);
    },
    formattedTime() {
      return this.currentDate.toLocaleTimeString('ru-Ru', {hour12: false});
    },
  },
  async mounted() {
    document.title = 'Устройство входа/выхода - beStudy';
    this.videoElement = document.getElementById('videoElement');
    // await this.loadModels(); // Загрузим модели для распознавания лиц

    try {
    // Запрос доступа к камере и передача видеопотока элементу video
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.videoElement.srcObject = stream;
  } catch (error) {
    console.error("Ошибка доступа к камере: ", error);
    this.addNotification({
      title: 'Ошибка',
      message: 'Не удалось получить доступ к камере.',
      icon: 'fas fa-exclamation-triangle',
      type: 'error'
    });
  }

    this.updateTime();
  },
  methods: {
    ...mapActions(['addNotification']),

    updateTime() {
      this.currentDate = new Date();
      requestAnimationFrame(this.updateTime);
    },
    
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
    display: flex;
    position: relative;
    margin: 0;

    h3 {
        font-family: "rubick-light", Georgia, serif;
        font-weight: bolder;
        font-size: 16px;

    }
    p {
      font-size: 16px;
      margin: 0;
      color: #4f6384;
      font-family: 'rubick-light', Georgia, serif;
    }

    .grid-container {
      display: grid;
      // grid-template-columns: 1fr 1fr; /* Две колонки одинаковой ширины */
      grid-template-rows: auto auto; /* Две строки: одна для заголовка, другая для контента */
      gap: 20px;
      padding: 20px;
    }

    .name-college {
      grid-column: span 2; /* Растягиваем на два столбца */
      text-align: center;  /* Можно добавить для центрирования текста */
      background-color: #E8EFF9;
      border-radius: 40px;
      padding: 16px 0;
    }

    .camera-detail-page {
        position: relative;
        min-height: 300px;
        max-height: 599px;
        height: auto;
        width: 350px;
        background-color: #E8EFF9;
        border-radius: 40px;
        margin: 20px 0px 20px 20px;
        overflow: hidden;

        ::before {
          content: "";
          position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
          height: 20%; 
          backdrop-filter: blur(15px);
          pointer-events: none;
          mask-image: linear-gradient(to bottom, transparent, black);
        }

        .video-inner-block {
          z-index: -1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100%; /* Минимальная высота экрана */
          // background: url('../../../../assets/images/qr_kode_scan.jpg') no-repeat center center / cover;

          svg {
            fill: #4f6384;
            width: 150px;
            margin-bottom: 30px;
          }
        }

        .video-text-block {
          bottom: 0px;
          position: absolute;
          height: 70px;
          width: 100%;
          z-index: 1; 

          h3,p {
            font-family: "rubick-regular", Georgia, serif;
            color: white;
            position: absolute;
            z-index: 1;
            width: 100%;
            text-align: center;
            bottom: 15px;
            // font-weight: bold;
          }
        }

        #videoElement {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
    }

    .second-row {
      grid-column: 2;
      width: 270px;
    }

    .left-menu {
      background-color: #E8EFF9;
      border-radius: 40px;
      // width: 300px;
      height: 340px;
      // margin: 20px 20px 0 0;
    }

    .curent-date {
      background-color: #E8EFF9;
      border-radius: 40px;
      margin-top: 20px;
      text-align: center;
      height: 55px;
      display: flex; /* Включаем Flexbox */
      align-items: center; /* Вертикальное центрирование */
      justify-content: center; /* Горизонтальное центрирование */

      p,h3 {
        font-size: 15px;
      }
    }

    .btn-toggle {
      background-color: #4f6384;
      border: none;
      border-radius: 40px;
      height: 55px;
      width: 100%;
      font-family: "rubick-regular", Georgia, serif;
      margin-top: 20px;
      font-size: 15px;
      color: white;
      outline: none;
      cursor: pointer;
      -webkit-transition-duration: 0.5s; /* Safari */
      transition-duration: 0.5s;

      &:hover {
        transform: scale(1.05);
      }

    }

    .some-btns {
      grid-column: 1; /* Кнопки во втором столбце */
    }
}

@media (max-width: 900px) {
    .main-block {
      padding: 0px !important;

      .grid-container {
          display: grid;
          grid-template-columns: 1fr; /* Одна колонка */
          grid-template-rows: auto; /* Строки будут автоматически подстраиваться под содержимое */
          gap: 20px; /* Промежуток между элементами */
          padding: 20px; /* Внутренний отступ контейнера */
      }

      .name-college {
        grid-column: span 1;
      }
      .second-row {
        grid-column: 1;
        width: auto;
      }
    }
    .more-info {
        width: auto;
    }

    .home-block {
        height: 180px;

        // h1 {
        //     font-size: 35px;
        // }

        .home-block-background {
            p {
                font-size: 20px;               /* Размер текста */
                line-height: 0.85;
            }
            
        }
    }
}

@media (max-width: 480px) {
  .main-block {
    flex-direction: column;

    .camera-detail-page {
      position: relative;
      min-height: 400px;
      max-height: 599px;
      height: auto;
      width: auto;
      margin: 20px;
    }

    .left-menu {
      height: auto;
    }
  }

    .more-info {
        width: auto;
    }

    .home-block {
        height: 180px;

        // h1 {
        //     font-size: 35px;
        // }

        .home-block-background {
            p {
                font-size: 20px;               /* Размер текста */
                line-height: 0.85;
            }
            
        }
    }
}
</style>