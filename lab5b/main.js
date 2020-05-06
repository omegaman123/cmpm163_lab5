// setup the scene

function main() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 60;

    particles = [];
    let count = 0;
    let step = 1;
    var time = Date.now() * 0.000000005;
    const geo = new THREE.Geometry();
    for (let i = 0; i < 1000; i++) {
        count += step;
        if (count > 20) {
            step = -1;
        }
        if (count < -20) {
            step = 1;
        }
        let particle;
        if (step === 1) {
            particle = {
                position: new THREE.Vector3(
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 3 - 3),
                velocity: new THREE.Vector3(
                    Math.random() * Math.sin(time),
                    0,
                    Math.random() * .02 - .01),
                acceleration: new THREE.Vector3(
                    Math.random() * .002 - .001,
                    Math.random() * .002 - .001,
                    0),
            };
        } else {
            particle = {
                position: new THREE.Vector3(
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                    Math.random() * 3 - 3),
                velocity: new THREE.Vector3(
                    Math.random() * -Math.sin(time),
                    0,
                    Math.random() * .02 - .01),
                acceleration: new THREE.Vector3(
                    Math.random() * .002 - .001,
                    Math.random() * .002 - .001,
                    0),
            };

        }
        particles.push(particle);
        geo.vertices.push(particle.position)
    }


    const mat = new THREE.PointsMaterial({color: 0xffffff, size: 0.5});
    mesh = new THREE.Points(geo, mat);
    mesh.position.z = -4;
    scene.add(mesh);


    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var mouseX = 0;
    var mouseY = 0;

    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove(event) {
        if (event.touches.length == 1) {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    document.addEventListener('mousemove', onDocumentMouseMove,
        false);
    document.addEventListener('touchstart', onDocumentTouchStart,
        false);
    document.addEventListener('touchmove', onDocumentTouchMove,
        false);


    let c = 0;
    let l = .01;

    function animate() {
        var time = Date.now() * 0.00000000000000000005;
        // var h = Math.sin(time);
        // console.log(h);
        // var b = new THREE.Vector3(h,h/2,h/4);

        c++;
        if (c % 60 === 0) {
            if (l === .01) {
                l = -.01
            } else {
                l = .01
            }
        }


        particles.forEach(p => {
            p.velocity.y = Math.random()*l;
            p.velocity.add(new THREE.Vector3(l*2, 0, 0));
            p.position.add(p.velocity);

        });
        mesh.geometry.verticesNeedUpdate = true;
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }


    animate();

}
