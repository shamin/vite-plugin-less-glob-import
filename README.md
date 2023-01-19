# vite-plugin-less-glob-import

> Use glob syntax for @import in you less file.

## Install

```shell
npm i -D vite-plugin-less-glob-import
```

```js
// In vite.config.js

import { defineConfig } from 'vite'
import lessGlobImports from 'vite-plugin-less-glob-import';

export default defineConfig({
  plugins: [
    lessGlobImports()
  ]
});
```

## Usage

**Note:** Globbing only work in a top-level file, not within referenced files.

```less
// In src/styles/main.less

@import 'utils/**/*.less';
@import 'objects/**/*.less';
```

The above will be transformed into something like the following before Vite processes it with Sass:

```less
@import 'utils/utils-a.less';
@import 'utils/utils-b.less';
@import 'objects/objects-a.less';
@import 'objects/objects-b.less';
@import 'objects/objects-c.less';
```
