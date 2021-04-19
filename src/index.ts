import { run } from "@cycle/run";
import {
  div,
  label,
  input,
  hr,
  h1,
  makeDOMDriver,
  VNode,
  DOMSource,
} from "@cycle/dom";
import { Observable } from "xstream";

const main = (sources: { DOM: DOMSource }) => {
  const input$: Observable<Event> = sources.DOM.select(".field").events(
    "input"
  );

  const name$: Observable<string> = input$
    .map((ev) => ev.target.value)
    .startWith("");

  const vdom$: Observable<VNode> = name$.map((name) =>
    div([
      label("Name:"),
      input(".field", { attrs: { type: "text" } }),
      hr(),
      h1("Hello " + name),
    ])
  );

  return { DOM: vdom$ };
};

run(main, { DOM: makeDOMDriver("#app") });
