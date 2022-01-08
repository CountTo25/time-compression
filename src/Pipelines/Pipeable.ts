import type Pipeline from "./Pipeline";

type Pipeable = {
    turnsOnAt?: typeof Pipeline,
    effect?: (pipe: Pipeline) => any,
}

export default Pipeable;