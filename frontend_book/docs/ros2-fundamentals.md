---
sidebar_position: 1
---

# ROS 2 Fundamentals

## Introduction to ROS 2

ROS 2 (Robot Operating System 2) is the next generation of middleware designed for robotics applications. Unlike its predecessor, ROS 2 is built from the ground up to be production-ready, with improved security, real-time capabilities, and support for multiple operating systems.

## Core Concepts

### Nodes

A node is a fundamental unit of computation in ROS 2. It represents a single process that performs a specific function within a robotic system. Nodes can be written in different programming languages and communicate with each other through topics, services, and actions.

Key characteristics of nodes:
- Each node runs as an independent process
- Nodes can be distributed across multiple machines
- They communicate asynchronously using ROS 2's communication mechanisms
- Nodes can be started and stopped independently

### Topics

Topics are named buses over which nodes exchange messages. The communication is based on a publish-subscribe model where publishers send messages to a topic and subscribers receive messages from a topic.

Features of topics:
- Unidirectional data flow
- Multiple publishers and subscribers can use the same topic
- Data is sent asynchronously
- Topics use a simple data structure called messages

### Services

Services provide a request-response communication pattern. A client sends a request to a service server, which processes the request and sends back a response.

Characteristics of services:
- Synchronous communication
- Request-response pattern
- Used for operations that require immediate feedback
- Services use service definition files (.srv)

### Actions

Actions are used for long-running tasks that may take a significant amount of time to complete. They provide feedback during execution and can be preempted if needed.

Action features:
- Support for long-running tasks
- Feedback during execution
- Ability to cancel or preempt tasks
- Goal, result, and feedback mechanisms

## DDS Communication Model

ROS 2 uses Data Distribution Service (DDS) as its underlying communication middleware. DDS is a peer-to-peer publish-subscribe model that provides:

- **Discovery**: Automatic discovery of participants in the network
- **Data-centricity**: Focus on data rather than communication endpoints
- **Quality of Service (QoS)**: Configurable policies for reliability, durability, and performance
- **Platform independence**: Works across different operating systems and programming languages

### QoS Policies

ROS 2 provides several Quality of Service policies to configure communication behavior:

- **Reliability**: Reliable vs. best-effort delivery
- **Durability**: Volatile vs. transient-local durability
- **History**: Keep-all vs. keep-last history policies
- **Deadline**: Time constraints for data delivery
- **Liveliness**: Mechanisms to detect participant availability

## ROS 2 in Humanoid Systems

In humanoid robotics, ROS 2 serves as the nervous system that coordinates various subsystems:

### Sensory Processing
- Sensor data collection and preprocessing
- Perception algorithms for vision, touch, and proprioception
- Sensor fusion for comprehensive environmental understanding

### Motion Control
- Joint control and trajectory planning
- Balance and locomotion algorithms
- Manipulation and grasping controllers

### High-Level Decision Making
- Behavior trees for complex task execution
- Path planning and navigation
- Human-robot interaction modules

### Communication Architecture
- Real-time communication between control loops
- Asynchronous data exchange for perception systems
- Synchronous services for critical operations

## Best Practices

When working with ROS 2 in humanoid robotics:

1. **Modularity**: Design nodes to perform specific functions with clear interfaces
2. **Robustness**: Handle communication failures gracefully
3. **Real-time considerations**: Be aware of timing constraints in control systems
4. **Security**: Implement appropriate security measures for production systems
5. **Testing**: Develop comprehensive tests for each node and integration

## Summary

ROS 2 provides a robust middleware for humanoid robotics, offering the flexibility and performance required for complex robotic systems. Understanding its core concepts is essential for developing effective robotic applications.