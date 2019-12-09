# Api для получения файлов

## Api для всех файлов

> **Method**: GET
>
> **Action**: /file/paginate/:pageNumber/:pageSize

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
http://localhost:3001/file/paginate/1/15
```

##### Ответ

Status: 200

```
{
  "count": "2",
  "data": [
    {
      "id": "39bcd759-b547-4564-bb1e-6be03a23deda",
      "name": "Test 1",
      "size": "100",
      "file_extension": "jpg",
      "mime_type": "image/jpg",
      "owner": "0x46e5d6428BFd4cd0eD5bA4fE88Cd8DA2a43f09a6",
      "sum": "1"
    },
    {
      "id": "39bcd759-b547-4564-bb1e-6be03a23deda",
      "name": "Test 1",
      "size": "100",
      "file_extension": "jpg",
      "mime_type": "image/jpg",
      "owner": "0x46e5d6428BFd4cd0eD5bA4fE88Cd8DA2a43f09a6",
      "sum": "1"
    }
  ]
}
```
------
## Api для всех транзакции конкретного адреса
 
> **Method**: GET
>
> **Action**: /file/address/:address/paginate/:pageNumber/:pageSize

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
http://localhost:3001/file/address/0xd4039eB67CBB36429Ad9DD30187B94f6A5122215/paginate/1/15
```

##### Ответ

Status: 200

```
{
  "count": "2",
  "data": [
    {
      "id": "39bcd759-b547-4564-bb1e-6be03a23deda",
      "name": "Test 1",
      "size": "100",
      "file_extension": "jpg",
      "mime_type": "image/jpg",
      "owner": "0x46e5d6428BFd4cd0eD5bA4fE88Cd8DA2a43f09a6",
      "sum": "1"
    },
    {
      "id": "39bcd759-b547-4564-bb1e-6be03a23deda",
      "name": "Test 1",
      "size": "100",
      "file_extension": "jpg",
      "mime_type": "image/jpg",
      "owner": "0x46e5d6428BFd4cd0eD5bA4fE88Cd8DA2a43f09a6",
      "sum": "1"
    }
  ]
}
```