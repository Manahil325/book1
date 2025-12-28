---
sidebar_position: 3
---

# Humanoid Modeling with URDF

## Introduction to URDF

URDF (Unified Robot Description Format) is an XML-based format used in ROS to describe robot models. It defines the physical and visual properties of a robot, including its links, joints, and their relationships. URDF is essential for simulating, visualizing, and controlling robots in ROS-based systems.

## URDF Structure and Purpose

### Basic Structure

A URDF file contains:

- **Links**: Rigid bodies that make up the robot structure
- **Joints**: Connections between links that allow relative motion
- **Visual elements**: How the robot appears in visualization tools
- **Collision elements**: How the robot interacts with the environment in simulation
- **Inertial properties**: Mass, center of mass, and inertia for physics simulation

### Purpose of URDF

URDF serves multiple purposes in robotic systems:

1. **Simulation**: Provides robot models for physics simulation environments like Gazebo
2. **Visualization**: Enables 3D visualization of robots in tools like RViz
3. **Kinematics**: Provides information for forward and inverse kinematics calculations
4. **Control**: Supplies robot structure information for motion planning and control algorithms

## Links, Joints, and Kinematics

### Links

Links represent rigid bodies in the robot structure. Each link has:

- **Name**: Unique identifier for the link
- **Visual**: How the link appears visually
- **Collision**: How the link interacts with other objects in simulation
- **Inertial**: Physical properties for dynamics simulation

```xml
<link name="base_link">
  <visual>
    <geometry>
      <cylinder length="0.6" radius="0.2"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 0.8 1"/>
    </material>
  </visual>
  <collision>
    <geometry>
      <cylinder length="0.6" radius="0.2"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="10"/>
    <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
  </inertial>
</link>
```

### Joints

Joints connect links and define their relative motion. Joint types include:

- **Fixed**: No motion between links
- **Revolute**: Single axis rotation with limits
- **Continuous**: Single axis rotation without limits
- **Prismatic**: Single axis translation with limits
- **Planar**: Motion on a plane
- **Floating**: 6-DOF motion

```xml
<joint name="joint_name" type="revolute">
  <parent link="parent_link"/>
  <child link="child_link"/>
  <origin xyz="1.0 0.0 0.0" rpy="0.0 0.0 0.0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
</joint>
```

### Kinematics

URDF provides the necessary information for kinematic calculations:

- **Forward Kinematics**: Computing the position and orientation of end-effectors given joint angles
- **Inverse Kinematics**: Computing joint angles required to achieve a desired end-effector pose

## URDF for Humanoid Robots

### Humanoid Robot Structure

Humanoid robots typically have a structure with:

- **Torso**: Central body containing main electronics
- **Head**: Contains sensors and cameras
- **Arms**: With shoulders, elbows, wrists, and hands
- **Legs**: With hips, knees, ankles, and feet
- **Multiple degrees of freedom** for human-like movement

### Example Humanoid URDF Structure

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Torso -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="5"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>

  <!-- Head -->
  <link name="head">
    <visual>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
      <material name="white">
        <color rgba="1 1 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1"/>
      <inertia ixx="0.004" ixy="0" ixz="0" iyy="0.004" iyz="0" izz="0.004"/>
    </inertial>
  </link>

  <joint name="torso_head_joint" type="revolute">
    <parent link="torso"/>
    <child link="head"/>
    <origin xyz="0 0 0.35" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-0.5" upper="0.5" effort="10" velocity="1"/>
  </joint>

  <!-- Left Arm -->
  <link name="left_upper_arm">
    <visual>
      <geometry>
        <cylinder length="0.3" radius="0.05"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.3" radius="0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1"/>
      <inertia ixx="0.0025" ixy="0" ixz="0" iyy="0.0025" iyz="0" izz="0.0001"/>
    </inertial>
  </link>

  <joint name="left_shoulder_joint" type="revolute">
    <parent link="torso"/>
    <child link="left_upper_arm"/>
    <origin xyz="0.15 0 0.2" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="10" velocity="1"/>
  </joint>

  <!-- Additional links and joints would continue... -->
</robot>
```

## Using URDF within ROS 2

### URDF in ROS 2 Ecosystem

In ROS 2, URDF files are used by various packages and tools:

- **robot_state_publisher**: Publishes joint states and transforms
- **RViz**: Visualizes robot models
- **Gazebo/Hector**: Provides robot models for simulation
- **MoveIt**: Uses URDF for motion planning

### Launching URDF in ROS 2

To use a URDF model in ROS 2, you typically:

1. **Load the URDF** into a parameter server
2. **Use robot_state_publisher** to publish transforms
3. **Visualize** in RViz

Example launch file:

```python
from launch import LaunchDescription
from launch.substitutions import Command, PathJoinSubstitution
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory

