// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
export const routes = [
	{ path: "/", redirect: "/demo" },
	{
		path: "/demo",
		component: () => import("@/views/demo.vue"),
		name: "简易demo",
		meta: { title: "简易demo" }
	}
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
export default new VueRouter({
	routes // (缩写) 相当于 routes: routes
});
