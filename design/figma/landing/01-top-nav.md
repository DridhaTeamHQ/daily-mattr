# Top Nav — node 1:412 (1440x70)

Assets (downloaded to /public/figma/):
- imgVuesaxLinearUser → nav-icon-user.svg — https://www.figma.com/api/mcp/asset/4a9442b3-470b-4ede-a6f2-8ad91ac5a2b3
- imgIconsansLinearArrowDown2 → nav-icon-arrow-down.svg — https://www.figma.com/api/mcp/asset/6739ee31-0b81-44fb-a508-6062099d64a4
- imgEllipse3 (button glow ellipse) → nav-button-glow.svg — https://www.figma.com/api/mcp/asset/788a2874-2a4d-4cf2-b71a-bd76d370c63f

Key specs:
- Container: full-width flex, justify-between, px 56, py 16, backdrop-blur 12.5px
- Logo "DailyMattr'.": Playfair — "Daily" ExtraBold 24px tracking -1.2px (#141417); "Mattr." Black 32px tracking -1.6px/-2.56px; apostrophe #6b6b73. fontVariationSettings: "opsz" 12, "wdth" 100
- Nav links (Home, Features, What is Mattr, Contact Us): Be Vietnam Pro Medium 13px #6b6b73, px 12 / py 8, rounded-full (100px)
- "Long Mattrs" dropdown pill: Be Vietnam Pro SemiBold 13px #141417, border 1px #b8b8c0, rounded 40px, px 12 / py 8, 16px arrow-down icon, gap 4
- "Download App" button: bg rgba(28,28,17,0.93), rounded 50px, px 16 / py 8, text Be Vietnam Pro SemiBold 14px white; decorative glow ellipse (251x8) absolutely placed at left -70 / top 63
- User icon button: same bg/radius, p 9, 16px user icon
- Right group gap: 8px

## Full design context (verbatim)

```tsx
const imgVuesaxLinearUser = "https://www.figma.com/api/mcp/asset/4a9442b3-470b-4ede-a6f2-8ad91ac5a2b3";
const imgIconsansLinearArrowDown2 = "https://www.figma.com/api/mcp/asset/6739ee31-0b81-44fb-a508-6062099d64a4";
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/788a2874-2a4d-4cf2-b71a-bd76d370c63f";

function VuesaxLinearUser({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[16px]"} data-node-id="1:22" data-name="vuesax/linear/user">
      <div className="absolute contents inset-0" data-node-id="1:23" data-name="vuesax/linear/user">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVuesaxLinearUser} />
      </div>
    </div>
  );
}

export default function Frame15() {
  return (
    <div className="backdrop-blur-[12.5px] content-stretch flex items-center justify-between px-[56px] py-[16px] relative size-full" data-node-id="1:412">
      <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Bold'] leading-[0] not-italic relative shrink-0 text-[#141417] text-[0px] whitespace-nowrap" data-node-id="1:413">
        <span className="font-['Playfair:ExtraBold'] font-extrabold leading-[normal] text-[24px] tracking-[-1.2px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          Daily
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px] tracking-[-1.6px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          Ma
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px] tracking-[-2.56px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          tt
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          r
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[#6b6b73] text-[32px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          ’
        </span>
        <span className="font-['Playfair:Black'] font-black leading-[normal] text-[32px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
          .
        </span>
      </p>
      <div className="content-stretch flex items-center relative shrink-0" data-node-id="1:414">
        <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:415" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:415;278:5299">
            Home
          </p>
        </div>
        <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:416" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:416;278:5299">
            Features
          </p>
        </div>
        <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:417" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:417;278:5299">
            What is Mattr
          </p>
        </div>
        <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:418" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:418;278:5299">
            Contact Us
          </p>
        </div>
        <div className="border border-[#b8b8c0] border-solid content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:419" data-name="Header Element">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#141417] text-[13px] whitespace-nowrap" data-node-id="1:420">
            Long Mattrs
          </p>
          <div className="relative shrink-0 size-[16px]" data-node-id="1:421" data-name="Iconsans/Linear/Arrow-Down-2">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearArrowDown2} />
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="1:423">
        <div className="bg-[rgba(28,28,17,0.93)] content-stretch flex gap-[10px] items-center justify-center overflow-clip px-[16px] py-[8px] relative rounded-[50px] shrink-0" data-node-id="1:424">
          <div className="absolute h-[8px] left-[-70px] top-[63px] w-[251px]" data-node-id="1:425">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
          </div>
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap" data-node-id="1:426">
            Download App
          </p>
        </div>
        <div className="bg-[rgba(28,28,17,0.93)] content-stretch flex gap-[10px] items-center justify-center overflow-clip p-[9px] relative rounded-[50px] shrink-0" data-node-id="1:427">
          <div className="absolute h-[8px] left-[-70px] top-[63px] w-[251px]" data-node-id="1:428">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse3} />
          </div>
          <VuesaxLinearUser className="relative shrink-0 size-[16px]" />
        </div>
      </div>
    </div>
  );
}
```

Notes from tool output:
- Styles contained in design: Neutral 800 #141417, Neutral 500 #6B6B73, Neutral 700 #1C1C1E, Neutral 400 #B8B8C0, Neutral 0 #FFFFFF.
