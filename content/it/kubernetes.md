---
title: Kubernetes Overview
draft: false
template: 'post'
slug: '/it/kubernetes-overview'
category: 'Internet Technology'
tags:
  - 'Kubernetes'
  - 'IT'
description: 'An overview of what Kubernetes offers.'
---

## [A Kubernetes quick start for people who know just enough about Docker to get by](https://blog.sourcerer.io/a-kubernetes-quick-start-for-people-who-know-just-enough-about-docker-to-get-by-71c5933b4633)

### What is it?

#### Condensed description

_Kubernetes is a portable, extensible open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation._

#### Detailed

Used for automating deployment, scaling, and management of containerized applications.

- essentially a tool for managing your containers
- you tell Kubernetes what to do, and how to serve your containers

### Why use it?

You do not need to worry about every instance you own. Gives "peace of mind".

### Definitions

#### Clusters

A network of containers connected in sucha way that they can freely communicate with each other.

#### Nodes

The machines a cluster is running can either be "Masters" or "Nodes".

- Master is the control panel of the whole cluster
  - all commands are run on the Master instance
  - it will then decide which Node, or worker machine, in the cluster will take the workload

#### Network

To enable communication btw various containers in a cluster, a _network_ to provide IP addresses to them is necessitated.

Check out [this link](https://kubernetes.io/docs/concepts/cluster-administration/networking/#summary) for more details

- a network enables the pods in a cluster to talk to each other.

#### Interaction

How do the nodes communicate with each other?

##### Kubelet

- an agent for managing the Node and communicating with the Kubernetes Master

##### Kubernetes API

- Master exposes this to directly interact with the cluster using a CLI tool called **kubectl**.

##### etcd

- a globally available configuration store
  - it is a key-value store that can be distributed across multiple nodes
  - stores configuration data for all nodes in the cluster so each and every part of the cluster knows how to configure itself

#### Kubernetes Objects

A single unit that exists in the cluster

- includes _deployments, replica sets, services, pods_, etc.
- when an object is created you tell the kubernetes cluster the _desired state_ you want it to have

_Kubernetes Objects are persistent entities in the Kubernetes system. Kubernetes uses these entities to represent the state of your cluster._

##### Pod

A group of one or more containers with shared storage/network and a specification for how to run the containers

- reachable through an IP adress

#### Service

defines a logical set of _Pods_ and a policy by which to access them. They have a lifecycle.

- Service is a way to access Pods on a regular basis

#### ReplicaSet

gives Pods a label and control their replication. Used through Deployments

#### Deployment

describes the desired state and makes sure to change the actual state to the desired state if needed.

- manages _Pods_ and _ReplicaSets_

_The Deployment instructs Kubernetes how to create and update instances of your application. Once you’ve created a Deployment, the Kubernetes master schedules mentioned application instances onto individual Nodes in the cluster._

### Why might you need Kubernetes?

1.  enables rolling updates (zero downtime)
2.  Can have several instances of apps running at the same time in parallel.

## [Getting started with Kubernetes for your SaaS](https://www.freecodecamp.org/news/getting-started-with-kubernetes-for-your-saas-91e91116dd7d/)

Kubernetes is a platform to manage and orchestrate your cloud infrastructure. It provides a configuration-driven framework where you can define a few different pieces and with one click get an entire network, disk, and application spun up in a way that’s scalable and easy to manage.

### How to containerise your app

#### As a quick side note, what is a container

Basically a partitioned section of the operating system that can function as an independent machine. Unlike traditional virtual machines, which rely on a hypervisor to simulate an operating system, containers use a variety of kernel features to provide an environment isolated from the host machine.

### Back to the article

1.  Use docker
2.  Build an image which can be used by developers
3.  Make them use it if they are working the same app

### Adopt a multi-instance architecture

#### Side note - _multi-tenant architecture_

- All your users share a single DB instance and a single instance of an app

#### _multi-instance architecture_

##### why use it?

1.  Stability
    - Instead of a single point of failure each customer can exist in their own instance, if one instance fails, the others will not be affected!
2.  Scalability
    - Simply add more resources
3.  Security
    - DB is in one place in multi-tenant
    - So when security is breached all the customers data is compromised, multi-instance equates to only one customer being compromised

### Determine your app's resource consumption

#### Why

- For cost-effective infrastructure (how much CPU, memory, and storage are going to be required to run a single instance of your app)
  - So as to get an accurate reading of how much space your Kubernetes nodes needs to prevent overloading and unreliability

### How

Monitoring solution such as [Heapster](https://github.com/kubernetes/heapster/)

#### Calculate

What is the optimal server size?

- Take memory or CPU each instance needs to function and multiply by 100 (max # of pods a node can hold) to get an estimate of how much memory/CPU your nodes should have

#### Stress test your app when node is filled up

### Integrate Kubernetes

#### Automatic scaling of Kubernetes nodes

When nodes become full, provision more nodes so everything can go smoothly.

- A tool like [kops](https://github.com/kubernetes/kops) an help

##### Automatic scaling of applications

Comes w/ Kubernetes out of the box using triggers

- Example command:
  - `kubectl autoscale deployment myapp --cpu-percent=50 --min=1 --max=10`
  - This will set the `myapp` deployment to scale up to 10 pods when the CPU percentage goes above 50

##### Automatic provisioning of instances upon user action

- Integrate app with the [Kubernetes API](https://kubernetes.io/docs/api-reference/v1.9/)

## [Kubernetes 101: Pods, Nodes, Containers, and Clusters](https://medium.com/google-cloud/kubernetes-101-pods-nodes-containers-and-clusters-c1509e409e16)

### Hardware

#### Nodes

A node is the smallest unit of computing hardware in Kubernetes.

- Represents a single machine in your cluster
  - Will generally be a physical machine in a datacenter, or a VM honest on a cloud provider

Viewing a machine as a "node" allows us to insert a layer of abstraction

- Now its not just a machine, it can be viewed, at core as a set of CPU and RAM resources that can be utilised

### The Cluster

View it as a whole rather than individual nodes

- Nodes pool together their resources to form a more powerful machine
  - When a program is deployed to the cluster it intelligently handles distributing work to the individual nodes for you
  - If a node is removed, the cluster will shift the work around as necessary
  - So the program, or the programmer need not worry which machine is running the code

### Persistent Volumes

#### Why it is needed

A program running is not guaranteed to run on a specific node so data cannot be saved to any arbitrary place in the file system

- Because of this, if a program tries to save data to a file for later, but then the program is relocated to a new node, the file is not where it is expected to be.
  - So: traditional local storage in Kubernetes is treated as a temporary cache to hold programs and any data saved locally cannot be expected to persist

#### What it does

Persistent volumes store data permanently

- File storage is not managed by the cluster
  - So local or cloud drives attached to the cluster as Peristent Volume
  - Basically, an external hard drive is plugged intot the cluster
- **File system is mounted to the cluster without being associated to any particular node**

### Software

#### Containers

Programs running on Kubernetes are packaged as Linux containers

- Self contained Linux environments
- Multiple programs can be added to a single container
  you should limit yourself to one process per container

#### Pods

Kubernetes wraps one or more containers into this structure

- Any containers in this Pod will share the same resources and local network
- Containers can easily communicate with other containers in the same pod as if they were on the same machine

##### Unit of replication

Pods are used as a unit of replication in Kubernetes.

- If a single Pod instance cannot carry the load of the applications traffic Kubernetes can be configured to deploy new replicas of your Pod when necessary
- It is standard to have multiple copies of a Pod running at any time in a production system to allow load balancing and failure resistance.

##### Limit yourself

Pods can hold multiple containers, but you should limit yourself when possible.

- Because Pods are scaled up or down as a unit, all containers in a pod must scale together - regardless of their individual needs.
  - So pods should remain as small as possible
    - typically holding only a main process and it's tightly coupled helper containers (typically called "side-cars"

#### Deployments

Pods are managed by the [deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

##### Purpose

- To declare how many replicas of a pod should be running at a time.

##### What it does

- Automatically spins up the requested number of pods, and then monitors them
- Recreates a pod if it dies

Basically, with a _deployment_ you do no have to manually deal with pods. You set the desired state of the system, and it is managed for you automatically.

#### Ingress

##### Purpose

To allow external traffic to your application

- By default, Kubernetes provides isolation between pods and the outside world

##### so you must

- open up channels of communication (called an _ingress_)

##### How to

- adding either an _[ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) controller_ or a [_LoadBalancer_](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/)

## Whats next

[**Official Kubernetes tutorials**](https://kubernetes.io/docs/tutorials/kubernetes-basics/)

### To experiment locally

1.  [Minubuke](https://kubernetes.io/docs/getting-started-guides/minikube/
2.  [Google Kubernetes Engine cloud service](https://cloud.google.com/kubernetes-engine/)
    - [Tutorials](https://cloud.google.com/kubernetes-engine/docs/tutorials/)
