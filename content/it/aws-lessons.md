---
title: AWS Lessons
draft: false
template: 'post'
image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwWNzquHKlHnG3BmQ1iRclZ5hgw53CdA-Efm1NrDpuDr5SV48i'
alt: 'server farm'
slug: '/it/aws-lessons'
category: 'Internet Technology'
tags:
  - 'AWS'
  - 'IT'
description: 'Notes on blog posts or the like that describe AWS in a very high level way.'
---

## [10 Lessons from 10 Years of AWS](https://hackernoon.com/10-lessons-from-10-years-of-aws-part-1-258b56703fcf)

### Embrace Failure

[Chaos Engineering](http://principlesofchaos.org/)

- a discipline of experimenting on a distributed system in order to build confidence in the system's capability to withstand turbulent conditions in production -[Chaos Engineering in Netflix](https://medium.com/netflix-techblog/tagged/chaos-engineering)

### Local State is a cloud anti-pattern

[AWS well-architected principles](https://aws.amazon.com/architecture/well-architected/)

#### Core promises of the cloud

Elasticity

- the ability to grow or shrink infrastructure as the demand for your service changes

Availability

- the ability to sustain failure of, say, an availability
  zone or a region without impacting user experience

##### Principle

- an elastic and available application works across several availability zones and should be able to scale up or down in _any_ AZ at _any_ time.
  - ex. When you scale up, a Load Balancer registers that info in its routing table and will start sending traffic to that new instance, container, or function.
    - so, your code cannot make assumptions about local state

"If you had user specific local state running in your application, well, it's gone - and if that local state was the content of a shopping cart or a login session, you will make your customer really unhappy since that data won't propagate to other instances and that user session will be lost."

##### How to solve

Use [Memcached](http://memcached.org/) or [Redis](https://redis.io/) depending on the structure of your object and performance requirements.

- doing this, any new instance of the backend app will be able to get the previous state of the app from the cache to continue on

So:

- make your app state-free if it is on the cloud!

##### [Transient state](https://en.wikipedia.org/wiki/Transient_state)

A system is in transient state when a process variable or variables have been changed and the system has not yet reached a steady state.

Examples in code:

- counters
- job progress states
- lists
- sets
  - ie. any data that becomes irrelevant, depreciated, or mutated shortly after it is useful.

In relation to the database:

- every time that a system had to scale up
  - requests to write, update, or delete took the app down
  - so do not store transient state in SQL databases

Got some lists, sets, sorted sets, hashes or keys that store transient state?

- use Redis (for example) since it was built for that very purpose

or use DynamoDB, Memcached, or Elasticsearch

### Immutable Infrastructure

Immutable components are replaced for every deployment, rather than being updated in-place.

- No updates on live systems
- Always start from a new instance being provisioned

#### [Immutable Server Pattern](http://martinfowler.com/bliki/ImmutableServer.html)

- reduces configuration drift and ensure deployments are repeatable from source

#### Example immutable infrastructure update

1.  Create a Base AMI and harden it if you must

##### if using Docker

2.  Create base container with libraries and dependencies and store it in your container hub
3.  Create an as-light-as-possible `Dockerfile`
4.  Copy code on build into Docker Container
5.  Deploy container to base AMI

##### otherwise

2.  Bake the AMI (keep this AMI in your account - export it to other regions if you have to deploy multi-regions)
3.  Create new configuration with auto-scaling group (with or without ELB) and use the previously bake AMI ID as reference.
4.  Test in different environments (dev, staging)
5.  Deploy to prod (inactive)
6.  Add new reference (DNS or Load Balancer)
7.  Allow traffic flow slowly to new version (start with 5% and ramp up)
8.  Keep old version around until new version is 100% and you are fully satisfied with the behavior
9.  Fast rollback if things go wrong

### Infrastructure as code

[AWS CloudFormation](https://aws.amazon.com/cloudformation/) provides the common language (JSON or YAML) for you to describe and provision all the infrastructure resources needed.

- deploy a data-center simply by writing JSON or YAML

#### Offers

1.  Repeatability
2.  Version control
    - you can treat the code the same way you treat application code
    - altering the configuration if it can be improved upon
    - history preservation
3.  Knowledge sharing

#### [AWS Config](https://aws.amazon.com/config/)

### Asynchronous and Event-Driven Patterns will Help you Scale

#### Asynchronous pattern

##### Benefits

- saves resources on the API backend and gives faster responses to the client
- optimizes workers for different tasks
- decoupling
- retries
- etc.

##### How it works example

1.  user uploads an image
    - you want to extract metadata
2.  rather than forcing user to wait for all the necessary functions to execute the user continues interacting with the website and eventually gets a message (if needed) that the task has finished

#### Event-driven with AWS Lambda

##### Example

- A particular event changes (state is altered on A so B is triggered)
  - say data is sent to an S3 bucket and its state is altered

##### Lambda function is called during [this event](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html), ie. S3 bucket state alters

- It does some computing in the context of the event
  - say if its an image, it is resized, converted to a different type, etc.

##### Benefits

- unless the state is changed, no infrastructure is required, no machine is left in idle mode
  - so you can offload intensive tasks to AWS to relieve your API backend
  - also inherits scalability, durability, availability of the AWS services

### Don't Forget to Scale the Database

#### Why use SQL?

- easy to change your data access needs
- Established and well-worn technology
- Lots of existing code, communities, books and tools
- You aren't going to break SQL DBs in your first 10 million users. No really, you wont!
- Clear patterns to scalability

#### Why use NoSQL?

- super low latency applications
- metadata driven data-sets
- highly non-relational data
- need schema-less data constructs (needs != its easy to do devs without schemas)
- rapid ingest of (unstructured) data (thousands of records/sec)
- Massive amount of data ( in the TB+ range)

#### back in action

Assuming you have a clear [data domain](https://en.wikipedia.org/wiki/Data_domain), you're not using anti-patterns, and that you have decoupled the database layer from the business layer then do this:

1.  Splitting Reads and Writes
    - push all 'write' operations to the master instance and all the 'reads' to the [read replicas](https://aws.amazon.com/rds/details/read-replicas/)
2.  Database Federation
    - each db in the federation is self-sustained and independent to spread the load btw instances.
3.  Database Sharding (horizontal or range partitioning)
    - selects a partition by determining if the partitioning key is within a certain range
      - Each shard is located on a separate instance to spread the load based upon the partition

#### or use

[Amazon Aurora](https://aws.amazon.com/about-aws/whats-new/2017/11/sign-up-for-the-preview-of-amazon-aurora-multi-master/) [Serverless](https://aws.amazon.com/blogs/aws/in-the-works-amazon-aurora-serverless/)

### Measure, Measure, and Measure

Nurture a culture of measuring everything.

#### Measure at three different levels

1.  Application
2.  Network
3.  System (on the machine itself)

why?

- because you want to figure out relationships btw causes and effects

#### Interesting measurements

- the cost of one user in a system
- measuring progress and regression

#### Example of measuring the number of update queries your database is doing on the application level

You should also measure

    - the network latency of those requests
    - the number of sockets opened on the instance
    - the length of the waiting queue in the database
    - the number of timeout requests on the load balancer
    - the number of people closing the application
    - etc...

#### How do you nurture this culture?

- make it easy
- use [python decorators](https://realpython.com/blog/python/primer-on-python-decorators/) to do so on the application level
  - don't forget to setup alarms and escalation path once you have measurements in place

#### Details

- most responses can be automated
- measuring without operational targets is often useless

#### Questions to ask as an organisation

- What should be the response time for your user to have a good experience?
- What should be the number of concurrent connections for each instance?
- What should be the scaling up, or down, time?

### Plan for the Worst, Prepare for the Unexpected

#### How to prepare for the unexpected

Put a lot of effort in preserving data, data is gold

##### How to do so

1.  Perform backups on a regular basis
2.  Test your backup

### You Build It, You Run It!

#### How to create responsible development teams

- give more responsibility
- you build it, you run it

### Be Humble, Learn from Others

#### Resources

[Netflix Developer site](http://netflix.github.io/)

[High Scalability](http://highscalability.com/)

[All Things Distributed](http://www.allthingsdistributed.com/)

## [Here's how to make your cloud infrastructure stable, secure, and scalable](https://www.freecodecamp.org/news/heres-how-to-make-your-cloud-infrastructure-stable-secure-and-scalable-f9f4749697d6/)

### Stability

#### Restoring from catastrophic failure (Automatic Backups)

AWS: Use CloudWatch as it lets you create scheduled jobs such as automatic snapshots

_Test your backup restore method_

#### Automatic service restarting in case of server reboot

When your app crashes, does it start up again?
Whe your server reboots, does your app start up automatically?

##### Tools

[Crontab](https://www.cyberciti.biz/faq/linux-execute-cron-job-after-system-reboot/)

- lets you schedule jobs easily

[/etc/init.d](https://unix.stackexchange.com/questions/20357/how-can-i-make-a-script-in-etc-init-d-start-at-boot)

- use this to define scripts which can be started at boot and also support _stop, start, and status_ commands to give you more control over your applications.
  - ie. `service start myscript`

[Differences between the two](https://unix.stackexchange.com/questions/188042/running-a-script-during-booting-startup-init-d-vs-cron-reboot)

#### Automatic service restarting in case of application crash

##### Tools

NodeJS

- Forever or PM2

General

- [Using bash scripts](https://stackoverflow.com/questions/696839/how-do-i-write-a-bash-script-to-restart-a-process-if-it-dies)

#### Always ensure there are enough resources available

Set up monitoring of resources to mitigate risk

AWS - CloudWatch again

Make sure to document your auto-start method and boot scripts. Keep code in version control or you will risk trouble when it comes to scale due to mystery code you forgot about.

#### Security

##### SSL

Use it and this is a tool to do so easily:

- [Let's Encrypt](https://letsencrypt.org/)

##### Server Security

Manage servers properly

- Databases should not be accessible to the open internet.
- Keep applications and operating system up to date. There are often security updates which protect your server from new vulnerabilities.
- Close all ports except those that are absolutely necessary.
- Do not use username/passwords - using keys is much more safe.
- Do not give people the root key when they need access to your server. Make new accounts and have them give you their public key.

##### Secret Management

- Keep as many secrets local as possible.
- Don't hardcode secrets into your application - create configuration files you can store outside of app code.
- Don't store secrets in a public Github repo (be wary of the cloud in general).
- Avoid plaintext when storing user passwords and your own secrets

### Scalability

[Unless you're gaining traffic, it's not needed](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

The best you can do when it comes to building scalable infrastructure is think about design principals while building your app so it wont be too much work to get going when it's finally time to scale.

#### Containerization

- Allow configuration of your app via environment variables. Things like database info and initial admin username/password will go a long way when it comes to building a CI/CD pipeline and automating your app deployment.
- Keep as much state out of your container as possible. This will allow for stateless deployments via tools like Kubernetes.
- Install your modules as part of the build process to reduce dependencies and image size.

#### Keep your servers' configurations well documented

Store everything in version control: configurations, scripts, and procedures to prepare servers.
