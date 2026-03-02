import { resolve } from "node:path";
import { stringify } from "@std/yaml";
import { test, extractYaml } from "@std/front-matter";

const docBase = "https://router.vuejs.org";
const skillDir = resolve(import.meta.dirname!, "../skills/vuerouter-file-based-routing");
const referencesDir = resolve(skillDir, "references");

const textEncoder = new TextEncoder();

function init() {
  return Deno.remove(skillDir, { recursive: true })
    .catch(() => {})
    .then(() => Deno.mkdir(referencesDir, { recursive: true }))
    .catch(() => {});
}

function fetchDoc(uri: string) {
  return fetch(`${docBase}/${uri}`)
    .then((res) => res.text())
    .then((text) => {
      let content: string;
      const hasFrontMatter = test(text);

      if (!hasFrontMatter) {
        content = text;
      } else {
        content = extractYaml(text).body;
      }

      return content;
    });
}

function genOverview() {
  return fetchDoc("file-based-routing.md").then((content) =>
    Deno.writeFile(resolve(referencesDir, "overview.md"), textEncoder.encode(content)),
  );
}

function genFileConventions() {
  return fetchDoc("file-based-routing/file-based-routing.md").then((content) =>
    Deno.writeFile(resolve(referencesDir, "file-conventions.md"), textEncoder.encode(content)),
  );
}

function genConfiguration() {
  return fetchDoc("file-based-routing/configuration.md").then((content) =>
    Deno.writeFile(resolve(referencesDir, "configuration.md"), textEncoder.encode(content)),
  );
}

function genExtendingRoutes() {
  return fetchDoc("file-based-routing/extending-routes.md").then((content) =>
    Deno.writeFile(resolve(referencesDir, "extending-routes.md"), textEncoder.encode(content)),
  );
}

function failAs(promise: Promise<any>, name: string) {
  return promise.catch((err) => {
    err.name = name;
    return err;
  });
}

function genReferences() {
  return Promise.allSettled([
    failAs(genOverview(), "overview"),
    failAs(genFileConventions(), "file-conventions"),
    failAs(genConfiguration(), "configuration"),
    failAs(genExtendingRoutes(), "extending-routes"),
  ]).then((results) => {
    for (const res of results) {
      if (res.status === "rejected") {
        console.error("Error generating reference:", res.reason);
      }
    }
  });
}

function genSKILL() {
  const content = `# Vue Router File Based Routing

Vue Router includes a built-in file-based routing plugin. It generates the routes and types automatically from your page components, so you no longer need to maintain a routes array manually.

## When to use this skill

Use this skill when codebase is using file-based routing and you need to add/modify routes.

## References

- [Overview](./references/overview.md)
- [File Conventions](./references/file-conventions.md)
- [Configuration](./references/configuration.md)
- [Extending Routes](./references/extending-routes.md)
`;
  const frontMatter = stringify({
    name: "vuerouter-file-based-routing",
    description: "Knowledge about Vue Router file-based routing system.",
  });

  return Deno.writeFile(
    resolve(skillDir, "SKILL.md"),
    textEncoder.encode(
      `---
${frontMatter.trim()}
---
` + content,
    ),
  );
}

function main() {
  return init()
    .then(() => genReferences())
    .then(() => genSKILL());
}

await main();
