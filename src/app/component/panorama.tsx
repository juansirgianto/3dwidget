'use client';

import { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import type { MarkersPlugin as MarkersPluginType, Marker } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';

/**
 * Helper: buat elemen marker berbentuk foto bulat + tooltip
 * - imgSrc: path gambar di /public (contoh '/thumbs/study.jpg')
 * - label: teks tooltip
 */
function createCircleMarker(imgSrc: string, label: string) {
  const wrap = document.createElement('div');
  wrap.style.cssText = `
    width: 76px; height: 76px; border-radius: 9999px; overflow: hidden;
    box-shadow: 0 12px 28px rgba(0,0,0,.35);
    border: 3px solid #fff;
    position: relative;
    cursor: pointer;
    transform: translateZ(0);
    background: #000;
  `;

  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = label;
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  wrap.appendChild(img);

  const tip = document.createElement('div');
  tip.textContent = label;
  tip.style.cssText = `
    position:absolute; bottom: calc(100% + 10px); left:50%; transform:translateX(-50%);
    background: rgba(46,48,71,.95); color:#fff; padding:6px 10px; border-radius:9999px;
    white-space:nowrap; font-size:12px; font-weight:600; opacity:0; pointer-events:none;
    transition: opacity .25s;
  `;
  wrap.appendChild(tip);

  const caret = document.createElement('div');
  caret.style.cssText = `
    position:absolute; top: -6px; left:50%; transform:translateX(-50%);
    width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;
    border-top:6px solid rgba(46,48,71,.95);
  `;
  tip.appendChild(caret);

  wrap.addEventListener('mouseenter', () => (tip.style.opacity = '1'));
  wrap.addEventListener('mouseleave', () => (tip.style.opacity = '0'));

  return wrap;
}

// util deg string (PSV v5 menerima "deg" atau radian number)
const deg = (v: number) => `${v}deg`;

export default function Panorama() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inisialisasi viewer + plugin
    const viewer = new Viewer({
      container: containerRef.current,
      defaultZoomLvl: 0,
      navbar: ['fullscreen', 'markersList'],
      plugins: [MarkersPlugin],
    });

    const markers = viewer.getPlugin(MarkersPlugin) as MarkersPluginType;

    // --- DEFINISI SCENE (ganti src sesuai aset kamu; bisa URL atau file di /public) ---
    type SceneId =
      | 'entrance' | 'studyroom' | 'kitchen' | 'kitchenpatio'
      | 'patio' | 'lounge' | 'bedroom' | 'balcony' | 'bathroom';

    type LinkMarker = {
      id: string;
      to: SceneId;                 // tujuan saat klik
      img: string;                 // gambar marker (bulat)
      label: string;               // tooltip
      position: { yaw: string | number; pitch: string | number };
    };

    type SceneDef = { panorama: string; markers: LinkMarker[] };

    const scenes: Record<SceneId, SceneDef> = {
      entrance: {
        panorama: '/vtour/ENTRANCE_.jpg',
        markers: [
          { id: 'to-study',   to: 'studyroom',   img: '/vtour/study.jpg',   label: 'Study',        position: { yaw: deg(75),  pitch: deg(-10) } },
          { id: 'to-kitchen', to: 'kitchen',     img: '/vtour/kitchen.jpg', label: 'Kitchen',      position: { yaw: deg(12),  pitch: deg(-6) } },
          { id: 'to-bedroom', to: 'bedroom',     img: '/vtour/bedroom.jpg', label: 'Bedroom',      position: { yaw: deg(-6),  pitch: deg(23) } },
        ],
      },
      studyroom: {
        panorama: '/vtour/study.jpg',
        markers: [
          { id: 'back-entrance', to: 'entrance', img: '/vtour/ENTRANCE_.jpg', label: 'Entrance', position: { yaw: deg(-86), pitch: deg(-10) } },
        ],
      },
      kitchen: {
        panorama: '/vtour/kitchen.jpg',
        markers: [
          { id: 'back-entrance',  to: 'entrance',     img: '/vtour/ENTRANCE_.jpg',     label: 'Entrance',     position: { yaw: deg(-200), pitch: deg(-8) } },
          { id: 'to-kitchenpatio',to: 'kitchenpatio', img: '/vtour/kitchenpatio.jpg', label: 'Kitchen Patio', position: { yaw: deg(-17),  pitch: deg(-6) } },
          { id: 'to-lounge',      to: 'lounge',       img: '/vtour/lounge.jpg',       label: 'Lounge',        position: { yaw: deg(-100), pitch: deg(-6) } },
        ],
      },
      kitchenpatio: {
        panorama: '/vtour/kitchenpatio.jpg',
        markers: [
          { id: 'back-entrance', to: 'entrance', img: '/vtour/ENTRANCE_.jpg', label: 'Entrance', position: { yaw: deg(149), pitch: deg(-5) } },
          { id: 'to-patio',      to: 'patio',    img: '/vtour/patio.jpg',    label: 'Patio',    position: { yaw: deg(12),  pitch: deg(-6) } },
          { id: 'to-lounge',     to: 'lounge',   img: '/vtour/lounge.jpg',   label: 'Lounge',   position: { yaw: deg(183), pitch: deg(-6) } },
        ],
      },
      patio: {
        panorama: '/vtour/patio.jpg',
        markers: [
          { id: 'to-kitchenpatio', to: 'kitchenpatio', img: '/vtour/kitchenpatio.jpg', label: 'Kitchen Patio', position: { yaw: deg(115), pitch: deg(-12) } },
        ],
      },
      lounge: {
        panorama: '/vtour/lounge.jpg',
        markers: [
          { id: 'to-kitchen', to: 'kitchen', img: '/vtour/kitchen.jpg', label: 'Kitchen', position: { yaw: deg(75), pitch: deg(-10) } },
        ],
      },
      bedroom: {
        panorama: '/vtour/bedroom.jpg',
        markers: [
          { id: 'back-entrance', to: 'entrance', img: '/vtour/ENTRANCE_.jpg', label: 'Entrance', position: { yaw: deg(-189), pitch: deg(-17) } },
          { id: 'to-balcony',    to: 'balcony',  img: '/vtour/balcony.jpg',  label: 'Balcony',  position: { yaw: deg(-12),  pitch: deg(-11) } },
          { id: 'to-bathroom',   to: 'bathroom', img: '/vtour/bathroom.jpg', label: 'Bathroom', position: { yaw: deg(-132), pitch: deg(-11) } },
        ],
      },
      balcony: {
        panorama: '/vtour/balcony.jpg',
        markers: [
          { id: 'to-bedroom', to: 'bedroom', img: '/vtour/bedroom.jpg', label: 'Bedroom', position: { yaw: deg(-37), pitch: deg(-12) } },
        ],
      },
      bathroom: {
        panorama: '/vtour/bathroom.jpg',
        markers: [
          { id: 'to-bedroom', to: 'bedroom', img: '/vtour/bedroom.jpg', label: 'Bedroom', position: { yaw: deg(160), pitch: deg(-12) } },
        ],
      },
    };

    // --- FUNGSI GANTI SCENE ---
    const switchScene = async (sceneId: SceneId) => {
      const scene = scenes[sceneId];
      if (!scene) return;

      // Bersihkan marker dulu
      markers.clearMarkers();

      // Ganti panorama (pakai transition agar smooth)
      await viewer.setPanorama(scene.panorama, { transition: true });

      // Tambahkan marker dari definisi scene
      for (const mk of scene.markers) {
        const el = createCircleMarker(mk.img, mk.label);
        // simpan info "to" pada dataset untuk handler klik
        (el as any).dataset.to = mk.to;

        markers.addMarker({
          id: mk.id,
          element: el,                         // ← HTML Element (foto bulat)
          position: mk.position,               // ← { yaw, pitch } (deg atau rad)
          size: { width: 76, height: 76 },     // disarankan untuk HTML marker
          anchor: 'center center',
          zIndex: 10,
          tooltip: mk.label,                   // backup tooltip bawaan PSV
        });
      }
    };

    // Klik marker → pindah scene tujuan
    markers.addEventListener('select-marker', ({ marker }: any) => {
      const el: HTMLElement | null = marker?.config?.element ?? null;
      const to = (el as any)?.dataset?.to as SceneId | undefined;
      if (to) switchScene(to);
    });

    // Scene awal
    switchScene('entrance');

    return () => viewer.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}