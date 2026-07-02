# Setup edition — Step 1 with delivery-day picker — overlay node 1:1608 (589x992), card node 1:1618 (525x356)

Shown on Newsletter variant frames 1:1235 (both cards Thursday) and 1:1695 (second card Friday) — same design, different selection state.
The overall panel is identical to 01-setup-edition-step1.md (bg #F4F4F6, header "STEP 1 OF 2 / Set up your edition" — here with a 32px close X icon at the header's right — and footer "Review 2 editions" button) except each topic card is the EXPANDED version below (Weekly Round-up selected → shows "Choose a delivery day" weekday pills). Cards here are 525px wide at x=32 (panel is taller: 992px; card 1 at y=155, card 2 at y=371+155... cards stacked with 15px gap inside Frame 228 at x=32,y=155).

Card anatomy differences vs collapsed card:
- Card header row: topic title + 28px close (X) icon (removes the topic).
- Selected option row has bg #F4F4F6 + border #1C1C1E (vs plain border #E5E5EA when unselected).
- "CHOOSE A DELIVERY DAY" label: Be Vietnam Pro SemiBold 13px uppercase #6B6B73.
- Weekday pills Mon–Sun: px-16 py-8, radius 40; default bg #F4F4F6 border #E5E5EA text #1C1C1E 13px Medium; SELECTED pill bg #141417 border #141417 text white.
- Confirmation line: Be Vietnam Pro Medium 13px #2563EB.

Local asset map (downloaded to /public/figma/):
- imgIconsansLinearCross → icon-cross-28.svg (close X)
- imgIconsansLinearTickCircle → icon-tick-circle-unselected.svg (same as in 01)
- imgIconsansLinearTickCircle1 → icon-tick-circle-selected-dark.svg (selected state on the highlighted row)

## Figma design context for one expanded topic card (node 1:1618, verbatim)

```jsx
const imgIconsansLinearCross = "https://www.figma.com/api/mcp/asset/5b568921-50a3-460c-b786-44a01e682609";
const imgIconsansLinearTickCircle = "https://www.figma.com/api/mcp/asset/3cb245e2-042b-4852-8288-b24e95109cf8";
const imgIconsansLinearTickCircle1 = "https://www.figma.com/api/mcp/asset/4e259558-ca83-43b6-8ef2-d72a0a69e058";

function IconsansLinearCross({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[28px]"} data-node-id="1:39" data-name="Iconsans/Linear/Cross">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearCross} />
    </div>
  );
}

export default function Frame224() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] size-full" data-node-id="1:1618">
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="1:1619">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[15px] text-black whitespace-nowrap" data-node-id="1:1620">{`Technology & AI`}</p>
        <IconsansLinearCross className="relative shrink-0 size-[28px]" />
      </div>
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="1:1622">
        <div className="border border-[#e5e5ea] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[11px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:1623">
          <div className="relative shrink-0 size-[24px]" data-node-id="1:1624" data-name="Iconsans/Linear/Tick-Circle">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle} />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:1627">
            <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[15px] w-full" data-node-id="1:1628">
              Daily Deep Dive
            </p>
            <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:1629">
              1 detailed story every day
            </p>
          </div>
        </div>
        <div className="bg-[#f4f4f6] border border-[#1c1c1e] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[11px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:1630">
          <div className="relative shrink-0 size-[24px]" data-node-id="1:1631" data-name="Iconsans/Linear/Tick-Circle">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle1} />
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:1634">
            <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[15px] w-full" data-node-id="1:1635">
              Weekly Round-up
            </p>
            <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:1636">
              5 key headlines once a week
            </p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-node-id="1:1637">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] uppercase whitespace-nowrap" data-node-id="1:1638">
          Choose a delivery day
        </p>
        <div className="content-start flex flex-wrap gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:1639">
          <div className="bg-[#f4f4f6] border border-[#e5e5ea] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:1640">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[13px] whitespace-nowrap" data-node-id="1:1641">
              Mon
            </p>
          </div>
          <div className="bg-[#f4f4f6] border border-[#e5e5ea] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:1642">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[13px] whitespace-nowrap" data-node-id="1:1643">
              Tue
            </p>
          </div>
          <div className="bg-[#f4f4f6] border border-[#e5e5ea] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:1644">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[13px] whitespace-nowrap" data-node-id="1:1645">
              Wed
            </p>
          </div>
          <div className="bg-[#141417] border border-[#141417] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:1646">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap" data-node-id="1:1647">
              Thu
            </p>
          </div>
          <div className="bg-[#f4f4f6] border border-[#e5e5ea] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:1648">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[13px] whitespace-nowrap" data-node-id="1:1649">
              Fri
            </p>
          </div>
          <div className="bg-[#f4f4f6] border border-[#e5e5ea] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:1650">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[13px] whitespace-nowrap" data-node-id="1:1651">
              Sat
            </p>
          </div>
          <div className="bg-[#f4f4f6] border border-[#e5e5ea] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative rounded-[40px] shrink-0" data-node-id="1:1652">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[13px] whitespace-nowrap" data-node-id="1:1653">
              Sun
            </p>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#2563eb] text-[13px] w-full whitespace-pre-wrap" data-node-id="1:1654">{`You will receive 5  Money Moves Headlines  every Thursday`}</p>
    </div>
  );
}
```

Design styles: Primery #000D26, Neutral 300 #D1D1D6, Neutral 800 #141417, Neutral 600 #4A4A52, Neutral 200 #E5E5EA, Neutral 0 #FFFFFF, Neutral 100 #F4F4F6, Neutral 700 #1C1C1E, Neutral 500 #6B6B73, Info/Dark #2563EB.
