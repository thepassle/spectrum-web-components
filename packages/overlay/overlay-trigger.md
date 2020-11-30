## Description

An `<overlay-trigger>` element supports the delivery of temporary overlay content based on interaction with a persistant trigger element. Address an element prepared to receive accessible interactions (e.g. an `<sp-button>`, or `<button>`, etc.) to `slot="trigger"` and the content for display either via `click` or `hover`/`focus` interactions to `slot="click-content"` or `slot="hover-content"` respectively. A trigger element can be linked to the delivery of content intended for a single interaction or both. Content addressed to `slot="hover-content"` will be made available both when the mouse enters/leaves the target element as well as when focus enters/leaves the target elements to support receiving this content via keyboard and screen reader navigation. Be thoughtful with what content you address to `slot="hover-content"` as the content available via "hover" will be transient and non-interactive.

### Placement

When using the `placement` attribute of an `<overlay-trigger>` (`"top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"`), you can suggest to the overlay in which direction from the trigger the content should be made visible. When there is adequate room for the content to display in this direction, it will do so. When adequate room is not available, the overlaid content will calculate the direction in which is will have the most room to be displayed in and use that direction.

### Type

The `type` attribute of an `<overlay-trigger>` element outlines how the element's "click" content should appear in the tab order. `inline` will insert the overlay after the trigger; from here forward tabbing would target the next logical element and backward/shift tabbing to return to the target. `replace` will insert the overlay into the page as if it were the trigger; from here forward tabbing would target the next logical element and backward/shift tabbing would target the logical element prior to the target. Finally, `modal` will open the content in a tab order fully separate from the original content flow and trap the tab order within that content until the required interaction is complete.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/meter?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/overlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/meter?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/overlay)

```
yarn add @spectrum-web-components/overlay
```

Import the side-effectful registration of `<overlay-trigger>` via:

```
import '@spectrum-web-components/overlay/overlay-trigger.js';
```

When looking to leverage the `OverlayTrigger` base class as a type and/or for extension purposes, do so via:

```
import { OverlayTrigger } from '@spectrum-web-components/overlay';
```

## Examples

Here a default `<overlay-trigger>` manages content that is triggered by click and "hover" interactions.

```html
<overlay-trigger>
    <sp-button slot="trigger">Overlay Trigger</sp-button>
    <sp-popover slot="click-content" open>
        <sp-dialog size="small">
            <h2 slot="heading">Click content</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Auctor
            augue mauris augue neque gravida. Libero volutpat sed ornare arcu.
        </sp-dialog>
    </sp-popover>
    <sp-tooltip slot="hover-content" open>Hover Content</sp-tooltip>
</overlay-trigger>
```

### Click content only

This example only delivers content via the click interaction and leverages both `placement` and `type` attributes to customize the visual relationship of the content to the page and its position in the tab order.

```html
<overlay-trigger placement="top" type="replace">
    <sp-button slot="trigger">Overlay Trigger</sp-button>
    <sp-popover slot="click-content" open>
        <sp-dialog size="small">
            <h2 slot="heading">Click content</h2>
            An &lt;overlay-trigger&gt; can be used to manage either or both of
            the "click" and "hover" content slots that are made available. Here,
            content is only addressed to
            <code>slot="click-content"</code>
            ...
            <sp-button
                slot="button"
                onclick="javascript: this.dispatchEvent(new Event('close', {bubbles: true, composed: true}));"
            >
                I understand
            </sp-button>
        </sp-dialog>
    </sp-popover>
</overlay-trigger>
```

### "Hover" content only

Hover content can be customized via the `placement` attribute, however it not allowing secondary interactions the `type` attribute will not further customize its delivery.

```html
<overlay-trigger placement="right">
    <sp-button slot="trigger">Overlay Trigger</sp-button>
    <sp-tooltip slot="hover-content" open placement="right">
        Hover Content
    </sp-tooltip>
</overlay-trigger>
```

## Accessibility

When using an `<overlay-trigger>` element, it is important to be sure the that content you project into `slot="trigger"` is "interactive". This means that an element within that branch of DOM will be able to receive focus and said element will appropriately convert keyboard interactions to `click` events similar to what you find with `<a href="#">Anchors</a>`, `<button>Buttons</button>`, etc. You can find further reading on the subject of accessible keyboard interactions at [https://www.w3.org/WAI/WCAG21/Understanding/keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard).
