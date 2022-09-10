<template>
	<div class="root-container">
		<div class="m-ct">
			<aside class="m-aside">
				<h3>threeJs演示</h3>
				<el-menu :default-active="activePath" class="project-menu-vertical" active-text-color="#409EFF" background-color="#fff" text-color="#000" @open="handleOpen" @close="handleClose" @select="handeSelect">
					<el-menu-item :index="item.path" v-for="(item, i) in menus" :key="i">{{ item.meta?.title || item.name }}</el-menu-item>
					<el-submenu :index="project.path" v-for="(project, index) in []" :key="index">
						<template #title>
							<i :class="project.icon"></i>
							<span>{{ project.title }}</span>
						</template>
						<el-menu-item :index="project.path + item.path" v-for="(item, i) in project.children" :key="i">{{ item.title }}</el-menu-item>
					</el-submenu>
				</el-menu>
			</aside>
			<content>
				<router-view></router-view>
			</content>
		</div>
	</div>
</template>

<script>
import { routes } from "@/router/";
export default {
	data() {
		return {
			menus: routes.filter(route => route.component),
			activePath: window.location.hash.substring(1, window.location.hash.lastIndexOf("?") > -1 ? window.location.hash.lastIndexOf("?") : undefined)
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		handeSelect(key, keyPath) {
			window.location.hash = key;
			// history.pushState(null, `/#${key}`, `/#${key}`);
		},
		loginOut() {
			removeToken();
			this.$router.push({
				path: "/login",
				query: {
					...this.$route.query,
					redirect: this.$route.path
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.root-container {
	height: 100%;
}
.m-header {
	height: 70px;
	// background-color: green;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 20px;
	padding-right: 30px;
	border-bottom: 1px solid #f4f4f4;
	background-color: #fff;
	.logo-info {
		height: 50px;
		display: flex;
		align-items: center;
		img {
			height: 100%;
		}
		.l {
			display: inline-block;
			padding-left: 10px;
		}
	}
	.user-info {
	}
	.user-ct {
		padding: 0 15px;
	}
}
.m-ct {
	display: flex;
	h3 {
		height: 80px;
		line-height: 80px;
		text-align: center;
		border-bottom: 2px solid #e6e6e6;
		margin: 0;

	}
	content {
		flex: 1;
		height: 100vh;
		padding: 20px;
		background: #f5f5f5;
		box-sizing: border-box;
	}
	height: 100vh;
	.m-aside {
		width: 200px;
		height: 100%;
		padding: 0;
		overflow-y: auto;
		overflow-x: hidden;
		// background-color: #304156;
		border: 1px solid #f4f4f4;
	}
	.m-view {
		flex: 1 1 0%;
		height: 100%;
		// background-color: #fff;
		overflow: auto;
		padding-left: 15px;
		&.loading {
			&::before {
				font-size: 50px;
				margin: 50px auto;
				content: "loading....";
				display: block;
				width: 400px;
				background: linear-gradient(90deg, red, #fd8403, yellow);
				background-size: 480px 480px;
				animation: skeleton-keyframe 2s linear infinite;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
	}
	.m-view,
	.m-aside {
		&::-webkit-scrollbar {
			width: 6px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(144, 147, 153, 0.3);
			border-radius: 10px;
			transition: all 0.2s ease-in-out;
		}
		&::-webkit-scrollbar-track {
			border-radius: 10px;
		}
	}
	.m-view > div {
		height: 100%;
	}
}
.project-menu-vertical {
	width: 200px;
	border: none;
	padding-top: 14px;
	.el-dropdown-menu__item,
	.el-menu-item {
		font-size: 16px;
		font-weight: normal;
		text-align: center;
		height: 45px;
		line-height: 45px;
	}
}

@keyframes skeleton-keyframe {
	0% {
		background-position: 0 0;
	}
	100% {
		background-position: 480px 0;
	}
}
</style>
