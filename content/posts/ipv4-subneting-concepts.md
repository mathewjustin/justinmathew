---
date: '2025-05-13T19:02:39+05:30'
draft: false
title: ' IP V4 Subnetting tricks and basics'
---

## IP V4 Subnetting tricks and basics

## Introduction

 As usual lets try to be little intellectual. By saying a qoute i got it from chatgpt.
> **“Good subnetting is like good carpentry: measure twice, cut once.”**

What ever it means it doesnt matter. But the point is to understand the concept of subnetting and how it works.


This is somehow one of the most mind f**k*ng topic which i encoutered during my job. It simply confuses me all the time. Later i understood that i should simply sit and chat about it with my LLM. My LLM is the best thing it knows me and nowadays its my therapist. (You should try the therapy with LLM, it works like a charm).

## What is Subnetting?

Subnetting is the process of dividing a larger network into smaller, more manageable sub-networks (subnets). This is done to improve network performance, security, and organization. Each subnet can have its own unique address range, allowing for better control over network traffic and resource allocation.

Btw, why the hell i need to divide or subnet?

Its because ipv4 address space is limited. It can only have around 4.3 billion addresses. This is not enough for the growing number of devices connected to the internet. Your secondary phone, and your redmi smarwatch, and even your washing machine takes up one ip and it simply runs out of the addresses. So we need to divide the address space into smaller subnets to make it more efficient and manageable. 

In the context of a cloud provider, on AWS, you have a VPC (Virtual Private Cloud) Or a LAN on the Cloud. Now your VPC can have a big address space, but you can divide it into smaller subnet and give to each of the services. Like a subnet for EC2, a subnet for Kubernetes(In this case if you spin up a loadbalancer, its ip will be picked form the subnet).

## The basic of the basics, Octets and Binary
IPv4 addresses are 32-bit numbers, typically represented in decimal format as four octets (8 bits each) separated by dots.

🔢 Total Bits in IPv4

	•	IPv4 address = 32 bits
	•	Written as 4 octets (e.g., 192.168.1.0)
	•	CIDR notation: IP_address / subnet_bits
	•	Example: 192.168.1.0/24 means 24 bits for network, 8 bits for host


🧮 Key Equations

	•	🧠 Number of host bits = 32 - subnet bits
	•	🔢 Total IPs = 2^(host bits)
	•	✅ Usable IPs = 2^(host bits) - 2 (subtract 2: network + broadcast)

Okay now lets try to solve few tricky questions which i found on twitter.

## Question 1
> **Q1:** How many usable IP addresses are in this subnet: 192.168.10.0/23?

🧠 Step 1: Total bits in IPv4 = 32
	•	/23 → 23 bits for network,
	•	So: 32 - 23 = 9 bits for hosts

🧠 Step 2: Total IPs = 2^(9) = 512

🧠 Step 3: Usable IPs = 512 - 2 = 510
    •	**Answer:** 510 usable IP addresses in

Why the hell there is a -2? Because the first address is reserved for the network address and the last one is reserved for the broadcast address. So we need to subtract 2 from the total number of addresses to get the usable addresses. Btw what is network address and broadcast address?
The network address is the first address in the subnet, and it identifies the subnet itself. 

The broadcast address is the last address in the subnet, and it is used to send data to all devices in that subnet. So we need to reserve these two addresses for special purposes.

 usually represented in decimal format as four octets, just like the IP address.

| CIDR Notation | Subnet Mask       | Total IPs | Usable IPs | Network Bits | Host Bits |
|---------------|-------------------|-----------|------------|--------------|-----------|
| /26           | 255.255.255.192  | 64        | 62         | 26           | 6         |
| /27           | 255.255.255.224  | 32        | 30         | 27           | 5         |
| /28           | 255.255.255.240  | 16        | 14         | 28           | 4         |
| /29           | 255.255.255.248  | 8         | 6          | 29           | 3         |
| /30           | 255.255.255.252  | 4         | 2          | 30           | 2         |
| /31           | 255.255.255.254  | 2         | 0*         | 31           | 1         |
| /32           | 255.255.255.255  | 1         | 0          | 32           | 0         |

> *Note: /31 is typically used for point-to-point links where only two devices communicate, so usable IPs are not required in the traditional sense.

---
#### This blog will continue as and when i find more tricky things w.r.t subnetting.
asdasdas

{{< embed-ts >}}