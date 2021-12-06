
function cloneObj(aObject) {
    if (!aObject)
        return aObject
    let v;
    let bObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
        v = aObject[k];
        bObject[k] = (typeof v === "object") ? cloneObj(v) : v;
    }
    return bObject;
}

function formatDefinitions(def, resp = {}) {
    if (Array.isArray(def))
        resp = { type: "array", items: {} }
    else
        resp = { type: "object", properties: {} }
    Object.entries(def).forEach(elem => {
        if (typeof elem[1] === 'object') {  // Array or object
            if (resp.type == 'array') {
                resp.items = { ...formatDefinitions(elem[1], resp) }
            } else
                resp.properties[elem[0]] = formatDefinitions(elem[1], resp)
        } else {
            if (resp.type == 'array')
                resp.items.properties[elem[0]] = { type: typeof elem[1] }
            else {
                if (elem[0][0] == '$') {  // Required parameter
                    elem[0] = elem[0].slice(1)
                    if (!resp.required)
                        resp.required = []
                    resp.required.push(elem[0])
                }
                resp.properties[elem[0]] = { type: typeof elem[1], example: elem[1] }
            }
        }
    })
    return resp
}

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "User",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        api_key: {
            type: "apiKey",
            name: "api_key",
            in: "header"
        },
        petstore_auth: {
            type: "oauth2",
            authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
            flow: "implicit",
            scopes: {
                read_pets: "read your pets",
                write_pets: "modify pets in your account"
            }
        }
    },
    definitions: {
        Parents: {
            father: "Simon Doe",
            mother: "Marie Doe"
        },
        User: {
            name: "Jhon Doe",
            age: 29,
            parents: {
                $ref: '#/definitions/Parents'
            },
            diplomas: [
                {
                    school: "XYZ University",
                    year: 2020,
                    completed: true,
                    internship: {
                        hours: 290,
                        location: "XYZ Company"
                    }
                }
            ]
        },
        AddUser: {
            $name: "Jhon Doe",
            $age: 29,
            about: ""
        },
        Definit_00: true,
        Definit_01: 123,
        Definit_02: "test",
        Definit_03: "test",
        Definit_04: { a: 123, b: "test" },

        Definit_05: [true],
        Definit_06: [123],
        Definit_07: ["test"],
        Definit_08: [{ a: 123, b: "test" }],

        Definit_09: [[true]],
        Definit_10: [[123]],
        Definit_11: [["test"]],
        Definit_12: [[{ a: 123, b: "test" }]],

        Definit_13: [
            {
                a: true,
                b: 123,
                c: "test",
                d: {
                    a: true,
                    b: 123,
                    c: "test"
                }
            }
        ],

        Definit_14: [
            {
                a: true,
                b: 123,
                c: "test",
                d: {
                    a: true,
                    b: 123,
                    c: "test",
                    d: ["teste"]
                }
            }
        ],

        Definit_15: {
            a: true,
            b: 123,
            c: "test",
            d: [
                {
                    a: true,
                    b: 123,
                    c: "test",
                    d: [123]
                }
            ]
        },

        Definit_16: {
            id: 0,
            category: {
                id: 0,
                name: "string"
            },
            name: false,
            photoUrls: [
                "teste"
            ],
            tags: [
                {
                    id: 0,
                    name: "string"
                }
            ],
            status: "available"
        }
    }
}


