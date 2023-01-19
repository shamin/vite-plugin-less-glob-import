import { it, describe, expect, spyOn } from 'vitest';
import lessGlobImportPlugin from '../src';

let source = `
body {}
@import "files/*.less";
`;

describe('it correctly converts glob patterns to inline imports', () => {
  const plugin: any = lessGlobImportPlugin();

  it('for Less', () => {
    const expected = `
body {}
@import "files/_file-a.less";
@import "files/_file-b.less";
`;
    const path = __dirname + '/virtual-file.less';
    expect(plugin.transform(source, path)?.code).toEqual(expected);
  });
});

describe('it warns for invalid glob paths', () => {
  const plugin: any = lessGlobImportPlugin();

  it('for SCSS', () => {
    let source = `
body {}
@use "foo/**/*.scss";
`;
    const expected = `
body {}

`;
    const path = __dirname + '/virtual-file.scss';
    spyOn(console, 'warn');
    expect(plugin.transform(source, path)?.code).toEqual(expected);
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});
