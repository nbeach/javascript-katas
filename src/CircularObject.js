class CircularObject {

  constructor(diameter, weight) {
    this._diameter = diameter;
    this._weight = weight;
  }

  getWeight() {
    return this._weight;
  }

  getDiameter() {
    return this._diameter;
  }

  equals(object) {
    return this._diameter === object.getDiameter();
  }
}

module.exports = CircularObject;