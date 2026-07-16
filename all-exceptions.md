# Comprehensive Client-Side JavaScript Runtime Exceptions Registry

This registry documents every single one of the **176 exceptions** captured during the Playwright live deployment audit on `https://taptogen.vercel.app/`.

## Exception Entry #1: Art Tag Generator - buildPass24UtilitySections Error

*   **URL:** [https://taptogen.vercel.app/tools/art-tag-generator/](https://taptogen.vercel.app/tools/art-tag-generator/)
*   **Tool Name:** Art Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass24UtilitySections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass24UtilitySections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/art-tag-generator/](https://taptogen.vercel.app/tools/art-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass24UtilitySections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24UtilitySections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:317:335)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![art-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/art-tag-generator-desktop.png)
    *   **Mobile:** ![art-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/art-tag-generator-mobile.png)

---

## Exception Entry #2: Character Name Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/character-name-generator/](https://taptogen.vercel.app/tools/character-name-generator/)
*   **Tool Name:** Character Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/character-name-generator/](https://taptogen.vercel.app/tools/character-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![character-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/character-name-generator-desktop.png)
    *   **Mobile:** ![character-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/character-name-generator-mobile.png)

---

## Exception Entry #3: Character Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/character-name-generator/](https://taptogen.vercel.app/tools/character-name-generator/)
*   **Tool Name:** Character Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/character-name-generator/](https://taptogen.vercel.app/tools/character-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![character-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/character-name-generator-desktop.png)
    *   **Mobile:** ![character-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/character-name-generator-mobile.png)

---

## Exception Entry #4: Art Tag Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/art-tag-generator/](https://taptogen.vercel.app/tools/art-tag-generator/)
*   **Tool Name:** Art Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/art-tag-generator/](https://taptogen.vercel.app/tools/art-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![art-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/art-tag-generator-desktop.png)
    *   **Mobile:** ![art-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/art-tag-generator-mobile.png)

---

## Exception Entry #5: Story Plot Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/story-plot-generator/](https://taptogen.vercel.app/tools/story-plot-generator/)
*   **Tool Name:** Story Plot Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/story-plot-generator/](https://taptogen.vercel.app/tools/story-plot-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![story-plot-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/story-plot-generator-desktop.png)
    *   **Mobile:** ![story-plot-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/story-plot-generator-mobile.png)

---

## Exception Entry #6: Story Plot Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/story-plot-generator/](https://taptogen.vercel.app/tools/story-plot-generator/)
*   **Tool Name:** Story Plot Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/story-plot-generator/](https://taptogen.vercel.app/tools/story-plot-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![story-plot-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/story-plot-generator-desktop.png)
    *   **Mobile:** ![story-plot-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/story-plot-generator-mobile.png)

---

## Exception Entry #7: Cipher Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/cipher-generator/](https://taptogen.vercel.app/tools/cipher-generator/)
*   **Tool Name:** Cipher Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/cipher-generator/](https://taptogen.vercel.app/tools/cipher-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![cipher-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/cipher-generator-desktop.png)
    *   **Mobile:** ![cipher-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/cipher-generator-mobile.png)

---

## Exception Entry #8: Bio Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/bio-generator/](https://taptogen.vercel.app/tools/bio-generator/)
*   **Tool Name:** Bio Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/bio-generator/](https://taptogen.vercel.app/tools/bio-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![bio-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/bio-generator-desktop.png)
    *   **Mobile:** ![bio-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/bio-generator-mobile.png)

---

## Exception Entry #9: Cipher Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/cipher-generator/](https://taptogen.vercel.app/tools/cipher-generator/)
*   **Tool Name:** Cipher Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/cipher-generator/](https://taptogen.vercel.app/tools/cipher-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![cipher-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/cipher-generator-desktop.png)
    *   **Mobile:** ![cipher-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/cipher-generator-mobile.png)

---

## Exception Entry #10: Bio Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/bio-generator/](https://taptogen.vercel.app/tools/bio-generator/)
*   **Tool Name:** Bio Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/bio-generator/](https://taptogen.vercel.app/tools/bio-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![bio-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/bio-generator-desktop.png)
    *   **Mobile:** ![bio-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/bio-generator-mobile.png)

---

## Exception Entry #11: Fantasy Language Generator - buildPass24FantasyLanguageSections Error

*   **URL:** [https://taptogen.vercel.app/tools/fantasy-language-generator/](https://taptogen.vercel.app/tools/fantasy-language-generator/)
*   **Tool Name:** Fantasy Language Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L652)
*   **Source Line Number:** Line 652
*   **Root Cause:** 
    The function `buildPass24FantasyLanguageSections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass24FantasyLanguageSections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/fantasy-language-generator/](https://taptogen.vercel.app/tools/fantasy-language-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass24FantasyLanguageSections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24FantasyLanguageSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:324:89)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![fantasy-language-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/fantasy-language-generator-desktop.png)
    *   **Mobile:** ![fantasy-language-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/fantasy-language-generator-mobile.png)

---

## Exception Entry #12: Email Tag Generator - buildPass24UtilitySections Error

*   **URL:** [https://taptogen.vercel.app/tools/email-tag-generator/](https://taptogen.vercel.app/tools/email-tag-generator/)
*   **Tool Name:** Email Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass24UtilitySections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass24UtilitySections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/email-tag-generator/](https://taptogen.vercel.app/tools/email-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass24UtilitySections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24UtilitySections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:317:335)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![email-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/email-tag-generator-desktop.png)
    *   **Mobile:** ![email-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/email-tag-generator-mobile.png)

---

## Exception Entry #13: Email Tag Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/email-tag-generator/](https://taptogen.vercel.app/tools/email-tag-generator/)
*   **Tool Name:** Email Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/email-tag-generator/](https://taptogen.vercel.app/tools/email-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![email-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/email-tag-generator-desktop.png)
    *   **Mobile:** ![email-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/email-tag-generator-mobile.png)

---

## Exception Entry #14: Fantasy Language Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/fantasy-language-generator/](https://taptogen.vercel.app/tools/fantasy-language-generator/)
*   **Tool Name:** Fantasy Language Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/fantasy-language-generator/](https://taptogen.vercel.app/tools/fantasy-language-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![fantasy-language-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/fantasy-language-generator-desktop.png)
    *   **Mobile:** ![fantasy-language-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/fantasy-language-generator-mobile.png)

---

## Exception Entry #15: Club Name Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/club-name-generator/](https://taptogen.vercel.app/tools/club-name-generator/)
*   **Tool Name:** Club Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/club-name-generator/](https://taptogen.vercel.app/tools/club-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![club-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/club-name-generator-desktop.png)
    *   **Mobile:** ![club-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/club-name-generator-mobile.png)

---

## Exception Entry #16: Club Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/club-name-generator/](https://taptogen.vercel.app/tools/club-name-generator/)
*   **Tool Name:** Club Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/club-name-generator/](https://taptogen.vercel.app/tools/club-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![club-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/club-name-generator-desktop.png)
    *   **Mobile:** ![club-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/club-name-generator-mobile.png)

---

## Exception Entry #17: Disc Jockey Names Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/disc-jockey-names-generator/](https://taptogen.vercel.app/tools/disc-jockey-names-generator/)
*   **Tool Name:** Disc Jockey Names Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/disc-jockey-names-generator/](https://taptogen.vercel.app/tools/disc-jockey-names-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![disc-jockey-names-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/disc-jockey-names-generator-desktop.png)
    *   **Mobile:** ![disc-jockey-names-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/disc-jockey-names-generator-mobile.png)

---

## Exception Entry #18: Invisible Text Generator - buildPass25TextSections Error

*   **URL:** [https://taptogen.vercel.app/tools/invisible-text-generator/](https://taptogen.vercel.app/tools/invisible-text-generator/)
*   **Tool Name:** Invisible Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L327)
*   **Source Line Number:** Line 327
*   **Root Cause:** 
    The function `buildPass25TextSections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass25TextSections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/invisible-text-generator/](https://taptogen.vercel.app/tools/invisible-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass25TextSections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass25TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:327:393)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![invisible-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/invisible-text-generator-desktop.png)
    *   **Mobile:** ![invisible-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/invisible-text-generator-mobile.png)

---

## Exception Entry #19: Invisible Text Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/invisible-text-generator/](https://taptogen.vercel.app/tools/invisible-text-generator/)
*   **Tool Name:** Invisible Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/invisible-text-generator/](https://taptogen.vercel.app/tools/invisible-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![invisible-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/invisible-text-generator-desktop.png)
    *   **Mobile:** ![invisible-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/invisible-text-generator-mobile.png)

---

## Exception Entry #20: Disc Jockey Names Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/disc-jockey-names-generator/](https://taptogen.vercel.app/tools/disc-jockey-names-generator/)
*   **Tool Name:** Disc Jockey Names Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/disc-jockey-names-generator/](https://taptogen.vercel.app/tools/disc-jockey-names-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![disc-jockey-names-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/disc-jockey-names-generator-desktop.png)
    *   **Mobile:** ![disc-jockey-names-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/disc-jockey-names-generator-mobile.png)

---

## Exception Entry #21: Flower Name Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/flower-name-generator/](https://taptogen.vercel.app/tools/flower-name-generator/)
*   **Tool Name:** Flower Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/flower-name-generator/](https://taptogen.vercel.app/tools/flower-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![flower-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flower-name-generator-desktop.png)
    *   **Mobile:** ![flower-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flower-name-generator-mobile.png)

---

## Exception Entry #22: Flower Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/flower-name-generator/](https://taptogen.vercel.app/tools/flower-name-generator/)
*   **Tool Name:** Flower Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/flower-name-generator/](https://taptogen.vercel.app/tools/flower-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![flower-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flower-name-generator-desktop.png)
    *   **Mobile:** ![flower-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flower-name-generator-mobile.png)

---

## Exception Entry #23: Flashcard Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/flashcard-generator/](https://taptogen.vercel.app/tools/flashcard-generator/)
*   **Tool Name:** Flashcard Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/flashcard-generator/](https://taptogen.vercel.app/tools/flashcard-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![flashcard-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flashcard-generator-desktop.png)
    *   **Mobile:** ![flashcard-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flashcard-generator-mobile.png)

---

## Exception Entry #24: Flashcard Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/flashcard-generator/](https://taptogen.vercel.app/tools/flashcard-generator/)
*   **Tool Name:** Flashcard Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/flashcard-generator/](https://taptogen.vercel.app/tools/flashcard-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![flashcard-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flashcard-generator-desktop.png)
    *   **Mobile:** ![flashcard-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/flashcard-generator-mobile.png)

---

## Exception Entry #25: College Name Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/college-name-generator/](https://taptogen.vercel.app/tools/college-name-generator/)
*   **Tool Name:** College Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/college-name-generator/](https://taptogen.vercel.app/tools/college-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![college-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/college-name-generator-desktop.png)
    *   **Mobile:** ![college-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/college-name-generator-mobile.png)

---

## Exception Entry #26: College Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/college-name-generator/](https://taptogen.vercel.app/tools/college-name-generator/)
*   **Tool Name:** College Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/college-name-generator/](https://taptogen.vercel.app/tools/college-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![college-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/college-name-generator-desktop.png)
    *   **Mobile:** ![college-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/college-name-generator-mobile.png)

---

## Exception Entry #27: Big Text Generator - buildPass22TextSections Error

*   **URL:** [https://taptogen.vercel.app/tools/big-text-generator/](https://taptogen.vercel.app/tools/big-text-generator/)
*   **Tool Name:** Big Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L287)
*   **Source Line Number:** Line 287
*   **Root Cause:** 
    The function `buildPass22TextSections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass22TextSections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/big-text-generator/](https://taptogen.vercel.app/tools/big-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass22TextSections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass22TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:287:350)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![big-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/big-text-generator-desktop.png)
    *   **Mobile:** ![big-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/big-text-generator-mobile.png)

---

## Exception Entry #28: Big Text Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/big-text-generator/](https://taptogen.vercel.app/tools/big-text-generator/)
*   **Tool Name:** Big Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/big-text-generator/](https://taptogen.vercel.app/tools/big-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![big-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/big-text-generator-desktop.png)
    *   **Mobile:** ![big-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/big-text-generator-mobile.png)

---

## Exception Entry #29: Album Name Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/album-name-generator/](https://taptogen.vercel.app/tools/album-name-generator/)
*   **Tool Name:** Album Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/album-name-generator/](https://taptogen.vercel.app/tools/album-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![album-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/album-name-generator-desktop.png)
    *   **Mobile:** ![album-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/album-name-generator-mobile.png)

---

## Exception Entry #30: Album Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/album-name-generator/](https://taptogen.vercel.app/tools/album-name-generator/)
*   **Tool Name:** Album Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/album-name-generator/](https://taptogen.vercel.app/tools/album-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![album-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/album-name-generator-desktop.png)
    *   **Mobile:** ![album-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/album-name-generator-mobile.png)

---

## Exception Entry #31: Css Grid Generator - renderPreviewCodeSuite Error

*   **URL:** [https://taptogen.vercel.app/tools/css-grid-generator/](https://taptogen.vercel.app/tools/css-grid-generator/)
*   **Tool Name:** Css Grid Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L7890)
*   **Source Line Number:** Line 7890
*   **Root Cause:** 
    The function `renderPreviewCodeSuite` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPreviewCodeSuite` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/css-grid-generator/](https://taptogen.vercel.app/tools/css-grid-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPreviewCodeSuite()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPreviewCodeSuite is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:2165:70)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![css-grid-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-grid-generator-desktop.png)
    *   **Mobile:** ![css-grid-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-grid-generator-mobile.png)

---

## Exception Entry #32: Hang Tag Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/hang-tag-generator/](https://taptogen.vercel.app/tools/hang-tag-generator/)
*   **Tool Name:** Hang Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/hang-tag-generator/](https://taptogen.vercel.app/tools/hang-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![hang-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hang-tag-generator-desktop.png)
    *   **Mobile:** ![hang-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hang-tag-generator-mobile.png)

---

## Exception Entry #33: Rubric Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/rubric-generator/](https://taptogen.vercel.app/tools/rubric-generator/)
*   **Tool Name:** Rubric Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/rubric-generator/](https://taptogen.vercel.app/tools/rubric-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![rubric-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/rubric-generator-desktop.png)
    *   **Mobile:** ![rubric-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/rubric-generator-mobile.png)

---

## Exception Entry #34: Rubric Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/rubric-generator/](https://taptogen.vercel.app/tools/rubric-generator/)
*   **Tool Name:** Rubric Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/rubric-generator/](https://taptogen.vercel.app/tools/rubric-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![rubric-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/rubric-generator-desktop.png)
    *   **Mobile:** ![rubric-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/rubric-generator-mobile.png)

---

## Exception Entry #35: Hang Tag Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/hang-tag-generator/](https://taptogen.vercel.app/tools/hang-tag-generator/)
*   **Tool Name:** Hang Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/hang-tag-generator/](https://taptogen.vercel.app/tools/hang-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![hang-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hang-tag-generator-desktop.png)
    *   **Mobile:** ![hang-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hang-tag-generator-mobile.png)

---

## Exception Entry #36: Css Grid Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/css-grid-generator/](https://taptogen.vercel.app/tools/css-grid-generator/)
*   **Tool Name:** Css Grid Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/css-grid-generator/](https://taptogen.vercel.app/tools/css-grid-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![css-grid-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-grid-generator-desktop.png)
    *   **Mobile:** ![css-grid-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-grid-generator-mobile.png)

---

## Exception Entry #37: Css Button Generator - renderCssButtonOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/css-button-generator/](https://taptogen.vercel.app/tools/css-button-generator/)
*   **Tool Name:** Css Button Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L4800)
*   **Source Line Number:** Line 4800
*   **Root Cause:** 
    The function `renderCssButtonOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderCssButtonOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/css-button-generator/](https://taptogen.vercel.app/tools/css-button-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderCssButtonOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderCssButtonOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:1116:5)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![css-button-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-button-generator-desktop.png)
    *   **Mobile:** ![css-button-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-button-generator-mobile.png)

---

## Exception Entry #38: Css Button Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/css-button-generator/](https://taptogen.vercel.app/tools/css-button-generator/)
*   **Tool Name:** Css Button Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/css-button-generator/](https://taptogen.vercel.app/tools/css-button-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![css-button-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-button-generator-desktop.png)
    *   **Mobile:** ![css-button-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/css-button-generator-mobile.png)

---

## Exception Entry #39: Pet Name Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/pet-name-generator/](https://taptogen.vercel.app/tools/pet-name-generator/)
*   **Tool Name:** Pet Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pet-name-generator/](https://taptogen.vercel.app/tools/pet-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pet-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-name-generator-desktop.png)
    *   **Mobile:** ![pet-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-name-generator-mobile.png)

---

## Exception Entry #40: Hash Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/hash-generator/](https://taptogen.vercel.app/tools/hash-generator/)
*   **Tool Name:** Hash Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/hash-generator/](https://taptogen.vercel.app/tools/hash-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![hash-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hash-generator-desktop.png)
    *   **Mobile:** ![hash-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hash-generator-mobile.png)

---

## Exception Entry #41: Pet Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/pet-name-generator/](https://taptogen.vercel.app/tools/pet-name-generator/)
*   **Tool Name:** Pet Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pet-name-generator/](https://taptogen.vercel.app/tools/pet-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pet-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-name-generator-desktop.png)
    *   **Mobile:** ![pet-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-name-generator-mobile.png)

---

## Exception Entry #42: Hash Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/hash-generator/](https://taptogen.vercel.app/tools/hash-generator/)
*   **Tool Name:** Hash Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/hash-generator/](https://taptogen.vercel.app/tools/hash-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![hash-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hash-generator-desktop.png)
    *   **Mobile:** ![hash-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hash-generator-mobile.png)

---

## Exception Entry #43: Old English Text Generator - buildOldEnglishStyles Error

*   **URL:** [https://taptogen.vercel.app/tools/old-english-text-generator/](https://taptogen.vercel.app/tools/old-english-text-generator/)
*   **Tool Name:** Old English Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L597)
*   **Source Line Number:** Line 597
*   **Root Cause:** 
    The function `buildOldEnglishStyles` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildOldEnglishStyles` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/old-english-text-generator/](https://taptogen.vercel.app/tools/old-english-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildOldEnglishStyles()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildOldEnglishStyles is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:276:204)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![old-english-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/old-english-text-generator-desktop.png)
    *   **Mobile:** ![old-english-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/old-english-text-generator-mobile.png)

---

## Exception Entry #44: Old English Text Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/old-english-text-generator/](https://taptogen.vercel.app/tools/old-english-text-generator/)
*   **Tool Name:** Old English Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/old-english-text-generator/](https://taptogen.vercel.app/tools/old-english-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![old-english-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/old-english-text-generator-desktop.png)
    *   **Mobile:** ![old-english-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/old-english-text-generator-mobile.png)

---

## Exception Entry #45: Geo Tag Generator - buildPass24UtilitySections Error

*   **URL:** [https://taptogen.vercel.app/tools/geo-tag-generator/](https://taptogen.vercel.app/tools/geo-tag-generator/)
*   **Tool Name:** Geo Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass24UtilitySections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass24UtilitySections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/geo-tag-generator/](https://taptogen.vercel.app/tools/geo-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass24UtilitySections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24UtilitySections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:317:335)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![geo-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/geo-tag-generator-desktop.png)
    *   **Mobile:** ![geo-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/geo-tag-generator-mobile.png)

---

## Exception Entry #46: Geo Tag Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/geo-tag-generator/](https://taptogen.vercel.app/tools/geo-tag-generator/)
*   **Tool Name:** Geo Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/geo-tag-generator/](https://taptogen.vercel.app/tools/geo-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![geo-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/geo-tag-generator-desktop.png)
    *   **Mobile:** ![geo-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/geo-tag-generator-mobile.png)

---

## Exception Entry #47: Dummy Data Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/dummy-data-generator/](https://taptogen.vercel.app/tools/dummy-data-generator/)
*   **Tool Name:** Dummy Data Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/dummy-data-generator/](https://taptogen.vercel.app/tools/dummy-data-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![dummy-data-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/dummy-data-generator-desktop.png)
    *   **Mobile:** ![dummy-data-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/dummy-data-generator-mobile.png)

---

## Exception Entry #48: Dummy Data Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/dummy-data-generator/](https://taptogen.vercel.app/tools/dummy-data-generator/)
*   **Tool Name:** Dummy Data Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/dummy-data-generator/](https://taptogen.vercel.app/tools/dummy-data-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![dummy-data-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/dummy-data-generator-desktop.png)
    *   **Mobile:** ![dummy-data-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/dummy-data-generator-mobile.png)

---

## Exception Entry #49: Clan Tag Generator - buildPass23UtilityGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/clan-tag-generator/](https://taptogen.vercel.app/tools/clan-tag-generator/)
*   **Tool Name:** Clan Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass23UtilityGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass23UtilityGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/clan-tag-generator/](https://taptogen.vercel.app/tools/clan-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass23UtilityGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23UtilityGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:307:301)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![clan-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/clan-tag-generator-desktop.png)
    *   **Mobile:** ![clan-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/clan-tag-generator-mobile.png)

---

## Exception Entry #50: Clan Tag Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/clan-tag-generator/](https://taptogen.vercel.app/tools/clan-tag-generator/)
*   **Tool Name:** Clan Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/clan-tag-generator/](https://taptogen.vercel.app/tools/clan-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![clan-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/clan-tag-generator-desktop.png)
    *   **Mobile:** ![clan-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/clan-tag-generator-mobile.png)

---

## Exception Entry #51: Emo Name Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/emo-name-generator/](https://taptogen.vercel.app/tools/emo-name-generator/)
*   **Tool Name:** Emo Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/emo-name-generator/](https://taptogen.vercel.app/tools/emo-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![emo-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/emo-name-generator-desktop.png)
    *   **Mobile:** ![emo-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/emo-name-generator-mobile.png)

---

## Exception Entry #52: Phonetic Spelling Of Name Generator - buildPass23UtilityGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/](https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/)
*   **Tool Name:** Phonetic Spelling Of Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass23UtilityGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass23UtilityGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/](https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass23UtilityGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23UtilityGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:307:301)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![phonetic-spelling-of-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/phonetic-spelling-of-name-generator-desktop.png)
    *   **Mobile:** ![phonetic-spelling-of-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/phonetic-spelling-of-name-generator-mobile.png)

---

## Exception Entry #53: Emo Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/emo-name-generator/](https://taptogen.vercel.app/tools/emo-name-generator/)
*   **Tool Name:** Emo Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/emo-name-generator/](https://taptogen.vercel.app/tools/emo-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![emo-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/emo-name-generator-desktop.png)
    *   **Mobile:** ![emo-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/emo-name-generator-mobile.png)

---

## Exception Entry #54: Phonetic Spelling Of Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/](https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/)
*   **Tool Name:** Phonetic Spelling Of Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/](https://taptogen.vercel.app/tools/phonetic-spelling-of-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![phonetic-spelling-of-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/phonetic-spelling-of-name-generator-desktop.png)
    *   **Mobile:** ![phonetic-spelling-of-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/phonetic-spelling-of-name-generator-mobile.png)

---

## Exception Entry #55: Name Pronunciation Generator - buildPass23UtilityGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/name-pronunciation-generator/](https://taptogen.vercel.app/tools/name-pronunciation-generator/)
*   **Tool Name:** Name Pronunciation Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass23UtilityGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass23UtilityGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/name-pronunciation-generator/](https://taptogen.vercel.app/tools/name-pronunciation-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass23UtilityGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23UtilityGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:307:301)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![name-pronunciation-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/name-pronunciation-generator-desktop.png)
    *   **Mobile:** ![name-pronunciation-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/name-pronunciation-generator-mobile.png)

---

## Exception Entry #56: Name Pronunciation Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/name-pronunciation-generator/](https://taptogen.vercel.app/tools/name-pronunciation-generator/)
*   **Tool Name:** Name Pronunciation Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/name-pronunciation-generator/](https://taptogen.vercel.app/tools/name-pronunciation-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![name-pronunciation-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/name-pronunciation-generator-desktop.png)
    *   **Mobile:** ![name-pronunciation-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/name-pronunciation-generator-mobile.png)

---

## Exception Entry #57: Pick A Name Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/pick-a-name-generator/](https://taptogen.vercel.app/tools/pick-a-name-generator/)
*   **Tool Name:** Pick A Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pick-a-name-generator/](https://taptogen.vercel.app/tools/pick-a-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pick-a-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pick-a-name-generator-desktop.png)
    *   **Mobile:** ![pick-a-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pick-a-name-generator-mobile.png)

---

## Exception Entry #58: Pick A Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/pick-a-name-generator/](https://taptogen.vercel.app/tools/pick-a-name-generator/)
*   **Tool Name:** Pick A Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pick-a-name-generator/](https://taptogen.vercel.app/tools/pick-a-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pick-a-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pick-a-name-generator-desktop.png)
    *   **Mobile:** ![pick-a-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pick-a-name-generator-mobile.png)

---

## Exception Entry #59: Brat Text Generator - buildPass25TextSections Error

*   **URL:** [https://taptogen.vercel.app/tools/brat-text-generator/](https://taptogen.vercel.app/tools/brat-text-generator/)
*   **Tool Name:** Brat Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L327)
*   **Source Line Number:** Line 327
*   **Root Cause:** 
    The function `buildPass25TextSections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass25TextSections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/brat-text-generator/](https://taptogen.vercel.app/tools/brat-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass25TextSections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass25TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:327:393)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![brat-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/brat-text-generator-desktop.png)
    *   **Mobile:** ![brat-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/brat-text-generator-mobile.png)

---

## Exception Entry #60: Brat Text Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/brat-text-generator/](https://taptogen.vercel.app/tools/brat-text-generator/)
*   **Tool Name:** Brat Text Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/brat-text-generator/](https://taptogen.vercel.app/tools/brat-text-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![brat-text-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/brat-text-generator-desktop.png)
    *   **Mobile:** ![brat-text-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/brat-text-generator-mobile.png)

---

## Exception Entry #61: Hashtag Generator - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/tools/hashtag-generator/](https://taptogen.vercel.app/tools/hashtag-generator/)
*   **Tool Name:** Hashtag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/hashtag-generator/](https://taptogen.vercel.app/tools/hashtag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderHashtagGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:706:5)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![hashtag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hashtag-generator-desktop.png)
    *   **Mobile:** ![hashtag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hashtag-generator-mobile.png)

---

## Exception Entry #62: Car Name Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/car-name-generator/](https://taptogen.vercel.app/tools/car-name-generator/)
*   **Tool Name:** Car Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/car-name-generator/](https://taptogen.vercel.app/tools/car-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![car-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/car-name-generator-desktop.png)
    *   **Mobile:** ![car-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/car-name-generator-mobile.png)

---

## Exception Entry #63: Car Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/car-name-generator/](https://taptogen.vercel.app/tools/car-name-generator/)
*   **Tool Name:** Car Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/car-name-generator/](https://taptogen.vercel.app/tools/car-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![car-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/car-name-generator-desktop.png)
    *   **Mobile:** ![car-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/car-name-generator-mobile.png)

---

## Exception Entry #64: Hashtag Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/hashtag-generator/](https://taptogen.vercel.app/tools/hashtag-generator/)
*   **Tool Name:** Hashtag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/hashtag-generator/](https://taptogen.vercel.app/tools/hashtag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![hashtag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hashtag-generator-desktop.png)
    *   **Mobile:** ![hashtag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/hashtag-generator-mobile.png)

---

## Exception Entry #65: Poster Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/poster-generator/](https://taptogen.vercel.app/tools/poster-generator/)
*   **Tool Name:** Poster Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/poster-generator/](https://taptogen.vercel.app/tools/poster-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![poster-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/poster-generator-desktop.png)
    *   **Mobile:** ![poster-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/poster-generator-mobile.png)

---

## Exception Entry #66: Pet Tag Generator - buildPass23UtilityGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/pet-tag-generator/](https://taptogen.vercel.app/tools/pet-tag-generator/)
*   **Tool Name:** Pet Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass23UtilityGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass23UtilityGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pet-tag-generator/](https://taptogen.vercel.app/tools/pet-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass23UtilityGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23UtilityGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:307:301)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pet-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-tag-generator-desktop.png)
    *   **Mobile:** ![pet-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-tag-generator-mobile.png)

---

## Exception Entry #67: Poster Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/poster-generator/](https://taptogen.vercel.app/tools/poster-generator/)
*   **Tool Name:** Poster Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/poster-generator/](https://taptogen.vercel.app/tools/poster-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![poster-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/poster-generator-desktop.png)
    *   **Mobile:** ![poster-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/poster-generator-mobile.png)

---

## Exception Entry #68: Pet Tag Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/pet-tag-generator/](https://taptogen.vercel.app/tools/pet-tag-generator/)
*   **Tool Name:** Pet Tag Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pet-tag-generator/](https://taptogen.vercel.app/tools/pet-tag-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pet-tag-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-tag-generator-desktop.png)
    *   **Mobile:** ![pet-tag-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pet-tag-generator-mobile.png)

---

## Exception Entry #69: Mock Api Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/mock-api-generator/](https://taptogen.vercel.app/tools/mock-api-generator/)
*   **Tool Name:** Mock Api Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/mock-api-generator/](https://taptogen.vercel.app/tools/mock-api-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![mock-api-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/mock-api-generator-desktop.png)
    *   **Mobile:** ![mock-api-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/mock-api-generator-mobile.png)

---

## Exception Entry #70: Mock Api Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/mock-api-generator/](https://taptogen.vercel.app/tools/mock-api-generator/)
*   **Tool Name:** Mock Api Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/mock-api-generator/](https://taptogen.vercel.app/tools/mock-api-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![mock-api-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/mock-api-generator-desktop.png)
    *   **Mobile:** ![mock-api-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/mock-api-generator-mobile.png)

---

## Exception Entry #71: Pirate Name Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/pirate-name-generator/](https://taptogen.vercel.app/tools/pirate-name-generator/)
*   **Tool Name:** Pirate Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pirate-name-generator/](https://taptogen.vercel.app/tools/pirate-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pirate-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pirate-name-generator-desktop.png)
    *   **Mobile:** ![pirate-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pirate-name-generator-mobile.png)

---

## Exception Entry #72: Pirate Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/pirate-name-generator/](https://taptogen.vercel.app/tools/pirate-name-generator/)
*   **Tool Name:** Pirate Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pirate-name-generator/](https://taptogen.vercel.app/tools/pirate-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pirate-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pirate-name-generator-desktop.png)
    *   **Mobile:** ![pirate-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pirate-name-generator-mobile.png)

---

## Exception Entry #73: Pwa Manifest Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/pwa-manifest-generator/](https://taptogen.vercel.app/tools/pwa-manifest-generator/)
*   **Tool Name:** Pwa Manifest Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pwa-manifest-generator/](https://taptogen.vercel.app/tools/pwa-manifest-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pwa-manifest-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pwa-manifest-generator-desktop.png)
    *   **Mobile:** ![pwa-manifest-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pwa-manifest-generator-mobile.png)

---

## Exception Entry #74: Pwa Manifest Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/pwa-manifest-generator/](https://taptogen.vercel.app/tools/pwa-manifest-generator/)
*   **Tool Name:** Pwa Manifest Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/pwa-manifest-generator/](https://taptogen.vercel.app/tools/pwa-manifest-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![pwa-manifest-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pwa-manifest-generator-desktop.png)
    *   **Mobile:** ![pwa-manifest-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/pwa-manifest-generator-mobile.png)

---

## Exception Entry #75: Random Question Generator - buildPass23RandomGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/random-question-generator/](https://taptogen.vercel.app/tools/random-question-generator/)
*   **Tool Name:** Random Question Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L632)
*   **Source Line Number:** Line 632
*   **Root Cause:** 
    The function `buildPass23RandomGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass23RandomGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/random-question-generator/](https://taptogen.vercel.app/tools/random-question-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass23RandomGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23RandomGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:300:429)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![random-question-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-question-generator-desktop.png)
    *   **Mobile:** ![random-question-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-question-generator-mobile.png)

---

## Exception Entry #76: Random Question Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/random-question-generator/](https://taptogen.vercel.app/tools/random-question-generator/)
*   **Tool Name:** Random Question Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/random-question-generator/](https://taptogen.vercel.app/tools/random-question-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![random-question-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-question-generator-desktop.png)
    *   **Mobile:** ![random-question-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-question-generator-mobile.png)

---

## Exception Entry #77: Random Phrase Generator - buildPass23RandomGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/random-phrase-generator/](https://taptogen.vercel.app/tools/random-phrase-generator/)
*   **Tool Name:** Random Phrase Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L632)
*   **Source Line Number:** Line 632
*   **Root Cause:** 
    The function `buildPass23RandomGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass23RandomGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/random-phrase-generator/](https://taptogen.vercel.app/tools/random-phrase-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass23RandomGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23RandomGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:300:429)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![random-phrase-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-phrase-generator-desktop.png)
    *   **Mobile:** ![random-phrase-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-phrase-generator-mobile.png)

---

## Exception Entry #78: Random Phrase Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/random-phrase-generator/](https://taptogen.vercel.app/tools/random-phrase-generator/)
*   **Tool Name:** Random Phrase Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/random-phrase-generator/](https://taptogen.vercel.app/tools/random-phrase-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![random-phrase-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-phrase-generator-desktop.png)
    *   **Mobile:** ![random-phrase-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/random-phrase-generator-mobile.png)

---

## Exception Entry #79: Podcast Name Generator - makeNameIdeaGroups Error

*   **URL:** [https://taptogen.vercel.app/tools/podcast-name-generator/](https://taptogen.vercel.app/tools/podcast-name-generator/)
*   **Tool Name:** Podcast Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L2389)
*   **Source Line Number:** Line 2389
*   **Root Cause:** 
    The function `makeNameIdeaGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `makeNameIdeaGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/podcast-name-generator/](https://taptogen.vercel.app/tools/podcast-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `makeNameIdeaGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: makeNameIdeaGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:691:205)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![podcast-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/podcast-name-generator-desktop.png)
    *   **Mobile:** ![podcast-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/podcast-name-generator-mobile.png)