const expectedPaths = {
    "/automatic/user/{id}": {
        "get": {
            "tags": [],
            "description": "",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "type": 'string'
                },
                {
                    "name": "obj",
                    "in": "query",
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "OK"
                },
                "404": {
                    "description": "Not Found"
                }
            },
            "produces": [
                "application/json"
            ]
        }
    },
    "/automatic/user": {
        "post": {
            "tags": [],
            "description": "",
            "parameters": [
                {
                    "name": "obj",
                    "in": "query",
                    "type": "string"
                }
            ],
            "responses": {
                "201": {
                    "description": "Created"
                },
                "500": {
                    "description": "Internal Server Error"
                }
            },
            "produces": [
                "application/xml"
            ]
        }
    },
    "/automatic_and_incremented/user/{id}": {
        "get": {
            "tags": [
                "User"
            ],
            "description": "Endpoint to get the specific user.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "type": 'string'
                }
            ],
            "responses": {
                "200": {
                    "description": "User registered successfully.",
                    "schema": {
                        "$ref": "#/definitions/User"
                    }
                },
                "404": {
                    "description": "Not Found"
                }
            },
            "produces": [
                "application/json"
            ]
        },
        "delete": {
            "tags": [
                "User"
            ],
            "description": "",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "type": 'string',
                    "description": "User ID."
                }
            ],
            "responses": {
                "200": {
                    "description": "OK"
                },
                "404": {
                    "description": "Not Found"
                }
            }
        }
    },
    "/automatic_and_incremented/user": {
        "post": {
            "tags": [
                "User"
            ],
            "description": "Endpoint to add a user.",
            "parameters": [
                {
                    "name": "obj",
                    "in": "body",
                    "description": "User information.",
                    "required": true,
                    "schema": {
                        "$ref": "#/definitions/AddUser"
                    }
                }
            ],
            "responses": {
                "201": {
                    "description": "User registered successfully."
                },
                "500": {
                    "description": "Internal Server Error"
                }
            },
            "produces": [
                "application/xml"
            ]
        }
    },
    "/manual/user/{id}": {
        "patch": {
            "tags": [],
            "description": "Endpoint added manually.",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "description": "User ID.",
                    "required": true,
                    "type": 'string'
                },
                {
                    "name": "obj",
                    "in": "query",
                    "description": "User information.",
                    "required": true,
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "schema": {
                        "$ref": "#/definitions/User"
                    },
                    "description": "User found."
                },
                "500": {
                    "description": "Server Failure."
                }
            },
            "produces": [
                "application/json"
            ],
            "consumes": [
                "application/json"
            ]
        }
    },
    "/security": {
        "head": {
            "tags": [],
            "description": "",
            "parameters": [
                {
                    "name": "obj",
                    "in": "query",
                    "type": "string"
                }
            ],
            "responses": {
                "200": {
                    "description": "OK"
                },
                "404": {
                    "description": "Not Found"
                }
            },
            "security": [
                {
                    "petstore_auth": [
                        "write_pets",
                        "read_pets"
                    ]
                }
            ],
            "produces": [
                "application/json"
            ]
        }
    },
    "/forcedEndpoint/{id}": {
        "put": {
            "tags": [],
            "description": "Forced endpoint.",
            "produces": [
                "application/json"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "type": 'string',
                    "description": "User ID."
                },
                {
                    "name": "obj",
                    "in": "body",
                    "description": "User information.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "example": "Jhon Doe"
                            },
                            "age": {
                                "type": "number",
                                "example": 29
                            },
                            "about": {
                                "type": "string",
                                "example": ""
                            }
                        },
                        "required": [
                            "name",
                            "age"
                        ]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "OK"
                },
                "404": {
                    "description": "Not Found"
                }
            }
        }
    }
}

