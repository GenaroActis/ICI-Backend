import mongoose from 'mongoose';
import { MONGODBURL } from '../config.js';

class ConnectMongoDB{
    static #instance
    constructor(){
        mongoose.connect(MONGODBURL)
    };
    static getInstance(){
        if(this.#instance){
            return this.#instance
        }else{
            this.#instance = new ConnectMongoDB()
            return this.#instance
        };
    };
};

ConnectMongoDB.getInstance();