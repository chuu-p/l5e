import ts from "typescript";

export type PanelRuntimeContext = {
  panel: any;
  entries?: any[];
};

export function runPanelScript(
  script: string,
  context: PanelRuntimeContext,
): any {
  const jsCode = ts.transpile(script);

  const fn = new Function(
    "context",
    `
      "use strict";
      const { panel, entries } = context;
      ${jsCode}
    `,
  );

  return fn(context);
}
