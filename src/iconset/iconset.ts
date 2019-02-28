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
import { IconsetRegistry } from './iconset-registry';

import { LitElement, property } from 'lit-element';

export class Iconset extends LitElement {
    public static is = 'sp-iconset';

    protected registered: boolean = false;

    private _name!: string;

    public constructor() {
        super();
        // force no display for all iconsets
        this.style.display = 'none';
    }

    /**
     * Name of the iconset, used by the IconsetRegistry to serve this icon set
     * to consuming icons.
     */
    @property()
    public set name(value: string) {
        // if we're already registered in the iconset registry
        // we'll need to update our registration
        if (this.registered) {
            if (this._name) {
                // remove from the iconset map using the old name
                IconsetRegistry.getInstance().removeIconset(this._name);
            }

            if (value) {
                // set in the map using the new name
                IconsetRegistry.getInstance().addIconset(value, this);
            }
        }
        this._name = value;
    }
    public get name() {
        return this._name;
    }

    /**
     * Applies an icon to the given element
     */
    public applyIconToElement(
        el: HTMLElement,
        icon: string,
        size: string = ''
    ) {
        // inject the requested icon from the iconset into the element
        // add into the elements shadow dom if it has one
        throw new Error('Not implemented!');
    }

    /**
     * Returns a list of all icons in this iconset.
     */
    public getIconList(): string[] {
        throw new Error('Not implemented!');
    }

    /**
     * On updated we register the iconset if we're not already registered
     */
    public updated(
        _changedProperties: Map<string | number | symbol, unknown>
    ): void {
        if (!this.name || this.registered) {
            return;
        }
        IconsetRegistry.getInstance().addIconset(this.name, this);
        this.registered = true;
    }
    /**
     * On disconnected we remove the iconset
     */
    public disconnectedCallback() {
        super.disconnectedCallback();

        if (!this.name) {
            return;
        }
        IconsetRegistry.getInstance().removeIconset(this.name);
        this.registered = false;
    }
}
