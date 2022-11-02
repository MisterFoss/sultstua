

export function addWaitBeforeFunction(func, sec) {
    return async function doFuncAfterWait() {
        await sleep(sec)
        return await func.apply(this, arguments)
    } 
}

export async function sleep(sec) {
    await new Promise(resolve => setTimeout(() => {
        resolve(true)
    }, sec*1000))
}
