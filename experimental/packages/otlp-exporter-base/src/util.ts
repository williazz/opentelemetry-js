/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { diag } from '@opentelemetry/api';

/**
 * Parses headers from config leaving only those that have defined values
 * @param partialHeaders
 */
export function validateAndNormalizeHeaders(
  partialHeaders: (() => Record<string, string>) | undefined
): () => Record<string, string> {
  return () => {
    const headers: Record<string, string> = {};
    Object.entries(partialHeaders?.() ?? {}).forEach(([key, value]) => {
      if (typeof value !== 'undefined') {
        headers[key] = String(value);
      } else {
        diag.warn(
          `Header "${key}" has invalid value (${value}) and will be ignored`
        );
      }
    });
    return headers;
  };
}
