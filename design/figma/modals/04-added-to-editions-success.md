# Added to My Editions — success panel — node 1:2940 "Frame 251" (589x992)

Right-side drawer on Newsletter variant frame 1:2567. Subscription-confirmed state: big green tick-circle (96px, Success/Dark #0E9F5A), title, list of subscribed editions with blue delivery-day labels, primary dark pill CTA "Explore more topics" and secondary underlined "View my editions". Close X at top-right (32px, at x=509 y=42). Background #F4F4F6.

Local asset map (downloaded to /public/figma/):
- imgIconsansLinearTickCircle → icon-tick-circle-success-96.svg (large green success check)
- imgIconsansLinearCross → icon-cross-32.svg (same as in 03)

## Figma design context (verbatim)

```jsx
const imgIconsansLinearCross = "https://www.figma.com/api/mcp/asset/f9d294d3-253e-434c-a894-b7df6aedb923";
const imgIconsansLinearTickCircle = "https://www.figma.com/api/mcp/asset/dff0e824-5074-4049-89e5-adc1c053c1da";

function IconsansLinearCross({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[32px]"} data-node-id="1:49" data-name="Iconsans/Linear/Cross">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearCross} />
    </div>
  );
}

function IconsansLinearTickCircle({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[96px]"} data-node-id="1:46" data-name="Iconsans/Linear/Tick-Circle">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle} />
    </div>
  );
}

export default function Frame251() {
  return (
    <div className="bg-[#f4f4f6] relative size-full" data-node-id="1:2940">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-center left-[calc(50%-0.5px)] top-[149px] w-[494px]" data-node-id="1:2941">
        <IconsansLinearTickCircle className="relative shrink-0 size-[96px]" />
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center not-italic relative shrink-0 text-center w-full" data-node-id="1:2943">
          <p className="font-['Be_Vietnam_Pro:Medium'] leading-[normal] relative shrink-0 text-[#141417] text-[24px] tracking-[-0.72px] w-full" data-node-id="1:2944">
            Added to My Editions
          </p>
          <p className="font-['Be_Vietnam_Pro:Regular'] leading-[1.46] relative shrink-0 text-[#6b6b73] text-[18px] w-full" data-node-id="1:2945">
            You will recieve:
          </p>
        </div>
        <div className="content-stretch flex flex-col items-start px-[32px] relative shrink-0 w-full" data-node-id="1:2946">
          <div className="border border-[#d1d1d6] border-solid content-stretch flex flex-col items-start relative rounded-[16px] shrink-0 w-full" data-node-id="1:2947">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:2948">
              <div className="border-[#d1d1d6] border-b border-solid content-stretch flex items-center px-[16px] py-[12.5px] relative shrink-0 w-full" data-node-id="1:2949">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['Be_Vietnam_Pro:Medium'] items-center justify-between leading-[normal] min-w-px not-italic relative whitespace-nowrap" data-node-id="1:2950">
                  <p className="relative shrink-0 text-[#141417] text-[18px]" data-node-id="1:2951">
                    Money Moves
                  </p>
                  <p className="relative shrink-0 text-[#2563eb] text-[13px]" data-node-id="1:2952">
                    Every Thursday
                  </p>
                </div>
              </div>
              <div className="content-stretch flex items-center px-[16px] py-[12.5px] relative shrink-0 w-full" data-node-id="1:2953">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] font-['Be_Vietnam_Pro:Medium'] items-center justify-between leading-[normal] min-w-px not-italic relative whitespace-nowrap" data-node-id="1:2954">
                  <p className="relative shrink-0 text-[#141417] text-[18px]" data-node-id="1:2955">{`Technology & AI`}</p>
                  <p className="relative shrink-0 text-[#2563eb] text-[13px]" data-node-id="1:2956">
                    Every Friday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-[396px]" data-node-id="1:2957">
          <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-node-id="1:2958">
            <div className="bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip px-[24px] py-[15px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.15)]" data-node-id="1:2959">
              <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:2960" style={{ fontVariationSettings: '"wdth" 100' }}>{`Explore more topics `}</p>
            </div>
          </div>
          <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-node-id="1:2961">
            <div className="border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex flex-[1_0_0] items-center justify-center min-w-px overflow-clip px-[24px] py-[15px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)]" data-node-id="1:2962">
              <p className="[word-break:break-word] decoration-from-font decoration-solid font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[#141417] text-[15px] underline whitespace-nowrap" data-node-id="1:2963" style={{ fontVariationSettings: '"wdth" 100' }}>
                View my editions
              </p>
            </div>
          </div>
        </div>
      </div>
      <IconsansLinearCross className="absolute left-[509px] size-[32px] top-[42px]" />
    </div>
  );
}
```

Design styles: Success/Dark #0E9F5A, Neutral 0 #FFFFFF, Neutral 800 #141417, Neutral 500 #6B6B73, Info/Dark #2563EB, Neutral 300 #D1D1D6, Neutral 700 #1C1C1E, Primery #000D26, Neutral 100 #F4F4F6.
