
export async function postJson(path, payload){
    let response = await fetch(path, {
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(payload),
        "method": "POST",
    });
    return await response.json();
}