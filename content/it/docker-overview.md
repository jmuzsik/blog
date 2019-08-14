---
title: Docker Overview
draft: false
template: 'post'
slug: '/it/docker-overview'
category: 'Internet Technology'
tags:
  - 'Docker'
  - 'IT'
description: 'An overview of what Docker offers.'
---

## Docker Core basics

**Why not VM's?** As the docker container runs on your host OS, you can save precious boot-up time. This is a clear advantage over Virtual Machine. Docker containers do not necessitate an entirely new OS to run.

### Docker steps

1. _dockerfile_ - defines application requirements and dependencies.
2. Creates docker images that are stored in a docker container which is a runtime instance of a docker image
3. Docker images are stored in docker hub which is similar to github for docker images
   - Different teams can pull the image and create their own containers
4. This all leads to the same environment throughout the software development lifecycle

**Docker Registry:** storage component for docker images ~ github of docker

**Docker images:** read only templates to create containers ~ instructions to create run time environment

**Docker container:** can be built from multiple images. contains everything needed to run the application

**Docker Compose:** used to run multiple containers(applications) in one single command.

- can be written in a YAML file. docker-compose.yml

### **Docker files:** other dockerfiles can be used simultaneously (images!)

_Side note:_ Every time an image is created it is cached so it is not downloaded every time dockerfile is created

**dangling image:** if you alter a dockerfile after it has been built and then you recreated the image with the same exact name the old one loses its name but `is not deleted` while the new one is created with the name specified

- Basically, the cache goes downward.
- So, if something is altered in the configuration, from that point on everything will be re-downloaded.
- So, if you add something new or think something may be altered in the future, add it at/near the end!

### Docker commands

- `docker images` gives you every image created
- `docker run -ti -rm ${some_image} /bin/sh` opens the container
  - -ti does what?
- `docker rmi $(docker images -q --filter "dangling=true")`
  - This will grab all dangling images (those titled as `<none>`) and remove them

#### docker-compose

- how to run:

  1.  Create a `docker-compose.yml` file like one in this folder.
  2.  Insert it to be called directly from current directory
  3.  Use the CLI: `docker-compose up -d`

#### `dockerfile`

- how to run:
  1.  Create a `dockerfile` file like one in this folder.
  2.  Insert it to be called directly from current directory
  3.  Use the CLI: `docker build -t jmuzsik/alpine-smarter:1.0 .`
      - -t means to give a tag, ie. name of the image
      - name is written usually in the format specified
      - end(`.`) specifies what folder the image will be stored in

## Virtual Machines vs Docker

"Working in heterogeneous environment, Virtual Machines provide high flexibility whereas Docker containers’ prime focus is on applications and their dependencies. The prime goal of the article is to compare the both on the basis of performance. Docker Containers promise to port application stacks across cloud easily by using each cloud’s Virtual Machine environment to deal with the cloud. This represents a useful capability that has to be implemented in a more complex and tedious way today without Docker Containers. Its not about abandoning Virtual Machines but to advocate in favor and design for the use of Docker Containers in addition to Virtual Machines when necessary. We don’t think Docker Containers could completely wipe out Virtual Machines."

If you want run multiple copies of a single app, say MySQL, you use a container. If you want the flexibility of running multiple applications you use a virtual machine.

- Do you need to run the maximum amount of particular applications on a minimum of servers? If that's you, then you want to use containers -- keeping in mind that you're going to need to have a close eye on your systems running containers until container security is locked down.
- If you need to run multiple applications on servers and/or have a wide variety of operating systems you'll want to use VMs. And if security is close to job number one for your company, then you're also going to want to stay with VMs for now.

