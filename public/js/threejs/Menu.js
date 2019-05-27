import menuHTML from '../menuHTML.js';

export default class Menu {
    constructor(position, data) {
/*        var geometry = new THREE.BoxGeometry(.75, .5, 0.05);
 *        
        geometry.translate(0.375, 0.25, -0.025);
        var material = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: 0.5
        });
        

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, 1, 0);
        */
        var div = document.createElement('div');
            div.className = 'menu';
            div.style.position = 'absolute';
            div.style.width = '200';
            div.style.height = '100';
            div.innerHTML = menuHTML(data);
            div.style.top = 10;
            div.style.left = 10;
            div.style.transform = 'translate(0%, -100%)';
        this.element = div;
        console.log(position);
        this.position = position.clone().add(new THREE.Vector3(0, 1, 0));
        console.log(this.position);

        document.body.appendChild(this.element);
    }

    init() {
        console.log(this.position.x);
    }

    update(camera) {
        var vector = this.position.clone().project(camera);
        var x = (vector.x + 1)* 0.5 * window.innerWidth;
        var y = (-vector.y + 1)* 0.5 * window.innerHeight;
        var distance = Math.abs(camera.position.distanceTo(this.position)-10);
        
        
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        this.element.style.filter = `blur(${distance*0.2}px)`;
        this.element.style.opacity = 1 - distance*0.2;
        //this.element.style.zoom = vector.z;
    }

    fade(dir) {
        var o = this.mesh.material.opacity;
        if (dir === 'in') {
            if (this.mesh.material.opacity < 0.9)
                this.mesh.material.opacity += (1.0-this.mesh.material.opacity)*0.2
            else
                this.mesh.material.opacity = 0.9;
        } else if (dir === 'out') {
            if (this.mesh.material.opacity > 0.03)
                this.mesh.material.opacity -= (this.mesh.material.opacity)*0.2
            else
                this.mesh.material.opacity = 0.0;
        }

    }
}



