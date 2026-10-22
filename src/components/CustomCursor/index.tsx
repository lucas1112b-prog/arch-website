'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.matchMedia('(pointer: fine)').matches) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const root = document.documentElement;
    root.classList.add('customCursorActive');

    const pointsNumber = 20;
    const widthFactor = 0.1;
    const spring = 0.4;
    const friction = 0.5;
    const pointer = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
    };
    const trail = Array.from({ length: pointsNumber }, () => ({
      x: pointer.x,
      y: pointer.y,
      dx: 0,
      dy: 0,
    }));

    let mouseMoved = false;
    let animationFrame = 0;

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updateMousePosition = (event: MouseEvent) => {
      mouseMoved = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const update = (time: number) => {
      if (!mouseMoved) {
        pointer.x = (0.5 + 0.3 * Math.cos(0.002 * time) * Math.sin(0.005 * time)) * window.innerWidth;
        pointer.y = (0.5 + 0.2 * Math.cos(0.005 * time) + 0.1 * Math.cos(0.01 * time)) * window.innerHeight;
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      trail.forEach((point, index) => {
        const previous = index === 0 ? pointer : trail[index - 1];
        const pointSpring = index === 0 ? 0.4 * spring : spring;

        point.dx += (previous.x - point.x) * pointSpring;
        point.dy += (previous.y - point.y) * pointSpring;
        point.dx *= friction;
        point.dy *= friction;
        point.x += point.dx;
        point.y += point.dy;
      });

      context.lineCap = 'round';
      context.strokeStyle = '#e6bf00';
      context.beginPath();
      context.moveTo(trail[0].x, trail[0].y);

      for (let index = 1; index < trail.length - 1; index += 1) {
        const next = trail[index + 1];
        const controlX = 0.5 * (trail[index].x + next.x);
        const controlY = 0.5 * (trail[index].y + next.y);

        context.quadraticCurveTo(trail[index].x, trail[index].y, controlX, controlY);
        context.lineWidth = widthFactor * (pointsNumber - index);
        context.stroke();
        context.beginPath();
        context.moveTo(controlX, controlY);
      }

      context.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
      context.lineWidth = widthFactor;
      context.stroke();

      animationFrame = window.requestAnimationFrame(update);
    };

    setupCanvas();
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('resize', setupCanvas);
    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('resize', setupCanvas);
      root.classList.remove('customCursorActive');
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}