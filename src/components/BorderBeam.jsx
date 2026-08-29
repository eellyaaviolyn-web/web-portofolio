import React, { useRef, useEffect, useState } from 'react';

/**
 * BorderBeam (v2) — SVG stroke-dashoffset based rotating border.
 * Renders a glowing segment that travels around the card's perimeter.
 * Automatically measures parent element size via ResizeObserver.
 */
const BorderBeam = ({
  duration = 3.5,
  colorFrom = '#8b5cf6',
  colorTo = '#0ea5e9',
  borderWidth = 2,
  glowLength = 110,    // length of the visible beam segment
  reverse = false,     // second beam can go the opposite way
}) => {
  const ref = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const update = () => setDims({ w: parent.offsetWidth, h: parent.offsetHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  if (w === 0 || h === 0) return <div ref={ref} style={{ display: 'none' }} />;

  const rx = 14; // border-radius in px (match card's border-radius)
  const bw = borderWidth;
  const rectX = bw + 0.5;
  const rectY = bw + 0.5;
  const rectW = w - (bw + 0.5) * 2;
  const rectH = h - (bw + 0.5) * 2;

  // Approximate perimeter of a rounded rect
  const perimeter = 2 * (rectW - 2 * rx + rectH - 2 * rx) + 2 * Math.PI * rx;
  const gap = perimeter - glowLength;
  const dir = reverse ? 1 : -1;

  const uid = `bb-${Math.round(duration * 10)}-${Math.round(colorFrom.length)}`; // stable enough key

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        borderRadius: 'inherit',
      }}
    >
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${uid}-grad`} gradientUnits="userSpaceOnUse" x1={w * 0.2} y1="0" x2={w * 0.8} y2="0">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
            <stop offset="30%" stopColor={colorFrom} />
            <stop offset="70%" stopColor={colorTo} />
            <stop offset="100%" stopColor={colorTo} stopOpacity="0" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer glow layer */}
        <rect
          x={rectX} y={rectY}
          width={rectW} height={rectH}
          rx={rx} ry={rx}
          stroke={colorFrom}
          strokeWidth={bw * 3}
          strokeDasharray={`${glowLength * 0.8} ${gap + glowLength * 0.2}`}
          strokeDashoffset={0}
          opacity={0.5}
          filter={`url(#${uid}-glow)`}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={0}
            to={dir * perimeter}
            dur={`${duration}s`}
            repeatCount="indefinite"
            calcMode="linear"
          />
        </rect>

        {/* Sharp inner beam */}
        <rect
          x={rectX} y={rectY}
          width={rectW} height={rectH}
          rx={rx} ry={rx}
          stroke={`url(#${uid}-grad)`}
          strokeWidth={bw * 1.5}
          strokeLinecap="round"
          strokeDasharray={`${glowLength * 0.65} ${gap + glowLength * 0.35}`}
          strokeDashoffset={0}
        >
          <animate
            attributeName="stroke-dashoffset"
            from={0}
            to={dir * perimeter}
            dur={`${duration}s`}
            repeatCount="indefinite"
            calcMode="linear"
          />
        </rect>

        {/* Base faint border — always visible */}
        <rect
          x={rectX} y={rectY}
          width={rectW} height={rectH}
          rx={rx} ry={rx}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
};

export default BorderBeam;
