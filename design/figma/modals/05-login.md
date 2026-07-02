# Log in to Mattr — auth drawer — node 1:3338 "Frame 180" (564x1196)

Right-side auth drawer (x=876, y=0) shown on Newsletter variant frame 1:2965 over scrim "Rectangle 12" (1440x833). Background #F4F4F6, rounded top-left corner 12px.
Header: "DailyMattr'." wordmark centered — Playfair ExtraBold 35.37px "Daily" + Playfair Black 47.16px "Mattr'." with negative tracking; the apostrophe glyph is #6B6B73, rest #141417. Two 40px cross icons flank it at opacity 0 (layout spacers; the visible close affordance in other states).
Body (centered, w=283, top=267): title "Log in to Mattr" (Be Vietnam Pro Medium 18px #1C1C1E), then buttons:
- "Continue with Google": bg #5673E5, white text, radius 60, 283px wide, py 14.5.
- "Continue with email": bg white, border #E5E5EA, text #141417.
Footer line: "Don't have an account? Sign up" — #4A4A52 with underlined black "Sign up" (Be Vietnam Pro Medium 15px).

Local asset map: imgIconsansLinearCross → icon-cross-40.svg (downloaded to /public/figma/).

## Figma design context (verbatim)

```jsx
const imgIconsansLinearCross = "https://www.figma.com/api/mcp/asset/3ddd8be8-e3b3-41bb-8266-6906728a02f1";

export default function Frame180() {
  return (
    <div className="bg-[#f4f4f6] overflow-clip relative rounded-tl-[12px] size-full" data-node-id="1:3338">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-center left-[calc(50%+0.5px)] top-[267px] w-[283px]" data-node-id="1:3339">
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="1:3340">
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-node-id="1:3341">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#1c1c1e] text-[18px] text-center w-[min-content]" data-node-id="1:3342">
              Log in to Mattr
            </p>
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-node-id="1:3343">
              <div className="bg-[#5673e5] content-stretch flex items-center justify-center px-[10px] py-[14.5px] relative rounded-[60px] shrink-0 w-[283px]" data-node-id="1:3344">
                <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:3345">
                  Continue with Google
                </p>
              </div>
              <div className="bg-white border border-[#e5e5ea] border-solid content-stretch flex items-center justify-center px-[10px] py-[14.5px] relative rounded-[60px] shrink-0 w-[283px]" data-node-id="1:3346">
                <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#141417] text-[15px] whitespace-nowrap" data-node-id="1:3347">
                  Continue with email
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[0] not-italic relative shrink-0 text-[15px] text-black text-center w-full" data-node-id="1:3348">
          <span className="leading-[normal] text-[#4a4a52]">Don’t have an account?</span>
          <span className="leading-[normal]">{` `}</span>
          <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] underline">Sign up</span>
        </p>
      </div>
      <div className="absolute content-stretch flex gap-[91px] items-center left-[25px] top-[24px] w-[519px]" data-node-id="1:3349">
        <div className="content-stretch flex items-center opacity-0 relative shrink-0" data-node-id="1:3350">
          <div className="relative shrink-0 size-[40px]" data-node-id="1:3351" data-name="Iconsans/Linear/Cross">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearCross} />
          </div>
        </div>
        <p className="[word-break:break-word] flex-[1_0_0] font-['Be_Vietnam_Pro:Bold'] leading-[0] min-w-px not-italic relative text-[#141417] text-[0px] text-center" data-node-id="1:3354">
          <span className="font-['Playfair:ExtraBold'] font-extrabold leading-[normal] text-[35.368px] tracking-[-1.7684px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            Daily
          </span>
          <span className="font-['Playfair:Black'] font-black leading-[normal] text-[47.158px] tracking-[-2.3579px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            Ma
          </span>
          <span className="font-['Playfair:Black'] font-black leading-[normal] text-[47.158px] tracking-[-3.7726px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            tt
          </span>
          <span className="font-['Playfair:Black'] font-black leading-[normal] text-[47.158px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            r
          </span>
          <span className="font-['Playfair:Black'] font-black leading-[normal] text-[#6b6b73] text-[47.158px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            ’
          </span>
          <span className="font-['Playfair:Black'] font-black leading-[normal] text-[47.158px]" style={{ fontVariationSettings: '"opsz" 12, "wdth" 100' }}>
            .
          </span>
        </p>
        <div className="content-stretch flex items-center opacity-0 relative shrink-0" data-node-id="1:3355">
          <div className="relative shrink-0 size-[40px]" data-node-id="1:3356" data-name="Iconsans/Linear/Cross">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearCross} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

Design styles: Neutral 700 #1C1C1E, Neutral 0 #FFFFFF, Neutral 800 #141417, Neutral 200 #E5E5EA, Neutral 100 #F4F4F6.
