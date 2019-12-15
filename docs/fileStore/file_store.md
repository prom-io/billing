# Api для продления срока хранения файла

> **Method**: POST
>
> **Action**: /wallet/extend/file/store

## Необходимые данные
```
  dataValidator - required|string
  serviceNode - required|string
  sum - required|string
```

Описание:

* dataValidator - адрес дата валидатора
* serviceNode - адрес сервис ноды
* sum - сумма для продления

## Пример

#### Запрос
```
http://localhost:3001/wallet/extend/file/store
```

Тело запроса:
```
{
	"dataValidator": "0xCd583eebf344A4475BbF71B9B79a6fD5b37DC96e",
	"serviceNode": "0xb1aBf3127A13192c80F7D1CAA6Ad02b57855f1ac",
	"sum": "1"
}
```

#### Ответ

Status: 201

```
{
    "status": "success"
}
```