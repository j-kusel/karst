import Menu from './Menu.js';

export default class Node {
    constructor(date, position, data) {
        var geometry = new THREE.OctahedronGeometry(1, 0);
        var material = new THREE.MeshStandardMaterial({
            color: 0xF3FFE2,
            metalness: 0.3
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, position.y, position.z);
        //this.mesh.scale.set(0.1, 1, 1);

        this.date = date;

        this.menuGroup = new THREE.Group();
        console.log(this.mesh.position.x, this.mesh.position.y);
        this.menus = [
            new Menu(this.mesh.position, data)
        ];
        //this.menus.forEach((menu) => this.menuGroup.add(menu.mesh));

        //this.menu.init();
    }

    onClick() {
        console.log(this.date);
    }
}
