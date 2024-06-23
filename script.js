// Temel değişkenler
let scene, camera, renderer, ferrisWheelGroup;
let rotationSpeed = 0.0001;
let rotationDirection = 1;
let container = document.getElementById('container');

// Three.js sahnesini başlat
function init() {
    // Sahne oluştur
    scene = new THREE.Scene();

    // Kamera oluştur
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    camera.position.y = 10;
    camera.lookAt(new THREE.Vector3(0, 5, 0));

    // Renderer oluştur ve sayfaya ekle
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Zemin oluştur ve sahneye ekle
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    // Gökyüzü oluştur
    const skyGeometry = new THREE.SphereGeometry(100, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({ color: 0x87ceeb }); // Mavi renkli gökyüzü
    sky = new THREE.Mesh(skyGeometry, skyMaterial);
    sky.material.side = THREE.BackSide; // Sadece dışını göster
    scene.add(sky);

    // Dönme dolabı ve direğini oluştur ve sahneye ekle
    createFerrisWheel();

    // Işık ekle
    const light = new THREE.AmbientLight(0xffffff); // Beyaz ışık
    scene.add(light);

    // Kullanıcı kontrollerini ekle
    document.getElementById('rotationSpeed').addEventListener('input', (event) => {
        rotationSpeed = parseFloat(event.target.value);
    });

    document.getElementById('rotationDirection').addEventListener('change', (event) => {
        rotationDirection = parseInt(event.target.value);
    });

    // Pencere boyutlandırma olayını dinle
    window.addEventListener('resize', onWindowResize, false);

    // Animasyon döngüsünü başlat
    animate();
}

// Dönme dolabı oluşturma fonksiyonu
function createFerrisWheel() {  
    // Dönme dolabı grubunu oluştur
    ferrisWheelGroup = new THREE.Group();

    // Dönme dolabı oluştur
    const ferrisWheelGeometry = new THREE.CircleGeometry(5, 32,);
    const ferrisWheelMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    const ferrisWheel = new THREE.Mesh(ferrisWheelGeometry, ferrisWheelMaterial);
    ferrisWheel.rotation.z = Math.PI / 2;
    ferrisWheelGroup.add(ferrisWheel);

    // Kabinleri oluştur ve dönme dolabına ekle
    const cabinGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const radius = 5; // Dönme dolabının yarıçapı
    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
        cabin.position.set(x, y, 0);  // Kabinleri doğru pozisyona yerleştir
        ferrisWheelGroup.add(cabin);

        
    }

    // Direk oluştur ve sahneye ekle
    const poleGeometry = new THREE.CylinderGeometry(0.125, 0.25, 10.2, 32);
    const poleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = 2;
    scene.add(pole);

    // Dönme dolabını sahneye ekle
    ferrisWheelGroup.position.y = 7;  // Zemin üstüne yerleştir
    scene.add(ferrisWheelGroup);
}

// Pencere yeniden boyutlandırıldığında renderer'ı güncelle
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animasyon döngüsü
function animate() {
    requestAnimationFrame(animate);

    // Dönme dolabını döndür
    ferrisWheelGroup.rotation.z += rotationDirection * rotationSpeed;

    // Sahneyi render et
    renderer.render(scene, camera);
}

// Başlangıç fonksiyonunu çağır
init();
