class Item {
  src: string;
  value: string;
  id: string;

  constructor(tempSRC: string, tempValue: string, tempID: string) {
    this.src = tempSRC;
    this.value = tempValue;
    this.id = tempID;
  }
}

export default Item;
