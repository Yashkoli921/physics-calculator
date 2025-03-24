import * as THREE from 'three';

// Create an atom/orbital model for the home page
export function setupAtomScene(container: HTMLElement): () => void {
  // Create a scene
  const scene = new THREE.Scene();
  // Don't set any background color, keep it transparent
  
  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  // Create a camera
  const aspect = container.clientWidth / container.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 20;

  // Create a renderer with transparency
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true  // This enables transparency
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
  container.appendChild(renderer.domElement);

  // Create the nucleus
  const nucleusGeometry = new THREE.SphereGeometry(2, 32, 32);
  const nucleusMaterial = new THREE.MeshBasicMaterial({ 
    color: isDarkMode ? 0xd727e8 : 0xe100ff 
  });
  const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
  scene.add(nucleus);

  // Create electron orbitals
  const orbitalGroups = [];
  const orbitalColors = [
    isDarkMode ? 0xeb4ff3 : 0xf652ff,
    isDarkMode ? 0xf677f8 : 0xfd7aff,
    isDarkMode ? 0xeb4ff3 : 0xffa3fd
  ];
  
  // Create 3 orbital paths
  for (let i = 0; i < 3; i++) {
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);
    
    // Each orbital path will be rotated differently
    orbitalGroup.rotation.x = Math.PI / (Math.random() * 4 + 1);
    orbitalGroup.rotation.y = Math.PI / (Math.random() * 4 + 1);
    
    // Create the orbital path
    const orbitalPath = new THREE.RingGeometry(4 + i * 2, 4.1 + i * 2, 64);
    const orbitalMaterial = new THREE.MeshBasicMaterial({ 
      color: orbitalColors[i],
      side: THREE.DoubleSide,
      opacity: 0.4,
      transparent: true
    });
    const orbital = new THREE.Mesh(orbitalPath, orbitalMaterial);
    orbitalGroup.add(orbital);
    
    // Add electrons to the orbital
    const electronGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const electronMaterial = new THREE.MeshBasicMaterial({ 
      color: orbitalColors[i] 
    });
    
    // Add 2-3 electrons per orbital
    const electronCount = Math.floor(Math.random() * 2) + 2;
    const electrons = [];
    
    for (let j = 0; j < electronCount; j++) {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      const angle = (2 * Math.PI / electronCount) * j;
      const radius = 4 + i * 2;
      
      electron.position.x = Math.cos(angle) * radius;
      electron.position.y = Math.sin(angle) * radius;
      
      orbitalGroup.add(electron);
      electrons.push({
        mesh: electron,
        initialAngle: angle,
        speed: 0.02 - i * 0.005, // Outer electrons move slower
        radius: radius
      });
    }
    
    orbitalGroups.push({
      group: orbitalGroup,
      electrons: electrons,
      rotationSpeed: 0.005 + Math.random() * 0.01
    });
  }
  
  // Add glowing particles in the background
  const particles = new THREE.Group();
  scene.add(particles);
  
  // Add small spheres as particles
  const particleMaterial = new THREE.MeshBasicMaterial({ 
    color: isDarkMode ? 0x700b7e : 0xfd7aff,
    transparent: true,
    opacity: 0.5
  });
  
  for (let i = 0; i < 100; i++) {
    const size = Math.random() * 0.3;
    const particleGeometry = new THREE.SphereGeometry(size, 16, 16);
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    
    particle.position.x = (Math.random() - 0.5) * 40;
    particle.position.y = (Math.random() - 0.5) * 40;
    particle.position.z = (Math.random() - 0.5) * 40 - 10; // Push back a bit
    
    particles.add(particle);
  }
  
  // Animation time tracking
  let time = 0;

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Rotate the entire atom
    scene.rotation.y += 0.003;
    scene.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    // Animate each orbital group
    orbitalGroups.forEach(orbitalObj => {
      // Rotate the orbital
      orbitalObj.group.rotation.x += orbitalObj.rotationSpeed;
      orbitalObj.group.rotation.y += orbitalObj.rotationSpeed * 0.7;
      
      // Move electrons along their paths
      orbitalObj.electrons.forEach(electron => {
        electron.mesh.position.x = Math.cos(time * electron.speed + electron.initialAngle) * electron.radius;
        electron.mesh.position.y = Math.sin(time * electron.speed + electron.initialAngle) * electron.radius;
      });
    });
    
    // Animate particles
    particles.children.forEach((particle, i) => {
      particle.position.y += Math.sin(time + i) * 0.01;
      particle.material.opacity = 0.3 + Math.sin(time * 2 + i) * 0.2;
    });
    
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
    
    // Update material colors based on theme
    nucleusMaterial.color.set(isDarkMode ? 0xd727e8 : 0xe100ff);
    
    // Update orbital and electron colors
    const newOrbitalColors = [
      isDarkMode ? 0xeb4ff3 : 0xf652ff,
      isDarkMode ? 0xf677f8 : 0xfd7aff,
      isDarkMode ? 0xeb4ff3 : 0xffa3fd
    ];
    
    orbitalGroups.forEach((orbitalObj, i) => {
      const orbital = orbitalObj.group.children[0];
      (orbital.material as THREE.MeshBasicMaterial).color.set(newOrbitalColors[i]);
      
      orbitalObj.electrons.forEach(electron => {
        (electron.mesh.material as THREE.MeshBasicMaterial).color.set(newOrbitalColors[i]);
      });
    });
    
    particleMaterial.color.set(isDarkMode ? 0x700b7e : 0xfd7aff);
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

// Create a simple pendulum animation for the physics calculator page
export function setupPendulumScene(container: HTMLElement): () => void {
  // Create a scene
  const scene = new THREE.Scene();
  // Don't set any background color, keep it transparent
  
  // Check if dark mode is active
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Create a camera
  const aspect = container.clientWidth / container.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
  camera.position.z = 20;

  // Create a renderer with transparency
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true  // This enables transparency
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0); // Transparent background
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
    color: isDarkMode ? 0xd727e8 : 0xe100ff 
  });
  const bob = new THREE.Mesh(bobGeometry, bobMaterial);
  bob.position.y = -10;
  pivot.add(bob);

  // Create some background objects for depth
  const particles = new THREE.Group();
  scene.add(particles);
  
  // Add small spheres as particles
  const particleMaterial = new THREE.MeshBasicMaterial({ 
    color: isDarkMode ? 0x700b7e : 0xfd7aff,
    transparent: true,
    opacity: 0.5
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
    color: isDarkMode ? 0x520e5b : 0xffa3fd 
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
    requestAnimationFrame(animate);
    
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
    bobMaterial.color.set(isDarkMode ? 0xd727e8 : 0xe100ff);
    rodMaterial.color.set(isDarkMode ? 0x9ca3af : 0x6b7280);
    platformMaterial.color.set(isDarkMode ? 0x520e5b : 0xffa3fd);
    particleMaterial.color.set(isDarkMode ? 0x700b7e : 0xfd7aff);
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
