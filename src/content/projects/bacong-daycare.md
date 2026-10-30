---
title: Bacong Daycare Center
subtitle: Every child's progress, in one place.
summary: A student progress and enrollment tracker for the Barangay Bacong Daycare Center — attendance, early childhood development checklists and DSWD-compliant reporting for staff, with a portal for parents.
category: Web
tags: [Web application, Full-stack, Dashboard]
order: 3
visual: web
contribution: Solo project. I designed and built the system end to end, from the interface to the full-stack development.
tools: [Supabase]
links:
  - label: Visit the live site
    href: https://bacong-daycare-center.vercel.app/login
---
## From paper registers to a shared record.

Daycare workers keep attendance, development checklists and reports for every child, often on paper. This system brings that work into one place for the Barangay Bacong Daycare Center, and gives parents a way to see how their child is doing.

## Two portals, one sign-in

Staff sign in with an email address; parents sign in with their child's Student ID. The system detects the role from the account and loads the right portal automatically, so nobody has to choose. Account help goes to the daycare worker.

## What it tracks

- **Daily attendance registers** for each class.
- **The DSWD ECCD checklist** — all seven developmental domains and 109 items — recorded per child.
- **DSWD-compliant reports** generated from the same records.

## Privacy by design

Children's records are sensitive. The system is built to comply with the Data Privacy Act (RA 10173), using Supabase Authentication and Row-Level Security so that each parent can only ever see their own child's data.
