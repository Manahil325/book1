# Data Model:  ROS 2 Robotic Nervous System Documentation

## Documentation Entities

### Chapter Document
- **Title**: String, required (e.g., "ROS 2 Fundamentals", "Python Agents with rclpy", "Humanoid Modeling with URDF")
- **Content**: Markdown text, required
- **Navigation Path**: String, required (e.g., "/docs/ros2-fundamentals")
- **Priority**: Integer, required (P1=1, P2=2, P3=3)
- **Target Audience**: String, required (e.g., "AI engineers", "Software developers")
- **Learning Objectives**: Array of strings, required
- **Prerequisites**: Array of strings, optional

### Navigation Item
- **Label**: String, required (display name in sidebar)
- **Type**: String, required (doc, link, category)
- **Id**: String, required (reference to document)
- **Priority**: Integer, required (determines order in sidebar)

### Content Block
- **Type**: String, required (text, code, diagram, example)
- **Content**: String, required
- **Caption**: String, optional
- **Language**: String, optional (for code blocks)

## Relationships
- Each Chapter Document has one Navigation Item in the sidebar
- Navigation Items are organized hierarchically in the sidebar configuration
- Content Blocks compose the body of each Chapter Document

## Validation Rules
- Each Chapter Document must have a unique title
- Navigation Items must have valid document references
- Priority values must be sequential (1, 2, 3, etc.)
- Content must be in valid markdown format
- All learning objectives must be measurable and testable

## State Transitions
- Draft → Review → Approved → Published (documentation workflow)