def generate_launch_description():
    # Get URDF file path
    urdf_path = PathJoinSubstitution([
        get_package_share_directory('your_package'),
        'urdf',
        'humanoid.urdf'
    ])

    # Robot state publisher node
    robot_state_publisher = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        parameters=[{
            'robot_description': Command(['xacro ', urdf_path])
        }]
    )

    return LaunchDescription([
        robot_state_publisher
    ])
```

### URDF with Xacro

Xacro is a macro language that extends URDF with variables, math, and includes:

```xml
<?xml version="1.0"?>
<robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="humanoid_xacro">
  <!-- Define properties -->
  <xacro:property name="M_PI" value="3.1415926535897931" />
  <xacro:property name="base_radius" value="0.2" />
  <xacro:property name="base_length" value="0.5" />

  <!-- Define a macro for creating links -->
  <xacro:macro name="simple_cylinder_link" params="name radius length mass color">
    <link name="${name}">
      <visual>
        <geometry>
          <cylinder radius="${radius}" length="${length}"/>
        </geometry>
        <material name="${color}">
          <color rgba="${color}_rgba"/>
        </material>
      </visual>
      <collision>
        <geometry>
          <cylinder radius="${radius}" length="${length}"/>
        </geometry>
      </collision>
      <inertial>
        <mass value="${mass}"/>
        <inertia ixx="1" ixy="0" ixz="0" iyy="1" iyz="0" izz="1"/>
      </inertial>
    </link>
  </xacro:macro>

  <!-- Use the macro -->
  <xacro:simple_cylinder_link name="base" radius="${base_radius}" length="${base_length}" mass="5" color="blue"/>
</robot>
```

## Kinematics with URDF Models

### Forward Kinematics

Forward kinematics calculates the position and orientation of end-effectors based on joint angles. ROS provides tools like:

- **KDL (Kinematics and Dynamics Library)**: For kinematic calculations
- **TF2**: For coordinate transformations

### Inverse Kinematics

Inverse kinematics solves for joint angles needed to achieve a desired end-effector pose. Common approaches include:

- **Analytical solutions**: For simple kinematic chains
- **Numerical methods**: For complex robots
- **MoveIt**: Provides advanced IK solvers

Example using TF2 for coordinate transformations:

```python
import rclpy
from rclpy.node import Node
from tf2_ros import TransformListener, Buffer
from geometry_msgs.msg import TransformStamped

class URDFKinematicsNode(Node):
    def __init__(self):
        super().__init__('urdf_kinematics_node')

        # Create TF2 buffer and listener
        self.tf_buffer = Buffer()
        self.tf_listener = TransformListener(self.tf_buffer, self)

    def get_transform(self, target_frame, source_frame):
        """Get transform between two frames"""
        try:
            transform = self.tf_buffer.lookup_transform(
                target_frame,
                source_frame,
                rclpy.time.Time()
            )
            return transform
        except Exception as e:
            self.get_logger().error(f'Could not get transform: {e}')
            return None
```

## Best Practices for Humanoid URDF Models

### 1. Model Organization

- Use descriptive names for links and joints
- Group related components with consistent naming
- Organize URDF in a logical hierarchy

### 2. Physical Accuracy

- Ensure mass properties are realistic
- Use appropriate inertial tensors
- Verify joint limits match physical constraints

### 3. Visualization

- Include appropriate visual and collision elements
- Use realistic materials and colors
- Optimize mesh complexity for performance

### 4. Maintainability

- Use Xacro macros to reduce redundancy
- Include comments for complex sections
- Separate different robot parts into includes

### 5. Testing

- Validate URDF with `check_urdf` command
- Test in simulation environments
- Verify kinematic solutions work correctly

## Common URDF Issues and Solutions

### 1. Invalid URDF

Use the check_urdf tool:
```bash
check_urdf /path/to/robot.urdf
```

### 2. Kinematic Issues

- Ensure proper parent-child relationships
- Verify joint types and limits
- Check for kinematic loops

### 3. Simulation Problems

- Verify mass and inertia properties
- Check collision geometries
- Ensure proper joint ranges

## Summary

URDF is fundamental to humanoid robotics in ROS-based systems. It provides the necessary information for simulation, visualization, and control of complex robotic structures. By understanding the structure of URDF files, how to create links and joints, and how to integrate them with ROS 2 tools, you can create accurate and functional humanoid robot models for your applications.

The key to successful URDF modeling is attention to physical accuracy, proper organization, and thorough testing in simulation environments before deploying to real robots.