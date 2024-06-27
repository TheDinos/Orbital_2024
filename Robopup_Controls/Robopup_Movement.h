
#include <math.h>
#include <Adafruit_PWMServoDriver.h>

#define SERVOMIN 110  // Min pulse length count out of 4096
#define SERVOMAX 620  // Max pulse length count out of 4096


Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x40);

// Define midpoint angle (90 degrees irl) for each motor due to poor manufacturing tolerances
int mid[12] = { 95, 87, 88, 90, 88, 85, 94, 93, 95, 95, 92, 97 };

// MOTOR MAPPINGS

// SHOULDER, CORONAL (sideways)
// 0: Front Left  0 down, 180 up
// 1: Front Right 0 up, 180 down
// 2: Rear Left   0 up, i80 down
// 3: Rear Right  0 down, 180 up

// SHOULDER, MEDIAl (forwards)
// 4: Front Left  0 forwards, 180 backwards
// 5: Front Right 0 backwards, 180 forwards
// 6: Rear Left   0 forwards, 180 backwards
// 7: Rear Right  0 backwards, 180 forwards

// ELBOW, MEDIAL (forwards)
// 8: Front Left  0 up, 180 down
// 9: Front Right 0 down, 180 up
// 10: Rear Left  0 up, 180 down
// 11: Rear Right 0 down, 180 up



int angleToPulse(int angle) {
  int pulse = map(angle, 0, 180, SERVOMIN, SERVOMAX);
  return pulse;
}

void inverse_kinematics(int leg, double x, double y) {
  double origin_to_paw = sqrt(sq(x) + sq(y));
  double alpha = atan(x / y) * 180 / PI;
  double beta = -acos(origin_to_paw / 108) * 180 / PI;
  int shoulder_angle_delta = int(round(-alpha - beta));    // Shoulder Medial angle from front
  int elbow_angle_delta = 90 - 2 * abs(int(round(beta)));  // Elbow Medial angle from Straight

  // print_IK_values(leg, x, y, origin_to_paw, alpha, beta, shoulder_angle_delta, elbow_angle_delta);

  if (leg == 0) {
    pwm.setPWM(0, 0, angleToPulse(mid[0]));
    pwm.setPWM(4, 0, angleToPulse(mid[4] + shoulder_angle_delta));
    pwm.setPWM(8, 0, angleToPulse(mid[8] + elbow_angle_delta));
  } else if (leg == 1) {
    pwm.setPWM(1, 0, angleToPulse(mid[1]));
    pwm.setPWM(5, 0, angleToPulse(mid[5] - shoulder_angle_delta));
    pwm.setPWM(9, 0, angleToPulse(mid[9] - elbow_angle_delta));

  } else if (leg == 2) {
    pwm.setPWM(2, 0, angleToPulse(mid[2]));
    pwm.setPWM(6, 0, angleToPulse(mid[6] + shoulder_angle_delta));
    pwm.setPWM(10, 0, angleToPulse(mid[10] + elbow_angle_delta));

  } else if (leg == 3) {
    pwm.setPWM(3, 0, angleToPulse(mid[3]));
    pwm.setPWM(7, 0, angleToPulse(mid[7] - shoulder_angle_delta));
    pwm.setPWM(11, 0, angleToPulse(mid[11] - elbow_angle_delta));
  }
}

void print_IK_values(int leg, double x, double y, double origin_to_paw, double alpha, double beta, int shoulder_angle_delta, int elbow_angle_delta) {
  Serial.print("LEG: ");
  Serial.print(leg);
  Serial.print("    X: ");
  Serial.print(x);
  Serial.print("    Y: ");
  Serial.print(y);
  Serial.print("    DIST: ");
  Serial.print(origin_to_paw);
  Serial.print("    ALPHA: ");
  Serial.print(alpha);
  Serial.print("    BETA: ");
  Serial.print(beta);
  Serial.print("    SHOULDER DELTA: ");
  Serial.print(shoulder_angle_delta);
  Serial.print("    ELBOW DELTA: ");
  Serial.println(elbow_angle_delta);
}

void set_all_neutral() {
  inverse_kinematics(0, 54, 54);
  inverse_kinematics(1, 54, 54);
  inverse_kinematics(2, 54, 54);
  inverse_kinematics(3, 54, 54);
}

