export class User {

    public id: number;

    public firstName: string;

    public lastName: string;

    public birth: Date;



    constructor(id: number, firstName: string, lastName:string, birth: Date)

    {

        this.id = id;

        this.firstName = firstName;

        this.lastName = lastName;

        this.birth = birth;

    }

}