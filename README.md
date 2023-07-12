`auth/register`
Request
```json
{
    "name": "string",
    "surname": "string",
    "username": "string",
    "password": "string"
}
```

Response
```json
{
    "message": "string",
    "user": {
        "id": 1,
        "name": "name",
        "surname": "surname",
        "username": "username",
    },
    "token":"string"
}
```

`auth/login`
Request
```json
{
    "username": "string",
    "password": "string"
}
```

Response
```json
{
    "message": "string",
    "user": {
        "id": 1,
        "name": "name",
        "surname": "surname",
        "username": "username",
    },
    "token":"string"
}
```


`/note` 
`GET`
```json
{
    "message": "string",
    "notes": [
        {
            "id": 1,
            "title": "name",
            "description": "surname",
            "userId": 1,
        }
    ]
}
```