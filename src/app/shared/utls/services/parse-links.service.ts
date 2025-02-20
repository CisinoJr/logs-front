/*
 Copyright 2013-2019 the original author or authors from the JHipster project.
 This file is part of the JHipster project, see https://www.jhipster.tech/
 for more information.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import { Injectable } from '@angular/core';

/**
 * An utility service for link parsing.
 */
@Injectable({
  providedIn: 'root'
})
export class ParseLinks {
  constructor() { }

  /**
   * Method to parse the links
   */
  parse(header: string): any {
    if (header.length === 0) {
      throw new Error('input must not be of zero length');
    }

    // Split parts by comma
    const parts: string[] = header.split(',');
    const links: any = {};

    // Parse each part into a named link
    parts.forEach(p => {
      const section: string[] = p.split(';');

      if (section.length !== 2) {
        throw new Error('section could not be split on ";"');
      }

      const url: string = section[0].replace(/<(.*)>/, '$1').trim();
      const queryString: any = {};

      url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3));

      let page: any = queryString.page;

      if (typeof page === 'string') {
        page = parseInt(page, 10);
      }

      const name: string = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = page;
    });
    return links;
  }
}
