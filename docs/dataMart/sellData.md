# Api для оплаты за покупку данных

> **Method**: POST
>
> **Action**: /data/buy

## Необходимые данные
```
	id - required|uuid
	owner - required|address
	data_validator - required|address
	sum - required|number
``` 

Описание:
* id - Id файла
* owner - Адрес дата марта
* data_validator - Адрес дата валидатора
* sum - Сумма оплаты

## Пример

#### Запрос
```
{
	"id": "3a1e5f22-9e68-4ce3-bdac-c31048a98b5e",
	"owner": "0x57442eDD686a7Bde27BdC94850F1b47EbBc99277",
	"data_validator": "0x611a44A5cCD53A75d666033f609aF8468e07D80e",
	"sum": 10
}
```

#### Ответ

Status: 201

```
{
	"status": "success"
}
```
