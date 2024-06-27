#include "esp_camera.h"
#include <WiFi.h>
#include <ArduinoWebsockets.h>

#define CAMERA_MODEL_XIAO_ESP32S3

#include "camera_pins.h"

<<<<<<< HEAD
const char* ssid = "ISD Surveillance Van";        // "";
const char* password = "I love Shanmugam";  // "";

=======
#define CommsPin1 4
#define CommsPin2 5
#define CommsPin3 6

const char* ssid = "ISD Surveillance Van";  // "Galaxy";        // "";
const char* password = "I love Shanmugam";  // "wumx7371";  // "";

>>>>>>> 348cb9984546028bb2bb4f0ae9b1f459d63e7f8f
const char* websocket_server_host = "192.168.211.48";
const uint16_t websocket_server_port1 = 8888;
using namespace websockets;
WebsocketsClient client;

unsigned long next_time = 1000;

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

  pinMode(CommsPin1, OUTPUT);
  pinMode(CommsPin2, OUTPUT);
  pinMode(CommsPin3, OUTPUT);

  digitalWrite(CommsPin1, LOW);
  digitalWrite(CommsPin2, LOW);
  digitalWrite(CommsPin3, LOW);

  Serial.begin(115200);
  // while(!Serial);
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

  // if PSRAM IC present, init with UXGA resolution and higher JPEG quality for larger pre-allocated frame buffer.
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
  // while (WiFi.status() != WL_CONNECTED)
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
}

void loop() {
  // Serial.println("Polling Client");
  client.poll();
  client.onMessage([](WebsocketsMessage msg) {
    Serial.println("Received: " + msg.data());

    if (msg.data() == "Stop") {
      digitalWrite(CommsPin1, LOW);
      digitalWrite(CommsPin2, LOW);
      digitalWrite(CommsPin3, LOW);
      Serial.print("Write: ");
      Serial.print(0);
      Serial.print(0);
      Serial.println(0);
    } else if (msg.data() == "Forward") {
      digitalWrite(CommsPin1, LOW);
      digitalWrite(CommsPin2, LOW);
      digitalWrite(CommsPin3, HIGH);
      Serial.print("Write: ");
      Serial.print(0);
      Serial.print(0);
      Serial.println(1);
    } else if (msg.data() == "Backward") {
      digitalWrite(CommsPin1, LOW);
      digitalWrite(CommsPin2, HIGH);
      digitalWrite(CommsPin3, LOW);
      Serial.print("Write: ");
      Serial.print(0);
      Serial.print(1);
      Serial.println(0);
    } else if (msg.data() == "Left") {
      digitalWrite(CommsPin1, LOW);
      digitalWrite(CommsPin2, HIGH);
      digitalWrite(CommsPin3, HIGH);
      Serial.print("Write: ");
      Serial.print(0);
      Serial.print(1);
      Serial.println(1);
    } else if (msg.data() == "Right") {
      digitalWrite(CommsPin1, HIGH);
      digitalWrite(CommsPin2, LOW);
      digitalWrite(CommsPin3, LOW);
      Serial.print("Write: ");
      Serial.print(1);
      Serial.print(0);
      Serial.println(0);
    }
  });

  if (millis() > next_time) {
    Serial.println("Sending Image");
    next_time = millis() + 1000;

    camera_fb_t* fb = esp_camera_fb_get();
    if (!fb) {
      esp_camera_fb_return(fb);
      return;
    }

    if (fb->format != PIXFORMAT_JPEG) { return; }

    client.sendBinary((const char*)fb->buf, fb->len);
    esp_camera_fb_return(fb);
  }
}