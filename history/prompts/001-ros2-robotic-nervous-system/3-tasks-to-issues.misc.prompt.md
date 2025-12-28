---
id: 3
title: Tasks To Issues Conversion
stage: misc
date: 2025-12-26
surface: agent
model: Claude Sonnet 4.5
feature: 001-ros2-robotic-nervous-system
branch: 001-ros2-robotic-nervous-system
user: Naveed Computers
command: /sp.taskstoissues
labels: [tasks, issues, github]
links:
  spec: specs/001-ros2-robotic-nervous-system/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - null
tests:
  - null
---

## Prompt

```
/sp.taskstoissues
```

## Response snapshot

Cannot proceed with creating GitHub issues from tasks because:

1. No tasks.md file exists yet - this file is created by running `/sp.tasks` command
2. No GitHub remote is configured for this repository

To proceed with this command, you need to:
1. First run `/sp.tasks` to generate the tasks.md file based on the specification and plan
2. Set up a GitHub remote with: `git remote add origin <your-github-repo-url>`
3. Then run `/sp.taskstoissues` again

The implementation plan is ready in specs/001-ros2-robotic-nervous-system/plan.md and the next step would be to generate the specific tasks with `/sp.tasks`.

## Outcome

- ✅ Impact: Identified prerequisites for tasks to issues conversion
- 🧪 Tests: No tests applicable for this command
- 📁 Files: No files created due to missing prerequisites
- 🔁 Next prompts: Run /sp.tasks first to generate tasks.md
- 🧠 Reflection: Command requires both tasks file and GitHub remote

## Evaluation notes (flywheel)

- Failure modes observed: Missing tasks.md file and missing GitHub remote
- Graders run and results (PASS/FAIL): N/A - Command cannot proceed without prerequisites
- Prompt variant (if applicable): Standard command with missing prerequisites
- Next experiment (smallest change to try): Run /sp.tasks to generate tasks first