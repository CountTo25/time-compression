import Route from "./Support/Route";
import Start from "../Views/Start.svelte";
import Layout from "../Layout.svelte";

export default Route.define([
    Route.group('/', {layout: Layout}, [
        Route.path('/', {view: Start}),
    ]),
]);