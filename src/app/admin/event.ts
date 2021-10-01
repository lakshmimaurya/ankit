export class Event {

  constructor(
    public ename: string,
    public sdate: string,
    public edate: string,
    public stime: string,
    public etime: string,
    public rfee: number,
    public rlink: string,
    public pltfm: string,
    public wprize: number,
    public fprize: number,
    public sprize: number,
    public descptn: string,
    public c1name: string,
    public c1email: string,
    public c1ph: string,
    public c2name: string,
    public c2email: string,
    public c2ph: string
  ) {  }

}