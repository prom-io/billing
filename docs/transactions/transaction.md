# Api для получения транзакции

## Api для всех транзакции

> **Method**: GET
>
> **Action**: /transaction/paginate/:pageNumber/:pageSize

### Необходимые данные
```
	pageNumber - required|number
	pageSize - required|number
``` 

Описание:
* pageNumber - номер страницы
* pageSize - кол-во элементов

### Пример

##### Запрос
```
http://localhost:3001/transaction/paginate/1/15
```

##### Ответ

Status: 200

```
{
    "count": "7",
    "data": [
        {
            "id": "354282e1-632e-481d-8851-80a83ffcab01",
            "txType": "dataUpload",
            "hash": "0x5d9e89753d138a2486e310327a0c7a7af2c8cd797f7960b089974bba4856bc93",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "to": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "value": "1000000000000000000",
            "status": true
        },
        {
            "id": "354282e1-632e-481d-8851-80a83ffcab01",
            "txType": "dataUpload",
            "hash": "0x54025745aa2778951d1142a250c885c3f6f3b40b9e1a88330780e94fd91d2e81",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "to": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "value": "1000000000000000000",
            "status": true
        },
        {
            "id": "354282e1-632e-481d-8851-80a83ffcab01",
            "txType": "dataSell",
            "hash": "0x8fddc1a30ad874d609ea571dca76b921fe1d09e8089d61571260f3b210251ae7",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0x7633Fe8542c2218B5A25777477F63D395aA5aFB4",
            "to": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "value": "1000000000000000000",
            "status": true
        },
        {
            "id": "354282e1-632e-481d-8851-80a83ffcab01",
            "txType": "dataSell",
            "hash": "0x9bc7af74377b25d6abe2005a3212750e682d0b9258c36005ec29f4f0d909e5b1",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0x7633Fe8542c2218B5A25777477F63D395aA5aFB4",
            "to": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "value": "1000000000000000000",
            "status": true
        },
        {
            "id": "b1dcc4d4-ef8f-4086-af44-7ae789bac728",
            "txType": "dataUpload",
            "hash": "0x359483dfb4dcf81cd5904bb0a09dd5def0caff7205902de3a2f4fe6bfd6c22dd",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "to": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "value": "10000000000000000000",
            "status": true
        },
        {
            "id": "eacdc1d6-6c6e-4453-8f1d-a22ed2bde4b1",
            "txType": "dataUpload",
            "hash": "0x573b2831edd8c2ece60b73ccd5e38d92ab4b1c865beaa05769786b01aafeea24",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "to": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "value": "1000000000000000000",
            "status": true
        },
        {
            "id": "eacdc1d6-6c6e-4453-8f1d-a22ed2bde4b1",
            "txType": "dataUpload",
            "hash": "0x0bcf7aeaed7f5f63684827c567e9c220c9da5936a46521f53dc60e8f2c54cc98",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "to": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "value": "1000000000000000000",
            "status": true
        }
    ]
}
```
------
## Api для всех транзакции конкретного адреса
 
> **Method**: GET
>
> **Action**: /transaction/address/:address/paginate/:pageNumber/:pageSize

### Необходимые данные
```
	address - required|string
	pageNumber - required|number
	pageSize - required|number
``` 

Описание:
* address - адрес для которого нужно получить все транзакции
* pageNumber - номер страницы
* pageSize - кол-во элементов

### Пример

##### Запрос
```
http://localhost:3001/transaction/address/0xd4039eB67CBB36429Ad9DD30187B94f6A5122215/paginate/1/15
```

##### Ответ

Status: 200

```
{
    "count": "2",
    "data": [
        {
            "id": "354282e1-632e-481d-8851-80a83ffcab01",
            "txType": "dataSell",
            "hash": "0x8fddc1a30ad874d609ea571dca76b921fe1d09e8089d61571260f3b210251ae7",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0x7633Fe8542c2218B5A25777477F63D395aA5aFB4",
            "to": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "value": "1000000000000000000",
            "status": true
        },
        {
            "id": "354282e1-632e-481d-8851-80a83ffcab01",
            "txType": "dataSell",
            "hash": "0x9bc7af74377b25d6abe2005a3212750e682d0b9258c36005ec29f4f0d909e5b1",
            "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
            "from": "0x7633Fe8542c2218B5A25777477F63D395aA5aFB4",
            "to": "0xa508dD875f10C33C52a8abb20E16fc68E981F186",
            "value": "1000000000000000000",
            "status": true
        }
    ]
}
```