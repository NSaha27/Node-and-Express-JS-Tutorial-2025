const accomodations = [
  {
    buildingName: "Ashirbad Bhavan",
    imageURL: "purulia_homestay.jpg",
    location: "Purulia",
    amenities: ["king size bed", "wifi", "hot or cold water", "iron", "extra pillow & blankets", "tv", "ac", "refrigerator", "parking"],
    price: 1500.00,
    rating: 3.8
  }
];

class Accomodation {
  constructor(buildingName, imageURL, location, amenities, price, rating){
    this.buildingName = buildingName;
    this.imageURL = imageURL;
    this.location = location;
    this.amenities = amenities;
    this.price = price;
    this.rating = rating;
  }

  save(){
    accomodations.push(this);
  }

  static displayAccomodations(){
    return accomodations;
  }
}

export default Accomodation;