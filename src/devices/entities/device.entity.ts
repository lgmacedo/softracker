export class Device {
  constructor(
    private _id: number,
    private _date: string,
    private _direction: number,
    private _distance: number,
    private _time: number,
    private _fixed_gps: boolean,
    private _historic_gps: boolean,
    private _ignition: boolean,
    private _negative_latitude: boolean,
    private _negative_longitude: boolean,
    private _current_speed: number,
    private _latitude: number,
    private _longitude: number,
  ) {}

  get id() {
    return this._id;
  }
}
