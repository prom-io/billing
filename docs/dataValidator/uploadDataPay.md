# Api для оплаты за загрузку данных

> **Method**: POST
>
> **Action**: /data/upload/pay

## Необходимые данные
```
	id - required|uuid
	owner - required|address
	name - required|string
	size - required|number
	extension - required|string
	mime_type - required|string
	service_node - required|string
	data_owner - required|string
	data_price - required|number
	sum - required|number
``` 

Описание:
* id - Id файла
* owner - Адрес дата валидатора
* name - Наименование файла
* size - Размер файла
* extension - Расширение файла
* mime_type - Mime тип файла
* service_node - Адрес сервис ноды
* data_owner - Адрес дата оунера
* data_price - Цена данных
* sum - Сумма оплаты

## Пример

#### Запрос
```
{
	"id": "3a1e5f22-9e68-4ce3-bdac-c31048a98b5e",
	"owner": "0x611a44A5cCD53A75d666033f609aF8468e07D80e",
	"name": "File 1",
	"size": 235000,
	"extension": "mp3",
	"mime_type":  "audio/mp3",
	"service_node": "0xF82AFE91b70022f5651C4d2Ce251E8a15C868029",
	"data_owner": "0x57442eDD686a7Bde27BdC94850F1b47EbBc99277",
	"data_price": 10,
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
