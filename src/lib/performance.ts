"use client";

import { useEffect, useState } from "react";

/**
 * Hook para detectar si el usuario prefiere animaciones reducidas
 * y si está en un dispositivo móvil
 */
export function usePerformanceOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar dispositivo móvil
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
    };

    // Detectar preferencia de animaciones reducidas
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      // Escuchar cambios
      const listener = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    };

    checkMobile();
    checkReducedMotion();

    // Escuchar cambios de tamaño de ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determinar si se deben deshabilitar animaciones
  const shouldDisableAnimations = prefersReducedMotion || isMobile;

  return {
    isMobile,
    prefersReducedMotion,
    shouldDisableAnimations,
  };
}

/**
 * Wrapper para componentes con animaciones que optimiza para móvil
 */
export function OptimizedMotion({ children, ...props }: any) {
  const { shouldDisableAnimations } = usePerformanceOptimization();

  if (shouldDisableAnimations) {
    // Renderizar sin animaciones en móvil o con preferencias reducidas
    return <div {...props}>{children}</div>;
  }

  // Renderizar con animaciones en desktop
  const MotionComponent = require("framer-motion").motion;
  return <MotionComponent {...props}>{children}</MotionComponent>;
}