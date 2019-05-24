

export default class Node {
    constructor(date, position) {
        var geometry = new THREE.OctahedronGeometry(1, 0);
        var material = new THREE.MeshStandardMaterial({
            color: 0xF3FFE2,
            metalness: 0.3
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(position.x, position.y, position.z);

        this.date = date;
    }
}
