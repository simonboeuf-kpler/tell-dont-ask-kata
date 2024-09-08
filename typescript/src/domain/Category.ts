class Category {
  constructor(
    // `name` is not used in this kata but probably has a purpose in a real use case so I'm keeping it
    public readonly name: string,
    public readonly taxPercentage: number
  ) {
    this.name = name;
    this.taxPercentage = taxPercentage;
  }

}

export default Category;

