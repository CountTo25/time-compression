import Route from "./Support/Route";
import Start from "../Views/Start.svelte";
import Layout from "../Layout.svelte";
import Loops from "../Views/Loops.svelte";
import Database from "../Views/Database.svelte";
import TimeMachine from "../Views/TimeMachine.svelte";

export default Route.define([
    Route.group('/', {layout: Layout}, [
        Route.path('/', {view: Start}),
        Route.path('/loops', {view: Loops}),
        Route.path('/database', {view: Database}),
        Route.path('/machine', {view: TimeMachine}),
    ]),
]);