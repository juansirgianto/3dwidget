'use client';

import React, { useEffect, useRef, useState } from 'react';
import Panorama from '../component/panorama';
import { Mail, MapPin, Maximize, Phone, Volume2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function Page() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        navRef.current &&
        !navRef.current.contains(target)
      ) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <Panorama />

      {/* Logo kiri */}
      <div className="absolute top-5 left-5 z-50">
        <a href="/"><img src="/3dwidget/logo.png" alt="Logo" className="w-[200px]" /></a>
      </div>

      {/* Nav kanan */}
      <div ref={navRef} className="absolute top-5 right-5 z-50 flex gap-2 bg-white/30 backdrop-blur-xs text-lg rounded-full font-semibold shadow-lg p-3 items-center text-white">
        <button className="rounded-full cursor-pointer border border-transparent hover:border-white py-1 px-2">Home</button>
        <button className="rounded-full cursor-pointer border border-transparent hover:border-white py-1 px-2">Guided Tour</button>

        {/* Tombol Location saja di sini */}
        <button
          onClick={() => setActiveMenu(activeMenu === 'location' ? null : 'location')}
          className={`rounded-full cursor-pointer border border-transparent py-1 px-2 transition
            ${activeMenu === 'location' ? 'border-white backdrop-blur-xs' : 'hover:border-white'}`}
        >
          Location
        </button>

        <button
          onClick={() => setActiveMenu(activeMenu === 'contact' ? null : 'contact')}
          className={`rounded-full cursor-pointer border border-transparent py-1 px-2 transition
            ${activeMenu === 'contact' ? 'border-white backdrop-blur-xs' : 'hover:border-white'}`}
        >
          Contact
        </button>

        <button
          onClick={() => setActiveMenu(activeMenu === 'setting' ? null : 'setting')}
          className={`rounded-full cursor-pointer border border-transparent py-1 px-2 transition
            ${activeMenu === 'setting' ? 'border-white backdrop-blur-xs' : 'hover:border-white'}`}
        >
          Setting
        </button>

      </div>

      {/* ⬇️ Dropdown dipindah ke root container */}
      {activeMenu === 'location' && (
        <div
          ref={dropdownRef}
          role="menu"
          aria-label="Location menu"
          className="absolute left-0 right-0 pt-[72px] top-0 w-full
                    bg-white/10 backdrop-blur-md shadow-lg
                    text-black z-40 px-10 animate-fadeInDown"
        >
          <div className='flex items-end justify-between py-10'>
            <div className='text-white'>
              <h1 className='text-xl'>Project</h1>
              <h1 className='text-3xl font-semibold'>Location</h1>
            </div>
            <div className='flex items-center gap-2'>
              <div style={{ backgroundImage: "url('https://designedbypelago.com/wp-content/uploads/2025/09/compressed_1322CC_CSC_DAYLIGHT-D_REV1-Photo-1.jpg')" }} className='w-[20vw] h-[20vh] bg-cover text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <MapPin/>
                  <h1>Canggu, Bali</h1>
                </div>
              </div>
              <div style={{ backgroundImage: "url('https://designedbypelago.com/wp-content/uploads/2025/09/compressed_1187CC_CSC_REV8_6-Photo.jpg')" }} className='w-[20vw] h-[20vh] bg-cover text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <MapPin/>
                  <h1>Canggu, Bali</h1>
                </div>
              </div>
              <div style={{ backgroundImage: "url('https://designedbypelago.com/wp-content/uploads/2025/09/compressed_829CC_CSC_REV1_CAM-D-Photo.jpg')" }} className='w-[20vw] h-[20vh] bg-cover text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <MapPin/>
                  <h1>Canggu, Bali</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMenu === 'contact' && (
        <div
          ref={dropdownRef}
          role="menu"
          aria-label="Contact menu"
          className="absolute left-0 right-0 pt-[72px] top-0 w-full
                    bg-white/10 backdrop-blur-md shadow-lg
                    text-black z-40 px-10 animate-fadeInDown"
        >
          <div className='flex items-end justify-between py-10'>
            <div className='text-white'>
              <h1 className='text-xl'>Get in Touch</h1>
              <h1 className='text-3xl font-semibold'>Contact Us</h1>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-[20vw] h-[15vh] bg-white/30 text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <MapPin/>
                  <h1>Bali, Indonesia</h1>
                </div>
              </div>
              <div className='w-[20vw] h-[15vh] bg-white/30 text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <Phone/>
                  <h1>+442032870258</h1>
                </div>
              </div>
              <div className='w-[20vw] h-[15vh] bg-white/30 text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <Mail/>
                  <h1>enquiries@conceptsconveyed.com</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMenu === 'setting' && (
        <div
          ref={dropdownRef}
          role="menu"
          aria-label="Setting menu"
          className="absolute left-0 right-0 pt-[72px] top-0 w-full
                    bg-white/10 backdrop-blur-md shadow-lg
                    text-black z-40 px-10 animate-fadeInDown"
        >
          <div className='flex items-end justify-between py-10'>
            <div className='text-white'>
              <h1 className='text-xl'>Preference</h1>
              <h1 className='text-3xl font-semibold'>Settings</h1>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-[10vw] h-[10vh] bg-white/30 text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <div className='flex gap-2'>
                  <Volume2/>
                  <h1>Mute Sound</h1>
                  </div>
                  <Switch/>
                </div>
              </div>
              <div className='w-[10vw] h-[10vh] bg-white/30 text-white rounded-[15px]'>
                <div className='flex flex-col justify-between h-full p-3'>
                  <div className='flex gap-2'>
                  <Maximize/>
                  <h1>Fullscreen</h1>
                  </div>
                  <Switch/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
