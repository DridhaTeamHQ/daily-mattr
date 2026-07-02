# Setup edition — Step 1 of 2 (initial) — node 1:1193 "Frame 251" (589x820)

Right-side drawer panel (x=851, y=0 on the 1440 frame), shown on Newsletter variant frame 1:820 over a dark scrim ("Rectangle 13", 1442x1894). Background #F4F4F6.
State: delivery option chosen for "Money Moves" (blue confirmation line) but not yet for "Technology & AI" (grey "Choose a delivery option to continue"); footer CTA "Review 2 editions" is in DISABLED style (bg #F4F4F6, text #6B6B73).

Local asset map (downloaded to /public/figma/):
- imgIconsansLinearTickCircle → icon-tick-circle-selected.svg (24px, selected radio state)
- imgIconsansLinearTickCircle1 → icon-tick-circle-unselected.svg (24px, unselected radio state)

## Figma design context (verbatim)

```jsx
const imgIconsansLinearTickCircle = "https://www.figma.com/api/mcp/asset/e1b6d39f-5db3-41b2-b1f4-25766dc0bf93";
const imgIconsansLinearTickCircle1 = "https://www.figma.com/api/mcp/asset/a912b615-1194-4285-8717-905fded478a8";

export default function Frame251() {
  return (
    <div className="bg-[#f4f4f6] relative size-full" data-node-id="1:1193">
      <div className="absolute border-[#e5e5ea] border-b border-solid content-stretch flex flex-col items-start left-0 px-[32px] py-[16px] top-0 w-[589px]" data-node-id="1:1194">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 w-full" data-node-id="1:1195">
          <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#6b6b73] text-[15px] tracking-[1.5px] w-full" data-node-id="1:1196">
            STEP 1 OF 2
          </p>
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="1:1197">
            <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[21px] w-full" data-node-id="1:1198">
              Set up your edition
            </p>
            <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[15px] w-full" data-node-id="1:1199">
              Choose how you want to receive each topic.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bg-white content-stretch flex flex-col gap-[19px] items-start left-[41px] p-[24px] rounded-[16px] top-[147px] w-[511px]" data-node-id="1:1200">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[15px] text-black w-full" data-node-id="1:1201">
          Money Moves
        </p>
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="1:1202">
          <div className="border border-[#e5e5ea] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[11px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:1203">
            <div className="relative shrink-0 size-[24px]" data-node-id="1:1204" data-name="Iconsans/Linear/Tick-Circle">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:1207">
              <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[15px] w-full" data-node-id="1:1208">
                Daily Deep Dive
              </p>
              <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:1209">
                1 detailed story every day
              </p>
            </div>
          </div>
          <div className="border border-[#e5e5ea] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[11px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:1210">
            <div className="relative shrink-0 size-[24px]" data-node-id="1:1211" data-name="Iconsans/Linear/Tick-Circle">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle1} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:1212">
              <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[15px] w-full" data-node-id="1:1213">
                Weekly Round-up
              </p>
              <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:1214">
                5 key headlines once a week
              </p>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#2563eb] text-[13px] w-full" data-node-id="1:1215">
          You will receive 1 detailed Money Moves story every day
        </p>
      </div>
      <div className="absolute bg-white content-stretch flex flex-col gap-[19px] items-start left-[41px] p-[24px] rounded-[16px] top-[414px] w-[511px]" data-node-id="1:1216">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[15px] text-black w-full" data-node-id="1:1217">{`Technology & AI`}</p>
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="1:1218">
          <div className="border border-[#e5e5ea] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[11px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:1219">
            <div className="relative shrink-0 size-[24px]" data-node-id="1:1220" data-name="Iconsans/Linear/Tick-Circle">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:1223">
              <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[15px] w-full" data-node-id="1:1224">
                Daily Deep Dive
              </p>
              <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:1225">
                1 detailed story every day
              </p>
            </div>
          </div>
          <div className="border border-[#e5e5ea] border-solid content-stretch flex gap-[12px] items-center px-[16px] py-[11px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:1226">
            <div className="relative shrink-0 size-[24px]" data-node-id="1:1227" data-name="Iconsans/Linear/Tick-Circle">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle1} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[normal] min-w-px not-italic relative" data-node-id="1:1228">
              <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#141417] text-[15px] w-full" data-node-id="1:1229">
                Weekly Round-up
              </p>
              <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[13px] w-full" data-node-id="1:1230">
                5 key headlines once a week
              </p>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] w-full" data-node-id="1:1231">
          Choose a delivery option to continue
        </p>
      </div>
      <div className="absolute bg-white border-[#e5e5ea] border-solid border-t content-stretch flex flex-col h-[94px] items-start left-0 px-[32px] py-[16px] top-[726px] w-[589px]" data-node-id="1:1232">
        <div className="bg-[#f4f4f6] content-stretch flex h-[50px] items-center justify-center pl-[24px] pr-[8px] py-[15px] relative rounded-[35px] shrink-0 w-full" data-node-id="1:1233" data-name="Btn">
          <p className="[word-break:break-word] font-['Be_Vietnam_Pro:SemiBold'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[15px] whitespace-nowrap" data-node-id="1:1234">
            Review 2 editions
          </p>
        </div>
      </div>
    </div>
  );
}
```

Design styles: Neutral 500 #6B6B73, Neutral 800 #141417, Neutral 600 #4A4A52, Neutral 200 #E5E5EA, Neutral 300 #D1D1D6, Info/Dark #2563EB, Neutral 100 #F4F4F6, Neutral 0 #FFFFFF.

Related fill states (same design, do not re-implement):
- Frame 1:1235 (overlay 1:1608, 589x992) — same step 1 but each topic card expanded with a "Choose a delivery day" weekday segmented row (S M T W T F S pills) and a close (X) icon in the header and per-card; confirmation line "You will receive 5 Money Moves Headlines every Thursday".
- Frame 1:1695 (overlay 1:2068) — identical to 1:1608 with Friday selected on second card.
See 02-setup-edition-step1-delivery-days.md for the expanded variant.
