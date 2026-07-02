# Account panel — General tab — node 1:4517 "Frame 180" (564x1196)

Right-side account drawer shown on Newsletter variant frame 1:4144 (logged-in state). White background, rounded-tl 12.
Header: 56px avatar image + name "Albus Dumbledore" (Be Vietnam Pro Medium 21px #1C1C1E) + email (Regular 15px #4A4A52), bottom border #E5E5EA. Below it a tab row of pills: "General" ACTIVE (bg #141417, white 13px) and "My Editions" inactive (border #D1D1D6, text #6B6B73).
Body (top=175): three labeled read-only fields (label Be Vietnam Pro Medium 15px #4A4A52; value box border #D1D1D6 radius 16 p-16, value Be Vietnam Pro Regular 19px #1C1C1E) for User Name / Email / Mobile number, then right-aligned "Save Changes" dark pill (bg #1C1C1E, radius 50, Roboto SemiBold 15px white, shadow 0 6 25 rgba(0,0,0,0.15)).

Local asset map (downloaded to /public/figma/):
- imgFrame198 → avatar-account-56.png (user avatar)

## Figma design context (verbatim)

```jsx
const imgFrame198 = "https://www.figma.com/api/mcp/asset/9f8224f1-a9fd-4462-99de-a33c8f22f4bc";

export default function Frame180() {
  return (
    <div className="bg-white overflow-clip relative rounded-tl-[12px] size-full" data-node-id="1:4517">
      <div className="absolute border-[#e5e5ea] border-b border-solid content-stretch flex flex-col items-start left-0 top-0 w-[564px]" data-node-id="1:4518">
        <div className="bg-white content-stretch flex gap-[16px] h-[81px] items-center px-[32px] py-[16px] relative shrink-0 w-full" data-node-id="1:4519">
          <div className="relative shrink-0 size-[56px]" data-node-id="1:4520">
            <div className="absolute inset-[0_0_-0.89%_0]">
              <img alt="" className="block max-w-none size-full" src={imgFrame198} />
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-node-id="1:4525">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] not-italic relative shrink-0 w-[189px]" data-node-id="1:4526">
              <p className="font-['Be_Vietnam_Pro:Medium'] relative shrink-0 text-[#1c1c1e] text-[21px] w-full" data-node-id="1:4527">
                Albus Dumbledore
              </p>
              <p className="font-['Be_Vietnam_Pro:Regular'] relative shrink-0 text-[#4a4a52] text-[15px] w-full" data-node-id="1:4528">
                dumbledore@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex flex-col items-start px-[32px] py-[16px] relative shrink-0 w-full" data-node-id="1:4529">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="1:4530">
            <div className="bg-[#141417] border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:4531" data-name="Header Element">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap" data-node-id="1:4532">
                General
              </p>
            </div>
            <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center justify-center px-[12px] py-[8px] relative rounded-[100px] shrink-0" data-node-id="1:4533" data-name="Header Element">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[13px] whitespace-nowrap" data-node-id="I1:4533;278:5299">
                My Editions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[48px] items-start left-0 top-[175px] w-[564px]" data-node-id="1:4536">
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] py-[10px] relative shrink-0 w-full" data-node-id="1:4537">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:4538">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#4a4a52] text-[15px] w-full" data-node-id="1:4539">
              User Name
            </p>
            <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center p-[16px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:4540">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[19px] whitespace-nowrap" data-node-id="1:4541">
                Albus Dumbledore
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:4542">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#4a4a52] text-[15px] w-full" data-node-id="1:4543">
              Email
            </p>
            <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center p-[16px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:4544">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[19px] whitespace-nowrap" data-node-id="1:4545">
                dumbledore@gmail.com
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-node-id="1:4546">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[#4a4a52] text-[15px] w-full" data-node-id="1:4547">{`Mobile number `}</p>
            <div className="border border-[#d1d1d6] border-solid content-stretch flex items-center p-[16px] relative rounded-[16px] shrink-0 w-full" data-node-id="1:4548">
              <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1e] text-[19px] whitespace-nowrap" data-node-id="1:4549">
                9652791013
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex items-start justify-end px-[32px] relative shrink-0 w-full" data-node-id="1:4550">
          <div className="bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex items-center justify-center overflow-clip px-[24px] py-[15px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.15)] shrink-0" data-node-id="1:4551">
            <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:4552" style={{ fontVariationSettings: '"wdth" 100' }}>
              Save Changes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Design styles: Neutral 200 #E5E5EA, Neutral 500 #6B6B73, Neutral 700 #1C1C1E, Neutral 600 #4A4A52, Neutral 0 #FFFFFF, Neutral 800 #141417, Neutral 300 #D1D1D6.
