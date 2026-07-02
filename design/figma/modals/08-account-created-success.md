# Account created successfully — auth drawer — overlay node 1:4926 "Frame 180" (564x1196), body node 1:4927 (386x312 at x=89, y=148)

Shown on Newsletter variant frame 1:4553. Same auth drawer chrome (bg #F4F4F6, DailyMattr'. wordmark header) as 05-login.md; the body is a success message.

- 96px green tick-circle (Success/Dark #0E9F5A) — same asset as icon-tick-circle-success-96.svg
- Title: "Account created successfully" — Be Vietnam Pro Medium 24px, tracking -0.72px, #141417, centered
- Sub: "Your Mattr account is ready. You can now build your edition, subscribe to newsletters, and manage preferences anytime." — Be Vietnam Pro Regular 18px / 1.46, #6B6B73
- CTA: "Continue" — dark pill bg #1C1C1E, border rgba(255,255,255,0.1), radius 50, px-24 py-15, Roboto SemiBold 15px white, shadow 0 6 25 rgba(0,0,0,0.25)

## Figma design context — body only (node 1:4927, verbatim)

```jsx
const imgIconsansLinearTickCircle = "https://www.figma.com/api/mcp/asset/0c202322-3bdc-4775-85ee-3461dd6f4868";

function IconsansLinearTickCircle({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[96px]"} data-node-id="1:46" data-name="Iconsans/Linear/Tick-Circle">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconsansLinearTickCircle} />
    </div>
  );
}

export default function Frame192() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative size-full" data-node-id="1:4927">
      <IconsansLinearTickCircle className="relative shrink-0 size-[96px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-center not-italic relative shrink-0 text-center w-full" data-node-id="1:4929">
        <p className="font-['Be_Vietnam_Pro:Medium'] leading-[normal] relative shrink-0 text-[#141417] text-[24px] tracking-[-0.72px] w-full" data-node-id="1:4930">
          Account created successfully
        </p>
        <p className="font-['Be_Vietnam_Pro:Regular'] leading-[1.46] relative shrink-0 text-[#6b6b73] text-[18px] w-full" data-node-id="1:4931">
          Your Mattr account is ready. You can now build your edition, subscribe to newsletters, and manage preferences anytime.
        </p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-node-id="1:4932">
        <div className="bg-[#1c1c1e] border border-[rgba(255,255,255,0.1)] border-solid content-stretch flex items-center justify-center overflow-clip px-[24px] py-[15px] relative rounded-[50px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.25)] shrink-0" data-node-id="1:4933">
          <p className="[word-break:break-word] font-['Roboto:SemiBold'] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:4934" style={{ fontVariationSettings: '"wdth" 100' }}>
            Continue
          </p>
        </div>
      </div>
    </div>
  );
}
```

Design styles: Success/Dark #0E9F5A, Neutral 0 #FFFFFF, Neutral 800 #141417, Neutral 500 #6B6B73, Neutral 700 #1C1C1E.
