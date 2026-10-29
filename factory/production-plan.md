# Production plan

Status: approved. Every slice follows these steps, in order.

## Roles

- **Driver**: approves the slice note and closes the slice.
- **Agent**: writes the note, builds, checks, opens the pull request, and moves the GitHub issue.

## Publish, once

When the Driver approves [scope.md](scope.md), run `/to-tickets` on that file.

Opening an issue is one step. It is not done until all of these are done:

- Open one issue per slice on [amparoluna/ltr-client-v2-prototype](https://github.com/amparoluna/ltr-client-v2-prototype), blockers first, with GitHub's blocking links.
- Write each issue number into the scope table.
- Add each issue to [project 1](https://github.com/users/amparoluna/projects/1) with Status `Todo`.
- The issue body is what the user can do. Add no comment, and do not apply `ready-for-agent`. Seams belong in the slice note.

Those actions apply to any issue opened later. A slice added after Publish gets its blocking links, its row in the scope table, and a card on project 1 with Status `Todo` in that same step.

The board is the status other people see: `Todo`, `In Progress`, `Done`. The scope table keeps the order and the issue number.

Issue comments are added at Pick, at Note, when the note changes after approval, and at Close. The code review is a comment on the pull request.

## Steps for one slice

1. **Pick.** Take the open issue whose blockers are all closed. If more than one is open, take the lowest number. Create `slice/NN-name` from `main`. Set Status to `In Progress`, comment `Building`, and name the issue. All work for the slice stays on that branch.
2. **Note.** Write `factory/slices/NN-name.md` with these headings only:
   - **Does:** what the user does on the screen.
   - **Saves:** what is written, and where.
   - **Who:** which seeded user may do it, and one action the other user is refused.
   - **Seams:** for each test, the request, the response, and the refusal. An API route is the usual seam. Any other seam needs the Driver's explicit approval in this note.
   - **Check:** the clicks that prove the screen, after the seams pass.
   The Driver replies `approved`, or edits the note. No code and no test before that. Then comment the approved note on the issue.
3. **Build.** Follow the approved note. This is the [implement run](https://www.aihero.dev/skills-implement). The commit waits for the pull request.
   1. Restate the seams. Add none.
   2. For each seam: write a failing test, then the least code that passes it. Schema and seed arrive in the first seam that needs them. The screen comes after every seam passes.
   3. Typecheck, and run that seam's test file, after each pass.
   4. Run the full test suite once.
   5. Use only parts and paths listed in [architecture.md](architecture.md). Add a missing one there, then write the code.
4. **Check.** Run **Check** from the note. Write **Result** in the slice file: the suite passed; each seeded user did what **Who** allows and was refused what **Who** forbids; after a restart, the saved change is still there.
5. **Look back.** Add **Promote** to the slice file, in two lines at most. Name any work done twice, in this slice and the previous one, and whether it belongs in the architecture or in this plan. If nothing repeated, write `nothing to promote`. Also name any rule in those files that this slice never used. Do not edit those files yet.
6. **Pull request.** Commit `slice/NN-name` and open a pull request into `main`. The body includes **Result**, **Promote**, and `Closes #N`. Do not merge.
7. **Code review.** Run `/code-review` with fixed point `main` and with the slice file as the spec. Post the Standards report and the Spec report as one comment on the pull request. Do not merge, and do not mark the issue done. Close is refused until the latest commit has this comment.
8. **Close.** The Driver reads the pull request and the review, then replies `close` or says what is still wrong. `close` accepts **Promote** as written. To drop a line, the Driver says so. The agent commits each accepted line, sets Status to `Done`, comments **Result** on the issue, and merges into `main`. That merge is the only way onto `main`, and `Closes #N` closes the issue. If something is still wrong, the agent fixes it on the same branch, reruns the failed part of **Check**, and runs `/code-review` again before the next `close`. Look back is repeated only when the fix repeated work.

## When this slice changes

Write the change into the slice file. Build and `/code-review` read that file. If an approval comment already exists, post the revised note as a new issue comment and leave the earlier comments. The board stays `In Progress`. The issue body stays as published. No code and no test for the revised seams until the Driver replies `approved` again.

A new slice is not added to this file or this issue. Stop and ask. When the Driver says to add it, open its issue as in Publish: blocking links, the scope table, and project 1 with Status `Todo`.

## Slice 0

**Does** is the shell: navigation, the user picker, and the placeholder pages. **Saves** is the database seed. The picker is stored in the browser.

## Stops

Stop and ask the Driver when:

- the slice note and the reference app disagree;
- the slice needs something [scope.md](scope.md) lists as out of scope;
- a check fails twice after a fix.
