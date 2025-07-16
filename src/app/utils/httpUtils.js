
export async function generalHttp(url, options, statusCodeSetter) {
    await fetch(url, options).then((res) => {
        statusCodeSetter(res.status)
    }).catch((err) => {
        console.log(err)
    })
}

export async function httpGet(url, dataSetter, statusCodeSetter) {
    await fetch(url).then((res) => {
        if (statusCodeSetter !== undefined) {
            statusCodeSetter(res.status)
        }
        return res.json()
    }).then((data) => {
        
        dataSetter(data);
    }).catch((err) => {
        console.log(err)
    })
}

export async function httpPost(url, data, statusCodeSetter) {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        statusCodeSetter(res.status)
    }).catch((err) => {
        console.log(err)
    })
}