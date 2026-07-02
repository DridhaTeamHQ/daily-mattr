# Account panel — My Editions tab — node 1:4125 "Frame 180" (564x2228)

Right-side account drawer on Newsletter variant frame 1:3752. Identical chrome to 09-account-panel-general.md (white bg, rounded-tl 12, avatar + "Albus Dumbledore" / "dumbledore@gmail.com" header, pill tab row) but with the tabs swapped: "General" inactive (border #D1D1D6, text #6B6B73) and "My Editions" ACTIVE (bg #141417, white text).

NOTE: In Figma this frame's body below the header is empty — the drawer frame is 2228px tall but only the 145px header carries content (the editions list content presumably scrolls the underlying page; see the modals/10-account-panel-my-editions.png screenshot for what is actually visible). Implement the My Editions tab body by reusing the edition review list pattern from 03/04 if needed.

Local asset map: imgFrame198 → avatar-account-56.png (same avatar as 09).

## Figma design context (verbatim)

```jsx
const imgFrame198 = "https://www.figma.com/api/mcp/asset/0a371f29-c25c-4db1-9b20-ed113daf9c84";

export default function Frame180() {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] size-full" data-node-id="1:4125">
      <div className="absolute border-[#e5e5ea] border-b border-solid content-stretch flex flex-col items-start left-0 top-0 w-[564px]" data-node-id="1:4126">
        <div className="bg-white content-stretch flex gap-[16px] h-[81px] items-center px-[32px] py-[16px] relative shrink-0 w-full" data-node-id="1:4127">
          <div className="relative shrink-0 size-[56px]" data-node-id="1:4128">
            <div className="absolute inset-[0_0_-0.89%_0]">
              <img alt="" className="block max-w-none size-full" src={imgFrame198} />
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-node-id="1:4133">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[189px]" data-node-id="1:4134">
              <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#1c1c1e] text-[21px] w-full" data-node-id="1:4135">
                Albus Dumbledore
              </p>
              <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[15px] w-full" data-node-id="1:4136">
                dumbledore@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col items-start px-[32px] py-[16px] relative shrink-0 w-full" data-node-id="1:4137">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:4138">
            <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:4139" data-name="Header Element">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:4139;278:5299">
                General
              </p>
            </div>
            <div className="bg-[#141417] border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:4140" data-name="Header Element">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap" data-node-id="1:4141">
                My Editions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```
