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

import { TemplateResult } from 'lit-element';

import { IconsetSVG } from '../iconset/iconset-svg';

import iconsSVG from './icons-large.svg.js';

export class IconsLarge extends IconsetSVG {
    public static is = 'sp-icons-large';

    constructor() {
        super();
        this.name = 'ui'; // default iconset name for these icons
    }

    protected renderDefaultContent(): TemplateResult {
        return iconsSVG;
    }
    /**
     * Overrides createIconName to make icon strings compatible with spectrum-icon id format
     * @param icon
     * @param size
     */
    protected getSVGIconName(icon: string) {
        return `spectrum-icon-${icon}`;
    }
    protected getSanitizedIconName(icon: string) {
        return icon.replace('spectrum-icon-', '');
    }
}