[Reference1](https://devops.com/docker-vs-vms/)

[Reference2](https://www.itworld.com/article/2915530/virtualization/containers-vs-virtual-machines-how-to-tell-which-is-the-right-choice-for-your-enterprise.html)

## Why Docker

### Reasons

#### Ease of use

- anyone can package an app on their laptop which can run unmodified on any public cloud, private cloud, or even bare metal
  - "build once, run anywhere"

#### Speed

- lightweight and fast because they do not use a guest OS

#### Docker Hub

- app store for docker images

#### Modularity and scalability

- can break app functionality into individual containers and edit them individually

## Docker concepts

### Docker Engine

Lightweight runtime and tooling that manages containers, images, builds, etc

1.  Docker Daemon that runs in the host computer
2.  Docker Client that communicates with the Docker Daemon to execute commands
3.  REST API for interacting with Docker Daemon remotely

#### Docker Client

- What you communicate with, UI for docker. Communicates instructions to Docker Daemon

#### Docker Daemon

- What executes commands sent to the Docker Client such as building, running, distributing containers.
- Runs on host machine.
- Can also run on a different machine and communicate with the Docker Daemon that's running on the host machine.

#### Docker File

- Where you write instructions to build a docker image

#### Docker Image

- read-only templates that you build from a set of instructions written in your Dockerfile.
- defines what you want your packaged app and its dependencies to look like _and_ what processes to run when launched
- layered downloading, remember if anything is altered when the Dockerfile is run, from the point of the alteration onward will be completely redownloaded while all prior will have been cached and not necessitate download

#### Union File Systems

- used to build up an image.
- transparently overlay all files to form a single file system
- directories are merged rather then both being downloaded if there is an overly during the creation of the image
  - so duplication-free
  - docker only propagates the updates to the layer that was changed

#### Volumes

- "data" part of a container, initialised when container is created
- allows you to persist and share containter's data
- separate from Union File System and exist on the host filesystem

#### Docker Container

- wraps an apps software into an invisible box with everything the app needs to run
- built off docker images
- adds a read-write file system over the read-only file system of the image
- creates a network interface so that the container can talk to the local host, etc.
- _it can be run in any environment without having to make changes_

#### What exactly is a container?

##### Namespaces

- provides containers with their own view of the underlying Linux system, to limit what the container can see and access.
  - docker creates namespaces that the container will use

_Net_:

- Provides container with its own view of the network stack of the system (ports, ip addresses, etc)

_PID_:

- Stands for process ID. Gives containers their own scoped view of processes they can view and interact with.

_MNT_:

- GIves container own view of the "mounts" of the system.

_UTS_:

- UNIX Timesharing System. Allows a process to identify system identifiers. Allows containers to have their own hostname independent of the host system and other containers

_IPC_:

- Inter-process communication. Responsible for isolating IPC resources between processes running inside each container

_USER_:

- isolates users within each container.

##### Control groups

Linux kernel feature that isolates, prioritises, and accounts for the resource usage (CPU, memory, disk I/O, etc) of a set of processes. SO docker containers only use resources they need and sets limits.

##### Isolated Union File System

as explained above

### Future of Docker: Docker and VMs will co-exist

#### When to use VM's

1.  If you need to run multiple apps on multiple servers

#### When to use Docker

1.  If you need to run many copies of a single app

#### Why not to use Docker

1.  The many functional discrete parts creates a separation of concerns that is difficult to manage
2.  Security is a problem because containers share the same kernel, so small barrier between containers (one is breached, the rest can easily be).

## Docker on AWS

### Definitions

#### Virtualisation (VM's)

Division of physical computer and networking resources into smaller, more flexible units, presenting these smaller units to users as though each was a discrete resource.

- rather then assigning specific computing tasks to individual servers, a single server can be divided into as many virtual servers as needed.

_Bare metal_ is when multiple apps are served through physical servers

_virtualisation server_ is when multiple apps are on one virtualised server

##### New servers can be provisioned at will on a virtualisation server

- basically what is stored on this server is dynamic (create, delete, alter VM's at will based upon current needs of the organisation or individual)

##### Cloud computing providers (AWS) in relation

Use virtualised computers of one kind or another

- the countless EC2 instances all run on top of Xen or KVM hypervisors which are installed and running on the physical servers Amazon maintains in their "server farms"
  - predominant goal here is to provide a largely automated hosting environment for multiple complete, self-contained virtual computers.

#### Containers

They are not hypervisors but are extremely lightweight virtual servers that share the underlying kernel of their host OS (rather then running as full OS's)

[Linux container project](https://linuxcontainers.org/)

#### Docker

1.  Docker is easy because script friendly interface to create/automate/remotely manage complex clusters of containers deployed as microservices
    - Microservices is a compute services architecture where multiple containers are deployed each with a distinct yet complementary role for the app at whole. (DB, file server, web server, etc)

#### Docker container

Is an image whose behavior is defined by a script.

- image is a software file containing a snapshot of a full OS file system, ie: everything necessary to launch a viable virtual server
  - looks as so: Ubuntu linux (OS) below MySQL below writable data layer

##### What do people commonly do with docker containers?

Often to load an app in development to test how it will work or to share it with team members for feedback/updates.

- When the app is complete it can be launched as a cluster of containers (or swarm) that can be programmatically and instantly scaled up or down according to user demand.

#### Cloud computing

The provision of on-demand, self service compute, memory, and storage resources remotely over a network.

How often does one need to own their own servers? use the cloud

#### AWS with Docker

##### EC2 Container Service (ECS)

Specifically configured EC2 instances as hosts for integrated Docker containers.

- you can provision and administrate your containers through the ECS framework
- Fargate mode option?

##### AWS CloudFormation

Can configure any combination of AWS resources into a template that can be deployed one or many times

- can have specified dependencies and custom parameters in the template
- this is the service Docker for AWS uses
  - CloudFormation to orchestrate a swarm of docker containers to run on AWS infrastructure in your account

##### AWS Elastic Beanstalk

Sits on top of ECS. Allows you to deploy your app across all the AWS resources normally used by ECS, but with virtually all the logistics neatly abstracted away.

You need to use a `Dockerrun.aws.json` file can create your complex microservices environment.

##### Amazon Elastic Container Service for Kubernetes (EKS)

Allows you to manage containers using Kubernetes orchestrator without having to install your own clusters. Similar to ECS, all necessary AWS infrastructure will be deployed without manual intervention

##### Docker for AWS

Can use the service to install and run a "swarm of Docker Engines" that are fully integrated with AWS infrastructure

##### Docker Datacenter

A joint AWS/Docker project that provides customers with a more customizable interface for integrating Docker with AWS

##### Docker Cloud

GUI, browser based console for managing all aspects of Docker deployments.

Includes administration for your host nodes running in public clouds.

##### Docker Hub

To look for/share docker images

##### EC2 Container Registry (ECR)

Amazon's own image registry to go with their EC2 Container Service platform.

### Back to Docker

#### Docker Client

- Command line shell activated by running docker commands

#### Docker daemon

- the local docker process that is started during installation

#### Image

- file containing the data that will be used to make up an OS

#### Launching a container

`docker run name-of-image`

#### Interactive container sessions

- `docker run -it ubuntu bash`
  - `i` makes the session interactive, as in you'll be dropped into a live shell to _interact_ with
  - `t` will open a TTY shell, which means...

#### Running containers in the background

- `docker run -it --detac=true ubuntu bash
  - will not throw you into a new shell but the containers shell _will be running_.

#### Managing Containers

- `docker rename` to rename a container..
- `docker inspect name-of-container` will return useful info about the containers config and environment

#### Docker Networks

- `docker network ls` lists all network interfaces currently associated with the docker client.
  - `bridge` interface connects a container to the _Docker host_ to allow network communication in and out of the container.
- `docker network create name-of-interface` will do as you expect.

[TCP/IP Networking is???](https://learntech.bootstrap-it.com/chapter7.html)

#### Moving containers between networks

- `docker network connect name-of-network name-of-container`

  - this will add a new network interface to the container

- To test:
  - `ping ip.of.some.network` should show something beginning like: `PING 172.17.0.2 (172.17.0.2) 56(84) bytes of data.`

#### Working with Dockerfiles

- The process of working with docker from the command line can be much simplified with Dockerfiles
  - running `Dockerfile` as part of a docker build operation tells Docker to create a container using the configs specified by the script
- To do it:

  - `docker build -t "name-of-container" .` (`-t` stands for tag which is another way to say its name)
    - notice the `.` which tells docker to read the file named `Dockerfile` found in the current directory.

- `-d` and `-p`

  - `-d` tells Docker to run this container detached meaning we won't be in the containers command line but it will still be running.
  - `-p` tells docker to forward any traffic coming on port `80`(default HTTP port) through to port `80` _on the container_.
  - add `-p` after `-d` if using both
  - whole command:
    - `docker run -d -p 80:80 name_of_container \ /usr/sbin/apache2ctl -D FOREGROUND`
      - this does something...

- checking container's IP address:
  - `docker network inspect bridge` tells you where it is to open the server in your browser.

### Overview

Those are the bare-bone basics, and it’s important to understand them clearly. But, because of the complexity involved in coordinating clusters of dozens or thousands of containers all at once, most serious container workloads won’t use those particular command line tools.

for more info: [article about how to pick right tool to manage docker clusters](https://hackernoon.com/too-many-choices-how-to-pick-the-right-tool-to-manage-your-docker-clusters-b5b3061b84b7)

## Why Docker makes sense to use

### Portability

This is where containers go the extra mile. They allow us to package our application together with exactly the kind of environment we need.

Basically, as long as you are using Docker, moving the code to the cloud is not difficult.

### Orchestration

deployments using the simple Docker for AWS CloudFormation template.

First declaratively express the desired state of your system about the services it should run. Then Swarm (Docker Swarm) will constantly monitor the actual state of your containers. It will reconcile the desired state by rescheduling the workload to other nodes in the event of a node failure. It will also self-heal the cluster by re-provisioning new servers should a node become unrecoverable.

[Description of microservices](https://martinfowler.com/articles/microservices.html)
