# Hero Media — node 1:60 (1424x738)

IMPORTANT: The child "Hero Video 1" (node 1:63, 1488x837 at x -10 / y -8) is a VIDEO slot — in the design it carries a dark video-frame fill (dark, near-black footage with subtle particles). Implement as a `<video>` (autoplay/muted/loop) with the exported poster image as fallback.

Assets (downloaded to /public/figma/, via download_assets on 1:60):
- hero-video-poster.png — flattened export of node 1:60 (1424x738, dark frame with rounded corners) — use as video poster
- hero-video-frame-dark.png — raw source fill of the "Hero Video 1" node (1920w, near-black frame with dust particles)
- hero-collage-art.png — raw source image found in the hero subtree: a vibrant Indian-themed collage mural (markets bull, sports, India Gate, AI robot, classical dancer, rockets). Likely an alternate/underlying hero art layer — appears in the design under the dark video.

Key specs:
- Container: 1424x738, rounded 24px, overflow hidden, horizontally centered in the 1440 frame (8px inset each side)
- Gradient overlay (node 1:61 "Gradient"): 1390x879, centered horizontally, top 0, rounded 25px, linear-gradient to bottom: from rgba(123,96,67,0.09) (warm brown, ~0%) to rgba(13,21,11,0.9) (near-black green) at 101.88%
- Video rect (node 1:63 "Hero Video 1"): 1488x837 positioned at left -10 / top -8 (bleeds past the container so no edge gaps)

## Full design context (verbatim)

```tsx
export default function Frame136() {
  return (
    <div className="overflow-clip relative rounded-[24px] size-full" data-node-id="1:60">
      <div className="-translate-x-1/2 absolute bg-gradient-to-b from-[rgba(123,96,67,0.09)] h-[879px] left-1/2 rounded-[25px] to-[101.88%] to-[rgba(13,21,11,0.9)] top-0 w-[1390px]" data-node-id="1:61" data-name="Gradient" />
      <div className="absolute h-[837px] left-[-10px] top-[-8px] w-[1488px]" data-node-id="1:63" data-name="Hero Video 1" />
    </div>
  );
}
```

No asset URLs were returned by get_design_context for this node (video fill not exported as constant) — assets fetched separately via download_assets on 1:60.
