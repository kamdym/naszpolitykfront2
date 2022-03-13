export class PoliticianModel {
  constructor(
    public id: number,
    public pictureURL: any,
    public firstName: string,
    public lastName: string,
    public clubName: string,
    public education: string,
    public birthDate: Date,
    public birthPlace: string,
    public experience: string,
  ) {
  }
}
