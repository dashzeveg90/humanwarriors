export default function Grain() {
  return (
    <div className="grain" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="n">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#n)" />
      </svg>
    </div>
  );
}