---

## Exception Entry #80: Podcast Name Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/podcast-name-generator/](https://taptogen.vercel.app/tools/podcast-name-generator/)
*   **Tool Name:** Podcast Name Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/podcast-name-generator/](https://taptogen.vercel.app/tools/podcast-name-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![podcast-name-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/podcast-name-generator-desktop.png)
    *   **Mobile:** ![podcast-name-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/podcast-name-generator-mobile.png)

---

## Exception Entry #81: Meta Description Generator - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/tools/meta-description-generator/](https://taptogen.vercel.app/tools/meta-description-generator/)
*   **Tool Name:** Meta Description Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/meta-description-generator/](https://taptogen.vercel.app/tools/meta-description-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![meta-description-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/meta-description-generator-desktop.png)
    *   **Mobile:** ![meta-description-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/meta-description-generator-mobile.png)

---

## Exception Entry #82: Meta Description Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/meta-description-generator/](https://taptogen.vercel.app/tools/meta-description-generator/)
*   **Tool Name:** Meta Description Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/meta-description-generator/](https://taptogen.vercel.app/tools/meta-description-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![meta-description-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/meta-description-generator-desktop.png)
    *   **Mobile:** ![meta-description-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/meta-description-generator-mobile.png)

---

## Exception Entry #83: Proposal Generator - buildPass22ProposalSections Error

*   **URL:** [https://taptogen.vercel.app/tools/proposal-generator/](https://taptogen.vercel.app/tools/proposal-generator/)
*   **Tool Name:** Proposal Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L622)
*   **Source Line Number:** Line 622
*   **Root Cause:** 
    The function `buildPass22ProposalSections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass22ProposalSections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/proposal-generator/](https://taptogen.vercel.app/tools/proposal-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass22ProposalSections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass22ProposalSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:293:218)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![proposal-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/proposal-generator-desktop.png)
    *   **Mobile:** ![proposal-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/proposal-generator-mobile.png)

---

## Exception Entry #84: Proposal Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/proposal-generator/](https://taptogen.vercel.app/tools/proposal-generator/)
*   **Tool Name:** Proposal Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/proposal-generator/](https://taptogen.vercel.app/tools/proposal-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![proposal-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/proposal-generator-desktop.png)
    *   **Mobile:** ![proposal-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/proposal-generator-mobile.png)

---

## Exception Entry #85: Passphrase Generator - buildPremiumPassphrase Error

*   **URL:** [https://taptogen.vercel.app/tools/passphrase-generator/](https://taptogen.vercel.app/tools/passphrase-generator/)
*   **Tool Name:** Passphrase Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L566)
*   **Source Line Number:** Line 566
*   **Root Cause:** 
    The function `buildPremiumPassphrase` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPremiumPassphrase` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/passphrase-generator/](https://taptogen.vercel.app/tools/passphrase-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPremiumPassphrase()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPremiumPassphrase is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:257:225)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![passphrase-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/passphrase-generator-desktop.png)
    *   **Mobile:** ![passphrase-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/passphrase-generator-mobile.png)

---

## Exception Entry #86: Passphrase Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/tools/passphrase-generator/](https://taptogen.vercel.app/tools/passphrase-generator/)
*   **Tool Name:** Passphrase Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/tools/passphrase-generator/](https://taptogen.vercel.app/tools/passphrase-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![passphrase-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/passphrase-generator-desktop.png)
    *   **Mobile:** ![passphrase-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/passphrase-generator-mobile.png)

---

## Exception Entry #87: Generator Superhero Name - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/id/tools/generator-superhero-name/](https://taptogen.vercel.app/id/tools/generator-superhero-name/)
*   **Tool Name:** Generator Superhero Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/id/tools/generator-superhero-name/](https://taptogen.vercel.app/id/tools/generator-superhero-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-superhero-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-superhero-name-desktop.png)
    *   **Mobile:** ![generator-superhero-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-superhero-name-mobile.png)

---

## Exception Entry #88: Generator Old English Text - buildOldEnglishStyles Error

*   **URL:** [https://taptogen.vercel.app/pl/tools/generator-old-english-text/](https://taptogen.vercel.app/pl/tools/generator-old-english-text/)
*   **Tool Name:** Generator Old English Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L597)
*   **Source Line Number:** Line 597
*   **Root Cause:** 
    The function `buildOldEnglishStyles` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildOldEnglishStyles` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/pl/tools/generator-old-english-text/](https://taptogen.vercel.app/pl/tools/generator-old-english-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildOldEnglishStyles()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildOldEnglishStyles is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:276:204)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-old-english-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-old-english-text-desktop.png)
    *   **Mobile:** ![generator-old-english-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-old-english-text-mobile.png)

---

## Exception Entry #89: Generator Superhero Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/id/tools/generator-superhero-name/](https://taptogen.vercel.app/id/tools/generator-superhero-name/)
*   **Tool Name:** Generator Superhero Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/id/tools/generator-superhero-name/](https://taptogen.vercel.app/id/tools/generator-superhero-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-superhero-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-superhero-name-desktop.png)
    *   **Mobile:** ![generator-superhero-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-superhero-name-mobile.png)

---

## Exception Entry #90: Generator Old English Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/pl/tools/generator-old-english-text/](https://taptogen.vercel.app/pl/tools/generator-old-english-text/)
*   **Tool Name:** Generator Old English Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/pl/tools/generator-old-english-text/](https://taptogen.vercel.app/pl/tools/generator-old-english-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-old-english-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-old-english-text-desktop.png)
    *   **Mobile:** ![generator-old-english-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-old-english-text-mobile.png)

---

## Exception Entry #91: G N Rateur First And Last Name - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/)
*   **Tool Name:** G N Rateur First And Last Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![g-n-rateur-first-and-last-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-first-and-last-name-desktop.png)
    *   **Mobile:** ![g-n-rateur-first-and-last-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-first-and-last-name-mobile.png)

---

## Exception Entry #92: Generator Art Tag - buildPass24UtilitySections Error

*   **URL:** [https://taptogen.vercel.app/id/tools/generator-art-tag/](https://taptogen.vercel.app/id/tools/generator-art-tag/)
*   **Tool Name:** Generator Art Tag
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L647)
*   **Source Line Number:** Line 647
*   **Root Cause:** 
    The function `buildPass24UtilitySections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass24UtilitySections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/id/tools/generator-art-tag/](https://taptogen.vercel.app/id/tools/generator-art-tag/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass24UtilitySections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24UtilitySections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:317:335)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-art-tag Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-art-tag-desktop.png)
    *   **Mobile:** ![generator-art-tag Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-art-tag-mobile.png)

---

## Exception Entry #93: Generatore Gnome Name - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/it/tools/generatore-gnome-name/](https://taptogen.vercel.app/it/tools/generatore-gnome-name/)
*   **Tool Name:** Generatore Gnome Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/it/tools/generatore-gnome-name/](https://taptogen.vercel.app/it/tools/generatore-gnome-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass25CreatureGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:330:488)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generatore-gnome-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-gnome-name-desktop.png)
    *   **Mobile:** ![generatore-gnome-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-gnome-name-mobile.png)

---

## Exception Entry #94: G N Rateur First And Last Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/)
*   **Tool Name:** G N Rateur First And Last Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-first-and-last-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![g-n-rateur-first-and-last-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-first-and-last-name-desktop.png)
    *   **Mobile:** ![g-n-rateur-first-and-last-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-first-and-last-name-mobile.png)

---

## Exception Entry #95: Generatore Gnome Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/it/tools/generatore-gnome-name/](https://taptogen.vercel.app/it/tools/generatore-gnome-name/)
*   **Tool Name:** Generatore Gnome Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/it/tools/generatore-gnome-name/](https://taptogen.vercel.app/it/tools/generatore-gnome-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generatore-gnome-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-gnome-name-desktop.png)
    *   **Mobile:** ![generatore-gnome-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-gnome-name-mobile.png)

---

## Exception Entry #96: Generator Art Tag - copyText Error

*   **URL:** [https://taptogen.vercel.app/id/tools/generator-art-tag/](https://taptogen.vercel.app/id/tools/generator-art-tag/)
*   **Tool Name:** Generator Art Tag
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/id/tools/generator-art-tag/](https://taptogen.vercel.app/id/tools/generator-art-tag/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-art-tag Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-art-tag-desktop.png)
    *   **Mobile:** ![generator-art-tag Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-art-tag-mobile.png)

---

## Exception Entry #97: Generator Cipher - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/bg/tools/generator-cipher/](https://taptogen.vercel.app/bg/tools/generator-cipher/)
*   **Tool Name:** Generator Cipher
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bg/tools/generator-cipher/](https://taptogen.vercel.app/bg/tools/generator-cipher/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-cipher Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cipher-desktop.png)
    *   **Mobile:** ![generator-cipher Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cipher-mobile.png)

---

## Exception Entry #98: Generator Graffiti Text - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-graffiti-text/](https://taptogen.vercel.app/bn/tools/generator-graffiti-text/)
*   **Tool Name:** Generator Graffiti Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-graffiti-text/](https://taptogen.vercel.app/bn/tools/generator-graffiti-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:314:447)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-graffiti-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graffiti-text-desktop.png)
    *   **Mobile:** ![generator-graffiti-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graffiti-text-mobile.png)

---

## Exception Entry #99: Generator Cipher - copyText Error

*   **URL:** [https://taptogen.vercel.app/bg/tools/generator-cipher/](https://taptogen.vercel.app/bg/tools/generator-cipher/)
*   **Tool Name:** Generator Cipher
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bg/tools/generator-cipher/](https://taptogen.vercel.app/bg/tools/generator-cipher/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-cipher Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cipher-desktop.png)
    *   **Mobile:** ![generator-cipher Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cipher-mobile.png)

---

## Exception Entry #100: Generator Graffiti Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-graffiti-text/](https://taptogen.vercel.app/bn/tools/generator-graffiti-text/)
*   **Tool Name:** Generator Graffiti Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-graffiti-text/](https://taptogen.vercel.app/bn/tools/generator-graffiti-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-graffiti-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graffiti-text-desktop.png)
    *   **Mobile:** ![generator-graffiti-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graffiti-text-mobile.png)

---

## Exception Entry #101: Generator Content Calendar - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-content-calendar/](https://taptogen.vercel.app/de/tools/generator-content-calendar/)
*   **Tool Name:** Generator Content Calendar
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-content-calendar/](https://taptogen.vercel.app/de/tools/generator-content-calendar/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23TemplateSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:304:229)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-content-calendar Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-content-calendar-desktop.png)
    *   **Mobile:** ![generator-content-calendar Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-content-calendar-mobile.png)

---

## Exception Entry #102: Generator Content Calendar - copyText Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-content-calendar/](https://taptogen.vercel.app/de/tools/generator-content-calendar/)
*   **Tool Name:** Generator Content Calendar
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-content-calendar/](https://taptogen.vercel.app/de/tools/generator-content-calendar/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-content-calendar Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-content-calendar-desktop.png)
    *   **Mobile:** ![generator-content-calendar Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-content-calendar-mobile.png)

---

## Exception Entry #103: Generator Cowboy Name - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-cowboy-name/](https://taptogen.vercel.app/de/tools/generator-cowboy-name/)
*   **Tool Name:** Generator Cowboy Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-cowboy-name/](https://taptogen.vercel.app/de/tools/generator-cowboy-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-cowboy-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cowboy-name-desktop.png)
    *   **Mobile:** ![generator-cowboy-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cowboy-name-mobile.png)

---

## Exception Entry #104: G N Rateur App Icon - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/](https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/)
*   **Tool Name:** G N Rateur App Icon
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/](https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: seedNumber is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:3569:296)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![g-n-rateur-app-icon Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-app-icon-desktop.png)
    *   **Mobile:** ![g-n-rateur-app-icon Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-app-icon-mobile.png)

---

## Exception Entry #105: G N Rateur App Icon - copyText Error

*   **URL:** [https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/](https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/)
*   **Tool Name:** G N Rateur App Icon
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/](https://taptogen.vercel.app/fr/tools/g-n-rateur-app-icon/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![g-n-rateur-app-icon Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-app-icon-desktop.png)
    *   **Mobile:** ![g-n-rateur-app-icon Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-app-icon-mobile.png)

---

## Exception Entry #106: Generator Cowboy Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-cowboy-name/](https://taptogen.vercel.app/de/tools/generator-cowboy-name/)
*   **Tool Name:** Generator Cowboy Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-cowboy-name/](https://taptogen.vercel.app/de/tools/generator-cowboy-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-cowboy-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cowboy-name-desktop.png)
    *   **Mobile:** ![generator-cowboy-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-cowboy-name-mobile.png)

---

## Exception Entry #107: Generador Random Text - buildPass23RandomGroups Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-random-text/](https://taptogen.vercel.app/es/tools/generador-random-text/)
*   **Tool Name:** Generador Random Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L632)
*   **Source Line Number:** Line 632
*   **Root Cause:** 
    The function `buildPass23RandomGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass23RandomGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-random-text/](https://taptogen.vercel.app/es/tools/generador-random-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass23RandomGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass23RandomGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:300:429)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-random-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-text-desktop.png)
    *   **Mobile:** ![generador-random-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-text-mobile.png)

---

## Exception Entry #108: Generador Random Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-random-text/](https://taptogen.vercel.app/es/tools/generador-random-text/)
*   **Tool Name:** Generador Random Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-random-text/](https://taptogen.vercel.app/es/tools/generador-random-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-random-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-text-desktop.png)
    *   **Mobile:** ![generador-random-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-text-mobile.png)

---

## Exception Entry #109: Generator Plant Name - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-plant-name/](https://taptogen.vercel.app/bn/tools/generator-plant-name/)
*   **Tool Name:** Generator Plant Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-plant-name/](https://taptogen.vercel.app/bn/tools/generator-plant-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-plant-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-plant-name-desktop.png)
    *   **Mobile:** ![generator-plant-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-plant-name-mobile.png)

---

## Exception Entry #110: Generator Plant Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-plant-name/](https://taptogen.vercel.app/bn/tools/generator-plant-name/)
*   **Tool Name:** Generator Plant Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-plant-name/](https://taptogen.vercel.app/bn/tools/generator-plant-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-plant-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-plant-name-desktop.png)
    *   **Mobile:** ![generator-plant-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-plant-name-mobile.png)

---

## Exception Entry #111: Generator Raffle - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-raffle/](https://taptogen.vercel.app/bn/tools/generator-raffle/)
*   **Tool Name:** Generator Raffle
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-raffle/](https://taptogen.vercel.app/bn/tools/generator-raffle/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-raffle Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-raffle-desktop.png)
    *   **Mobile:** ![generator-raffle Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-raffle-mobile.png)

---

## Exception Entry #112: Generator Raffle - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-raffle/](https://taptogen.vercel.app/bn/tools/generator-raffle/)
*   **Tool Name:** Generator Raffle
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-raffle/](https://taptogen.vercel.app/bn/tools/generator-raffle/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-raffle Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-raffle-desktop.png)
    *   **Mobile:** ![generator-raffle Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-raffle-mobile.png)

---

## Exception Entry #113: Shishur Nam Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/shishur-nam-generator/](https://taptogen.vercel.app/bn/tools/shishur-nam-generator/)
*   **Tool Name:** Shishur Nam Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/shishur-nam-generator/](https://taptogen.vercel.app/bn/tools/shishur-nam-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![shishur-nam-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/shishur-nam-generator-desktop.png)
    *   **Mobile:** ![shishur-nam-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/shishur-nam-generator-mobile.png)

---

## Exception Entry #114: Generador Utm Link - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-utm-link/](https://taptogen.vercel.app/es/tools/generador-utm-link/)
*   **Tool Name:** Generador Utm Link
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-utm-link/](https://taptogen.vercel.app/es/tools/generador-utm-link/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-utm-link Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-utm-link-desktop.png)
    *   **Mobile:** ![generador-utm-link Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-utm-link-mobile.png)

---

## Exception Entry #115: Shishur Nam Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/shishur-nam-generator/](https://taptogen.vercel.app/bn/tools/shishur-nam-generator/)
*   **Tool Name:** Shishur Nam Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/shishur-nam-generator/](https://taptogen.vercel.app/bn/tools/shishur-nam-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![shishur-nam-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/shishur-nam-generator-desktop.png)
    *   **Mobile:** ![shishur-nam-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/shishur-nam-generator-mobile.png)

---

## Exception Entry #116: Generator Book Club Name - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-book-club-name/](https://taptogen.vercel.app/de/tools/generator-book-club-name/)
*   **Tool Name:** Generator Book Club Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-book-club-name/](https://taptogen.vercel.app/de/tools/generator-book-club-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-book-club-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-book-club-name-desktop.png)
    *   **Mobile:** ![generator-book-club-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-book-club-name-mobile.png)

---

## Exception Entry #117: Generador Utm Link - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-utm-link/](https://taptogen.vercel.app/es/tools/generador-utm-link/)
*   **Tool Name:** Generador Utm Link
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-utm-link/](https://taptogen.vercel.app/es/tools/generador-utm-link/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-utm-link Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-utm-link-desktop.png)
    *   **Mobile:** ![generador-utm-link Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-utm-link-mobile.png)

---

## Exception Entry #118: Generator Book Club Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-book-club-name/](https://taptogen.vercel.app/de/tools/generator-book-club-name/)
*   **Tool Name:** Generator Book Club Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-book-club-name/](https://taptogen.vercel.app/de/tools/generator-book-club-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-book-club-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-book-club-name-desktop.png)
    *   **Mobile:** ![generator-book-club-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-book-club-name-mobile.png)

---

## Exception Entry #119: Generador Nickname - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-nickname/](https://taptogen.vercel.app/es/tools/generador-nickname/)
*   **Tool Name:** Generador Nickname
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-nickname/](https://taptogen.vercel.app/es/tools/generador-nickname/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-nickname Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-nickname-desktop.png)
    *   **Mobile:** ![generador-nickname Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-nickname-mobile.png)

---

## Exception Entry #120: Generador Nickname - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-nickname/](https://taptogen.vercel.app/es/tools/generador-nickname/)
*   **Tool Name:** Generador Nickname
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-nickname/](https://taptogen.vercel.app/es/tools/generador-nickname/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-nickname Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-nickname-desktop.png)
    *   **Mobile:** ![generador-nickname Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-nickname-mobile.png)

---

## Exception Entry #121: Generador Retro Text - buildPass22TextSections Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-retro-text/](https://taptogen.vercel.app/es/tools/generador-retro-text/)
*   **Tool Name:** Generador Retro Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L287)
*   **Source Line Number:** Line 287
*   **Root Cause:** 
    The function `buildPass22TextSections` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass22TextSections` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-retro-text/](https://taptogen.vercel.app/es/tools/generador-retro-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass22TextSections()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass22TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:287:350)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-retro-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-retro-text-desktop.png)
    *   **Mobile:** ![generador-retro-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-retro-text-mobile.png)

---

## Exception Entry #122: Generador Retro Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-retro-text/](https://taptogen.vercel.app/es/tools/generador-retro-text/)
*   **Tool Name:** Generador Retro Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-retro-text/](https://taptogen.vercel.app/es/tools/generador-retro-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-retro-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-retro-text-desktop.png)
    *   **Mobile:** ![generador-retro-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-retro-text-mobile.png)

---

## Exception Entry #123: Generator Css Blob - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-css-blob/](https://taptogen.vercel.app/bn/tools/generator-css-blob/)
*   **Tool Name:** Generator Css Blob
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-css-blob/](https://taptogen.vercel.app/bn/tools/generator-css-blob/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: seedNumber is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:3126:366)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-css-blob Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-css-blob-desktop.png)
    *   **Mobile:** ![generator-css-blob Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-css-blob-mobile.png)

---

## Exception Entry #124: Texto Italica - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/es/tools/texto-italica/](https://taptogen.vercel.app/es/tools/texto-italica/)
*   **Tool Name:** Texto Italica
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/texto-italica/](https://taptogen.vercel.app/es/tools/texto-italica/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24TextSections is not defined
at De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:314:447)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![texto-italica Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/texto-italica-desktop.png)
    *   **Mobile:** ![texto-italica Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/texto-italica-mobile.png)

