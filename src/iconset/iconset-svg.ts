/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, query, TemplateResult } from 'lit-element';

import { Iconset } from './iconset';

export class IconsetSVG extends Iconset {
    public static is = 'sp-iconset-svg';
    private iconMap: Map<string, SVGSymbolElement> = new Map();

    @query('slot')
    private slotContainer?: HTMLSlotElement;

    /**
     * First updated handler just ensures we've processed any slotted symbols
     */
    public updated(changedProperties: Map<string | number | symbol, unknown>) {
        if (!this.slotContainer) {
            return;
        }
        const currentSVGNodes = this.getSVGNodes(this.slotContainer);
        this.updateSVG(currentSVGNodes);
        super.updated(changedProperties);
    }
    /**
     * Applies the requested icon from this iconset instance to the given element.
     *
     * @param el - the element to apply the icon to
     * @param icon - the name of the icon within this set to apply.
     */
    public applyIconToElement(el: HTMLElement, icon: string, size: string) {
        const iconSymbol = this.iconMap.get(icon);
        if (!iconSymbol) {
            throw new Error(`Unable to find icon ${icon}`);
        }
        // we cannot share a single SVG globally across shadowroot boundaries
        // so copy the template node so we can inject it where we need it
        const clonedNode = this.prepareSvgClone(iconSymbol);
        // append the svg to the node either in its shadowroot or directly into its dom
        if (el.shadowRoot) {
            el.shadowRoot.appendChild(clonedNode);
        } else {
            el.appendChild(clonedNode);
        }
    }

    /**
     * Returns a list of all icons in this iconset.
     */
    public getIconList(): string[] {
        return [...this.iconMap.keys()];
    }

    protected prepareSvgClone(sourceSvg: SVGSymbolElement) {
        const content = sourceSvg.cloneNode(true) as SVGSymbolElement;
        // we're going to create a new svg element that will have our symbol geometry inside
        const svg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'svg'
        );
        const viewBox = content.getAttribute('viewBox') || '';
        // inline style isn't ideal but will work in all cases and means our icons don't need to know
        // if they are svg or spritesheet provided
        const cssText =
            'pointer-events: none; display: block; width: 100%; height: 100%;';
        svg.style.cssText = cssText;
        // copy the viewbox and other properties into the svg
        svg.setAttribute('viewBox', viewBox);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.setAttribute('focusable', 'false');
        // move all the child nodes over to the svg
        while (content.childNodes.length > 0) {
            svg.appendChild(content.childNodes[0]);
        }
        return svg;
    }
    protected getSVGIconName(icon: string, size: string) {
        return icon;
    }
    protected getSanitizedIconName(icon: string) {
        return icon;
    }
    protected renderDefaultContent(): TemplateResult {
        return html``;
    }

    protected render(): TemplateResult {
        return html`
            <slot @slotchange=${this.onSlotChange}>
                ${this.renderDefaultContent()}
            </slot>
        `;
    }

    protected updateSVG(nodes: SVGElement[]) {
        // iterate over the nodes that were passed in, and find all the top level symbols
        const symbols = nodes.reduce(
            (prev, svgNode) => {
                const containedSymbols = svgNode.querySelectorAll('symbol');
                prev.push(...containedSymbols);
                return prev;
            },
            [] as SVGSymbolElement[]
        );
        symbols.forEach((symbol) => {
            this.iconMap.set(this.getSanitizedIconName(symbol.id), symbol);
        });
    }

    protected getSVGNodes(slotTarget: HTMLSlotElement) {
        const nodes = slotTarget.assignedNodes({ flatten: true });
        // find all the svg nodes
        const svgNodes = nodes.filter((node) => {
            return node.nodeName === 'svg';
        }) as SVGElement[];
        return svgNodes;
    }

    private onSlotChange(evt: Event) {
        const slotTarget = evt.target as HTMLSlotElement;
        const svgNodes = this.getSVGNodes(slotTarget);
        this.updateSVG(svgNodes);
    }
}
