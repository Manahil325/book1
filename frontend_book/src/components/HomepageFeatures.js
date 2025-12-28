import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'ROS 2 Fundamentals',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Learn the core concepts of ROS 2 including nodes, topics, services, and actions.
        Understand the DDS communication model and how ROS 2 enables robotic systems.
      </>
    ),
  },
  {
    title: 'Python Agents with rclpy',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Connect AI agents to robot controllers using Python and rclpy.
        Learn to publish sensor data and send control commands effectively.
      </>
    ),
  },
  {
    title: 'Humanoid Modeling with URDF',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Create humanoid robot models using URDF.
        Understand links, joints, and kinematics for effective robot modeling.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}