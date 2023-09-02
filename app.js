function init() {

    // Первая карта, first map
    // Инициализируем карту
    let myMap1 = new ymaps.Map('map1', {
        center: [55.7, 37.5],
        zoom: 5,
        controls: ['zoomControl']
    });

    // Создаём кластер
    let myClusterer = new ymaps.Clusterer({
        clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="icon-cluster">{{ properties.geoObjects.length }}</div>'),
        clusterDisableClickZoom: false,
        disableClickZoom: false,
        clusterIconShape: {
            type: 'Rectangle',
            coordinates: [[0, 0], [42, 42]]
        }
    });

    // Добавляем все метки в кластер
    for (const n in points) {
        let el = points[n];
        let coord = el.coordinates.reverse();
        let name = el.name;
        let content = "";

        if (el.url)
            content = el.address + "<br><a target='_blank' href='" + el.url + "'>" + el.url + "</a>";
        else
            content = el.address;

        myClusterer.add(new ymaps.Placemark(coord, {
            iconContent: name,
            iconCaption: name,
            balloonContentHeader: name,
            balloonContentBody: content,
        }, {
            preset: 'islands#blueZooIcon',
        }));
    }

    // Выводим данные из кластера на карту
    myMap1.geoObjects.add(myClusterer);

    // Отключаем масштабирование колесом мышки
    myMap1.behaviors.disable('scrollZoom');
    myMap1.behaviors.disable('multiTouch');


    // Вторая карта, second map
    // Инициализируем карту
    let myMap2 = new ymaps.Map('map2', {
        center: [55.7, 37.5],
        zoom: 5,
        controls: ['zoomControl']
    });

    // Создаём коллекцию
    let myCollection = new ymaps.GeoObjectCollection({}, {
        preset: 'islands#blueZooIcon',
        draggable: false,
    });

    // Добавляем все метки в коллекцию
    for (const n in points) {
        let el = points[n];
        let coord = el.coordinates;
        let name = el.name;
        let content = "";

        if (el.url)
            content = el.address + "<br><a target='_blank' href='" + el.url + "'>" + el.url + "</a>";
        else
            content = el.address;

        myCollection.add(new ymaps.Placemark(coord, {
            balloonContentHeader: name,
            balloonContent: content,
        }));
    }

    // Выводим данные из коллекции на карту
    myMap2.geoObjects.add(myCollection);

    // Отключаем масштабирование колесом мышки
    myMap2.behaviors.disable('scrollZoom');
    myMap2.behaviors.disable('multiTouch');

};

ymaps.ready(init);
