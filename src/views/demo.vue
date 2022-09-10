<template>
	<div class="three-box-ct">
		<div class="mgb-10">
			<el-button type="primary">显示按钮</el-button>
		</div>
		<div class="three-box" id="threeBox"></div>
	</div>
</template>
<script>
// 1、创建场景
// 2、创建相机
// 3、创建加载模型
// 4、渲染；
// 5、更新渲染 // 这就动起来了
// 6、给光照；
// createLight(); //创建光照  稍等一下；
// createRender(); //创建渲染
// createControl(); // 控制起来  稍等一下；
// updateRender(); //更新渲染

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import layout from "@/layout/index.vue";
export default {
	components: {
		layout
	},
	data() {
		return {
			innerWidth: 0,
			innerHeight: 0
		};
	},
	mounted() {
		this.innerWidth = document.querySelector("#threeBox").offsetWidth;
		this.innerHeight = document.querySelector("#threeBox").offsetHeight;
		this.init();
	},
	methods: {
		init() {
			this.createScene();
			this.createCamera();
			this.createMes();
			this.createRender();
			this.createLight();
			this.createControl();
			this.updateRender();
		},
		createScene() {
			this.scene = new THREE.Scene(); // 1 创建场景
		},
		createCamera() {
			const scale = this.innerWidth / this.innerHeight;
			this.camera = new THREE.PerspectiveCamera(60, scale, 0.1, 1000);
			this.camera.position.set(10, 10, 100);
			// this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		},
		createMes() {
			// 3 创建物体
			const geometry = new THREE.BoxGeometry(10, 10, 10); // 创建一个物体
			const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
			this.mesh = new THREE.Mesh(geometry, material);
			this.scene.add(this.mesh);
		},
		createRender() {
			// 4.渲染
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.setSize(this.innerWidth, this.innerHeight);
			document.querySelector("#threeBox").appendChild(this.renderer.domElement);
			this.renderer.render(this.scene, this.camera);
		},
		updateRender() {
			// 5.更新
			const _this = this;
			(function animate() {
				// _this.mesh.rotation.x += 0.01;
				// _this.mesh.rotation.y += 0.01;
				_this.orbitControls.update();
				requestAnimationFrame(animate);
				_this.renderer.render(_this.scene, _this.camera);
			})();
		},
		createLight() {
			// color = materialColor * light.color * light.intensity;
			const ambientLight = new THREE.AmbientLight(0x1c1c1c);
			ambientLight.intensity = 1;
			this.scene.add(ambientLight);
			// 聚光灯
			const spotLight = new THREE.SpotLight(0xffffff);
			spotLight.position.set(-100, 0, 0);
			// spotLight.map = new THREE.TextureLoader().load(url);

			spotLight.castShadow = true;

			spotLight.shadow.mapSize.width = 1024;
			spotLight.shadow.mapSize.height = 1024;

			spotLight.shadow.camera.near = 500;
			spotLight.shadow.camera.far = 4000;
			spotLight.shadow.camera.fov = 30;
			this.scene.add(spotLight);
		},
		createControl() {
			this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
			this.orbitControls.target.set(0, 0, 0);
		}
	}
};
</script>

<style lang="scss">
.three-box-ct {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	.three-box {
		flex: 1;
	}
}
</style>
