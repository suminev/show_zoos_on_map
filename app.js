


function init() {

    // Первая карта, first map
    let myMap1 = new ymaps.Map('map1', {
        center: [55.7, 37.5],
        zoom: 5,
        controls: ['zoomControl']
    });

    let myClusterer = new ymaps.Clusterer({
        clusterIconLayout: ymaps.templateLayoutFactory.createClass('<div class="icon-cluster">{{ properties.geoObjects.length }}</div>'),
        clusterDisableClickZoom: false,
        disableClickZoom: false,
        clusterIconShape: {
            type: 'Rectangle',
            coordinates: [[0, 0], [42, 42]]
        }
    });

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

    myMap1.geoObjects.add(myClusterer);

    myMap1.behaviors.disable('scrollZoom');
    myMap1.behaviors.disable('multiTouch');


    // Вторая карта, second map
    let myMap2 = new ymaps.Map('map2', {
        center: [55.7, 37.5],
        zoom: 5,
        controls: ['zoomControl']
    });

    let myCollection = new ymaps.GeoObjectCollection({}, {
        preset: 'islands#blueZooIcon',
        draggable: false,
    });

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

    myMap2.geoObjects.add(myCollection);

    myMap2.behaviors.disable('scrollZoom');
    myMap2.behaviors.disable('multiTouch');

};

ymaps.ready(init);