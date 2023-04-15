//Need to connect to db first
// const {NftRequests, FtRequests} = require('../model/index').requests;


//username, password, privateKey
const create = async(model, new_obj) => {
    const new_entry = new model(new_obj);
    await new_entry.save();
}

const getOne = async(model, filter_obj) => {
    const entry = await model.findOne({...filter_obj});
    return(entry); 
}


const getAll = async(model) => {
    const all = await model.find({});
    return(all);
}


const updateEntry = async(model, filter_obj, update_obj) => {
    const updated = await model.findOneAndUpdate({...filter_obj}, update_obj);
    return(updated)
}

const deleteEntry = async(model, filter_obj) => {
    await model.deleteOne(filter_obj);
}




module.exports = {
    create,
    getOne,
    getAll,
    updateEntry,
    deleteEntry
}