---

## Exception Entry #125: Generator Dj Name - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-dj-name/](https://taptogen.vercel.app/bn/tools/generator-dj-name/)
*   **Tool Name:** Generator Dj Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-dj-name/](https://taptogen.vercel.app/bn/tools/generator-dj-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-dj-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-dj-name-desktop.png)
    *   **Mobile:** ![generator-dj-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-dj-name-mobile.png)

---

## Exception Entry #126: Generator Dj Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-dj-name/](https://taptogen.vercel.app/bn/tools/generator-dj-name/)
*   **Tool Name:** Generator Dj Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-dj-name/](https://taptogen.vercel.app/bn/tools/generator-dj-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-dj-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-dj-name-desktop.png)
    *   **Mobile:** ![generator-dj-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-dj-name-mobile.png)

---

## Exception Entry #127: Texto Italica - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/es/tools/texto-italica/](https://taptogen.vercel.app/es/tools/texto-italica/)
*   **Tool Name:** Texto Italica
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/texto-italica/](https://taptogen.vercel.app/es/tools/texto-italica/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:314:447)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![texto-italica Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/texto-italica-desktop.png)
    *   **Mobile:** ![texto-italica Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/texto-italica-mobile.png)

---

## Exception Entry #128: Generator Call To Action - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-call-to-action/](https://taptogen.vercel.app/de/tools/generator-call-to-action/)
*   **Tool Name:** Generator Call To Action
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-call-to-action/](https://taptogen.vercel.app/de/tools/generator-call-to-action/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-call-to-action Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-call-to-action-desktop.png)
    *   **Mobile:** ![generator-call-to-action Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-call-to-action-mobile.png)

---

## Exception Entry #129: Generator Css Blob - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-css-blob/](https://taptogen.vercel.app/bn/tools/generator-css-blob/)
*   **Tool Name:** Generator Css Blob
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-css-blob/](https://taptogen.vercel.app/bn/tools/generator-css-blob/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-css-blob Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-css-blob-desktop.png)
    *   **Mobile:** ![generator-css-blob Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-css-blob-mobile.png)

---

## Exception Entry #130: Generator Call To Action - copyText Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-call-to-action/](https://taptogen.vercel.app/de/tools/generator-call-to-action/)
*   **Tool Name:** Generator Call To Action
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-call-to-action/](https://taptogen.vercel.app/de/tools/generator-call-to-action/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-call-to-action Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-call-to-action-desktop.png)
    *   **Mobile:** ![generator-call-to-action Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-call-to-action-mobile.png)

---

## Exception Entry #131: Generador Strikethrough Text - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-strikethrough-text/](https://taptogen.vercel.app/es/tools/generador-strikethrough-text/)
*   **Tool Name:** Generador Strikethrough Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-strikethrough-text/](https://taptogen.vercel.app/es/tools/generador-strikethrough-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:314:447)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-strikethrough-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-strikethrough-text-desktop.png)
    *   **Mobile:** ![generador-strikethrough-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-strikethrough-text-mobile.png)

---

## Exception Entry #132: Generador Strikethrough Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-strikethrough-text/](https://taptogen.vercel.app/es/tools/generador-strikethrough-text/)
*   **Tool Name:** Generador Strikethrough Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-strikethrough-text/](https://taptogen.vercel.app/es/tools/generador-strikethrough-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-strikethrough-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-strikethrough-text-desktop.png)
    *   **Mobile:** ![generador-strikethrough-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-strikethrough-text-mobile.png)

---

## Exception Entry #133: Generatore Dice Roller - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/it/tools/generatore-dice-roller/](https://taptogen.vercel.app/it/tools/generatore-dice-roller/)
*   **Tool Name:** Generatore Dice Roller
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/it/tools/generatore-dice-roller/](https://taptogen.vercel.app/it/tools/generatore-dice-roller/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass26RandomGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:337:561)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generatore-dice-roller Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-dice-roller-desktop.png)
    *   **Mobile:** ![generatore-dice-roller Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-dice-roller-mobile.png)

---

## Exception Entry #134: Generator Strikethrough Text - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/id/tools/generator-strikethrough-text/](https://taptogen.vercel.app/id/tools/generator-strikethrough-text/)
*   **Tool Name:** Generator Strikethrough Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/id/tools/generator-strikethrough-text/](https://taptogen.vercel.app/id/tools/generator-strikethrough-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:314:447)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-strikethrough-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-strikethrough-text-desktop.png)
    *   **Mobile:** ![generator-strikethrough-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-strikethrough-text-mobile.png)

---

## Exception Entry #135: Generatore Dice Roller - copyText Error

*   **URL:** [https://taptogen.vercel.app/it/tools/generatore-dice-roller/](https://taptogen.vercel.app/it/tools/generatore-dice-roller/)
*   **Tool Name:** Generatore Dice Roller
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/it/tools/generatore-dice-roller/](https://taptogen.vercel.app/it/tools/generatore-dice-roller/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generatore-dice-roller Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-dice-roller-desktop.png)
    *   **Mobile:** ![generatore-dice-roller Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-dice-roller-mobile.png)

---

## Exception Entry #136: Generator Strikethrough Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/id/tools/generator-strikethrough-text/](https://taptogen.vercel.app/id/tools/generator-strikethrough-text/)
*   **Tool Name:** Generator Strikethrough Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/id/tools/generator-strikethrough-text/](https://taptogen.vercel.app/id/tools/generator-strikethrough-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-strikethrough-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-strikethrough-text-desktop.png)
    *   **Mobile:** ![generator-strikethrough-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-strikethrough-text-mobile.png)

---

## Exception Entry #137: Generator Orc Name - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-orc-name/](https://taptogen.vercel.app/bn/tools/generator-orc-name/)
*   **Tool Name:** Generator Orc Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-orc-name/](https://taptogen.vercel.app/bn/tools/generator-orc-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass25CreatureGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:330:488)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-orc-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-orc-name-desktop.png)
    *   **Mobile:** ![generator-orc-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-orc-name-mobile.png)

---

## Exception Entry #138: Generator Orc Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-orc-name/](https://taptogen.vercel.app/bn/tools/generator-orc-name/)
*   **Tool Name:** Generator Orc Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-orc-name/](https://taptogen.vercel.app/bn/tools/generator-orc-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-orc-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-orc-name-desktop.png)
    *   **Mobile:** ![generator-orc-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-orc-name-mobile.png)

---

## Exception Entry #139: Generator Qr Code Text - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-qr-code-text/](https://taptogen.vercel.app/bn/tools/generator-qr-code-text/)
*   **Tool Name:** Generator Qr Code Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-qr-code-text/](https://taptogen.vercel.app/bn/tools/generator-qr-code-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-qr-code-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-qr-code-text-desktop.png)
    *   **Mobile:** ![generator-qr-code-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-qr-code-text-mobile.png)

---

## Exception Entry #140: Generator Qr Code Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-qr-code-text/](https://taptogen.vercel.app/bn/tools/generator-qr-code-text/)
*   **Tool Name:** Generator Qr Code Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-qr-code-text/](https://taptogen.vercel.app/bn/tools/generator-qr-code-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-qr-code-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-qr-code-text-desktop.png)
    *   **Mobile:** ![generator-qr-code-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-qr-code-text-mobile.png)

---

## Exception Entry #141: Generator Bakery Name - makeNameIdeaGroups Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-bakery-name/](https://taptogen.vercel.app/de/tools/generator-bakery-name/)
*   **Tool Name:** Generator Bakery Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L2389)
*   **Source Line Number:** Line 2389
*   **Root Cause:** 
    The function `makeNameIdeaGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `makeNameIdeaGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-bakery-name/](https://taptogen.vercel.app/de/tools/generator-bakery-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `makeNameIdeaGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: makeNameIdeaGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:3220:3924)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-bakery-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-bakery-name-desktop.png)
    *   **Mobile:** ![generator-bakery-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-bakery-name-mobile.png)

---

## Exception Entry #142: Generator Bakery Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-bakery-name/](https://taptogen.vercel.app/de/tools/generator-bakery-name/)
*   **Tool Name:** Generator Bakery Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-bakery-name/](https://taptogen.vercel.app/de/tools/generator-bakery-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-bakery-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-bakery-name-desktop.png)
    *   **Mobile:** ![generator-bakery-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-bakery-name-mobile.png)

---

## Exception Entry #143: Generator Lowercase - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-lowercase/](https://taptogen.vercel.app/hi/tools/generator-lowercase/)
*   **Tool Name:** Generator Lowercase
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-lowercase/](https://taptogen.vercel.app/hi/tools/generator-lowercase/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:314:447)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-lowercase Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-lowercase-desktop.png)
    *   **Mobile:** ![generator-lowercase Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-lowercase-mobile.png)

---

## Exception Entry #144: Generator Lowercase - copyText Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-lowercase/](https://taptogen.vercel.app/hi/tools/generator-lowercase/)
*   **Tool Name:** Generator Lowercase
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-lowercase/](https://taptogen.vercel.app/hi/tools/generator-lowercase/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-lowercase Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-lowercase-desktop.png)
    *   **Mobile:** ![generator-lowercase Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-lowercase-mobile.png)

---

## Exception Entry #145: Generador Papyrus Text - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-papyrus-text/](https://taptogen.vercel.app/es/tools/generador-papyrus-text/)
*   **Tool Name:** Generador Papyrus Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-papyrus-text/](https://taptogen.vercel.app/es/tools/generador-papyrus-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass24TextSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:314:447)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-papyrus-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-papyrus-text-desktop.png)
    *   **Mobile:** ![generador-papyrus-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-papyrus-text-mobile.png)

---

## Exception Entry #146: Generador Avatar Name - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-avatar-name/](https://taptogen.vercel.app/es/tools/generador-avatar-name/)
*   **Tool Name:** Generador Avatar Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-avatar-name/](https://taptogen.vercel.app/es/tools/generador-avatar-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-avatar-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-avatar-name-desktop.png)
    *   **Mobile:** ![generador-avatar-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-avatar-name-mobile.png)

---

## Exception Entry #147: Generator Multiple Choice Question - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/](https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/)
*   **Tool Name:** Generator Multiple Choice Question
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/](https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-multiple-choice-question Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-multiple-choice-question-desktop.png)
    *   **Mobile:** ![generator-multiple-choice-question Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-multiple-choice-question-mobile.png)

