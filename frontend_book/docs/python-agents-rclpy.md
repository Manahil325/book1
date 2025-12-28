---
sidebar_position: 2
---

# Python Agents with rclpy

## Introduction to rclpy

rclpy is the Python client library for ROS 2, providing Python bindings for the ROS 2 middleware. It allows Python developers to create ROS 2 nodes, publish and subscribe to topics, provide and use services, and work with actions.

## Setting Up Your Environment

Before creating Python agents with rclpy, ensure you have:

- ROS 2 installed (Humble Hawksbill or later recommended)
- Python 3.8 or higher
- Proper ROS 2 environment sourced

### Installation

```bash
# If using a virtual environment
pip install rclpy
```

Note: When using a full ROS 2 installation, rclpy is typically already available.

## Creating Your First ROS 2 Node in Python

A basic ROS 2 node using rclpy follows this pattern:

```python
import rclpy
from rclpy.node import Node

class MyPythonNode(Node):
    def __init__(self):
        super().__init__('my_python_node')
        self.get_logger().info('My Python Node has started')

def main(args=None):
    rclpy.init(args=args)
    node = MyPythonNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Connecting AI Agents to Robot Controllers

### Publisher Example

To connect an AI agent to robot controllers, you often need to publish commands to specific topics:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from sensor_msgs.msg import JointState
from trajectory_msgs.msg import JointTrajectory, JointTrajectoryPoint

class AIAgentNode(Node):
    def __init__(self):
        super().__init__('ai_agent_node')

        # Publisher for joint commands
        self.joint_cmd_publisher = self.create_publisher(
            JointTrajectory,
            '/joint_trajectory_controller/joint_trajectory',
            10
        )

        # Publisher for high-level commands
        self.cmd_publisher = self.create_publisher(String, 'ai_commands', 10)

        # Timer for AI decision making
        self.timer = self.create_timer(0.1, self.ai_decision_callback)

        self.get_logger().info('AI Agent Node initialized')

    def ai_decision_callback(self):
        # Simulate AI decision making
        # In a real scenario, this might involve neural networks,
        # planning algorithms, or other AI techniques
        msg = String()
        msg.data = f'AI Decision at {self.get_clock().now().nanoseconds}'
        self.cmd_publisher.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    ai_agent = AIAgentNode()

    try:
        rclpy.spin(ai_agent)
    except KeyboardInterrupt:
        pass
    finally:
        ai_agent.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Subscriber Example

To receive sensor data from the robot:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState, Image
import numpy as np

class SensorProcessorNode(Node):
    def __init__(self):
        super().__init__('sensor_processor')

        # Subscribe to joint states
        self.joint_subscriber = self.create_subscription(
            JointState,
            '/joint_states',
            self.joint_state_callback,
            10
        )

        # Subscribe to camera feed (if available)
        self.image_subscriber = self.create_subscription(
            Image,
            '/camera/image_raw',
            self.image_callback,
            10
        )

        self.get_logger().info('Sensor Processor Node initialized')

    def joint_state_callback(self, msg):
        # Process joint state data
        self.get_logger().info(f'Received {len(msg.position)} joint positions')

        # Extract relevant information for AI processing
        positions = list(msg.position)
        velocities = list(msg.velocity)

        # Process the data (in a real system, this might feed into AI algorithms)
        self.process_joint_data(positions, velocities)

    def image_callback(self, msg):
        # Process image data (simplified example)
        # In practice, you'd convert the ROS Image message to OpenCV format
        self.get_logger().info(f'Received image: {msg.width}x{msg.height}')

    def process_joint_data(self, positions, velocities):
        # Placeholder for actual processing logic
        # This could involve:
        # - Balance control algorithms
        # - State estimation
        # - Input to AI decision-making systems
        pass

def main(args=None):
    rclpy.init(args=args)
    sensor_processor = SensorProcessorNode()

    try:
        rclpy.spin(sensor_processor)
    except KeyboardInterrupt:
        pass
    finally:
        sensor_processor.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Publishing Sensor Data

AI agents often need to publish processed sensor data for other nodes to consume:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState
from std_msgs.msg import Float32MultiArray
import numpy as np

class SensorDataPublisher(Node):
    def __init__(self):
        super().__init__('sensor_data_publisher')

        # Publisher for processed sensor data
        self.processed_sensor_publisher = self.create_publisher(
            Float32MultiArray,
            'processed_sensor_data',
            10
        )

        # Timer to simulate sensor data publishing
        self.timer = self.create_timer(0.05, self.publish_sensor_data)

        self.get_logger().info('Sensor Data Publisher initialized')

    def publish_sensor_data(self):
        # Simulate processed sensor data
        # In a real system, this would come from actual sensor processing
        processed_data = Float32MultiArray()
        processed_data.data = [
            np.random.random(),  # Processed sensor 1
            np.random.random(),  # Processed sensor 2
            np.random.random(),  # Processed sensor 3
            # Add more sensor data as needed
        ]

        self.processed_sensor_publisher.publish(processed_data)
        self.get_logger().info(f'Published processed sensor data: {processed_data.data}')

def main(args=None):
    rclpy.init(args=args)
    sensor_publisher = SensorDataPublisher()

    try:
        rclpy.spin(sensor_publisher)
    except KeyboardInterrupt:
        pass
    finally:
        sensor_publisher.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Sending Control Commands

To send control commands to robot controllers:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from trajectory_msgs.msg import JointTrajectory, JointTrajectoryPoint
from builtin_interfaces.msg import Duration
import time

class ControlCommanderNode(Node):
    def __init__(self):
        super().__init__('control_commander')

        # Publisher for joint trajectory commands
        self.trajectory_publisher = self.create_publisher(
            JointTrajectory,
            '/joint_trajectory_controller/joint_trajectory',
            10
        )

        # Publisher for high-level commands
        self.high_level_publisher = self.create_publisher(
            String,
            'high_level_commands',
            10
        )

        self.get_logger().info('Control Commander Node initialized')

    def send_joint_trajectory(self, joint_names, positions, velocities=None, duration=1.0):
        """Send a joint trajectory command"""
        trajectory_msg = JointTrajectory()
        trajectory_msg.joint_names = joint_names

        point = JointTrajectoryPoint()
        point.positions = positions

        if velocities:
            point.velocities = velocities
        else:
            point.velocities = [0.0] * len(positions)

        point.time_from_start = Duration(sec=int(duration), nanosec=0)
        trajectory_msg.points = [point]

        self.trajectory_publisher.publish(trajectory_msg)
        self.get_logger().info(f'Sent trajectory command for joints: {joint_names}')

    def send_high_level_command(self, command):
        """Send a high-level command"""
        cmd_msg = String()
        cmd_msg.data = command
        self.high_level_publisher.publish(cmd_msg)
        self.get_logger().info(f'Sent high-level command: {command}')

def main(args=None):
    rclpy.init(args=args)
    controller = ControlCommanderNode()

    # Example: Send a simple command after a delay
    def delayed_command():
        time.sleep(2)  # Wait 2 seconds
        controller.send_joint_trajectory(
            joint_names=['joint1', 'joint2', 'joint3'],
            positions=[0.1, 0.2, 0.3],
            duration=2.0
        )
        controller.send_high_level_command('Move to position A')

    # Start the delayed command in a separate thread
    import threading
    threading.Thread(target=delayed_command, daemon=True).start()

    try:
        rclpy.spin(controller)
    except KeyboardInterrupt:
        pass
    finally:
        controller.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Best Practices for AI Integration

### 1. Asynchronous Processing

For AI agents that require significant computation time, consider using separate threads or asynchronous processing:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import threading
import time

class AsyncAINode(Node):
    def __init__(self):
        super().__init__('async_ai_node')

        self.command_publisher = self.create_publisher(String, 'ai_output', 10)
        self.sensor_subscriber = self.create_subscription(
            String, 'sensor_input', self.sensor_callback, 10
        )

        self.latest_sensor_data = None
        self.ai_processing = False

    def sensor_callback(self, msg):
        self.latest_sensor_data = msg.data
        if not self.ai_processing:
            self.ai_processing = True
            # Process in separate thread to avoid blocking ROS callbacks
            threading.Thread(target=self.process_ai, daemon=True).start()

    def process_ai(self):
        # Simulate AI processing (in real scenario, this might be neural network inference)
        time.sleep(0.5)  # Simulate processing time
        result = f"AI processed: {self.latest_sensor_data}"

        # Publish result
        output_msg = String()
        output_msg.data = result
        self.command_publisher.publish(output_msg)

        self.ai_processing = False
```

### 2. Error Handling and Robustness

```python
import rclpy
from rclpy.node import Node
from rclpy.exceptions import ParameterNotDeclaredException
from rcl_interfaces.msg import ParameterType

class RobustAINode(Node):
    def __init__(self):
        super().__init__('robust_ai_node')

        # Set up parameters with defaults
        self.declare_parameter('ai_timeout', 5.0)
        self.declare_parameter('max_retries', 3)

        self.timeout = self.get_parameter('ai_timeout').value
        self.max_retries = self.get_parameter('max_retries').value

        # Initialize publishers/subscribers
        self.setup_communication()

    def setup_communication(self):
        try:
            self.publisher = self.create_publisher(String, 'ai_commands', 10)
            self.get_logger().info('Communication interfaces initialized')
        except Exception as e:
            self.get_logger().error(f'Failed to setup communication: {e}')
```

## Summary

Python agents with rclpy provide a powerful way to connect AI algorithms to robot controllers. By understanding how to create nodes, publish sensor data, and send control commands, you can build sophisticated AI-driven robotic systems. Remember to follow best practices for asynchronous processing, error handling, and system integration to create robust and reliable AI agents for humanoid robotics.