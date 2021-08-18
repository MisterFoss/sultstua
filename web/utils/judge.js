export async function createNewJudge(name){
    let response = await fetch("/api/createJudge", {
        "headers": {
            "content-type": "application/json"
        },
        "body": JSON.stringify(name),
        "method": "POST",
    });
}