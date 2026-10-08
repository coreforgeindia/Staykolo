import { useState } from 'react';
import {
  Compass, ExternalLink, Layers, Maximize2, Minimize2,
  Navigation, RotateCcw, RotateCw, Sparkles, X, MapPin, Globe,
} from 'lucide-react';

export function Interactive360View({
  lat = 12.9716,
  lng = 77.5946,
  name,
  address,
  googleMapsUrl,
  height = 'h-[500px] sm:h-[600px]',
  className = '',
}: {
  lat?: number;
  lng?: number;
  name: string;
  address?: string;
  googleMapsUrl?: string;
  height?: string;
  className?: string;
}) {
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'streetview' | 'satellite' | 'map'>('streetview');

  const rotateLeft = () => setYaw((prev) => (prev - 45 + 360) % 360);
  const rotateRight = () => setYaw((prev) => (prev + 45) % 360);
  const tiltUp = () => setPitch((prev) => Math.min(prev + 15, 60));
  const tiltDown = () => setPitch((prev) => Math.max(prev - 15, -60));
  const resetView = () => {
    setYaw(0);
    setPitch(0);
  };

  // Multiple Google embed modes tailored for seamless display
  const getEmbedUrl = () => {
    if (viewMode === 'satellite') {
      return `https://maps.google.com/maps?q=${lat},${lng}&t=k&z=19&ie=UTF8&iwloc=&output=embed`;
    }
    if (viewMode === 'map') {
      return `https://maps.google.com/maps?q=${lat},${lng}&z=17&ie=UTF8&iwloc=&output=embed`;
    }
    // Street View 360 mode
    return `https://maps.google.com/maps?q=${lat},${lng}&layer=c&cbll=${lat},${lng}&cbp=12,${yaw},0,0,${pitch}&output=svembed`;
  };

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-[#b2e2ec] bg-[#0c1a24] text-white shadow-xl transition-all ${
        fullscreen ? 'fixed inset-0 z-[9999] h-screen w-screen rounded-none border-none' : height
      } ${className}`}
    >
      {/* 360 Live Header Banner */}
      <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0878b0]/95 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold text-white shadow-md border border-white/25">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          🌐 360° Interactive View
        </span>

        {/* View Mode Switcher */}
        <div className="hidden sm:inline-flex items-center rounded-lg bg-black/75 backdrop-blur-md p-0.5 border border-white/15">
          <button
            type="button"
            onClick={() => setViewMode('streetview')}
            className={`rounded-md px-2.5 py-1 text-[10px] font-bold transition-all ${
              viewMode === 'streetview'
                ? 'bg-[#168aad] text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Street 360°
          </button>
          <button
            type="button"
            onClick={() => setViewMode('satellite')}
            className={`rounded-md px-2.5 py-1 text-[10px] font-bold transition-all ${
              viewMode === 'satellite'
                ? 'bg-[#168aad] text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            3D Satellite
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`rounded-md px-2.5 py-1 text-[10px] font-bold transition-all ${
              viewMode === 'map'
                ? 'bg-[#168aad] text-white shadow-xs'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Map Pin
          </button>
        </div>
      </div>

      {/* Control Actions Top Right */}
      <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 items-center gap-1 rounded-lg bg-black/75 backdrop-blur-md px-3 text-[11px] font-semibold text-white/90 hover:bg-black/95 hover:text-white border border-white/15 transition-all"
            title="Open in Google Maps App"
          >
            <ExternalLink size={13} /> Maps ↗
          </a>
        )}
        <button
          type="button"
          onClick={() => setFullscreen(!fullscreen)}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-[#0878b0] px-3 text-[11px] font-bold text-white shadow hover:bg-[#076899] border border-white/20 transition-all"
          title={fullscreen ? 'Exit Screen Fit' : 'Fit to Full Screen'}
        >
          {fullscreen ? (
            <>
              <Minimize2 size={13} /> Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize2 size={13} /> Fit to Screen
            </>
          )}
        </button>
      </div>

      {/* Embed Frame: 100% full height and width */}
      <div className="relative flex-1 w-full h-full min-h-[300px] bg-[#112330]">
        <iframe
          key={`${lat}-${lng}-${viewMode}-${yaw}-${pitch}`}
          title={`360 View for ${name}`}
          src={getEmbedUrl()}
          className="absolute inset-0 h-full w-full border-0 pointer-events-auto"
          loading="eager"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-3 inset-x-3 z-30 flex flex-wrap items-center justify-between gap-2.5 rounded-xl bg-[#0b1b26]/90 backdrop-blur-md px-4 py-2.5 border border-white/15 text-xs shadow-lg">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin size={14} className="text-[#38bdf8] shrink-0" />
          <span className="font-bold text-white text-[12px] sm:text-[13px] truncate max-w-[180px] sm:max-w-[320px]">
            {name}
          </span>
          {address && (
            <span className="hidden lg:inline text-[11px] text-[#93a8b4] truncate max-w-[280px]">
              · {address}
            </span>
          )}
        </div>

        {/* 360 Rotation & Tilt Toolbar */}
        {viewMode === 'streetview' && (
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="hidden sm:inline text-[10px] font-semibold text-[#819ca8] mr-1">
              Heading: {yaw}°
            </span>
            <button
              type="button"
              onClick={rotateLeft}
              className="flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/25 transition-colors"
              title="Rotate 45° left"
            >
              <RotateCcw size={12} /> ↶ Left
            </button>
            <button
              type="button"
              onClick={rotateRight}
              className="flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/25 transition-colors"
              title="Rotate 45° right"
            >
              <RotateCw size={12} /> Right ↷
            </button>
            <button
              type="button"
              onClick={resetView}
              className="rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-semibold hover:bg-white/25 transition-colors"
              title="Reset view to front"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Modal360({
  isOpen,
  onClose,
  property,
}: {
  isOpen: boolean;
  onClose: () => void;
  property: {
    name: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
    contact?: { googleMaps?: string };
  };
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 sm:p-4 md:p-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-[96vw] max-w-[1300px] h-[90vh] max-h-[850px] rounded-2xl bg-[#0c1a24] overflow-hidden shadow-2xl border border-cyan-500/40 flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#18364a] shadow-xl hover:bg-rose-50 hover:text-rose-600 transition-all font-bold"
          aria-label="Close 360 View"
        >
          <X size={18} />
        </button>

        <Interactive360View
          lat={property.coordinates?.lat ?? 12.9716}
          lng={property.coordinates?.lng ?? 77.5946}
          name={property.name}
          address={property.address}
          googleMapsUrl={property.contact?.googleMaps}
          height="h-full"
          className="h-full w-full rounded-2xl"
        />
      </div>
    </div>
  );
}