---

## Exception Entry #148: Generador Avatar Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-avatar-name/](https://taptogen.vercel.app/es/tools/generador-avatar-name/)
*   **Tool Name:** Generador Avatar Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-avatar-name/](https://taptogen.vercel.app/es/tools/generador-avatar-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-avatar-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-avatar-name-desktop.png)
    *   **Mobile:** ![generador-avatar-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-avatar-name-mobile.png)

---

## Exception Entry #149: Generador Papyrus Text - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-papyrus-text/](https://taptogen.vercel.app/es/tools/generador-papyrus-text/)
*   **Tool Name:** Generador Papyrus Text
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-papyrus-text/](https://taptogen.vercel.app/es/tools/generador-papyrus-text/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-papyrus-text Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-papyrus-text-desktop.png)
    *   **Mobile:** ![generador-papyrus-text Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-papyrus-text-mobile.png)

---

## Exception Entry #150: Generator Multiple Choice Question - copyText Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/](https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/)
*   **Tool Name:** Generator Multiple Choice Question
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/](https://taptogen.vercel.app/hi/tools/generator-multiple-choice-question/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-multiple-choice-question Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-multiple-choice-question-desktop.png)
    *   **Mobile:** ![generator-multiple-choice-question Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-multiple-choice-question-mobile.png)

---

## Exception Entry #151: Generator Marketplace Tag - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/](https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/)
*   **Tool Name:** Generator Marketplace Tag
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/](https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass29MarketplaceSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:370:360)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-marketplace-tag Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-marketplace-tag-desktop.png)
    *   **Mobile:** ![generator-marketplace-tag Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-marketplace-tag-mobile.png)

