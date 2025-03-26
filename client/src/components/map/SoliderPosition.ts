import p5 from "p5";
import p5Types from "p5";
import { STOPPING_DISTANCE } from "../../shared/Constants";
export class SoliderPosition {
  p5Instance: p5Types;
  position: p5Types.Vector;
  velocity: p5Types.Vector;
  acceleration: p5Types.Vector;
  maxSpeed: number;
  maxForce: number;

  constructor(p5Instance: p5Types, x: number, y: number) {
    this.p5Instance = p5Instance;
    this.position = p5Instance.createVector(x, y);
    this.velocity = p5Instance.createVector(0, 0);
    this.acceleration = p5Instance.createVector(0, 0);
    this.maxSpeed = 1;
    this.maxForce = 0.1;
  }

  public seek(target: p5Types.Vector) {
    const desired = p5.Vector.sub(target, this.position);
    const distance = desired.mag();

    if (distance > STOPPING_DISTANCE) {
      desired.setMag(this.maxSpeed);

      const steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);

      this.applyForce(steer);
    } else {
      this.velocity.mult(0);
    }
  }

  public applyForce(force: p5Types.Vector) {
    this.acceleration.add(force);
  }

  public update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  public show(angle: number, color: string) {
    this.p5Instance.push();
    this.p5Instance.translate(this.position.x, this.position.y);

    // Draw the soldier's position as a circle
    this.p5Instance.fill(color);
    this.p5Instance.noStroke();
    this.p5Instance.circle(0, 0, 20); // Circle with diameter of 20

    // Draw direction indicator (arrow)
    this.p5Instance.rotate(angle);

    // Draw a directional indicator
    this.p5Instance.stroke(color);
    this.p5Instance.strokeWeight(3);

    this.p5Instance.line(0, 0, 25, 0);
    this.p5Instance.line(25, 0, 15, -10);
    this.p5Instance.line(25, 0, 15, 10);

    this.p5Instance.pop();
  }
}
