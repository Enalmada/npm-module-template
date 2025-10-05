# npm-module-template

A starter template for npm modules.  Currently setup with the following tech:

* [bun](https://bun.sh/docs/bundler) build - with types the best I could (see build notes below)
* [vitest](https://vitest.dev/) test framework
* [biome](https://biomejs.dev/) for linting and formatting
* [fixpack](https://www.npmjs.com/package/fixpack) to normalize package.json changes along with `npm pkg fix`
* [lefthook](https://github.com/evilmartians/lefthook) pre commit hooks
* [turbo](https://turbo.build/) task orchestration and caching
* [changesets](https://github.com/changesets/changesets) change and release workflow
* [renovate](https://github.com/renovatebot/renovate) dependency management
* [Github Actions](https://github.com/features/actions)
* [Starlight](https://github.com/withastro/starlight) Documentation
 
## Installation
Click the [Use this template](https://github.com/Enalmada/npm-module-template/generate) button to create a new repository 
(or run `bun create Enalmada/npm-module-template <your-new-library-name>`)

## Documentation
Read the documentation [website](https://npm-module-template.vercel.app/)

### TODO
- [ ] tests framework to bun (when bun supports mocking modules)

### inspiration
* [bun-lib-starter](https://github.com/wobsoriano/bun-lib-starter)

## Notes
### Build
* Using [latest module and target settings](https://stackoverflow.com/questions/72380007/what-typescript-configuration-produces-output-closest-to-node-js-18-capabilities/72380008#72380008) for current LTS
* using tsc for types until [bun support](https://github.com/oven-sh/bun/issues/5141#issuecomment-1727578701) comes around

## Contribute
Using [changesets](https://github.com/changesets/changesets) so please remember to run "changeset" with any PR that might be interesting to people on an older template.
Although this isn't being deployed as a module, I would like to call out things worth keeping in sync.