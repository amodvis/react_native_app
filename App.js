/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import * as B from './block';
import routerConfig from './routers/routerConfig';
import CommonPage from './pages/common_page';

// import NProgress from 'nprogress'

// Router.events.on('routeChangeStart', () => NProgress.start())
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())
/**
 * 将路由信息扁平化，继承上一级路由的 path
 * @param {Array} config 路由配置
 */
function recursiveRouterConfigV4(config = []) {
  const routeMap = [];
  config.forEach((item) => {
    const route = {
      path: item.path,
      layout: item.layout,
      is_pull_update: item.is_pull_update || false,
      is_cdn_cache: item.is_cdn_cache || false,
      is_user_auth: item.is_user_auth || false,
      component: item.component ? item.component : CommonPage,
      modules: item.modules,
    };
    routeMap.push(route);
  });
  return routeMap;
}

/**
 * 将扁平化后的路由信息生成 Route 节点
 * @param {object} router 路由对象
 * @param {string} contextPath 上层路由地址
 * @return {Route}
 * @example
 * <Stack  key="root">
 *   <Scene  key="/" component={Home} />
 *   <Scene  key="/page3" component={Page3} />
 *   <Scene  key="/page4" component={Page4} />
 *   <Scene  key="/page3/:id" component={Page3} />
 *   <Scene  component={NotFound} />
 * </Stack>
 */
function renderRouterConfigV4(router, contextPath) {
  const routeChildren = [];
  const renderRoute = (routeItem, routeContextPath) => {
    let routePath;
    if (!routeItem.path) {
      // eslint-disable-next-line
      console.error('route must has `path`');
    } else if (routeItem.path == '/' || routeItem.path == '*') {
      routePath = routeItem.path;
    } else {
      routePath = `/${routeContextPath}/${routeItem.path}`.replace(/\/+/g, '/');
    }
    let isDefault = false;
    if (routePath == "/index") {
      isDefault = true;
    }
    routeChildren.push(
      <Scene
        key={routePath}
        path={routePath}
        initial={isDefault}
        component={CommonPage}
        screenProps={{ "data": routeItem.modules, "is_cdn_cache": routeItem.is_cdn_cache, "is_user_auth": routeItem.is_user_auth, "is_pull_update": routeItem.is_pull_update }}
      />
    );
  };
  router.forEach((r) => {
    renderRoute(r, contextPath);
  });
  return <Stack key="root">{routeChildren}</Stack>;
}
const routerWithReactRouter4 = recursiveRouterConfigV4(routerConfig);
// {renderRouterConfigV4(routerWithReactRouter4, '/')}

const App = () => (
  <Router>
    <Scene key='root'>
      <Scene
        key="/footer"
        path="/footer"
        component={B.amodvis_company.Footer}
        title="PageThree"
      />
      <Scene initial hideNavBar tabBarPosition="bottom">
        <Tabs
          key="tabbar"
          swipeEnabled
          wrap={false}
          // 是否显示标签栏文字
          showLabel={false}
          tabBarStyle={{ backgroundColor: "#eee" }}
          //tab选中的颜色
          activeBackgroundColor="white"
          //tab没选中的颜色
          inactiveBackgroundColor="red"
        >
          <Scene
            key="/test"
            path="/test"
            component={B.amodvis_company.Header}
            title="PageOne"
          />
          <Scene
            key="/index"
            path="/index"
            component={B.amodvis_company.Solution}
            title="PageTwo"
          />
        </Tabs>
      </Scene>
      <Scene hideNavBar tabBarPosition="bottom">
        <Tabs
          key="tabbar"
          swipeEnabled
          wrap={false}
          // 是否显示标签栏文字
          showLabel={false}
          tabBarStyle={{ backgroundColor: "#eee" }}
          //tab选中的颜色
          activeBackgroundColor="white"
          //tab没选中的颜色
          inactiveBackgroundColor="green"
        >
          <Scene
            key="/tab_b/test"
            path="/tab_b/test"
            component={B.amodvis_company.Header}
            title="tab_b test"
          />
          <Scene
            key="/tab_b/index"
            path="/tab_b/index"
            component={B.amodvis_company.Solution}
            title="tab_b index"
          />
        </Tabs>
      </Scene>
    </Scene>
  </Router>
);

export default App;
