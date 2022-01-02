export default class Routing {
    static go(route = '', data = {}) {
        window.location.href = window.location.href.replace(window.location.hash, '')+'#'+route;
    }

    static find(path = '', routes) {
        return routes.filter((route)=>(route.path === path))[0];
    }

    static getCurrentPath() {
        return window.location.hash.replace('#', '');
    }
}