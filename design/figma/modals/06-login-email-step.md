# Log in — email entry step — overlay node 1:3732 "Frame 180" (564x1196), body node 1:3733 (283x210)

Shown on Newsletter variant frame 1:3359. Same auth drawer chrome as 05-login.md (bg #F4F4F6, rounded-tl 12, centered DailyMattr'. Playfair wordmark header, body centered at w=283 / top=267). Only the body differs — email input + dark continue button:

- Title: "What's your email address?" (Be Vietnam Pro Medium 18px #1C1C1E, centered)
- Email input: pill (radius 60) bg white border #E5E5EA, px-24 py-14.5, placeholder "Enter your email address..." Be Vietnam Pro Regular 15px #6B6B73, w 283
- CTA: "Continue with email" pill bg #1C1C1E, white Be Vietnam Pro Medium 15px, w 283
- Footer: "Don't have an account? Sign up" (same as login)

## Figma design context — body only (node 1:3733, verbatim)

```jsx
export default function Frame189() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative size-full" data-node-id="1:3733">
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-node-id="1:3734">
        <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] min-w-full not-italic relative shrink-0 text-[#1c1c1e] text-[18px] text-center w-[min-content]" data-node-id="1:3735">
          What’s your email address?
        </p>
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-node-id="1:3736">
          <div className="bg-white border border-[#e5e5ea] border-solid content-stretch flex items-center px-[24px] py-[14.5px] relative rounded-[60px] shrink-0 w-[283px]" data-node-id="1:3737">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Regular'] leading-[normal] not-italic relative shrink-0 text-[#6b6b73] text-[15px] whitespace-nowrap" data-node-id="1:3738">
              Enter your email address...
            </p>
          </div>
          <div className="bg-[#1c1c1e] content-stretch flex items-center justify-center px-[10px] py-[14.5px] relative rounded-[60px] shrink-0 w-[283px]" data-node-id="1:3739">
            <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap" data-node-id="1:3740">
              Continue with email
            </p>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Be_Vietnam_Pro:Medium'] leading-[0] min-w-full not-italic relative shrink-0 text-[15px] text-black text-center w-[min-content]" data-node-id="1:3741">
        <span className="leading-[normal] text-[#4a4a52]">Don’t have an account?</span>
        <span className="leading-[normal]">{` `}</span>
        <span className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] underline">Sign up</span>
      </p>
    </div>
  );
}
```

Design styles: Neutral 700 #1C1C1E, Neutral 500 #6B6B73, Neutral 0 #FFFFFF, Neutral 200 #E5E5EA.
