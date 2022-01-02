export function deepmerge (target, source) {
    console.log(target);
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (const key of Object.keys(source)) {
      if (source[key] instanceof Object && target[key] !== undefined) Object.assign(source[key], deepmerge(target[key], source[key]))
    }
    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
  }

  //https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6