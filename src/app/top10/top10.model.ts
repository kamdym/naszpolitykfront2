export class Top10Model {
  constructor(
    public top: number,
    public politicianId: number,
    public avatar: any,
    public firstName: string,
    public lastName: string,
    public mentionsCount: number) {}
}
