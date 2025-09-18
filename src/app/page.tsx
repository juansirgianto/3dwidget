import { MoveRight } from 'lucide-react'
import React from 'react'

function Page() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black/60">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="https://videos.files.wordpress.com/wp05UZIW/video-for-website-new-rev-5-1.mp4" type="video/mp4" />
      </video>

      {/* Konten di atas video */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center gap-6">
        <img src="logo.png" alt="" className='w-[30vw]' />
        <h1 className="text-4xl font-semibold text-white drop-shadow-lg">
          Present | Inspire | Grow
        </h1>
        <a href="/3dwidget/vtour">
        <button className="text-black items-center gap-2 flex justify-center text-4xl bg-white/20 backdrop-blur-sm rounded-full py-3 px-5 w-fit hover:bg-white/30 cursor-pointer">
          <h1 className="text-white">Explore</h1>
          <MoveRight size={40} className="bg-white p-2 rounded-full text-black" />
        </button>
        </a>
      </div>
    </div>
  )
}

export default Page