const expectedDefinitions = {
    "Parents": {
        "type": "object",
        "properties": {
            "father": {
                "type": "string",
                "example": "Simon Doe"
            },
            "mother": {
                "type": "string",
                "example": "Marie Doe"
            }
        },
        "xml": {
            "name": "Parents"
        }
    },
    "User": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "example": "Jhon Doe"
            },
            "age": {
                "type": "number",
                "example": 29
            },
            "parents": {
                "xml": {
                    "name": "parents"
                },
                "$ref": "#/definitions/Parents"
            },
            "diplomas": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "school": {
                            "type": "string",
                            "example": "XYZ University"
                        },
                        "year": {
                            "type": "number",
                            "example": 2020
                        },
                        "completed": {
                            "type": "boolean",
                            "example": true
                        },
                        "internship": {
                            "type": "object",
                            "properties": {
                                "hours": {
                                    "type": "number",
                                    "example": 290
                                },
                                "location": {
                                    "type": "string",
                                    "example": "XYZ Company"
                                }
                            }
                        }
                    }
                }
            }
        },
        "xml": {
            "name": "User"
        }
    },
    "AddUser": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "example": "Jhon Doe"
            },
            "age": {
                "type": "number",
                "example": 29
            },
            "about": {
                "type": "string",
                "example": ""
            }
        },
        "required": [
            "name",
            "age"
        ],
        "xml": {
            "name": "AddUser"
        }
    },
    "Definit_00": {
        "type": "boolean",
        "example": true,
        "xml": {
            "name": "Definit_00"
        }
    },
    "Definit_01": {
        "example": 123,
        "type": "number",
        "xml": {
            "name": "Definit_01"
        }
    },
    "Definit_02": {
        "type": "string",
        "example": "test",
        "xml": {
            "name": "Definit_02"
        }
    },
    "Definit_03": {
        "type": "string",
        "example": "test",
        "xml": {
            "name": "Definit_03"
        }
    },
    "Definit_04": {
        "type": "object",
        "properties": {
            "a": {
                "type": "number",
                "example": 123
            },
            "b": {
                "type": "string",
                "example": "test"
            }
        },
        "xml": {
            "name": "Definit_04"
        }
    },
    "Definit_05": {
        "type": "array",
        "example": [ true ],
        "items": {
            "type": "boolean"
        },
        "xml": {
            "name": "Definit_05"
        }
    },
    "Definit_06": {
        "type": "array",
        "example": [ 123 ],
        "items": {
            "type": "number"
        },
        "xml": {
            "name": "Definit_06"
        }
    },
    "Definit_07": {
        "type": "array",
        "example": [ 'test' ],
        "items": {
            "type": "string"
        },
        "xml": {
            "name": "Definit_07"
        }
    },
    "Definit_08": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "number",
                    "example": 123
                },
                "b": {
                    "type": "string",
                    "example": "test"
                }
            }
        },
        "xml": {
            "name": "Definit_08"
        }
    },
    "Definit_09": {
        "type": "array",
        "items": {
            "type": "array",
            "example": [ true ],
            "items": {
                "type": "boolean"
            }
        },
        "xml": {
            "name": "Definit_09"
        }
    },
    "Definit_10": {
        "type": "array",
        "items": {
            "type": "array",
            "example": [ 123 ],
            "items": {
                "type": "number"
            }
        },
        "xml": {
            "name": "Definit_10"
        }
    },
    "Definit_11": {
        "type": "array",
        "items": {
            "type": "array",
            "example": [ 'test' ],
            "items": {
                "type": "string"
            }
        },
        "xml": {
            "name": "Definit_11"
        }
    },
    "Definit_12": {
        "type": "array",
        "items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "a": {
                        "type": "number",
                        "example": 123
                    },
                    "b": {
                        "type": "string",
                        "example": "test"
                    }
                }
            }
        },
        "xml": {
            "name": "Definit_12"
        }
    },
    "Definit_13": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "boolean",
                    "example": true
                },
                "b": {
                    "type": "number",
                    "example": 123
                },
                "c": {
                    "type": "string",
                    "example": "test"
                },
                "d": {
                    "type": "object",
                    "properties": {
                        "a": {
                            "type": "boolean",
                            "example": true
                        },
                        "b": {
                            "type": "number",
                            "example": 123
                        },
                        "c": {
                            "type": "string",
                            "example": "test"
                        }
                    }
                }
            }
        },
        "xml": {
            "name": "Definit_13"
        }
    },
    "Definit_14": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "a": {
                    "type": "boolean",
                    "example": true
                },
                "b": {
                    "type": "number",
                    "example": 123
                },
                "c": {
                    "type": "string",
                    "example": "test"
                },
                "d": {
                    "type": "object",
                    "properties": {
                        "a": {
                            "type": "boolean",
                            "example": true
                        },
                        "b": {
                            "type": "number",
                            "example": 123
                        },
                        "c": {
                            "type": "string",
                            "example": "test"
                        },
                        "d": {
                            "type": "array",
                            "example": [ 'teste' ],
                            "items": {
                                "type": "string"
                            }
                        }
                    }
                }
            }
        },
        "xml": {
            "name": "Definit_14"
        }
    },
    "Definit_15": {
        "type": "object",
        "properties": {
            "a": {
                "type": "boolean",
                "example": true
            },
            "b": {
                "type": "number",
                "example": 123
            },
            "c": {
                "type": "string",
                "example": "test"
            },
            "d": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "a": {
                            "type": "boolean",
                            "example": true
                        },
                        "b": {
                            "type": "number",
                            "example": 123
                        },
                        "c": {
                            "type": "string",
                            "example": "test"
                        },
                        "d": {
                            "type": "array",
                            "example": [123],
                            "items": {
                                "type": "number"
                            }
                        }
                    }
                }
            }
        },
        "xml": {
            "name": "Definit_15"
        }
    },
    "Definit_16": {
        "type": "object",
        "properties": {
            "id": {
                "type": "number",
                "example": 0
            },
            "category": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "number",
                        "example": 0
                    },
                    "name": {
                        "type": "string",
                        "example": "string"
                    }
                }
            },
            "name": {
                "type": "boolean",
                "example": false
            },
            "photoUrls": {
                "type": "array",
                "example": ["teste"],
                "items": {
                    "type": "string"
                }
            },
            "tags": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "number",
                            "example": 0
                        },
                        "name": {
                            "type": "string",
                            "example": "string"
                        }
                    }
                }
            },
            "status": {
                "type": "string",
                "example": "available"
            }
        },
        "xml": {
            "name": "Definit_16"
        }
    }
}

module.exports = {
    doc,
    expectedPaths,
    expectedDefinitions,
    cloneObj,
    formatDefinitions
}