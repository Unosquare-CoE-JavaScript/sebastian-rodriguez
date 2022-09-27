# Website Accessibility

## Introduction

- Accesibility can be a vague term and many people don't know well what is accessibility
- Making a web accessible it's make a website for people with disabilitites. "Web accessibility means that people with disabilities can use the web". That means that people with disabilities can:
  - Perceive
  - Understand
  - Navigate
  - Interact
- Accesibility means empathy
- Similar fields:
  - Web Performance
  - I18n
  - UI Design
- Some stadistics:
  - 26% adults in US have some kind of dissability
  - 2 of 5 adults 65 >= older have a disability
  - ...
- Types of dissabilites:
  - Mobility and physical
  - Cognitive and neurological
  - Visual
  - Hearing
- We spend extra time when we are not making our websites inaccessibles.
- Reasons developers should learn accessibility:
  - It's fun
  - We're the ones making it inaccessible
  - Human rights
  - Legal issues
  - Reach a larger audience
  - Impactful
  - Makes you a specialist
- Ways people use the web
  - Keyboard
    - Are your website available to use keyboard only?
  - Head Wand
  - Mouth Stick
  - Single Switch
  - Screen Reader
- Curb cut effect, in it's essence, asserts that an investment in one group can cascade out and up and be a substantial investment in the broader well-being of a nation.

### Accesibility Standards

- Web Content Accessibility Guidelines (WCAG)
  - WCAG specifies three different comformance levels they are:
    - A (Lowest)
    - AA (Mid range)
    - AAA (Highest)
  - A level sets a minimum level of accessibility and does not archieve broad accessibility for many situations. For thes reason, UC recommends AA comformance for all Web-based information
- WebAIM
  - It provides a handy checklist with their recommendations
  - WebAIM specifies that accessible websites should be:
    - Perceivable
    - Operable
    - Understandable
    - Robust

## Screen Readers

- Screen readers convert digital text into synthesized speech. They empower users to hear content and navigate with the keyboard. THe technology helps people who are blind or who have low vision to use information technology with the same level of independence and privacy as anyone else.
- What all they let you do:
  - Read all content
  - Display a list of links
  - Display a list of headings
- Popular Screen Readers
  - JAWS
  - NVDA
  - VoiceOver
- **Alternative Text**
  - By default, when a screen reader enconters an image, if it can't find alt text it will read aloud the file's name.
  - This gets specially tricky for user generated images which often get hashed filenames
  - Empty alt text image are skipped by screen readers
  - Search engines also make use of alt text. For years SEO shops have sggested stuffing the keywords you want to rank for into alt text wherever possible. THis provides a very bad accessibility experience.

## Accessible HTML

- Semantic Elements:
  - Some elements have semantic meaning but no special functionality. Examples are:
    - aside
    - footer
    - header
  - Other's provide a lot of built-in functionality:
    - button
    - input
    - textare
  - Labels:
    - Form fields can be confusing for screen reader users. There are many ways to label form fields so the label is read out loud whenever the field has focus
    - Visual only labels:
      - A common pattern is using div's or paragraph tags to label form fields.
      - Another cool trick you can do is wrap your inputs with the label tag. This is called **implicit labelling**.
    - Limitations with the \<label\> tag
      - The label tag can only works with *labelable* elements. Those include:
        - button
        - input
        - keygen
        - meter
        - output
        - progress
        - select
        - textarea
      - If you ever need to label an element not in that list, use **aria-label** instead.
        - ```<div aria-label="Interactive div">Hello</div>```
    - Screen reader only content
      - Sometimes you'll want to communicate with a screen reader directly! one cool example is announcing to screen reader users that you offer accessibility features! In that case you can make some HTML and wrap it in a **visually hidden class**.

## Aria

- Accessible Rich Internet Applications (ARIA) are a set of attributes that define ways to make web content and web applications (specially thoase developed with Javascript) more accessible to people with disabilities.
  - Labels:
    - THe ARIA spec provides us with great tools for labeling and describing any element we want. They are:
      - aria-label
      - aria-labelledby
      - aria-describedby
  - Roles, States and Properties
    - ARIA also provides roles which can be applied to any element. Examples include:
      - button
      - checkbox
      - tree
      - banner
      - aria-autocomplete
      - aria-haspopup
  - Live Regions
    - For cases where important information could be coming in at any time, the ARIA spec provides the ability to mark an element as containing live data so that screen readers can read out updates as they come.
    - For this cases we use **aria-live=assertive**. You can pass:
      - assertive: will interrupt whatever it's doing to announce
      - polite: will announce the live region update when it next idles
      - off: will not read the update

## Focus Management

- Keyboard only users
  - As users navigate around using only the keyboard , focus rigs provide necessary clue as to the currently active item
  - Keyboard Shortcuts:
    - There are curb cut examples.
    - Empowers both keyboard only users and power users!
  - Skip Links
    - This helps users skip over large headers and navigation and jump right into the "main" content of your site. When a user hits tab for the first time, a button will appear and offer users to jump right to the main section.