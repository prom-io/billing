# Api для перевода средств с одного счета на другой

> **Method**: POST
>
> **Action**: /wallet/transfer

## Необходимые данные
```
  from - required|string
  to - required|string
  sum - required|string
```

Описание:

* from - адрес отправителя
* to - адрес получателя
* sum - сумма средств для отправления

## Пример

#### Запрос
```
http://localhost:3001/wallet/transfer
```

Тело запроса:
```json
{
	"from": "0xCd583eebf344A4475BbF71B9B79a6fD5b37DC96e",
	"to": "0xb1aBf3127A13192c80F7D1CAA6Ad02b57855f1ac",
	"sum": "1"
}
```

#### Ответ

Status: 201

```json
{
    "status": "success"
}
```