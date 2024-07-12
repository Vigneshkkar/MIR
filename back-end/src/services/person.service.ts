import { connect } from "mongoose";
import { Person } from "../model/types/person";
import { PersonModel } from "../model/schema/personSchema";

export class PersonService{
  
    static async savePerson(person: Person) {

        return await new PersonModel(person).save();
    }
    static async getPersonById(id: string) {

        return await PersonModel.findById(id);
    }
}