---

## Exception Entry #152: Generator Marketplace Tag - copyText Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/](https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/)
*   **Tool Name:** Generator Marketplace Tag
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/](https://taptogen.vercel.app/hi/tools/generator-marketplace-tag/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-marketplace-tag Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-marketplace-tag-desktop.png)
    *   **Mobile:** ![generator-marketplace-tag Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-marketplace-tag-mobile.png)

---

## Exception Entry #153: Generator Product Title - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-product-title/](https://taptogen.vercel.app/hi/tools/generator-product-title/)
*   **Tool Name:** Generator Product Title
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-product-title/](https://taptogen.vercel.app/hi/tools/generator-product-title/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-product-title Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-product-title-desktop.png)
    *   **Mobile:** ![generator-product-title Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-product-title-mobile.png)

---

## Exception Entry #154: Generator Product Title - copyText Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/generator-product-title/](https://taptogen.vercel.app/hi/tools/generator-product-title/)
*   **Tool Name:** Generator Product Title
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/generator-product-title/](https://taptogen.vercel.app/hi/tools/generator-product-title/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-product-title Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-product-title-desktop.png)
    *   **Mobile:** ![generator-product-title Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-product-title-mobile.png)

---

## Exception Entry #155: Generator Graphql Query - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-graphql-query/](https://taptogen.vercel.app/de/tools/generator-graphql-query/)
*   **Tool Name:** Generator Graphql Query
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-graphql-query/](https://taptogen.vercel.app/de/tools/generator-graphql-query/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-graphql-query Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graphql-query-desktop.png)
    *   **Mobile:** ![generator-graphql-query Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graphql-query-mobile.png)

---

## Exception Entry #156: Generador Random Color - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-random-color/](https://taptogen.vercel.app/es/tools/generador-random-color/)
*   **Tool Name:** Generador Random Color
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-random-color/](https://taptogen.vercel.app/es/tools/generador-random-color/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass26RandomGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:337:561)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-random-color Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-color-desktop.png)
    *   **Mobile:** ![generador-random-color Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-color-mobile.png)

---

## Exception Entry #157: Generator Graphql Query - copyText Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-graphql-query/](https://taptogen.vercel.app/de/tools/generator-graphql-query/)
*   **Tool Name:** Generator Graphql Query
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-graphql-query/](https://taptogen.vercel.app/de/tools/generator-graphql-query/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-graphql-query Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graphql-query-desktop.png)
    *   **Mobile:** ![generator-graphql-query Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-graphql-query-mobile.png)

---

## Exception Entry #158: Generador Cover Letter - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-cover-letter/](https://taptogen.vercel.app/es/tools/generador-cover-letter/)
*   **Tool Name:** Generador Cover Letter
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-cover-letter/](https://taptogen.vercel.app/es/tools/generador-cover-letter/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-cover-letter Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-cover-letter-desktop.png)
    *   **Mobile:** ![generador-cover-letter Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-cover-letter-mobile.png)

---

## Exception Entry #159: Generador Cover Letter - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-cover-letter/](https://taptogen.vercel.app/es/tools/generador-cover-letter/)
*   **Tool Name:** Generador Cover Letter
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-cover-letter/](https://taptogen.vercel.app/es/tools/generador-cover-letter/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-cover-letter Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-cover-letter-desktop.png)
    *   **Mobile:** ![generador-cover-letter Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-cover-letter-mobile.png)

---

## Exception Entry #160: Generador Random Color - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-random-color/](https://taptogen.vercel.app/es/tools/generador-random-color/)
*   **Tool Name:** Generador Random Color
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-random-color/](https://taptogen.vercel.app/es/tools/generador-random-color/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-random-color Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-color-desktop.png)
    *   **Mobile:** ![generador-random-color Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-random-color-mobile.png)

---

## Exception Entry #161: Generator Sku - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-sku/](https://taptogen.vercel.app/bn/tools/generator-sku/)
*   **Tool Name:** Generator Sku
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-sku/](https://taptogen.vercel.app/bn/tools/generator-sku/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-sku Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-sku-desktop.png)
    *   **Mobile:** ![generator-sku Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-sku-mobile.png)

---

## Exception Entry #162: Generator Sku - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-sku/](https://taptogen.vercel.app/bn/tools/generator-sku/)
*   **Tool Name:** Generator Sku
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-sku/](https://taptogen.vercel.app/bn/tools/generator-sku/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-sku Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-sku-desktop.png)
    *   **Mobile:** ![generator-sku Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-sku-mobile.png)

---

## Exception Entry #163: Slogan Generator Hi - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/slogan-generator-hi/](https://taptogen.vercel.app/hi/tools/slogan-generator-hi/)
*   **Tool Name:** Slogan Generator Hi
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/slogan-generator-hi/](https://taptogen.vercel.app/hi/tools/slogan-generator-hi/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![slogan-generator-hi Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/slogan-generator-hi-desktop.png)
    *   **Mobile:** ![slogan-generator-hi Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/slogan-generator-hi-mobile.png)

---

## Exception Entry #164: Slogan Generator Hi - copyText Error

*   **URL:** [https://taptogen.vercel.app/hi/tools/slogan-generator-hi/](https://taptogen.vercel.app/hi/tools/slogan-generator-hi/)
*   **Tool Name:** Slogan Generator Hi
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/hi/tools/slogan-generator-hi/](https://taptogen.vercel.app/hi/tools/slogan-generator-hi/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![slogan-generator-hi Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/slogan-generator-hi-desktop.png)
    *   **Mobile:** ![slogan-generator-hi Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/slogan-generator-hi-mobile.png)

---

## Exception Entry #165: Team Nam Generator - buildPass19NameGroups Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/team-nam-generator/](https://taptogen.vercel.app/bn/tools/team-nam-generator/)
*   **Tool Name:** Team Nam Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L246)
*   **Source Line Number:** Line 246
*   **Root Cause:** 
    The function `buildPass19NameGroups` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `buildPass19NameGroups` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/team-nam-generator/](https://taptogen.vercel.app/bn/tools/team-nam-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `buildPass19NameGroups()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass19NameGroups is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:246:3088)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![team-nam-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/team-nam-generator-desktop.png)
    *   **Mobile:** ![team-nam-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/team-nam-generator-mobile.png)

---

## Exception Entry #166: Team Nam Generator - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/team-nam-generator/](https://taptogen.vercel.app/bn/tools/team-nam-generator/)
*   **Tool Name:** Team Nam Generator
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/team-nam-generator/](https://taptogen.vercel.app/bn/tools/team-nam-generator/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![team-nam-generator Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/team-nam-generator-desktop.png)
    *   **Mobile:** ![team-nam-generator Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/team-nam-generator-mobile.png)

---

## Exception Entry #167: Generator Estimate - Unknown function Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-estimate/](https://taptogen.vercel.app/bn/tools/generator-estimate/)
*   **Tool Name:** Generator Estimate
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `Unknown function` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `Unknown function` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-estimate/](https://taptogen.vercel.app/bn/tools/generator-estimate/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `Unknown function()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: buildPass22EstimateSections is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:290:233)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-estimate Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-estimate-desktop.png)
    *   **Mobile:** ![generator-estimate Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-estimate-mobile.png)

---

## Exception Entry #168: Generador Css Button - renderCssButtonOutput Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-css-button/](https://taptogen.vercel.app/es/tools/generador-css-button/)
*   **Tool Name:** Generador Css Button
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L4800)
*   **Source Line Number:** Line 4800
*   **Root Cause:** 
    The function `renderCssButtonOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderCssButtonOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-css-button/](https://taptogen.vercel.app/es/tools/generador-css-button/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderCssButtonOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderCssButtonOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:1116:5)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-css-button Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-css-button-desktop.png)
    *   **Mobile:** ![generador-css-button Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-css-button-mobile.png)

---

## Exception Entry #169: Generador Css Button - copyText Error

*   **URL:** [https://taptogen.vercel.app/es/tools/generador-css-button/](https://taptogen.vercel.app/es/tools/generador-css-button/)
*   **Tool Name:** Generador Css Button
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/es/tools/generador-css-button/](https://taptogen.vercel.app/es/tools/generador-css-button/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generador-css-button Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-css-button-desktop.png)
    *   **Mobile:** ![generador-css-button Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generador-css-button-mobile.png)

---

## Exception Entry #170: Generator Estimate - copyText Error

*   **URL:** [https://taptogen.vercel.app/bn/tools/generator-estimate/](https://taptogen.vercel.app/bn/tools/generator-estimate/)
*   **Tool Name:** Generator Estimate
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/bn/tools/generator-estimate/](https://taptogen.vercel.app/bn/tools/generator-estimate/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-estimate Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-estimate-desktop.png)
    *   **Mobile:** ![generator-estimate Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-estimate-mobile.png)

---

## Exception Entry #171: Generator Citation - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-citation/](https://taptogen.vercel.app/de/tools/generator-citation/)
*   **Tool Name:** Generator Citation
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-citation/](https://taptogen.vercel.app/de/tools/generator-citation/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-citation Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-citation-desktop.png)
    *   **Mobile:** ![generator-citation Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-citation-mobile.png)

---

## Exception Entry #172: Generator Citation - copyText Error

*   **URL:** [https://taptogen.vercel.app/de/tools/generator-citation/](https://taptogen.vercel.app/de/tools/generator-citation/)
*   **Tool Name:** Generator Citation
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/de/tools/generator-citation/](https://taptogen.vercel.app/de/tools/generator-citation/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generator-citation Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-citation-desktop.png)
    *   **Mobile:** ![generator-citation Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generator-citation-mobile.png)

---

## Exception Entry #173: G N Rateur Album Name - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/)
*   **Tool Name:** G N Rateur Album Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![g-n-rateur-album-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-album-name-desktop.png)
    *   **Mobile:** ![g-n-rateur-album-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-album-name-mobile.png)

---

## Exception Entry #174: Generatore Book Name - renderPremiumOutput Error

*   **URL:** [https://taptogen.vercel.app/it/tools/generatore-book-name/](https://taptogen.vercel.app/it/tools/generatore-book-name/)
*   **Tool Name:** Generatore Book Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10807)
*   **Source Line Number:** Line 10807
*   **Root Cause:** 
    The function `renderPremiumOutput` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `renderPremiumOutput` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/it/tools/generatore-book-name/](https://taptogen.vercel.app/it/tools/generatore-book-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button. This attempts to compile results using `renderPremiumOutput()` which is undefined, throwing a `ReferenceError` exception immediately.
*   **Console Stack Trace:**
    ```text
