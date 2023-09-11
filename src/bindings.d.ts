export type Bindings = {
  BLOG_EXAMPLE: KVNamespace;
  CALL_API: Fetcher;
};

declare global {
  function getMiniflareBindings(): Bindings;
}
