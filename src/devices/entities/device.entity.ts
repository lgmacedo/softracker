export class Device {
  constructor(
    private id: number,
    private date: string,
    private direction: number,
    private distance: number,
    private time: number,
    private fixed_gps: boolean,
    private historic_gps: boolean,
    private ignition: boolean,
    private negative_latitude: boolean,
    private negative_longitude: boolean,
    private current_speed: number,
    private latitude: number,
    private longitude: number,
  ) {}
}
