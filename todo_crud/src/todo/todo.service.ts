import { Injectable } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import { Todo } from './todo.interface';
@Injectable()
export class TodoService {
    private db;
    private client: MongoClient;
    constructor() {
        this.client = new MongoClient('mongodb://localhost:27017');
        this.initialize();
    }
    private async initialize() {
        try {
            await this.connect();
        } catch (err) {
            console.error('Failed to initialize database connection:', err);
        }
    }
    private async connect(){
        try{
            await this.client.connect();
            this.db = this.client.db('todo');
            console.log('Connected to database');
        }catch(err){
            console.error('Failed to connect to the database:', err);
            throw err;
        }
    }
    async createTask(item: Todo){
        try{
            const collection = this.db.collection('tasks');
            return await collection.insertOne(item);
        }catch(err){
            throw err;
        }
    }

    async findAllTasks(){
        try{
            const collection = this.db.collection('tasks');
            return await collection.find({}).toArray();
        }catch(err){
            throw err;
        }
    }

    async findOneTask(id: string){
        try{
            const collection = this.db.collection('tasks');
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            throw err;
        }
    }

    async updateTask(id: string, item: Todo){
        try{
            const collection = this.db.collection('tasks');
            return await collection.updateOne({_id: new ObjectId(id)},{$set: item});
        }catch(err){
            throw err;
        }
    }
  
    async deleteTask(id: string){
        try{
            const collection = this.db.collection('tasks');
            return await collection.deleteOne({_id: new ObjectId(id)});
        }catch(err){
            throw err;
        }
    }
}
