# Api для получения транзакции

## Типы транзакции

* dataUpload - загрузка данных
* dataPurchase - покупка данных

----

## Api для получения трнзацакции адреса определенного типа

> **Method**: GET
>
> **Action**: /transaction/address/:address/type/:type/paginate/:pageNumber/:pageSize

### Необходимые данные
```
    address - required|string
    type - required|string
    pageNumber - required|number
    pageSize - required|number
``` 

Описание:
* address - адрес клиента
* type - тип транзакции 
* pageNumber - номер страницы
* pageSize - кол-во элементов

### Пример

##### Запрос
```
http://localhost:3001/transaction/address/0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5/type/dataPurchase/paginate/0/10
```

##### Ответ

Status: 200

```
{
  "count": "26",
  "pageNumbers": 3,
  "data": [
    {
      "id": "f4285022-0744-46ab-b285-dba70e3b0c7a",
      "txType": "dataPurchase",
      "hash": "0x576b48cbe3117f3883d2e41db9874e6c9b6041b90b5ae0f649ea79710c6b5b6d",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 26,
      "blockNumber": 630009,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0xF4Cd183233d55DACab2594575D97E68dD08DdEBC",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "a75ba6ce-180e-4a16-a3f4-40df7c7e879e",
      "txType": "dataPurchase",
      "hash": "0x48f5f38a1c5d8509176c7e99733d007a18b16b9bd1d33513f05489c8587080cd",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 25,
      "blockNumber": 629985,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0xC617d438cF94D81EE9745D99f991A6281ed1d23D",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "f4285022-0744-46ab-b285-dba70e3b0c7a",
      "txType": "dataPurchase",
      "hash": "0xcd0c26526e81ca4cecc66770bdaabaf9f2bb485b5eb1ba9047a82741f71ecd39",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 24,
      "blockNumber": 629758,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0xF4Cd183233d55DACab2594575D97E68dD08DdEBC",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "f4285022-0744-46ab-b285-dba70e3b0c7a",
      "txType": "dataPurchase",
      "hash": "0xb773969637e8627bca51039110ce560341559a47f84caf2dd247f179da3d3284",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 23,
      "blockNumber": 629497,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0xF4Cd183233d55DACab2594575D97E68dD08DdEBC",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "a75ba6ce-180e-4a16-a3f4-40df7c7e879e",
      "txType": "dataPurchase",
      "hash": "0x9fdbd53ac1943329c86b889f91b9c5cdbf516f312d8c8684cd8ab5207f86d5f2",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 22,
      "blockNumber": 628923,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0xC617d438cF94D81EE9745D99f991A6281ed1d23D",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "a75ba6ce-180e-4a16-a3f4-40df7c7e879e",
      "txType": "dataPurchase",
      "hash": "0xb43cac87bcaf1cad99de5e987ae966977f514cbcf982446595d255dcaaabdfc0",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 21,
      "blockNumber": 628820,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0xC617d438cF94D81EE9745D99f991A6281ed1d23D",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "a75ba6ce-180e-4a16-a3f4-40df7c7e879e",
      "txType": "dataPurchase",
      "hash": "0x3ba39ac34fffb6e7ad7ce4ca586aa4864b5c62a51f76a6f6aef8846469512538",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 20,
      "blockNumber": 628586,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0xC617d438cF94D81EE9745D99f991A6281ed1d23D",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "f123cf49-a8aa-483b-b6c3-0efd729207a2",
      "txType": "dataPurchase",
      "hash": "0xf1c8c4c2248e43a91ae16214fbbe1dc1d2d96fb0bbf0148e871792536efdf947",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 19,
      "blockNumber": 627734,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xB05Ae2EA67FE735fc385618AAf615bA2251AFe00",
      "dataOwner": "0x400409b2BD0D6eC94A60a1F12cb4Ee8F92b993B2",
      "value": "2",
      "created_at": "2019-11-16",
      "ago": "2 hours ago",
      "status": true,
      "fee": 1173560000000000
    },
    {
      "id": "a75ba6ce-180e-4a16-a3f4-40df7c7e879e",
      "txType": "dataPurchase",
      "hash": "0x659cf60648659af3642dcdae56b3baf62b58a08fc531099b55afbaf4dec091ed",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 18,
      "blockNumber": 589129,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xE71291a9B7BbCf046d5941159FFEA9A145DBAc54",
      "dataOwner": "0xC617d438cF94D81EE9745D99f991A6281ed1d23D",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "15 hours ago",
      "status": true,
      "fee": 1174072000000000
    },
    {
      "id": "a75ba6ce-180e-4a16-a3f4-40df7c7e879e",
      "txType": "dataPurchase",
      "hash": "0x655e95dd7d9d9e5596748d93d51acac0653d9d6ee7470d38f36ed0dcef3bd5f5",
      "serviceNode": "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215",
      "queueNumber": 17,
      "blockNumber": 588740,
      "dataValidator": "0xD7209A8866d4D2c663F3F4356b2D29cB4255F2f5",
      "dataMart": "0xE71291a9B7BbCf046d5941159FFEA9A145DBAc54",
      "dataOwner": "0xC617d438cF94D81EE9745D99f991A6281ed1d23D",
      "value": "1",
      "created_at": "2019-11-16",
      "ago": "15 hours ago",
      "status": true,
      "fee": 1174072000000000
    }
  ]
}
```

--------
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