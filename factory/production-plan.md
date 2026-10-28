# Production plan

Status: draft, not approved. The prescribed way: every slice of the prototype is built with these steps, in this order.

## Roles

- **Driver**: the person running the factory. Approves the slice note and closes the slice.
- **Agent**: the coding agent. Writes the slice note, builds, checks, opens the pull request, and moves the GitHub issue.

## Publish, once

When the Driver approves [scope.md](scope.md), run `/to-tickets` on that file. It publishes one issue per slice to [amparoluna/ltr-client-v2-prototype](https://github.com/amparoluna/ltr-client-v2-prototype), blockers first, using GitHub's own blocking links. The agent writes each issue number into the scope table, adds the issue to [project 1](https://github.com/users/amparoluna/projects/1), and sets its Status to `Todo`.

Creating the issue is the only write-up at Publish. Its body is the behavior of that slice, from the user's point of view. Publish adds no comment. Seams stay in the slice note, because `/to-tickets` does not ask for them.

Leave the `ready-for-agent` label off. The slice note does not exist yet, and this factory builds one slice at a time with the Driver present. That label would invite a second session to start the same slice.

After this, the project Status is what other people see on the board: `Todo`, `In Progress`, `Done`. Issue comments are added at Pick, at Note, when the slice note changes after approval, and at Close. The code review is a comment on the pull request. The scope table keeps the order and the issue number. It does not keep a second status word.

## Steps for one slice

1. **Pick.** The agent takes the open issue whose blockers are all closed. If more than one is open, it takes the lowest number. It creates branch `slice/NN-name` from `main`, sets the project Status to `In Progress`, comments `Building` on the issue, and names that issue in one line. All work for the slice stays on that branch. Nothing is committed straight to `main`.
2. **Note.** The agent writes `factory/slices/NN-name.md` with these headings, and nothing else:
   - **Does:** what the user does on the screen.
   - **Saves:** what is written, and where.
   - **Who:** which seeded user may do it, and the one action the other user must be refused.
   - **Seams:** the public boundaries the tests will hit. Each seam names the request, the response, and the refusal. The default seam is an API route. A test at any other boundary needs the Driver's explicit approval here.
   - **Check:** the clicks that prove the screen, after the seams are green.
   The Driver replies `approved` or edits the note. No code, and no test, before `approved`. Approving the note approves the seams. The agent then comments the approved note on the issue.
3. **Build.** One run of the approved note, in this order. This is the [implement run](https://www.aihero.dev/skills-implement), with the commit held for the pull request:
   1. Read the note and restate its seams. Add none.
   2. Drive each seam test-first, one at a time: a failing test, then the least code that makes it pass. Schema and seed arrive inside the first slice that needs them. The screen comes after every seam is green.
   3. Typecheck, and run that seam's test file, after each green.
   4. Run the full test suite once, after the last seam.
   5. Use only the parts, and the paths between them, already listed in [architecture.md](architecture.md). When this slice needs a part or a path that is not listed, add it to that file, then write the code.
4. **Check.** The agent runs **Check** from the note and reports under **Result**:
   - the full suite from Build is green;
   - each seeded user does what **Who** allows, and is refused what **Who** forbids;
   - the server is restarted, and the saved change is still there.
5. **Look back.** The agent adds **Promote** at the bottom of the slice file. Two lines at most. Name any work done twice across this slice and the previous one, and where it should move: the architecture or this plan. If nothing repeated, write `nothing to promote`. Name any rule in those files this slice never used. This step only writes the proposal. It does not edit the architecture or this plan yet.
6. **Pull request.** The agent commits the slice to `slice/NN-name` and opens a pull request into `main`. The request body includes **Result** and **Promote**, and its closing line is `Closes #N`. The agent does not merge it.
7. **Code review.** The agent runs `/code-review` on the committed branch, with fixed point `main` and with `factory/slices/NN-name.md` as the spec. It posts the Standards report and the Spec report as one comment on the pull request. It does not merge, and it does not mark the issue done. Close is refused while the latest commit on the branch has no such comment.
8. **Close.** The Driver reads the pull request and the code-review comment. That reading is the decision that the work is done. The Driver replies `close`, or says what is still wrong.
   A `close` reply accepts **Promote** as written. To drop a line, the Driver says so. The agent then commits each accepted promotion onto the same branch, sets the project Status to `Done`, comments **Result** on the issue, and merges the pull request into `main`. The merge is the only way a slice reaches `main`. `/implement` never closes an issue, so the merge does, through `Closes #N`.
   When the Driver says something is still wrong, the agent fixes it on the same branch and runs the failed part of **Check** again. The open pull request updates. `/code-review` runs again on the new commit before another `close` is allowed. Look back is repeated only when the fix itself repeated work.

## When this slice changes

A discovery that changes this slice's **Does**, **Saves**, **Who**, **Seams**, or **Check** is written into the slice file. The slice file remains the contract that Build and `/code-review` read. After an approval comment already exists, the agent posts the revised note as a new comment on the issue. Earlier comments stay. The board stays **In Progress**, and the issue body stays as published. No code and no test for the revised seams until the Driver replies `approved` again.

A discovery that is really a new slice is not written into this file or this issue. The agent stops and asks, as under Stops.

## Slice 0

**Does** describes the shell: navigation, the user picker, and the placeholder pages. **Saves** describes the seed in the database. The picker itself is stored in the browser.

## Stops

The agent stops and asks the Driver when:

- the slice note and the reference prototype disagree;
- the slice needs something the scope lists as out of scope;
- a check fails twice after a fix.
