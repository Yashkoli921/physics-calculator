import * as THREE from 'three';

// Create a simple pendulum animation for the hero section
export function setupPendulumScene(container: HTMLElement): () => void {
  // Create a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf8fafc); // Light background
  
  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');
  if (isDarkMode) {
    scene.background = new THREE.Color(0x1f2937); // Dark background
  }

  // Create a camera
  const aspect = container.clientWidth / container.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 20;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Create a pivot point
  const pivot = new THREE.Object3D();
  pivot.position.y = 7;
  scene.add(pivot);

  // Create a rod (line)
  const rodMaterial = new THREE.LineBasicMaterial({ 
    color: isDarkMode ? 0x9ca3af : 0x6b7280 
  });
  const rodGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -10, 0)
  ]);
  const rod = new THREE.Line(rodGeometry, rodMaterial);
  pivot.add(rod);

  // Create a pendulum bob (sphere)
  const bobGeometry = new THREE.SphereGeometry(2, 32, 32);
  const bobMaterial = new THREE.MeshBasicMaterial({ 
    color: isDarkMode ? 0x3b82f6 : 0x3f51b5 
  });
  const bob = new THREE.Mesh(bobGeometry, bobMaterial);
  bob.position.y = -10;
  pivot.add(bob);

  // Create some background objects for depth
  const particles = new THREE.Group();
  scene.add(particles);
  
  // Add small spheres as particles
  const particleMaterial = new THREE.MeshBasicMaterial({ 
    color: isDarkMode ? 0x4b5563 : 0xdbeafe 
  });
  
  for (let i = 0; i < 50; i++) {
    const size = Math.random() * 0.5;
    const particleGeometry = new THREE.SphereGeometry(size, 16, 16);
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    
    particle.position.x = (Math.random() - 0.5) * 40;
    particle.position.y = (Math.random() - 0.5) * 40;
    particle.position.z = (Math.random() - 0.5) * 40 - 10; // Push back a bit
    
    particles.add(particle);
  }

  // Add a simple platform
  const platformGeometry = new THREE.BoxGeometry(10, 0.5, 5);
  const platformMaterial = new THREE.MeshBasicMaterial({ 
    color: isDarkMode ? 0x4b5563 : 0xe5e7eb 
  });
  const platform = new THREE.Mesh(platformGeometry, platformMaterial);
  platform.position.y = 7;
  scene.add(platform);

  // Physics constants
  const g = 9.8; // Gravitational acceleration
  const L = 10;  // Length of the pendulum
  let theta = Math.PI / 4; // Initial angle
  let omega = 0; // Angular velocity
  let t = 0; // Time

  // Animation
  function animate() {
    const animationId = requestAnimationFrame(animate);
    
    // Simple harmonic motion approximation for small angles
    const dt = 0.016; // Time step
    const damping = 0.995; // Add some damping
    t += dt;
    
    // Update the pendulum's angular position with damping
    theta = Math.PI/4 * Math.cos(Math.sqrt(g/L) * t) * Math.pow(damping, t*50);
    
    // Update pendulum position
    pivot.rotation.z = theta;
    
    // Rotate background particles slowly
    particles.rotation.y += 0.001;
    
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  window.addEventListener('resize', onWindowResize, false);
  
  // Dark mode change detection
  function handleThemeChange() {
    const isDarkMode = document.documentElement.classList.contains('dark');
    scene.background = new THREE.Color(isDarkMode ? 0x1f2937 : 0xf8fafc);
    bobMaterial.color.set(isDarkMode ? 0x3b82f6 : 0x3f51b5);
    rodMaterial.color.set(isDarkMode ? 0x9ca3af : 0x6b7280);
    platformMaterial.color.set(isDarkMode ? 0x4b5563 : 0xe5e7eb);
    particleMaterial.color.set(isDarkMode ? 0x4b5563 : 0xdbeafe);
  }
  
  // Start the animation
  animate();
  
  // Add observer for theme change
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        handleThemeChange();
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', onWindowResize);
    observer.disconnect();
    container.removeChild(renderer.domElement);
    renderer.dispose();
  };
}
