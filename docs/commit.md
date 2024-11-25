# Types

1. API relevant changes

   - **feat**: Commits, that adds or remove a new feature
   - **fix**: Commits, that fixes a bug

2. **refactor** Commits, that rewrite/restructure your code, however does not change any API behaviour

   - **perf** Commits are special refactor commits, that improve performance

3. **style** Commits, that do not affect the meaning (white-space, formatting, missing semi-colons, etc)

4. **test** Commits, that add missing tests or correcting existing tests

5. **docs** Commits, that affect documentation only

6. **build** Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...

7. **ops** Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...

8. **chore** Miscellaneous commits e.g. modifying .gitignore

# The workflow for uploading to github is as follows:

## 1. Each person will do separate functions/modules

(Except for updating - refactoring code as assigned)

## 2. Once each job is completed, commit it to github according to the following rule

- feat (or create): create a new file, feature

- update: update/edit files, features

- refactor: update (restructure code - directory...) - related to reorganization

- chore: minor edit

...

Can commit in English or Vietnamese (feels accessible)
For example: `git commit -m "update(ModuleX): update feature A"` or `git commit -m "update: Module X - update feature A"`

# NOTE:

- Before committing the code, run the command `npm run format` to reformat the code first
