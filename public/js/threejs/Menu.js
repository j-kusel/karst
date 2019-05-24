export default class Menu {
    constructor(position, data) {
        var geometry = new THREE.BoxGeometry(.75, .5, 0.05);
        geometry.translate(0.375, 0.25, -0.025);
        var material = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: 0.5
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, 1, 0);
    }

    init() {
        //this.mesh.position.set(
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



