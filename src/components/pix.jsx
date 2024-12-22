import React, { useEffect, useRef, useState } from "react";

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }

    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

const PixelCanvas = ({ colors = ["#f8fafc", "#f1f5f9", "#cbd5e1"], gap = 5, speed = 35, noFocus = false }) => {
  const canvasRef = useRef(null);
  const [pixels, setPixels] = useState([]);
  const [animationId, setAnimationId] = useState(null);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const throttleSpeed = Math.max(0.001, speed * 0.001);

  const initPixels = (canvas, ctx) => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);
    canvas.width = width;
    canvas.height = height;

    const newPixels = [];

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = reducedMotion ? 0 : getDistanceToCanvasCenter(canvas, x, y);

        newPixels.push(new Pixel(canvas, ctx, x, y, color, throttleSpeed, delay));
      }
    }

    setPixels(newPixels);
  };

  const getDistanceToCanvasCenter = (canvas, x, y) => {
    const dx = x - canvas.width / 2;
    const dy = y - canvas.height / 2;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const animate = (fnName) => {
    const ctx = canvasRef.current.getContext("2d");

    const frame = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      pixels.forEach((pixel) => pixel[fnName]());

      if (pixels.every((pixel) => pixel.isIdle)) {
        cancelAnimationFrame(animationId);
        return;
      }

      setAnimationId(requestAnimationFrame(frame));
    };

    setAnimationId(requestAnimationFrame(frame));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    initPixels(canvas, ctx);

    const resizeObserver = new ResizeObserver(() => initPixels(canvas, ctx));
    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseEnter = () => animate("appear");
  const handleMouseLeave = () => animate("disappear");

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
};

export default PixelCanvas;
