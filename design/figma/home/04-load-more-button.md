# Load more button — node 1:5863 "Frame 156" (138x34)

Sits centered at the bottom of the Article content section (x=651, y=2418 within section 1:5453). Two-part pill: text pill + dark round arrow chip.

Local asset map (downloaded to /public/figma/):
- imgDownArrow3 → icon-load-more-arrow-down.svg (10x12 white down arrow)

## Figma design context (verbatim)

```jsx
const imgDownArrow3 = "https://www.figma.com/api/mcp/asset/eebb5bbb-c623-4046-b98d-57fdfc5d78a5";

export default function Frame156() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-node-id="1:5863">
      <div className="bg-[rgba(255,255,255,0.1)] border border-[#1c1c1e] border-solid content-stretch flex items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[50px] shrink-0" data-node-id="1:5864">
        <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:5865" style={{ fontVariationSettings: '"wdth" 100' }}>
          Load more
        </p>
      </div>
      <div className="bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex items-center justify-center overflow-clip px-[12px] py-[11px] relative rounded-[50px] shrink-0 w-[34px]" data-node-id="1:5866">
        <div className="h-[12px] relative shrink-0 w-[10px]" data-node-id="1:5867" data-name="Down Arrow 3">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgDownArrow3} />
        </div>
      </div>
    </div>
  );
}
```

Design styles: Neutral 800 #141417, Neutral 700 #1C1C1E, Neutral 0 #FFFFFF.

Note: section 1:5453 also contains "Rectangle 5" (1:5862, 1493x1314) — a black rectangle with fill opacity 0 (invisible; likely a hover/scrim placeholder). Safe to ignore.
