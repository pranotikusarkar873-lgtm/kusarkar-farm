import React, { useEffect, useRef, useState } from 'react';

export const AnimatedTitle = ({ as: Tag = 'h2', className = '', center = false, children }) => {
  const wrapRef = useRef(null);
  const headingRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [lineWidth, setLineWidth] = useState(0);

  // Measure heading width after render
  useEffect(() => {
    const measure = () => {
      if (headingRef.current) {
        setLineWidth(headingRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Trigger animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={`anim-title-wrap ${center ? 'anim-title-center' : ''}`}>
      <Tag ref={headingRef} className={`anim-title-heading ${className}`}>{children}</Tag>

      {/* SVG width = exact heading width */}
      <svg
        className={`anim-curve-svg ${animate ? 'anim-curve-svg--active' : ''}`}
        width={lineWidth || '100%'}
        height="14"
        viewBox={`0 0 ${lineWidth || 200} 12`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e4620" />
            <stop offset="60%" stopColor="#52b788" />
            <stop offset="100%" stopColor="#f4a261" />
          </linearGradient>
        </defs>
        <path
          d={`M0,8 C${(lineWidth || 200) * 0.15},2 ${(lineWidth || 200) * 0.35},12 ${(lineWidth || 200) * 0.5},6 C${(lineWidth || 200) * 0.65},0 ${(lineWidth || 200) * 0.85},10 ${lineWidth || 200},5`}
          fill="none"
          stroke="url(#curveGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