void set_all_sit() {
  inverse_kinematics(0, 0, 39);
  inverse_kinematics(1, 0, 39);
  inverse_kinematics(2, 0, 39);
  inverse_kinematics(3, 0, 39);
}

void set_all_stand() {
  inverse_kinematics(0, 0, 76);
  inverse_kinematics(1, 0, 76);
  inverse_kinematics(2, 0, 76);
  inverse_kinematics(3, 0, 76);
}

void set_all_forward() {
  inverse_kinematics(0, 40, 76);
  inverse_kinematics(1, 40, 76);
  inverse_kinematics(2, 40, 76);
  inverse_kinematics(3, 40, 76);
}

void set_all_backward() {
  inverse_kinematics(0, -40, 76);
  inverse_kinematics(1, -40, 76);
  inverse_kinematics(2, -40, 76);
  inverse_kinematics(3, -40, 76);
}

void set_all_ready_1() {
  inverse_kinematics(0, -50, 76);
  inverse_kinematics(1, 0, 76);
  inverse_kinematics(2, 20, 76);
  inverse_kinematics(3, 0, 76);
}

void set_all_ready_2() {
  inverse_kinematics(0, -50, 76);
  inverse_kinematics(1, 0, 76);
  inverse_kinematics(2, 20, 76);
  inverse_kinematics(3, 0, 76);
}

void forward_march_1() {
  set_all_ready_1();
  delay(150);

  inverse_kinematics(0, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(1, -50, 76);  // BACKWARD
  inverse_kinematics(2, 0, 76);    // STAND
  inverse_kinematics(3, -50, 76);  // BACKWARD

  delay(75);

  inverse_kinematics(0, 0, 76);  // STAND

  delay(400);

  inverse_kinematics(3, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(3, 20, 76);  // FORWARD

  delay(400);
}

void forward_march_2() {
  set_all_ready_2();
  delay(150);

  inverse_kinematics(1, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(0, -50, 76);  // BACKWARD
  inverse_kinematics(2, -50, 76);  // BACKWARD
  inverse_kinematics(3, 0, 76);    // STAND

  delay(75);

  inverse_kinematics(1, 0, 76);  // STAND

  delay(400);

  inverse_kinematics(2, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(2, 20, 76);  // FORWARD

  delay(400);
}

void backward_march_1() {
  set_all_ready_1();
  delay(150);

  inverse_kinematics(3, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(0, 20, 76);  // FORWARD
  inverse_kinematics(1, 0, 76);  // STAND
  inverse_kinematics(2, 20, 76);    // FORWARD

  delay(75);

  inverse_kinematics(3, 0, 76);  // STAND

  delay(400);

  inverse_kinematics(0, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(0, -50, 76);  // BACKWARD

  delay(400);
}

void backward_march_2() {
  set_all_ready_2();
  delay(150);

  inverse_kinematics(2, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(0, 0, 76);  // STAND
  inverse_kinematics(1, 20, 76);  // FORWARD
  inverse_kinematics(3, 20, 76);    // FORWARD

  delay(75);

  inverse_kinematics(2, 0, 76);  // STAND

  delay(400);

  inverse_kinematics(1, 0, 39);  // SIT

  delay(150);

  inverse_kinematics(1, -50, 76);  // BACKWARD

  delay(400);
}

void left_march() {
  set_all_ready_1();
  delay(150);

  inverse_kinematics(1, 0, 39);  // SIT
  delay(150);
  inverse_kinematics(1, 20, 76);  // FORWARD
  delay(150);
  
  inverse_kinematics(3, 0, 39);  // SIT
  delay(150);
  inverse_kinematics(3, 20, 76);  // FORWARD
  delay(400);
  
  inverse_kinematics(1, 0, 76);  // STAND
  inverse_kinematics(3, 0, 76);  // STAND
  delay(150);
}

void right_march() {
  set_all_ready_2();
  delay(150);

  inverse_kinematics(0, 0, 39);  // SIT
  delay(150);
  inverse_kinematics(0, 20, 76);  // FORWARD
  delay(150);
  
  inverse_kinematics(2, 0, 39);  // SIT
  delay(150);
  inverse_kinematics(2, 20, 76);  // FORWARD
  delay(400);

  inverse_kinematics(0, 0, 76);  // STAND
  inverse_kinematics(2, 0, 76);  // STAND
  delay(150);
}