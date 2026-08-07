// `next/image` and metadata `icons` don't auto-prepend `basePath` to
// unoptimized (static-export) src strings, so every site-root asset path
// has to go through this helper or it 404s once deployed under GitHub
// Pages' /diago project-page prefix (see next.config.ts).
export const withBase = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
