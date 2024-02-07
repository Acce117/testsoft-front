export class Test {
    answers;

    public constructor(){
        this.answers = {};
    }

    public sendTest(){
        //TODO send request with answers
        console.log(this.answers);
    }
}