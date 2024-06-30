#include "Robopup_Movement.h"
#include "esp_camera.h"
#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include <Wire.h>

#define CAMERA_MODEL_XIAO_ESP32S3

#include "camera_pins.h"
#include "camera_index.h"

#define D7 7   // D8 OE
#define D9 8   // D9 SCL
#define D10 9  // D10 SDA

const char* ssid = "ISD Surveillance Van";
const char* password = "I love Shanmugam";

const char* websocket_server_host = "192.168.185.77";
const uint16_t websocket_server_port1 = 8888;
using namespace websockets;
WebsocketsClient client;

TaskHandle_t Task1;
TaskHandle_t Task2;

unsigned long Image_Interval = 1000;

int movement_state = 0;

void onEventsCallback(WebsocketsEvent event, String data) {
  if (event == WebsocketsEvent::ConnectionOpened) {
    Serial.println("Connection Opened");
  } else if (event == WebsocketsEvent::ConnectionClosed) {
    Serial.println("Connection Closed");
    ESP.restart();
  } else if (event == WebsocketsEvent::GotPing) {
    Serial.println("Got a Ping!");
  } else if (event == WebsocketsEvent::GotPong) {
    Serial.println("Got a Pong!");
  }
}

void onMessageCallback(WebsocketsMessage message) {
  String data = message.data();
  int index = data.indexOf("=");
  if (index != -1) {
    String key = data.substring(0, index);
    String value = data.substring(index + 1);

    Serial.print("Key: ");
    Serial.println(key);
    Serial.print("Value: ");
    Serial.println(value);
  }
}

void setupLedFlash(int pin);

void setup() {

  // Setup Motors I2C and PWM
  Wire.setPins(D10, D9);
  Serial.begin(115200);
  Wire.begin();
  pwm.begin();
  pwm.setPWMFreq(60);
  delay(500);

  // Setup Camera
  Serial.setDebugOutput(true);
  Serial.println();

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;

  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;  // for streaming
  //config.pixel_format = PIXFORMAT_RGB565; // for face detection/recognition
  config.frame_size = FRAMESIZE_UXGA;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;

  // if PSRAM IC present, init with UXGA resolution and higher JPEG quality
  //                      for larger pre-allocated frame buffer.
  if (config.pixel_format == PIXFORMAT_JPEG) {
    if (psramFound()) {
      config.jpeg_quality = 10;
      config.fb_count = 2;
      config.grab_mode = CAMERA_GRAB_LATEST;
    } else {
      // Limit the frame size when PSRAM is not available
      config.frame_size = FRAMESIZE_SVGA;
      config.fb_location = CAMERA_FB_IN_DRAM;
    }
  } else {
    // Best option for face detection/recognition
    config.frame_size = FRAMESIZE_240X240;
#if CONFIG_IDF_TARGET_ESP32S3
    config.fb_count = 2;
#endif
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) { return; }

  sensor_t* s = esp_camera_sensor_get();

  s->set_contrast(s, 0);
  s->set_raw_gma(s, 1);

  Serial.println("Beginning WiFi");

  WiFi.begin(ssid, password);
  WiFi.setSleep(false);
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    Serial.println("Attempting WiFi Connection");
    delay(500);
  }
  Serial.println("WiFi Connected");

  client.onMessage(onMessageCallback);
  client.onEvent(onEventsCallback);

  Serial.begin(115200);
  while (!client.connect(websocket_server_host, websocket_server_port1, "/")) {
    Serial.println("Attempting Client Connection");
    delay(500);
  }
  Serial.println("Client Connected");

  //create a task that will be executed in the Task1code() function, with priority 1 and executed on core 0
  xTaskCreatePinnedToCore(
    Task1code, /* Task function. */
    "Task1",   /* name of task. */
    20480,     // 10000,     /* Stack size of task */
    NULL,      /* parameter of the task */
    1,         /* priority of the task */
    &Task1,    /* Task handle to keep track of created task */
    0);        /* pin task to core 0 */
  delay(500);

  //create a task that will be executed in the Task2code() function, with priority 1 and executed on core 1
  xTaskCreatePinnedToCore(
    Task2code, /* Task function. */
    "Task2",   /* name of task. */
    20480,     // 10000,     /* Stack size of task */
    NULL,      /* parameter of the task */
    1,         /* priority of the task */
    &Task2,    /* Task handle to keep track of created task */
    1);        /* pin task to core 1 */
  delay(500);
}

//Task1code: Client Polling and Movement Controls
void Task1code(void* pvParameters) {
  Serial.print("Task1 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {
    Serial.println("Polling Client");
    client.poll();
    client.onMessage([](WebsocketsMessage msg) {
      Serial.println("Received: " + msg.data());

      if (msg.data() == "Stop") {
      } else if (msg.data() == "Forward") {
        forward_march_1();
        forward_march_2();
      } else if (msg.data() == "Backward") {
        backward_march_1();
        backward_march_2();
      } else if (msg.data() == "Left") {
        left_march();
      } else if (msg.data() == "Right") {
        right_march();
      }
    });
  }
}

//Task2code: Image Streaming
void Task2code(void* pvParameters) {
  Serial.print("Task2 running on core ");
  Serial.println(xPortGetCoreID());

  for (;;) {
    // Streams images every 1s
    if (millis() > Image_Interval) {
      Image_Interval = millis() + 1000;
      Serial.print("Capturing Image... ");
      camera_fb_t* fb = esp_camera_fb_get();
      if (!fb) {
        esp_camera_fb_return(fb);
        return;
      }

      if (fb->format != PIXFORMAT_JPEG) {
        Serial.println();
        Serial.println();
        Serial.println("Error: Corrupted JPEG");
        Serial.println();
        return;
      }

      Serial.print("Sending Image... ");
      client.sendBinary((const char*)fb->buf, fb->len);
      esp_camera_fb_return(fb);
      Serial.println("Image Sent");
    }
  }
}

void loop() {
}