ReferenceError: renderPremiumOutput is not defined
at HTMLButtonElement.De (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:453)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generatore-book-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-book-name-desktop.png)
    *   **Mobile:** ![generatore-book-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-book-name-mobile.png)

---

## Exception Entry #175: Generatore Book Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/it/tools/generatore-book-name/](https://taptogen.vercel.app/it/tools/generatore-book-name/)
*   **Tool Name:** Generatore Book Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/it/tools/generatore-book-name/](https://taptogen.vercel.app/it/tools/generatore-book-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![generatore-book-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-book-name-desktop.png)
    *   **Mobile:** ![generatore-book-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/generatore-book-name-mobile.png)

---

## Exception Entry #176: G N Rateur Album Name - copyText Error

*   **URL:** [https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/)
*   **Tool Name:** G N Rateur Album Name
*   **Viewport Scope:** Both (Occurs on Desktop and Mobile viewports)
*   **Source File Reference:** [src/scripts/tool-workspace.ts](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/src/scripts/tool-workspace.ts#L10842)
*   **Source Line Number:** Line 10842
*   **Root Cause:** 
    The function `copyText` is defined in `src/scripts/data/generator-datasets.ts` but is never exported, nor is it imported in `src/scripts/tool-workspace.ts`. Since Vite bundles client-side scripts as ES Modules, the variables are strictly local to their respective modules. Referencing `copyText` inside `tool-workspace.ts` without imports causes a `ReferenceError` at runtime.
*   **Exact Reproduction Steps:**
    1. Navigate to the page: [https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/](https://taptogen.vercel.app/fr/tools/g-n-rateur-album-name/)
    2. Fill in the input text area (e.g. `Playwright Live Audit Input Text Seed`)
    3. Click the **Generate** button to trigger output generation
    4. Click the **Copy** button. This calls `copyText()` which is undefined in the module scope, throwing a `ReferenceError` exception.
*   **Console Stack Trace:**
    ```text
ReferenceError: copyText is not defined
at HTMLButtonElement.<anonymous> (https://taptogen.vercel.app/_astro/LocalizedToolPage.astro_astro_type_script_index_0_lang.BNqrhmGs.js:4124:1292)
    ```
*   **Screenshot Evidence:**
    *   **Desktop:** ![g-n-rateur-album-name Desktop Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-album-name-desktop.png)
    *   **Mobile:** ![g-n-rateur-album-name Mobile Screenshot](file:///C:/Users/shahz/OneDrive/Documents/GitHub/taptogencom/screenshots/g-n-rateur-album-name-mobile.png)

---

