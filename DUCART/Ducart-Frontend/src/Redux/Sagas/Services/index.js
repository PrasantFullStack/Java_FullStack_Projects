//use this function if our form has only text data

//Why use index.js in services folder?
//1. Centralized API management: By having a single index.js file, you can manage all your API calls in one place, making it easier to maintain and update.
//2. Reusability: Functions defined in index.js can be reused across different parts of the application, reducing code duplication.
//3. Improved organization: Grouping related API functions together in a services folder helps keep the project structure organized and makes it easier to locate specific functions when needed.
//4. Easier testing: With all API calls centralized, it becomes simpler to write unit tests for these functions, ensuring they work as expected.
export async function createRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/${collection}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

//use this function if our form has file fields
export async function createMultipartRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/${collection}`, {
        method: "POST",
        headers: {
        },
        body: payload
    })
    return await response.json()
}

export async function getRecord(collection) {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/${collection}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    })
    return await response.json()
}


//use this function if our form has only text data
export async function updateRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return response.json()
}

//use this function if our form has file fields
export async function updateMultipartRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/${collection}/${payload.get("id")}`, {
        method: "PUT",
        headers: {
        },
        body: payload
    })
    return response.json()
}

export async function deleteRecord(collection, payload) {
    let response = await fetch(`${process.env.REACT_APP_SERVER}/${collection}/${payload.id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
         
    })
    return await response.json()
}