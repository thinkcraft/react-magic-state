import { JSDOM } from "jsdom";

const dom = new JSDOM('<!doctype html><html><body></body></html>');

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global["window"] = dom.window;
global["document"] = dom.window.document;
global["navigator"] = {
  userAgent: "node.js",
};
global["requestAnimationFrame"] = function (callback) {
  return setTimeout(callback, 0);
};
global["cancelAnimationFrame"] = function (id) {
  clearTimeout(id);
};

copyProps(dom.window, global);