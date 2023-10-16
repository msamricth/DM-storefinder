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
  const listings = document.getElementById("listings");
  const listing = listings.appendChild(
    document.createElement("div")
  );
  /* Assign a unique `id` to the listing. */
  listing.id = `listing-${store.properties.id}`;
  /* Assign the `item` class to each listing for styling. */
  listing.className = "item";
  const link = listing.appendChild(document.createElement("a"));
  link.href = "#";
  link.className = "title";
  link.id = `link-${store.properties.id}`;
  /* Add details to the individual listing. */
  const detailsContainer = listing.appendChild(
    document.createElement("div")
  );
  detailsContainer.className = "listing-content";
  /* Add the link to the individual listing created above. */

  const details = detailsContainer.appendChild(
    document.createElement("div")
  );

  details.className = "listing-details";
  var storeDistance = "";
  if (store.properties.distance) {
    const roundedDistance =
      Math.round(store.properties.distance * 100) / 100;
    storeDistance = ` <strong>${roundedDistance} miles away</strong> - `;
  }
  details.innerHTML =
    "<h3>" + `${store.properties.name}` + "</h3>";
  details.innerHTML +=
    "<small>" +
    storeDistance +
    `${store.properties.address}` +
    "</small>";
  if (store.properties.hours) {
    details.innerHTML +=
      "<strong>" + `${store.properties.hours}` + "</strong>";
  }

  const meta = detailsContainer.appendChild(
    document.createElement("div")
  );

  var containerPhone = `${store.properties.phoneFormatted}`,
    containerAddress = `${store.properties.address}`;

  if (containerPhone) {
    containerPhone = encodeURIComponent(containerPhone);
  }
  if (containerAddress) {
    containerAddress = encodeURIComponent(containerAddress);
  }
  var containerhref =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    containerAddress;
  meta.className = "meta-details";
  meta.innerHTML +=
    "<a href='" +
    containerhref +
    "' target='_blank'><img class='results-icon' src='" +
    directionIcon +
    "'/></a>";
  link.addEventListener("click", function (event) {
    event.preventDefault();
    flyToStoreAndChange(feature, map);
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove(
      "search-suggestions-displayed"
    );
    const activeItem = document.getElementsByClassName(
      "active"
    );
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }
    this.parentNode.classList.add("active");
  });
}

export { mainClusters, mapUnclusteredClick, locationInternal }