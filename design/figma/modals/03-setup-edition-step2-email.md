# Setup edition — Step 2 of 2 (Where should we send it?) — node 1:2528 "Frame 251" (589x992)

Right-side drawer on Newsletter variant frame 1:2155. Same drawer chrome as step 1 (bg #F4F4F6, bordered header, white footer bar) but the body shows: a review list of chosen editions (bordered rounded list, radius 16, border #D1D1D6), then "Where should we send it?" name + email inputs and a consent checkbox row. Footer CTA "Confirm subscription" is ACTIVE (bg #141417, white text).

Local asset map (downloaded to /public/figma/):
- imgIconsansLinearTick → icon-tick-24.svg (consent checkbox tick)
- imgIconsansLinearCross → icon-cross-32.svg (header close X)

## Figma design context (verbatim)

```jsx
const imgIconsansLinearTick = "https://www.figma.com/api/mcp/asset/ace4f995-9081-41d4-930a-48c6f42cb872";
const imgIconsansLinearCross = "https://www.figma.com/api/mcp/asset/1630da14-b6bf-4fad-a4d1-56231977bd17";

function IconsansLinearTick({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="1:42" data-name="Iconsans/Linear/Tick">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTick} />
    </div>
  );
}

function IconsansLinearCross({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[32px]"} data-node-id="1:36" data-name="Iconsans/Linear/Cross">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearCross} />
    </div>
  );
}

export default function Frame251() {
  return (
    <div className="bg-[#f4f4f6] relative size-full" data-node-id="1:2528">
      <div className="absolute border-[#e5e5ea] border-b border-solid content-stretch flex flex-col items-start left-0 px-[32px] py-[16px] top-[20px] w-[589px]" data-node-id="1:2529">
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:2530">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:2531">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[15px] tracking-[1.5px] whitespace-nowrap" data-node-id="1:2532">
              STEP 2 OF 2
            </p>
            <IconsansLinearCross className="relative shrink-0 size-[32px]" />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-node-id="1:2534">
            <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[21px] w-full" data-node-id="1:2535">
              Set up your edition
            </p>
            <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[15px] w-full" data-node-id="1:2536">
              Choose how you want to receive each topic.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white border-[#e5e5ea] border-solid border-t content-stretch flex flex-col h-[201px] items-start left-0 px-[32px] py-[16px] top-[752px] w-[589px]" data-node-id="1:2537">
        <div className="bg-[#141417] content-stretch flex h-[50px] items-center justify-center pl-[24px] pr-[8px] py-[15px] relative rounded-[35px] shrink-0 w-full" data-node-id="1:2538" data-name="Btn">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:2539">
            Confirm subscription
          </p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[17px] items-center left-0 top-[175px] w-[589px]" data-node-id="1:2540">
        <div className="content-stretch flex flex-col items-start px-[32px] relative shrink-0 w-full" data-node-id="1:2541">
          <div className="border border-[#d1d1d6] border-solid content-stretch flex flex-col items-start relative rounded-[16px] shrink-0 w-full" data-node-id="1:2542">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="1:2543">
              <div className="border-[#d1d1d6] border-b border-solid content-stretch flex items-center px-[16px] py-[12.5px] relative shrink-0 w-full" data-node-id="1:2544">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:2545">
                  <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:2546">
                    Money Moves
                  </p>
                  <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:2547">
                    Weekly Round-up · 5 headlines every Thursday
                  </p>
                </div>
              </div>
              <div className="content-stretch flex items-center px-[16px] py-[12.5px] relative shrink-0 w-full" data-node-id="1:2548">
                <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:2549">
                  <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[18px] w-full" data-node-id="1:2550">{`Technology & AI`}</p>
                  <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:2551">
                    Weekly Round-up · 5 headlines every Friday
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:2552">
          <div className="content-stretch flex items-center px-[32px] py-[16px] relative shrink-0 w-full" data-node-id="1:2553">
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Roboto:Medium'] font-medium justify-center leading-[0] min-w-px relative text-[18px] text-black" data-node-id="1:2554" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[23.814px]">Where should we send it?</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[16px] h-[192px] items-start relative shrink-0 w-full" data-node-id="1:2555">
            <div className="content-stretch flex flex-col gap-[12px] items-start px-[32px] relative shrink-0 w-full" data-node-id="1:2556">
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#1c1c1e] text-[15px] w-full" data-node-id="1:2557" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[normal]">Your preferred name</p>
              </div>
              <div className="border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex items-center pl-[24px] pr-[32px] py-[15px] relative rounded-[12px] shrink-0 w-full" data-node-id="1:2558" data-name="Input feild">
                <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] min-w-px relative text-[#6b6b73] text-[16px]" data-node-id="1:2559" style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[23.814px]">What should we call you?</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start px-[32px] relative shrink-0 w-full" data-node-id="1:2560">
              <div className="[word-break:break-word] flex flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] relative shrink-0 text-[#1c1c1e] text-[15px] w-full" data-node-id="1:2561" style={{ fontVariationSettings: '"wdth" 100' }}>
                <p className="leading-[normal]">Email address</p>
              </div>
              <div className="border border-[rgba(0,0,0,0.1)] border-solid content-stretch flex items-center pl-[24px] pr-[32px] py-[15px] relative rounded-[12px] shrink-0 w-full" data-node-id="1:2562" data-name="Input feild">
                <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] min-w-px relative text-[#6b6b73] text-[16px]" data-node-id="1:2563" style={{ fontVariationSettings: '"wdth" 100' }}>
                  <p className="leading-[23.814px]">Enter your email address</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[8px] items-center px-[32px] relative shrink-0 w-full" data-node-id="1:2564">
            <IconsansLinearTick className="relative shrink-0 size-[24px]" />
            <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Roboto:Regular'] font-normal justify-center leading-[0] min-w-px relative text-[#4a4a52] text-[13px]" data-node-id="1:2566" style={{ fontVariationSettings: '"wdth" 100' }}>
              <p className="leading-[23.814px]">I agree to receive Mattr newsletters. Unsubscribe anytime.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Design styles: Neutral 500 #6B6B73, Primery #000D26, Neutral 800 #141417, Neutral 600 #4A4A52, Neutral 200 #E5E5EA, Neutral 0 #FFFFFF, Neutral 300 #D1D1D6, Neutral 100 #F4F4F6.
