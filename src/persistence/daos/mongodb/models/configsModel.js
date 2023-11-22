import mongoose from 'mongoose';

const configsSchema = new mongoose.Schema({
    key: {type: String, require: true, unique: true},
    value: {tyoe: String, require:true}
});

export const ConfigsModel = mongoose.model(
    'configs',
    configsSchema
);