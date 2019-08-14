---
title: AWS Overview
draft: false
template: 'post'
slug: '/it/aws-overview'
category: 'Internet Technology'
tags:
  - 'AWS'
  - 'IT'
description: 'An overview of what AWS offers.'
---

### Overview of Cloud coding:

Services:

- Break application down to services
- IaaS, PaaS, SaaS, SOA, FaaS, BaaS

**Serverless** - abstract away the management of infastructure from development - one does not have to manage the server theireselves

Give code to the serverless provider (docker, aws) and say run it whenever the customer needs something

- provide a lot of extra details, customer service, etc.
- so you can focus on building what you are doing
- scalability is taken care of
- data storage is easy

**[Standard definition of cloud computing](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf)**

### History and Odd details

1.  Google Cloud caters to AI and Big Data
2.  First AWS cloud platform EC2
3.  AWS creates virtual machine that is safe and secure from the get-go, 2006

### Services

#### Infastructure as a Service (IAAS)

- Host OS on the cloud that is unique to you

#### Platform as a Service (PAAS) Elastic beanstalk

- Provision your resources(code) for you, gives you all the little necessary things that you need

#### Software as a Service (SAAS)

- something like gmail, you are not wondering about the underlying servers
- focus on the software itself, not how it runs

#### Functions as a service (FAAS)

- similar to utilising github repos that do something you want within your code but not write yoruself

## Overview of many of the microservices:

**Availability Zone** - collection of data centers

- within an availability zone there are multiple data centers

**Edge location** - point of presence for cloudfront

- A place to cache data. Basically if the data is stored in availability zone that is far from you, after the initial fetching of the data it will be cached in an edge location (another place to store data) that is closer to you

**VPC**: virtual private cloud

- a virtual data center to depoloy assets

**Route53**: DNS service

- used to look up specific urls, public ip adresses
- used on port 53, route 66 reference

**Cloud Front**: consists of edge locations to cache your data

**Direct Connect:** connecting physical data centers with aws using a dedicated line

- meaning an actual phone line connecting your data center(if one has their own data center) to aws infastructure

**EC2:** elastic compute cloud

- virtual machines within the cloud

**EC2 Container Service:** supports docker containers

- used in managed cluster of ec2 machines

**Elastic Beanstalk:** simple way to deploy code to AWS

- it will deploy all the underlying infastructure with its own logic
- similar to AI

**Lambda**: serverless

- upload code and wil respond to events

**Lightsail:** out of the box cloud

- deploys a wordpress site, etc. on its own
- predominantly for people who do not know how to use aws

**S3:** simple storage service

- virtual disk in the cloud to store objects(files)

**Glacier:** store files for a certain amount of years (archive)

**EFS:** Elastic file service

- file based storage that is shareable between multiple VM

**Storage Gateway:** VM image that communicates with S3

**RDS:** consists of mysql, postgres, mariadb, swlserver, and a few others

**DynamoDB:** non-relational database (NoSQL)

**Redshift:** data warehouse solution

- used for big data
- run queries on this db containing a massive amount of data rather then storing it in your RDS

**Elasticache:** used for data that is going to be constant/persistent to be cached permanently

- used to take a load off of your db

**Snowball:** transfer storage when migrating data

**DMS:** database migration services

- migrate db's within AWS to other regions, etc.
- Can be used to migrate a database type to another database(oracledb -> AWSdb)

**SMS:** server migration services

- instead of targeting databases it targets VM's
- replicates VM's into the AWS cloud

**Athena:** run sql commands on S3 buckets

**EMR:** elastic map reducer

- process massive amounts of data
- uses hadoop predominantly, for big data

**Cloud Search:** AWS managed
Elastic Search: uses open-source

- both are used for search within your applications

**Kinesis:** to stream and alalyse real-time data on a massive scale

**Data-pipeline:** allows you to use data from one place to another

**Quick Sight:** business analytics tool to create visual representations of data

**IAM:** how to sign into or authenticate to AWS

**Inspector:** agent installed onto VM, inspects them

**Certificate Manager:** SSL certificates

**Directory Service:** connecting active directory to AWS

**WAF** - web application firewall: application level protection to website ~ prevents anything dodgy at application layer

**Artifacts:** documentation within AWS console, compliance documents

**Cloud Watch:** used to monitor performance of your AWS environment

**Cloud formation:** turns infastructure into code

- describes AWS environment

**Cloud Trail:** audits changes to your AWS environment

**Opsworks:** automated deployments using chef

**Config:** automatically monitors your environment and warnings if it may break, can set alerts

**Service Catalog** used for larger enterprises for specific authorised services

**Trusted Advisor:** makes a series of recommendations to do cost optimisation, security optimisation, other tips

**Step Functions:** a way to visualise what is going on in your application

- what microservices are being used

**SWF** - simple workflow functions: used to coordinate automated tasks and human run tasks

**API Gateway** - allows you to create, publish, and maintain API's and scale

**AppStream:** streaming desktop applications to users

**Elastic Transcoder:** for videos to be suitable to all different devices, improves screen resolution, etc.

**CodeCommit:** basically github, way to store code securely in the cloud

**CodeBuild:** way of compiling your code in different environments

**CodeDeploy:** a way to deploy code to EC2 instances

**CodePipeline:** keep track of all versions of code (test, production, dev)

**Mobile Hub:** add, configure features for mobile apps

- own console for mobile apps, rather then regular AWS console

**Cognito:** helps users easily sign in to your apps

**Device Farm:** improve quality of mobile apps by testing them simultaneously on hundreds of physical devices

**Mobile Analytics:** collect and analyse app usage data

**Pinpoint:** enables you to understand and engage with app users

- gather data on what users are doing with the apps they are using
- understand user behavior
- targeted marketing campaigns, similar to google analytics

**WorkDocs:** used to securely store important work documents

**WorkMail:** sending/recieving email

**iOT:** way to have countless devices out there and keeping track of them

**WorkSpaces:** a way to have your desktop in the cloud

- OS can run in the cloud

**polly:** takes any text and turns it into voice, helps alexa render voice

**Machine Learning:** give AWS a dataset and tell it the outcome and Amazon will analyse it/predict outcomes

**Rekognition:** can upload a picture and tell you what's in the picture, analyses it and tells you what is in it

**SNS** - simple notification services: to noticy you by email or text messages

**SQS:** decouples application to not have tightly coupled dependencies

**SES** - simple email service: way to send/recieve emails with AWS
