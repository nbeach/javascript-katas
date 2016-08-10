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

  equals(circularObject) {
    return this._diameter === circularObject.getDiameter()
      && this._weight === circularObject.getWeight();
  }
}

module.exports = CircularObject;