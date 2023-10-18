import { flyToStoreAndChange } from "./locator-functions.js";


function mapUnclusteredClick(map) {
  map.on("click", "unclustered-point", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const props = e.features[0].properties;
    if (!props.cluster) {
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      flyToStoreAndChange(e.features[0], map);
      /* Close all other popups and display popup for clicked store */
      /* Highlight listing in sidebar 
    */
      const activeItem = document.getElementsByClassName("active");
      // e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      const listing = document.getElementById(
        `listing-${e.features[0].properties.id}`
      );
      listing.classList.add("active");
    }
  });
}



function mainClusters(map, markerIMG, stores) {
  map.loadImage(markerIMG, (error, image) => {
    if (error) throw error;
    map.addImage("pin", image);
    map.addSource("places", {
      type: "geojson",
      data: stores,
      cluster: true,
      clusterMaxZoom: 12, // Max zoom to cluster points on
      clusterRadius: 12 // Radius of each cluster when clustering points (defaults to 50)
    });
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "places",
      filter: ["has", "point_count"]
    });
    map.addLayer({
      id: "unclustered-point",
      source: "places",
      filter: ["!", ["has", "point_count"]],
      type: "symbol",
      layout: {
        "icon-image": "pin", // reference the image
        "icon-size": 0.25
      }
    });
  });
}



function locationInternal(store, directionIcon) {
  /* Add a new listing section to the sidebar. */

}

export { mainClusters, mapUnclusteredClick }