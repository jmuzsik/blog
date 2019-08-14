---
title: Thoughtworks 2017
template: 'post'
image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Plato-raphael.jpg'
alt: 'plato doing plato things'
draft: false
slug: '/ideas/thoughtworks-2017'
category: 'Ideas'
tags:
  - 'Thoughtworks'
  - 'Ideas'
  - 'Lots of stuff'
description: 'Notes on thoughtworks 2017 review.'
---

## Thoughtworks Tech Radar Vol 17 (2017) - Why? It was loaded and I had no internet atm

### What's new?

#### Open source rise in China

Why is it occurring?

> The prospect of working on cutting-edge open source projects with other smart developers is a universal incentive.

#### Cloud as the new normal

> Instead of asking, "Why in the cloud?", many companies now ask, "Why not in the cloud?" when embarking on new projects.

- [Polycloud](https://thoughtworks.com/radar/techniques/polycloud) for using multiple cloud providers simultaneously.

### Techniques

#### Lightweight Architecture Decision Records

> a technique for capturing important architectural decisions along with their context and consequences.

- Best done straight within the code to be in sync with the code itself.

#### Applying Product Management to Internal Platforms

> means establishing empathy with internal consumers (read: developers) and collaborating with them on the design. Platform product managers establish roadmaps and ensure the platform delivers value to the business and enhances the developer experience.

- Internal platforms should be as important as what is created for the client (in a way) as it will be interconnected with the developer's future work creating a product for the client.

#### Architectural Fitness Function

> provides an objective integrity assessment of some architectural characteristics, which may encompass existing verification criteria, such as unit testing, metrics, monitors, and so on.

- [Building evolutionary architectures](https://www.thoughtworks.com/books/building-evolutionary-architectures)

#### Autonomous Bubble Pattern

> This approach involves creating a fresh context for new application development that is shielded from the entanglements of the legacy world.

- This is focused on integrating modern architecture into companies with a lot of legacy code. You create separate "bubbles" where both bubbles have full control.

#### [Chaos Engineering](https://principlesofchaos.org/)

Predominantly useful for large scale systems which you know will occasionally be subject to turbulent conditions. So, I imagine at pre-scheduled times or low-use hours you can test these conditions to see how your system reacts.

#### DesignOps

> a cultural shift and a set of practices that allows people across an organization to continuously redesign products without compromising quality, service coherency or team autonomy

- Advocates for the creation and evolution of a design infrastructure. Tools like Storybook make it a part of everyone's job.

#### Micro Frontends

> In this approach, the web application is broken down into its features, and each feature is owned frontend to backend, by a different team

- Separation of concerns. Less state to manage. Lower code bundle. Endless benefits.

#### Pipelines for Infrastructure as Code

> enables errors to be found before changes are applied to operational environments — including environments used for development and testing

- Basically pre-deploy hooks.

#### TDD'ing Containers

Literally running tests on container scripts.

#### Algorithmic IT Operations

> steady improvement in machine learning algorithms will inevitably change the role of humans in operating tomorrow’s data centers

- Tools like [Prometheus](https://thoughtworks.com/radar/tools/prometheus) are automating the ability for companies to find algorithmic bottlenecks in their applications.
