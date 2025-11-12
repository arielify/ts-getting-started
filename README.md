
# TypeScript getting started

Scope:

- TypeScript
- [Nest](./docs/nest.md)
- Effect
- JestJS
- OpenApi validation

## Learning console applications

Run a single application by clicking the play button in PhpStorm `Ctrl+Shift+R` or with the command:

```
npx ts-node learning/typescript/00-hello-world.ts
```

The application with the non-relative imports:

```
npx ts-node -r tsconfig-paths/register learning/nest/00-bootstrap-nest.ts
```

But the additional param is not needed when we define in `tsconfig.json`:

```
{
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  },
  "compilerOptions": {
    // ... your options
  }
}
```
