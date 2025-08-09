🔤 Typography
Primary Fonts:
Display / Logo Font: Helvetica (ALL CAPS, spaced)

Body & UI Text: Graphik

Headlines/Subheads: Nunito Sans

Font Weights:
Use	Font Family	Weight	Notes
Logo	Helvetica	Regular	Letter spacing: 0.25em
Menu & Footer Nav	Helvetica	Regular	Font size: 1em
Hero Headline	Nunito Sans	Bold	Font size: 6.875em (desktop)
Subheadline Paragraph	Nunito Sans	Light (300)	Font size: 1.25em
Section Titles (Images)	Nunito Sans	Regular	Font size: 3.125em
Body Copy / Labels	Graphik	Various	Light (100), Bold, Italic etc.

🎨 Color Palette
Element	Color	Hex/RGB
Theme Blue	Primary	rgb(4, 0, 255)
Text (dark)	Primary Text	rgb(40, 40, 40)
Text (light)	Light Text	white
Footer Background	Light	white
Accent on Hover	Blue Hover	#0400ff

🧱 Layout Guidelines
Spacing
Use section padding of 2rem vertically for textual content.

Inner containers (like .subheadline-text) are centered and restricted to 42% width (desktop) and 80% (mobile).

Sections have 100vh height, enabling immersive full-screen scroll.

Use scroll-snap alignment for vertical scroll transitions.

Responsive Adjustments:
Mobile breakpoints start at 768px width

Headline reduces to 3.5em, subtext to 1.1em

Background circle reduces from 30em to 25em

🧩 Components
1. Header
Fixed top, hidden on scroll down.

Logo on left, nav links on right.

2. Hero Section (Circle Intro)
Large centered circle (150vmax) with clickable shrink interaction.

Hidden logo background fades in after animation.

3. Immersive Section
Blue background (#0400ff)

Right-aligned large headline text

Left-aligned supporting paragraph

4. Project Sections
Fullscreen image backgrounds (e.g., 1.png, 2.jpg)

Overlayed project name (Komorebi House, etc.) at bottom-left

5. Footer
Divided into 3 rows:

Top Row: Nav, Logo, Socials

Middle Row: Email field and WhatsApp CTA

Bottom Row: Copyright

🎬 Animation & Interaction
1. Circle Shrink Interaction
On click, circle shrinks to 25em (mobile) / 30em (desktop)

Menu appears

Logo fades in (gsap transition)

2. Section Fade-ins (on scroll)
Section opacity transitions from 0 to 1 as it enters viewport

Trigger point: 90% from top of viewport

3. Header Hide/Show
Hides when scrolling down

Reappears on scroll up after circle has been clicked

⚙️ Additional Notes for Figma Make
Tokens & Assets
Define text styles for:

Display / Headline

Body

Subheadline

Use auto-layout and frame constraints for responsive sections

Create components for:

Nav bar

Hero Circle

Footer Section

Section Heading

Create variants for mobile and desktop states

Embed images (e.g., 1.png, 2.jpg) with proper positioning (background fill)

Interaction Notes
Use Smart Animate or Figma’s Prototype → On Click interaction to mimic GSAP transitions (e.g., shrinking circle, fade-in sections)

Use scroll into view triggers to emulate ScrollTrigger-based fade-ins
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
