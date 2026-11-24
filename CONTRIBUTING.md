# Contributing to CodePlay

Thanks for helping improve CodePlay. Small, reviewable changes make the learning experience and codebase better for everyone.

## Development setup

1. Fork the repository or use an authorized clone.
2. Create a feature branch from `main`, for example `feat/lesson-streaks` or `fix/quiz-feedback`.
3. Install dependencies with `npm ci` (and `npm ci --prefix codeplay-backend` when changing the API).
4. Run the relevant checks before opening a pull request:

   ```bash
   npm run typecheck
   npm run lint
   npm test
   npm --prefix codeplay-backend run typecheck
   ```

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(lessons): add ordered code exercise
fix(gamification): cap streak bonus
refactor(api): validate user identifiers
test(ui): cover quiz feedback
 docs: explain local compose setup
```

Use imperative, concise subjects. Keep unrelated changes in separate commits.

## Pull requests

- Open a pull request against `main`; do not push directly to the default branch.
- Explain the user impact and implementation approach, and link related issues.
- Include screenshots or a short recording for visible UI changes.
- Call out database/schema changes, environment variables, or operational impacts.
- Confirm CI passes and describe any checks you could not run.
- Request review from a maintainer before merging.

## Code expectations

- Keep application and backend code in strict TypeScript; avoid `any` and implicit data contracts.
- Keep routes thin, domain logic testable, and user-specific data protected by authenticated ownership and RLS.
- Use semantic colors and shared spacing/radius tokens. Make controls keyboard accessible and provide accessible labels.
- Never commit credentials, `.env` files, build output, or local database dumps.
